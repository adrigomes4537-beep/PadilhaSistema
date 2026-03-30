"use client";

import { useState } from "react";

export default function FormAgendamento({ onSuccess }: any) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    corte: "Social",
    horario: "",
    data: new Date().toISOString().split("T")[0],
  });

  const salvar = async () => {
    await fetch("/api/agendamentos", {
      method: "POST",
      body: JSON.stringify(form),
    });

    onSuccess();
  };

  return (
    <>
      <input
        placeholder="Nome"
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />

      <input
        placeholder="Telefone"
        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, corte: e.target.value })}
      >
        <option>Social</option>
        <option>Degradê</option>
      </select>

      <input
        type="time"
        onChange={(e) => setForm({ ...form, horario: e.target.value })}
      />

      <button onClick={salvar}>Salvar</button>
    </>
  );
}