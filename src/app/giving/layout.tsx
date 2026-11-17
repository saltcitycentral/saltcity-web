import type { ReactNode } from "react";
import GivingNavBar from "./GivingNavBar";

export default function GivingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GivingNavBar />
      {children}
    </>
  );
}
