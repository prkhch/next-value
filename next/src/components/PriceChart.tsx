"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import ForcastingResult from "@/components/ForcastingResult";
import RangeInput from "@/components/RangeInput";

const PriceChart = ({
  labels,
  prices,
  symbol,
  currency,
  longName,
}: {
  labels: string[];
  prices: string[];
  symbol: string;
  currency: string;
  longName: string;
}) => {
  const canvasEl = useRef(null);
  Chart.register(zoomPlugin);

  const [range, setRange] = useState("");
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
            label: currency,
            data: newPrices,
            fill: false,
            borderColor: "rgb(0, 0, 0)",
            pointBorderWidth: 2,
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
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          plugins: {
            title: {
              display: true,
              text: longName,
              color: "rgb(0, 0, 0)",
            },
            tooltip: {
              displayColors: false,
            },
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
                mode: "x",
              },
              pan: {
                enabled: true,
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
      <RangeInput range={range} setRange={setRange} />
      <ForcastingResult symbol={symbol} range={range} />
    </>
  );
};

// https://velog.io/@yewon6282/Chart.js-%ED%95%99%EC%8A%B5
// https://yeon22.github.io/Chartjs-kr/docs/latest/charts/line.html
// https://www.chartjs.org/chartjs-plugin-zoom/latest/guide/#installation

export default PriceChart;
