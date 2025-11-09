import Header from "@/components/landing/Header";
import InputUser from "@/components/landing/InputUser";
import React from "react";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden">
      <Header />
      <InputUser />
    </main>
  );
}
