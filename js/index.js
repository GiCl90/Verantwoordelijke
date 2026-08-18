const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function toonNaam(naam) {
  const el = document.getElementById("verantwoordelijke-naam");
  el.textContent = naam && naam.trim() !== "" ? naam : "Nog niet ingesteld";
}

async function laadHuidigeNaam() {
  const { data, error } = await supabaseClient
    .from("fastlane_verantwoordelijke")
    .select("naam")
    .eq("id", 1)
    .single();

  if (!error && data) {
    toonNaam(data.naam);
  }
}

supabaseClient
  .channel("verantwoordelijke-updates")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "fastlane_verantwoordelijke" },
    (payload) => toonNaam(payload.new.naam)
  )
  .subscribe();

laadHuidigeNaam();
