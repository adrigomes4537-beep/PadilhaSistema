"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <div className="navbar">
      <Link
        href="/barbearia"
        className={path === "/barbearia" ? "active" : ""}
      >
        💈 Barbearia
      </Link>

      <Link
        href="/iphones"
        className={path === "/iphones" ? "active" : ""}
      >
        📱 iPhones
      </Link>
    </div>
  );
}