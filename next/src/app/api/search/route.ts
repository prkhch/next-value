// https://medium.com/@yuvidexter/mastering-autocomplete-search-in-react-js-cb5edc3c528c
import dataset from "@/data/symbol_kr-us_20250815.json";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query")?.trim().toLocaleLowerCase();

  if (query === undefined) return;

  const searchRes = dataset
    // 소문자 변환 후 해당 종목, 이름 반환
    .filter((data) => {
      const symbol = data.Symbol.toLowerCase();
      const name = data.Name.toLowerCase();
      return symbol.startsWith(query) || name.includes(query);
    })
    // 데이터셋 이미 정렬됌. slice 0~5
    .slice(0, 5)
    // 키값 Symbol -> symbol
    .map((data) => ({
      symbol: data.Symbol,
      name: data.Name,
      exchange: data.Exchange,
    }));

  return Response.json({ searchRes });
}
