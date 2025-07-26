import PriceChart from "@/components/PriceChart";
import { getClosingPrice } from "@/utils/fetchStock";
import handleForamatDate from "@/utils/handleForamatDate";

export default async function Chart({
  searchParams,
}: {
  searchParams: Promise<{ symbol: string }>; // https://velog.io/@hunter_joe99/NEXTJS-params-Error
}) {
  const symbol = (await searchParams).symbol;

  const dataset = await getClosingPrice({ symbol });

  const formattedDates = dataset.res.chart.result[0].timestamp.map(
    (i: number) => handleForamatDate(i * 1000)
  );

  return (
    <main>
      <h1>chart</h1>
      <PriceChart
        labels={formattedDates}
        prices={dataset.res.chart.result[0].indicators.quote[0].close}
        symbol={symbol}
      />
    </main>
  );
}
