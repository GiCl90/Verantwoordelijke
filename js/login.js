const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const vasteMedewerkers = ["Johnnie Smeets", "Noa Croughs", "Evi Louwette", "Tim Cloosen"];

const andereMedewerkers = [
  "Beckers Charlotte",
  "Beckers Indy",
  "Belien Lore",
  "Cabal Emma",
  "Colona Liandra",
  "Gentier Tina",
  "Montfort Xena",
  "Nijs Jente",
  "Schoefs Jana",
  "Schols Brent",
  "Schols Luka",
  "Wouters Iluna",
];

function renderVasteKnoppen() {
  const container = document.getElementById("vaste-namen");
  vasteMedewerkers.forEach((naam) => {
    const knop = document.createElement("button");
    knop.textContent = naam;
    knop.className = "px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-lg transition-colors";
    knop.addEventListener("click", () => setVerantwoordelijke(naam));
    container.appendChild(knop);
  });
}

function renderDropdown() {
  const knop = document.getElementById("dropdown-knop");
  const label = document.getElementById("dropdown-label");
  const lijst = document.getElementById("dropdown-lijst");

  andereMedewerkers.forEach((naam) => {
    const item = document.createElement("button");
    item.type = "button";
    item.textContent = naam;
    item.className = "w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors";
    item.addEventListener("click", () => {
      lijst.classList.add("hidden");
      setVerantwoordelijke(naam);
    });
    lijst.appendChild(item);
  });

  knop.addEventListener("click", () => {
    lijst.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!knop.contains(e.target) && !lijst.contains(e.target)) {
      lijst.classList.add("hidden");
    }
  });
}

async function setVerantwoordelijke(naam) {
  const bevestiging = document.getElementById("bevestiging");
  bevestiging.textContent = "";

  const { error } = await supabaseClient
    .from("fastlane_verantwoordelijke")
    .update({ naam, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    bevestiging.className = "text-sm min-h-[1.5em] text-red-400";
    bevestiging.textContent = "Er ging iets mis: " + error.message;
    return;
  }

  bevestiging.className = "text-sm min-h-[1.5em] text-green-400";
  bevestiging.textContent = `${naam} is ingesteld als verantwoordelijke.`;
}

renderVasteKnoppen();
renderDropdown();
