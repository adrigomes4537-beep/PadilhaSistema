"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <main className="menu">
      <h1>Padilha Sistema</h1>
      <p>Selecione o painel</p>

      <div className="cards">
        <Link href="/barbearia" className="card-menu">
          <span>💈</span>
          <h2>Barbearia</h2>
          <p>Agenda de clientes</p>
        </Link>

        <Link href="/iphones" className="card-menu">
          <span>📱</span>
          <h2>iPhones</h2>
          <p>Controle de vendas</p>
        </Link>
      </div>

    </main>
  );
}