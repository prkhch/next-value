"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { useTheme } from "next-themes";
import ForcastingForm from "@/components/ForcastingForm";

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

  const [chartColor, setChartColor] = useState("");
  const { theme } = useTheme();
  useEffect(() => {
    setChartColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme, chartColor]);

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
            borderColor: chartColor,
            borderWidth: 1,
            pointBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 25, // https://stackoverflow.com/questions/76408985/chartjs-how-to-improve-mobile-tap-areas
            tension: 0.1,
          },
        ],
      };

      const myLineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: true,
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
              color: chartColor,
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
          animation: false,
        },
      });
      return function cleanup() {
        myLineChart.destroy();
      };
    }
  });

  return (
    <div className="w-full h-[50vh]">
      <canvas ref={canvasEl} />
      <div className="flex justify-center items-center gap-4 mt-4">
        <ForcastingForm symbol={symbol} range={range} setRange={setRange} />
      </div>
    </div>
  );
};

// https://velog.io/@yewon6282/Chart.js-%ED%95%99%EC%8A%B5
// https://yeon22.github.io/Chartjs-kr/docs/latest/charts/line.html
// https://www.chartjs.org/chartjs-plugin-zoom/latest/guide/#installation

export default PriceChart;
