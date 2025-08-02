import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  return (
    <main>
      <Logo />
      <SearchBar />
      <HomeContent />
    </main>
  );
}
