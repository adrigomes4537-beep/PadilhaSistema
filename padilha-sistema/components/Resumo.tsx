export default function Resumo({ agendamentos }: any) {
  const total = agendamentos.reduce((acc: number, a: any) => acc + a.valor, 0);

  return (
    <div>
      <p>Cortes: {agendamentos.length}</p>
      <p>Total: R$ {total}</p>
    </div>
  );
}