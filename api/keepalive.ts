// Daily Vercel cron: touch the database so the free Supabase project never pauses for inactivity.
export async function GET() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key)
    return Response.json(
      { ok: false, reason: "Supabase env not set" },
      { status: 500 }
    );

  const res = await fetch(`${url}/rest/v1/_expense_type?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  return Response.json(
    { ok: res.ok, status: res.status },
    { status: res.ok ? 200 : 502 }
  );
}
