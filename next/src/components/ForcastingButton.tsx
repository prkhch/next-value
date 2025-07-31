"use client";

const ForcastingButton = ({
  handleFetch,
}: {
  handleFetch: () => Promise<void>;
}) => {
  return (
    <div className="">
      <button
        onClick={handleFetch}
        type="button"
        className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-pointer shadow-md k dark:hover:text-gray-50 hover:text-gray-900 focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5  focus:outline-none "
      >
        Run
      </button>
    </div>
  );
};

export default ForcastingButton;
