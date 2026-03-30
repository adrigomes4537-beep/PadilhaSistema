"use client";

import { useState } from "react";

const horarios = [
  "09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00"
];

export default function Agenda({ agendamentos, onCreate }: any) {
  const [nome, setNome] = useState("");
  const [corte, setCorte] = useState("Social");

  const criar = (horario: string) => {
    if (!nome) return alert("Digite o nome");

    onCreate({
      nome,
      corte,
      horario,
      data: new Date().toISOString().split("T")[0],
    });

    setNome("");
  };

  return (
    <div>
      <h2>Agenda do Dia</h2>

      <input
        placeholder="Nome do cliente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <select onChange={(e) => setCorte(e.target.value)}>
        <option>Social</option>
        <option>Degradê</option>
      </select>

      <div className="grid">
        {horarios.map((h) => {
          const ag = agendamentos.find((a: any) => a.horario === h);

          return (
            <div
              key={h}
              className={`slot ${ag ? "ocupado" : "livre"}`}
            >
              <div>
                <div>{h}</div>

                {ag && (
                  <>
                    <div className="nome">{ag.nome}</div>
                    <div className="corte">{ag.corte}</div>
                  </>
                )}
              </div>

              {!ag && (
                <button onClick={() => criar(h)}>
                  Marcar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}