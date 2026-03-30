import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 🔍 LISTAR
export async function GET() {
  const { data, error } = await supabase
    .from("agendamentos")
    .select("*");

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ➕ CRIAR OU EDITAR
export async function POST(req: Request) {
  const body = await req.json();

  const { nome, valor, horario, data, id } = body;

  // verifica se já existe nesse horário
  const { data: existente } = await supabase
    .from("agendamentos")
    .select("*")
    .eq("data", data)
    .eq("horario", horario)
    .maybeSingle();

  if (existente || id) {
    const alvoId = id || existente.id;

    const { error } = await supabase
      .from("agendamentos")
      .update({
        nome,
        valor,
      })
      .eq("id", alvoId);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from("agendamentos")
    .insert([{ nome, valor, horario, data }]);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// ❌ DELETAR
export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabase
    .from("agendamentos")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}