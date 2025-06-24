import Link from "next/link";
import TestApiButton from "@/components/TestApiButton";

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
    </main>
  );
}
