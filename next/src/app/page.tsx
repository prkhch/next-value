import Link from "next/link";
import TestApiButton from "@/components/TestApiButton";
import TestApiButton2 from "@/components/TestApiButton2";

export default function Home() {
  return (
    <main>
      <h1>TEST</h1>
      <div>
        <Link href="/forecast">Forecast</Link>
      </div>
      <div>
        <Link href="/datasets">Datasets</Link>
      </div>
      <div>
        <TestApiButton />
      </div>
      <div>
        <TestApiButton2 />
      </div>
    </main>
  );
}
