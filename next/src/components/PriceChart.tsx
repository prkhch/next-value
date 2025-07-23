"use client";
import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

const PriceChart = ({
  labels,
  prices,
}: {
  labels: string[];
  prices: string[];
}) => {
  const canvasEl = useRef(null);

  useEffect(() => {
    if (canvasEl.current !== null) {
      const ctx = canvasEl.current;

      const data = {
        labels: labels,
        datasets: [
          {
            label: "종가",
            data: prices,
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
              top: 100,
              bottom: 100,
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
    </>
  );
};

export default PriceChart;

// https://velog.io/@yewon6282/Chart.js-%ED%95%99%EC%8A%B5
// https://yeon22.github.io/Chartjs-kr/docs/latest/charts/line.html
