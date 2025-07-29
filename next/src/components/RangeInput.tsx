import { SetStateAction } from "react";

const RangeInput = ({
  range,
  setRange,
}: {
  range: string;
  setRange: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-50">
      <form>
        <input
          type="number"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="shadow-md bg-gray-50  rounded-xs border-gray-300  text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-400"
          placeholder="Enter the chart range."
          required
          value={range}
          min={2}
          max={3650}
          onChange={(e) => setRange(e.target.value)}
          onBlur={() => {
            if (range !== "" && Number(range) < 2) setRange("2");
            else if (Number(range) > 3650) setRange("3650");
          }}
        />
      </form>
    </div>
  );
};

export default RangeInput;
