import Link from "next/link";

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
    </main>
  );
}
