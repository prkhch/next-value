import { SetStateAction } from "react";

const RangeInput = ({
  range,
  setRange,
}: {
  range: string;
  setRange: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <form className="max-w-xs mx-auto mt-5">
        <input
          type="number"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="shadow-md bg-gray-50 border-x-0 rounded-xs border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the chart range."
          required
          value={range}
          min={2}
          max={3650}
          onChange={(e) => setRange(e.target.value)}
          onBlur={() => {
            if (Number(range) < 2) setRange("2");
            else if (Number(range) > 3650) setRange("3650");
          }}
        />
      </form>
    </>
  );
};

export default RangeInput;
