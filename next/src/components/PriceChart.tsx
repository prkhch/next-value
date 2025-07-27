"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
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
  Chart.register(zoomPlugin);

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
            pointBorderWidth: 3,
            pointRadius: 0.5,
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
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
              },
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
      <canvas ref={canvasEl} className="w-full h-100" />
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
// https://velog.io/@yewon6282/Chart.js-%ED%95%99%EC%8A%B5
// https://yeon22.github.io/Chartjs-kr/docs/latest/charts/line.html

export default PriceChart;
