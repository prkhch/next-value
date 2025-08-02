const RangeInputMock = () => {
  return (
    <div className="w-50 mx-auto">
      <input
        type="number"
        id="quantity-input"
        data-input-counter
        aria-describedby="helper-text-explanation"
        className="shadow-md bg-gray-50  rounded-xs border-gray-300  text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-400"
        placeholder="Enter the chart range."
        disabled
      />
    </div>
  );
};

export default RangeInputMock;
