create table public.admins (
  id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  constraint admins_pkey primary key (id),
  constraint admins_id_fkey foreign KEY (id) references auth.users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.parents (
  id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  "studentId" bigint null,
  name text null,
  phone text null,
  constraint parents_pkey primary key (id),
  constraint parents_id_fkey foreign KEY (id) references auth.users (id),
  constraint parents_studentId_fkey foreign KEY ("studentId") references students (student_id)
) TABLESPACE pg_default;


create table public.parents (
  id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  "studentId" bigint null,
  name text null,
  phone text null,
  constraint parents_pkey primary key (id),
  constraint parents_id_fkey foreign KEY (id) references auth.users (id),
  constraint parents_studentId_fkey foreign KEY ("studentId") references students (student_id)
) TABLESPACE pg_default;

create table public.teachers (
  id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  phone text null,
  constraint teachers_pkey primary key (id),
  constraint teachers_id_fkey foreign KEY (id) references auth.users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;


