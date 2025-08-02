"use client";

export default function HomeContent() {
  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-6 py-10">
      <div className="shadow-sm bg-white dark:bg-gray-800 text-content">
        <div className="text-lg font-semibold mb-2">Step 1</div>
        <p>Enter the stock symbol accurately in the search bar.</p>
      </div>

      <div className="shadow-sm bg-white dark:bg-gray-800 text-content">
        <div className="text-lg font-semibold mb-2">Step 2</div>
        <p>
          Set the chart range. This determines how far back from today the chart
          will display. (2~3650)
        </p>
      </div>

      <div className="shadow-sm bg-white dark:bg-gray-800 text-content">
        <div className="text-lg font-semibold mb-2">Step 3</div>
        <p>
          Click the Run button to view the results. The first run may take about
          1–2 minutes.
        </p>
      </div>
    </section>
  );
}
