baixar o next.js

dar npm install

ver se funciona com o meu supa base ou precisa criar pra ele

ESQUEMA DAS TABELAS

create table public.iphones (
  id uuid not null default gen_random_uuid (),
  nome text null,
  produto text null,
  valor bigint null,
  data text null,
  created_at timestamp without time zone null default now(),
  parcelas jsonb null,
  custo bigint null,
  adiantamento bigint null,
  constraint iphones_pkey primary key (id)
) TABLESPACE pg_default;


create table public.agendamentos (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  nome text null,
  valor bigint null,
  horario text null,
  data text null,
  constraint agendamentos_pkey primary key (id)
) TABLESPACE pg_default;

fazer o connect no .env se precisar

apaguei o node modules só
