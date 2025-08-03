"use client";
import { SetStateAction, useState } from "react";
import { getForcastingResult } from "@/utils/fetchProphet";
import ForcastingButton from "@/components/ForcastingButton";
import RangeInput from "@/components/RangeInput";

const ForcastingForm = ({
  symbol,
  range,
  setRange,
}: {
  symbol: string;
  range: string;
  setRange: React.Dispatch<SetStateAction<string>>;
}) => {
  const handleFetch = async () => {
    setLoading(true);

    if (range === "") {
      setErrorMessage("Enter the chart range.");
      setForcastingResult("");
      setLoading(false);
      return;
    }

    const result = await getForcastingResult({ symbol, range });
    if (result.res.error) {
      setErrorMessage(result.res.error);
      setForcastingResult("");
    } else {
      setForcastingResult(result.res.predict_price);
      setErrorMessage("");
    }

    setLoading(false);
  };

  const [forcastingResult, setForcastingResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col">
      {!loading && (
        <div className="flex gap-2">
          <RangeInput range={range} setRange={setRange} />
          <ForcastingButton handleFetch={handleFetch} />
        </div>
      )}

      {loading && (
        <button
          disabled
          type="button"
          className=" text-gray-600 shadow-md bg-gray-50  dark:bg-gray-700 dark:text-gray-400 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-gray-400 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      )}

      {forcastingResult !== "" && (
        <div className="flex items-center justify-center mt-5">
          <svg
            className="w-4 h-4 text-emerald-600 dark:text-emerald-300 shrink-0 mt-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <div className="ml-1 text-xl text-content shrink-0 ">
            {forcastingResult}
          </div>
        </div>
      )}

      {errorMessage !== "" && (
        <div className="flex items-center justify-center mt-5">
          <svg
            className="w-4 h-4 text-rose-600 dark:text-rose-300 shrink-0 mt-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <div className="ml-1 text-sm text-content shrink-0 ">
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForcastingForm;
