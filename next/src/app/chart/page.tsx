import PriceChart from "@/components/PriceChart";
import { getClosingPrice } from "@/utils/fetchStock";
import handleForamatDate from "@/utils/handleForamatDate";

export default async function Chart() {
  const dataset = await getClosingPrice({ symbol: "AAPL", range: "1y" });

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
    </main>
  );
}
