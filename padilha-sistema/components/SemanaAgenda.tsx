"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

function gerarHorarios(dia: string) {
  const horarios: string[] = [];

  const add = (inicio: string, fim: string) => {
    let [h, m] = inicio.split(":").map(Number);
    const [fh, fm] = fim.split(":").map(Number);

    while (h < fh || (h === fh && m <= fm)) {
      horarios.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );

      m += 30;
      if (m >= 60) {
        m = 0;
        h++;
      }
    }
  };

  if (dia === "Dom") return [];

  if (dia === "Sab") {
    add("08:00", "12:00");
    return horarios;
  }

  add("08:30", "11:30");
  add("13:30", "19:30");

  return horarios;
}

export default function SemanaAgenda({
  agendamentos,
  onSave,
  onMove,
  onDelete,
}: any) {
  const [popup, setPopup] = useState<any>(null);
  const [editando, setEditando] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  const buscar = (dia: string, horario: string) => {
    return agendamentos.find(
      (a: any) => a.data === dia && a.horario === horario
    );
  };

  const salvar = () => {
    if (!nome || !valor) return;

    onSave({
      id: editando?.id,
      nome,
      valor: Number(valor),
      horario: popup.horario,
      data: popup.dia,
    });

    reset();
  };

  const excluir = () => {
    onDelete(editando.id);
    reset();
  };

  const reset = () => {
    setPopup(null);
    setEditando(null);
    setNome("");
    setValor("");
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const [diaOrigem, horarioOrigem] =
      result.source.droppableId.split("|");

    const [diaDestino, horarioDestino] =
      result.destination.droppableId.split("|");

    onMove({
      diaOrigem,
      horarioOrigem,
      diaDestino,
      horarioDestino,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="semana">
        {dias.map((dia) => {
          const horarios = gerarHorarios(dia);

          return (
            <div key={dia} className="coluna">
              <h3>{dia}</h3>

              {horarios.length === 0 && (
                <div className="fechado"></div>
              )}

              {horarios.map((h) => {
                const ag = buscar(dia, h);

                return (
                  <Droppable
                    key={`${dia}|${h}`}
                    droppableId={`${dia}|${h}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`slot ${ag ? "ocupado" : "livre"}`}
                        onClick={() => {
                          if (ag) {
                            setEditando(ag);
                            setPopup({ dia, horario: h });
                            setNome(ag.nome);
                            setValor(ag.valor);
                          } else {
                            setPopup({ dia, horario: h });
                          }
                        }}
                      >
                        <span>{h}</span>

                        {ag && (
                          <Draggable
                            draggableId={ag.id}
                            index={0}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <strong>{ag.nome}</strong>
                                <small>R$ {ag.valor}</small>
                              </div>
                            )}
                          </Draggable>
                        )}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          );
        })}
      </div>

      {popup && (
        <div className="overlay">
          <div className="modal">
            <h3>
              {popup.dia} - {popup.horario}
            </h3>

            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              placeholder="Preço"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />

            <button onClick={salvar}>
              {editando ? "Salvar" : "Agendar"}
            </button>

            {editando && (
              <button onClick={excluir}>
                Excluir
              </button>
            )}

            <button onClick={reset}>Cancelar</button>
          </div>
        </div>
      )}
    </DragDropContext>
  );
}