"use client";

import SearchBarMock from "@/components/ui/SearchBarMock";
import RangeInputMock from "@/components/ui/RangeInputMock";
import ForcastingButtonMock from "@/components/ui/ForcastingButtonMock";

export default function HomeContent() {
  const steps = [
    {
      id: 1,
      mock: <SearchBarMock />,
      text: "Enter the stock symbol accurately in the search bar. (Yahoo Finance symbol)",
    },
    {
      id: 2,
      mock: <RangeInputMock />,
      text: "Set the chart range. This determines how far back from today the chart will display. (2~3650)",
    },
    {
      id: 3,
      mock: <ForcastingButtonMock />,
      text: "Click the Run button to view the results. The first run may take about 1–2 minutes.",
    },
  ];

  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-center text-center gap-5">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="flex flex-col h-auto w-full max-w-xs md:max-w-full items-center justify-center md:items-start md:justify-between p-2 md:p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="mb-3">
            <p className="font-thin text-xs">Step {step.id}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center gap-1 md:gap-4 text-xs md:text-sm font-thin">
            {step.mock}
            <p className="text-center md:text-left">{step.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
