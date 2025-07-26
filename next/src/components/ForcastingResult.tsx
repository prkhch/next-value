"use client";
import { getForcastingResult } from "@/utils/fetchProphet";
import { useState } from "react";

const ForcastingResult = ({
  symbol,
  range,
}: {
  symbol: string;
  range: string;
}) => {
  const [forcastingResult, setForcastingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    const result = await getForcastingResult({ symbol, range });
    setForcastingResult(result.res.predict_price);
    setLoading(false);
  };

  return (
    <div>
      {!loading && <button onClick={handleFetch}>예측</button>}
      {loading && <div>Loading...</div>}

      {forcastingResult !== null && <div>Next: {forcastingResult}</div>}
    </div>
  );
};

export default ForcastingResult;
