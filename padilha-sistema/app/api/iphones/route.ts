import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET
export async function GET() {
  const { data, error } = await supabase
    .from("iphones")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data || []);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const {
    nome,
    produto,
    valor,
    custo,
    data,
    parcelas_total,
    adiantamento,
  } = body;

  const restante = valor - (adiantamento || 0);

  const parcelas = Array.from(
    { length: parcelas_total || 1 },
    () => false
  );

  const { error } = await supabase
    .from("iphones")
    .insert([
      {
        nome,
        produto,
        valor,
        custo,
        data,
        adiantamento,
        parcelas,
      },
    ]);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// PATCH parcelas
export async function PATCH(req: Request) {
  const { id, index } = await req.json();

  const { data, error } = await supabase
  .from("iphones")
  .select("parcelas")
  .eq("id", id)
  .single();

if (error || !data) {
  return NextResponse.json({ error: "Registro não encontrado" }, { status: 404 });
}

const parcelas = data.parcelas;
  parcelas[index] = !parcelas[index];

  await supabase
    .from("iphones")
    .update({ parcelas })
    .eq("id", id);

  return NextResponse.json({ ok: true });
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await supabase.from("iphones").delete().eq("id", id);

  return NextResponse.json({ ok: true });
}