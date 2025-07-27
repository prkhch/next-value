import { notFound } from "next/navigation";

import PriceChart from "@/components/PriceChart";
import { getClosingPrice } from "@/utils/fetchStock";
import handleForamatDate from "@/utils/handleForamatDate";
import SearchBar from "@/components/SearchBar";

export default async function Chart({
  searchParams,
}: {
  searchParams: Promise<{ symbol: string }>; // https://velog.io/@hunter_joe99/NEXTJS-params-Error
}) {
  const symbol = (await searchParams).symbol;

  const dataset = await getClosingPrice({ symbol });
  if (
    dataset.res.chart.result === null ||
    dataset.res.chart.error ||
    dataset.res.chart.result[0].timestamp == null
  ) {
    // 404 NotFound
    notFound();
  }
  console.log(dataset);
  const formattedDates = dataset.res.chart.result[0].timestamp.map(
    (i: number) => handleForamatDate(i * 1000)
  );

  return (
    <main>
      <SearchBar />
      <div>
        {dataset.res.chart.result[0].meta.longName}(
        {dataset.res.chart.result[0].meta.symbol})
      </div>
      <div>{dataset.res.chart.result[0].meta.currency}</div>
      <PriceChart
        labels={formattedDates}
        prices={dataset.res.chart.result[0].indicators.quote[0].close}
        symbol={symbol}
      />
    </main>
  );
}
