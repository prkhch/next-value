import PriceChart from "@/components/PriceChart";
import { getClosingPrice } from "@/utils/fetchStock";
import handleForamatDate from "@/utils/handleForamatDate";
import ForcastingResult from "@/components/ForcastingResult";

export default async function Chart({
  searchParams,
}: {
  searchParams: {
    symbol: string;
    range: string;
  };
}) {
  const symbol = searchParams.symbol;

  const dataset = await getClosingPrice({ symbol });

  console.log(dataset);

  const formattedDates = dataset.res.chart.result[0].timestamp.map(
    (i: number) => handleForamatDate(i * 1000)
  );

  return (
    <main>
      <h1>chart</h1>
      <PriceChart
        labels={formattedDates}
        prices={dataset.res.chart.result[0].indicators.quote[0].close}
      />
      <ForcastingResult symbol={symbol} />
    </main>
  );
}
