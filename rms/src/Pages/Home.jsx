import React from "react";
import Hero from "../components/Hero";
import Specials from "../components/Specials";
import MenuGrid from "../components/MenuGrid";

export default function Home() {
  return (
    <div>
      <Hero />
      <Specials />
      <MenuGrid />
    </div>
  );
}
