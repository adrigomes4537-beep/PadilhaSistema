"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Iphones() {
  const [vendas, setVendas] = useState<any[]>([]);

  const [nome, setNome] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [custo, setCusto] = useState("");
  const [adiantamento, setAdiantamento] = useState("");
  const [data, setData] = useState("");
  const [parcelas, setParcelas] = useState("");

  const carregar = async () => {
    const res = await fetch("/api/iphones");
    const data = await res.json();
    setVendas(data);
  };

  useEffect(() => {
    carregar();
    setData(new Date().toISOString().split("T")[0]);
  }, []);

  const salvar = async () => {
    await fetch("/api/iphones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        produto,
        valor: Number(valor),
        custo: Number(custo),
        adiantamento: Number(adiantamento || 0),
        data,
        parcelas_total: Number(parcelas || 1),
      }),
    });

    setNome("");
    setProduto("");
    setValor("");
    setCusto("");
    setAdiantamento("");
    setParcelas("");

    carregar();
  };

  const deletar = async (id: string) => {
    await fetch("/api/iphones", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    carregar();
  };

  const toggleParcela = async (id: string, index: number) => {
    await fetch("/api/iphones", {
      method: "PATCH",
      body: JSON.stringify({ id, index }),
    });

    carregar();
  };

  // 🔥 RESUMO
  const totalVendido = vendas.reduce((acc, v) => acc + v.valor, 0);
  const lucroTotal = vendas.reduce((acc, v) => acc + (v.valor - v.custo), 0);
  const totalReceber = vendas.reduce((acc, v) => {
    const restante = v.valor - (v.adiantamento || 0);
    const pagas = v.parcelas?.filter((p: boolean) => p).length || 0;
    const valorParcela = restante / (v.parcelas?.length || 1);
    return acc + (restante - pagas * valorParcela);
  }, 0);

  return (
    <main>
      <Navbar />

      <h1>📱 Padilha iPhones</h1>

      {/* RESUMO */}
      <div className="resumo">
        <div>💰 Vendido: R$ {totalVendido}</div>
        <div>📈 Lucro: R$ {lucroTotal}</div>
        <div>📉 A receber: R$ {totalReceber.toFixed(2)}</div>
      </div>

      {/* FORM */}
      <div className="form">
        <input placeholder="Cliente" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Produto" value={produto} onChange={(e) => setProduto(e.target.value)} />
        <input placeholder="Valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
        <input placeholder="Custo" type="number" value={custo} onChange={(e) => setCusto(e.target.value)} />
        <input placeholder="Entrada (adiantamento)" type="number" value={adiantamento} onChange={(e) => setAdiantamento(e.target.value)} />
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <input placeholder="Parcelas" type="number" value={parcelas} onChange={(e) => setParcelas(e.target.value)} />

        <button onClick={salvar}>Registrar</button>
      </div>

      {/* LISTA */}
      <div className="lista">
        {vendas.map((v) => {
          const restante = v.valor - (v.adiantamento || 0);
          const totalParcelas = v.parcelas?.length || 1;
          const valorParcela = restante / totalParcelas;
          const lucro = v.valor - v.custo;

          return (
            <div key={v.id} className="card">
              <div className="card-top">
                <strong>{v.nome}</strong>
                <span>{new Date(v.data).toLocaleDateString("pt-BR")}</span>
              </div>

              <div className="card-middle">
                <p>{v.produto}</p>

                <small>Custo: R$ {v.custo}</small><br />
                <small>Lucro: R$ {lucro}</small><br />
                <small>Entrada: R$ {v.adiantamento || 0}</small><br />
                <small>Restante: R$ {restante}</small><br />

                {totalParcelas > 1 && (
                  <small>
                    {totalParcelas}x de R$ {valorParcela.toFixed(2)}
                  </small>
                )}
              </div>

              <div className="card-bottom">
                <b>R$ {v.valor}</b>
              </div>

              {/* PARCELAS */}
              {v.parcelas && (
                <div className="parcelas-grid">
                  {v.parcelas.map((p: boolean, i: number) => (
                    <div
                      key={i}
                      className={`box ${p ? "paga" : ""}`}
                      onClick={() => toggleParcela(v.id, i)}
                    >
                      {p ? "✓" : ""}
                    </div>
                  ))}
                </div>
              )}

              <button className="delete" onClick={() => deletar(v.id)}>
                Excluir
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}