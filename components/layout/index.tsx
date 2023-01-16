import { ReactNode } from "react";
import Meta from "./meta";

import Footer from "./footer";
import Header from "./header";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  return (
    <>
      <Meta {...meta} />
      <Header />
      <main className="flex w-screen flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
    </>
  );
}
