"use client";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import ForcastingResult from "@/components/ForcastingResult";

const PriceChart = ({
  labels,
  prices,
  symbol,
}: {
  labels: string[];
  prices: string[];
  symbol: string;
}) => {
  const canvasEl = useRef(null);

  const [range, setRange] = useState("365");
  const [newPrices, setNewPrices] = useState(prices);
  const [newLabels, setNewLabels] = useState(labels);
  useEffect(() => {
    setNewLabels(labels.slice(-range));
    setNewPrices(prices.slice(-range));
  }, [range, prices, labels]);

  useEffect(() => {
    if (canvasEl.current !== null) {
      const ctx = canvasEl.current;

      const data = {
        labels: newLabels,
        datasets: [
          {
            label: "종가",
            data: newPrices,
            fill: false,
            borderColor: "rgb(0, 0, 0)",
            pointBorderWidth: 5,
            pointRadius: 1,
            tension: 0.1,
          },
        ],
      };

      const myLineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 10,
                autoSkip: true,
              },
            },
          },
          layout: {
            padding: {
              left: 100,
              right: 100,
              top: 0,
              bottom: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      return function cleanup() {
        myLineChart.destroy();
      };
    }
  });

  return (
    <>
      <canvas ref={canvasEl} />
      <input
        type="number"
        value={range}
        min={2}
        max={labels.length}
        onChange={(e) => setRange(e.target.value)}
      />
      <ForcastingResult symbol={symbol} range={range} />
    </>
  );
};

export default PriceChart;

// https://velog.io/@yewon6282/Chart.js-%ED%95%99%EC%8A%B5
// https://yeon22.github.io/Chartjs-kr/docs/latest/charts/line.html
