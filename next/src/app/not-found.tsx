import NotFoundClient from "@/components/NotFoundClient";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <main>
      {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <NotFoundClient />
      </Suspense>
    </main>
  );
}
