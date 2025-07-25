import { getForcastingResult } from "@/utils/fetchProphet";

const ForcastingResult = async ({ symbol }: { symbol: string }) => {
  const range = "365";
  const result = await getForcastingResult({ symbol, range });

  console.log(result);

  return (
    <div>
      <div>{result}</div>
    </div>
  );
};

export default ForcastingResult;
