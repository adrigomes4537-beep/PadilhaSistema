"use client";

import { useEffect, useState } from "react";
import SemanaAgenda from "@/components/SemanaAgenda";

export default function Home() {
  const [agendamentos, setAgendamentos] = useState([]);

  const carregar = async () => {
    const res = await fetch("/api/agendamentos");
    const data = await res.json();
    setAgendamentos(data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (dados: any) => {
    await fetch("/api/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    carregar();
  };

  const mover = async (dados: any) => {
    await fetch("/api/agendamentos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    carregar();
  };

  const deletar = async (id: string) => {
    await fetch("/api/agendamentos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    carregar();
  };

  return (
    <main style={{ padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", letterSpacing: "-0.5px" }}>
          💈 Padilha BarberShop
        </h1>
      </div>

      <SemanaAgenda
        agendamentos={agendamentos}
        onSave={salvar}
        onMove={mover}
        onDelete={deletar}
      />

      <div
        style={{
          marginTop: "25px",
          textAlign: "center",
          color: "#555",
          fontSize: "12px",
        }}
      >
        Criado por <strong>Adriel</strong>
      </div>
    </main>
  );
}