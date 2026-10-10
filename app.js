/* Fuel - calorie & macro tracker. Offline-first, localStorage. No account. */

var MEALS = ["breakfast", "lunch", "dinner", "snacks"];

var STR = {
  en: {
    appSub: "Calorie & macro tracker",
    navToday: "Today", navWeight: "Weight", navGroc: "Groceries", navSet: "Settings",
    calWord: "cal", protein: "Protein", carbs: "Carbs", fat: "Fat",
    remaining: "remaining", overBy: "over by",
    breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snacks: "Snacks",
    addFood: "+ Add food", noItems: "Nothing logged yet.",
    fmTitle: "Add food", searchPh: "Search foods...",
    custom: "Custom entry", customNamePh: "Food name",
    photoLabel: "Photo (optional)", qtyLabel: "Servings",
    addBtn: "Add", closeBtn: "Close",
    weightTitle: "Weight", curW: "Current", goalW: "Goal", toGo: "To go",
    logWeight: "Log weight", weightPh: "Today's weight",
    grocTitle: "Grocery list", grocPh: "Add an item...",
    addBtn2: "Add", staples: "Add healthy staples", clearChecked: "Clear checked",
    setTitle: "Settings", goalsH: "Daily goals",
    gCal: "Calories", gP: "Protein (g)", gC: "Carbs (g)", gF: "Fat (g)", gW: "Weight goal (lb)",
    save: "Save", saved: "Saved",
    usdaH: "USDA food search (optional)",
    usdaHint: "Free key at api.nal.usda.gov. Paste it here to search the full USDA database inside the app.",
    saveKey: "Save key", dataH: "Data", export: "Download my data",
    streak: "day streak", noStreak: "Log a meal to start your streak.",
    usdaErr: "USDA search failed. Check your key.",
    pickFood: "Tap a food to select it, then Add.",
    almostThere: "Almost at your limit",
    recH: "Recommended for you",
    recHint: "Answer a few questions and we will suggest daily targets. You can still change them after.",
    rAge: "Age", rHt: "Height", rWt: "Weight (lb)", rAct: "Activity", rGoal: "Goal",
    calcBtn: "Calculate",
    actSed: "Little to no exercise", actLight: "Light exercise 1-3 days/week",
    actMod: "Moderate exercise 3-5 days/week", actVery: "Hard exercise 6-7 days/week",
    goalLose1: "Lose about 1 lb per week", goalLose05: "Lose about 0.5 lb per week",
    goalMaintain: "Maintain weight", goalGain: "Gain muscle",
    needFields: "Fill in age, height, and weight first.",
    recOut: "Suggested daily targets",
    recFloor: "This is the safe minimum. Talk to your doctor before going lower.",
    useGoals: "Use these goals",
    discTitle: "A quick note",
    discText: "Fuel is a personal tracking tool, not medical advice. Talk to your doctor before starting any diet or making big changes to how you eat, especially if you have a health condition, take medication, are pregnant, or have a history of disordered eating.",
    discOk: "I understand"
  },
  es: {
    appSub: "Registro de calorías y macros",
    navToday: "Hoy", navWeight: "Peso", navGroc: "Compras", navSet: "Ajustes",
    calWord: "cal", protein: "Proteína", carbs: "Carbos", fat: "Grasa",
    remaining: "restantes", overBy: "te pasaste por",
    breakfast: "Desayuno", lunch: "Almuerzo", dinner: "Cena", snacks: "Meriendas",
    addFood: "+ Agregar comida", noItems: "Nada registrado aún.",
    fmTitle: "Agregar comida", searchPh: "Busca comidas...",
    custom: "Entrada manual", customNamePh: "Nombre de la comida",
    photoLabel: "Foto (opcional)", qtyLabel: "Porciones",
    addBtn: "Agregar", closeBtn: "Cerrar",
    weightTitle: "Peso", curW: "Actual", goalW: "Meta", toGo: "Faltan",
    logWeight: "Registrar peso", weightPh: "Peso de hoy",
    grocTitle: "Lista de compras", grocPh: "Agrega algo...",
    addBtn2: "Agregar", staples: "Agregar básicos saludables", clearChecked: "Borrar marcados",
    setTitle: "Ajustes", goalsH: "Metas diarias",
    gCal: "Calorías", gP: "Proteína (g)", gC: "Carbos (g)", gF: "Grasa (g)", gW: "Meta de peso (lb)",
    save: "Guardar", saved: "Guardado",
    usdaH: "Búsqueda USDA (opcional)",
    usdaHint: "Clave gratis en api.nal.usda.gov. Pégala aquí para buscar en la base de datos USDA dentro de la app.",
    saveKey: "Guardar clave", dataH: "Datos", export: "Descargar mis datos",
    streak: "días de racha", noStreak: "Registra una comida para empezar tu racha.",
    usdaErr: "Falló la búsqueda USDA. Revisa tu clave.",
    pickFood: "Toca una comida para elegirla, luego Agregar.",
    almostThere: "Casi en tu límite",
    recH: "Recomendado para ti",
    recHint: "Responde unas preguntas y te sugeriremos metas diarias. Puedes cambiarlas después.",
    rAge: "Edad", rHt: "Estatura", rWt: "Peso (lb)", rAct: "Actividad", rGoal: "Meta",
    calcBtn: "Calcular",
    actSed: "Poco o nada de ejercicio", actLight: "Ejercicio ligero 1-3 días/semana",
    actMod: "Ejercicio moderado 3-5 días/semana", actVery: "Ejercicio fuerte 6-7 días/semana",
    goalLose1: "Bajar ~1 lb por semana", goalLose05: "Bajar ~0.5 lb por semana",
    goalMaintain: "Mantener peso", goalGain: "Ganar músculo",
    needFields: "Completa edad, estatura y peso primero.",
    recOut: "Metas diarias sugeridas",
    recFloor: "Este es el mínimo seguro. Habla con tu médico antes de bajar más.",
    useGoals: "Usar estas metas",
    discTitle: "Una nota rápida",
    discText: "Fuel es una herramienta personal de registro, no es consejo médico. Habla con tu médico antes de empezar cualquier dieta o hacer cambios grandes en tu alimentación, especialmente si tienes una condición de salud, tomas medicamentos, estás embarazada o tienes historial de trastornos alimenticios.",
    discOk: "Entendido"
  }
};

function t(k) { var l = state.lang === "es" ? "es" : "en"; return STR[l][k] || STR.en[k]; }
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function todayStr(off) {
  var d = new Date(); d.setDate(d.getDate() + (off || 0));
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

var state = {
  lang: localStorage.getItem("fuel_lang") || "en",
  date: todayStr(0),
  dateOff: 0,
  goals: null,
  weights: [],
  groceries: [],
  usdaKey: localStorage.getItem("fuel_usda") || "",
  view: "today",
  modalMeal: null,
  modalFood: null,
  modalQty: 1,
  modalPhoto: null
};

var DEFAULT_GOALS = { cal: 1600, p: 120, c: 150, f: 53, w: 125 };

function loadAll() {
  try { state.goals = JSON.parse(localStorage.getItem("fuel_goals") || "null") || Object.assign({}, DEFAULT_GOALS); }
  catch (e) { state.goals = Object.assign({}, DEFAULT_GOALS); }
  try { state.weights = JSON.parse(localStorage.getItem("fuel_weights") || "[]"); } catch (e) { state.weights = []; }
  try { state.groceries = JSON.parse(localStorage.getItem("fuel_groceries") || "[]"); } catch (e) { state.groceries = []; }
}
function saveGoals() { localStorage.setItem("fuel_goals", JSON.stringify(state.goals)); }
function saveWeights() { localStorage.setItem("fuel_weights", JSON.stringify(state.weights)); }
function saveGroceries() { localStorage.setItem("fuel_groceries", JSON.stringify(state.groceries)); }

function logKey(date) { return "fuel_log_" + date; }
function getLog(date) {
  try {
    var l = JSON.parse(localStorage.getItem(logKey(date)) || "null");
    if (l && l.meals) return l;
  } catch (e) {}
  return { meals: { breakfast: [], lunch: [], dinner: [], snacks: [] } };
}
function saveLog(date, log) { localStorage.setItem(logKey(date), JSON.stringify(log)); }

function dayTotals(date) {
  var log = getLog(date), tot = { cal: 0, p: 0, c: 0, f: 0, n: 0 };
  MEALS.forEach(function (m) {
    (log.meals[m] || []).forEach(function (it) {
      tot.cal += it.cal * it.qty; tot.p += it.p * it.qty; tot.c += it.c * it.qty; tot.f += it.f * it.qty; tot.n++;
    });
  });
  tot.cal = Math.round(tot.cal); tot.p = Math.round(tot.p); tot.c = Math.round(tot.c); tot.f = Math.round(tot.f);
  return tot;
}

/* ---------- chrome ---------- */
function renderChrome() {
  $("appSub").textContent = t("appSub");
  $("navToday").textContent = t("navToday");
  $("navWeight").textContent = t("navWeight");
  $("navGroc").textContent = t("navGroc");
  $("navSet").textContent = t("navSet");
  document.querySelectorAll(".langtoggle button").forEach(function (b) {
    b.classList.toggle("active", b.dataset.lang === state.lang);
  });
  document.documentElement.lang = state.lang;
  var n = 0, d = todayStr(0);
  for (var i = 0; i < 365; i++) {
    var ds = todayStr(-i);
    if (dayTotals(ds).n > 0) n++; else break;
  }
  $("streakLine").textContent = n > 0 ? "🔥 " + n + " " + t("streak") : t("noStreak");
}

/* ---------- today ---------- */
function fmtDate(ds) {
  var d = new Date(ds + "T12:00:00");
  var opts = { weekday: "short", month: "short", day: "numeric" };
  try { return d.toLocaleDateString(state.lang === "es" ? "es-ES" : "en-US", opts); }
  catch (e) { return ds; }
}

function renderToday() {
  var ds = state.date, tot = dayTotals(ds), g = state.goals;
  $("dateLabel").textContent = fmtDate(ds);
  $("calEaten").textContent = tot.cal;
  $("calGoal").textContent = g.cal;
  $("calWord").textContent = t("calWord");
  var cf = $("calFill");
  cf.style.width = Math.min(100, tot.cal / g.cal * 100) + "%";
  cf.classList.toggle("over", tot.cal > g.cal);
  $("mProtein").textContent = t("protein"); $("mCarbs").textContent = t("carbs"); $("mFat").textContent = t("fat");
  $("pEaten").textContent = tot.p; $("pGoal").textContent = g.p;
  $("cEaten").textContent = tot.c; $("cGoal").textContent = g.c;
  $("fEaten").textContent = tot.f; $("fGoal").textContent = g.f;
  $("pFill").style.width = Math.min(100, tot.p / g.p * 100) + "%";
  $("cFill").style.width = Math.min(100, tot.c / g.c * 100) + "%";
  $("fFill").style.width = Math.min(100, tot.f / g.f * 100) + "%";
  var rem = g.cal - tot.cal;
  var pct = g.cal > 0 ? tot.cal / g.cal : 0;
  var rl = $("remainingLine");
  rl.classList.remove("warn", "close");
  if (pct >= 1) {
    rl.classList.add("warn");
    rl.textContent = "⚠ " + t("overBy") + " " + Math.abs(rem) + " " + t("calWord");
  } else if (pct >= 0.9) {
    rl.classList.add("close");
    rl.textContent = t("almostThere") + ": " + rem + " " + t("calWord") + " " + t("remaining");
  } else {
    rl.textContent = rem + " " + t("calWord") + " " + t("remaining");
  }

  var log = getLog(ds), box = $("meals");
  box.innerHTML = "";
  MEALS.forEach(function (m) {
    var card = document.createElement("div");
    card.className = "card";
    var items = log.meals[m] || [];
    var mcal = Math.round(items.reduce(function (s, it) { return s + it.cal * it.qty; }, 0));
    var head = document.createElement("div");
    head.className = "mealhead";
    head.innerHTML = "<h3>" + esc(t(m)) + "</h3><span class='mtot'>" + mcal + " " + esc(t("calWord")) + "</span>";
    card.appendChild(head);
    if (!items.length) {
      var e = document.createElement("div");
      e.className = "empty-meal"; e.textContent = t("noItems");
      card.appendChild(e);
    }
    items.forEach(function (it, idx) {
      var row = document.createElement("div");
      row.className = "fooditem";
      var im = it.photo ? "<img src=\"" + it.photo + "\" alt=\"\">" : "";
      row.innerHTML = im + "<div class='fi'><b>" + esc(it.name) + "</b><small>" +
        (it.qty !== 1 ? it.qty + " x " : "") + esc(it.serving || "") + " · P" + Math.round(it.p * it.qty) +
        " C" + Math.round(it.c * it.qty) + " F" + Math.round(it.f * it.qty) + "</small></div>" +
        "<span class='fk'>" + Math.round(it.cal * it.qty) + "</span>";
      var del = document.createElement("button");
      del.className = "delbtn"; del.textContent = "×";
      del.onclick = function () {
        var l = getLog(ds); l.meals[m].splice(idx, 1); saveLog(ds, l);
        renderToday(); renderChrome();
      };
      row.appendChild(del);
      card.appendChild(row);
    });
    var add = document.createElement("button");
    add.className = "addbtn"; add.textContent = t("addFood");
    add.onclick = function () { openFoodModal(m); };
    card.appendChild(add);
    box.appendChild(card);
  });
}

/* ---------- food modal ---------- */
function foodName(f) { return state.lang === "es" ? f.es : f.en; }
function foodServing(f) { return state.lang === "es" ? f.s_es : f.s_en; }

function openFoodModal(meal) {
  state.modalMeal = meal; state.modalFood = null; state.modalQty = 1; state.modalPhoto = null;
  $("fmTitle").textContent = t("fmTitle") + " · " + t(meal);
  $("foodSearch").placeholder = t("searchPh");
  $("foodSearch").value = "";
  $("cName").placeholder = t("customNamePh");
  ["cName", "cCal", "cP", "cC", "cF"].forEach(function (id) { $(id).value = ""; });
  $("foodPhoto").value = "";
  $("photoLabel").firstChild.textContent = t("photoLabel") + " ";
  $("qtyLabel").textContent = t("qtyLabel");
  $("qVal").textContent = "1";
  $("fmAdd").textContent = t("addBtn");
  $("fmClose").textContent = t("closeBtn");
  $("customForm").classList.remove("hidden");
  renderFoodResults("");
  $("foodModal").classList.remove("hidden");
}
function closeFoodModal() { $("foodModal").classList.add("hidden"); }

function renderFoodResults(q) {
  var box = $("foodResults");
  box.innerHTML = "";
  q = (q || "").trim().toLowerCase();
  var hits = FOOD_DB.filter(function (f) {
    return !q || f.en.toLowerCase().indexOf(q) > -1 || f.es.toLowerCase().indexOf(q) > -1;
  }).slice(0, 30);
  if (!hits.length) {
    box.innerHTML = "<div class='empty-meal'>" + esc(t("pickFood")) + "</div>";
  }
  hits.forEach(function (f) {
    var b = document.createElement("button");
    b.className = "result" + (state.modalFood === f ? " sel" : "");
    b.innerHTML = esc(foodName(f)) + "<small>" + esc(foodServing(f)) + " · " +
      f.cal + " cal · P" + f.p + " C" + f.c + " F" + f.f + "</small>";
    b.onclick = function () {
      state.modalFood = (state.modalFood === f) ? null : f;
      renderFoodResults($("foodSearch").value);
    };
    box.appendChild(b);
  });
  if (state.usdaKey && q.length > 2) usdaSearch(q, box);
}

var usdaTimer = null;
function usdaSearch(q, box) {
  if (usdaTimer) clearTimeout(usdaTimer);
  usdaTimer = setTimeout(function () {
    fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + encodeURIComponent(state.usdaKey) +
      "&query=" + encodeURIComponent(q) + "&pageSize=8&dataType=Survey%20%28FNDDS%29")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        (d.foods || []).forEach(function (uf) {
          var nut = {};
          (uf.foodNutrients || []).forEach(function (n) {
            var nm = (n.nutrientName || "").toLowerCase();
            if (nm.indexOf("energy") === 0) nut.cal = n.value;
            else if (nm.indexOf("protein") === 0) nut.p = n.value;
            else if (nm.indexOf("carbohydrate") === 0) nut.c = n.value;
            else if (nm.indexOf("total lipid") === 0) nut.f = n.value;
          });
          if (nut.cal == null) return;
          var b = document.createElement("button");
          b.className = "result";
          b.innerHTML = esc(uf.description) + "<small>USDA · " + Math.round(nut.cal) +
            " cal / 100g · P" + Math.round(nut.p || 0) + " C" + Math.round(nut.c || 0) + " F" + Math.round(nut.f || 0) + "</small>";
          b.onclick = function () {
            $("cName").value = uf.description;
            $("cCal").value = Math.round(nut.cal);
            $("cP").value = Math.round(nut.p || 0);
            $("cC").value = Math.round(nut.c || 0);
            $("cF").value = Math.round(nut.f || 0);
            state.modalFood = null;
            renderFoodResults($("foodSearch").value);
          };
          box.appendChild(b);
        });
      })
      .catch(function () {
        var e = document.createElement("div");
        e.className = "empty-meal"; e.textContent = t("usdaErr");
        box.appendChild(e);
      });
  }, 500);
}

function addModalFood() {
  var name, cal, p, c, f, serving = "";
  if (state.modalFood) {
    var mf = state.modalFood;
    name = foodName(mf); serving = foodServing(mf);
    cal = mf.cal; p = mf.p; c = mf.c; f = mf.f;
  } else {
    name = $("cName").value.trim();
    cal = parseFloat($("cCal").value) || 0;
    p = parseFloat($("cP").value) || 0;
    c = parseFloat($("cC").value) || 0;
    f = parseFloat($("cF").value) || 0;
    if (!name || !cal) return;
  }
  var ds = state.date, log = getLog(ds);
  log.meals[state.modalMeal].push({
    name: name, serving: serving, cal: cal, p: p, c: c, f: f,
    qty: state.modalQty, photo: state.modalPhoto
  });
  saveLog(ds, log);
  closeFoodModal();
  renderToday(); renderChrome();
}

/* ---------- weight ---------- */
function renderWeight() {
  $("weightTitle").textContent = t("weightTitle");
  $("curWLabel").textContent = t("curW");
  $("goalWLabel").textContent = t("goalW");
  $("toGoLabel").textContent = t("toGo");
  $("weightInput").placeholder = t("weightPh");
  $("logWeightBtn").textContent = t("logWeight");
  var ws = state.weights.slice().sort(function (a, b) { return a.d < b.d ? -1 : 1; });
  var cur = ws.length ? ws[ws.length - 1].w : null;
  $("curW").textContent = cur != null ? cur : "--";
  $("goalW").textContent = state.goals.w;
  $("toGo").textContent = cur != null ? Math.max(0, Math.round((cur - state.goals.w) * 10) / 10) : "--";
  var box = $("weightChart");
  box.innerHTML = "";
  var last = ws.slice(-30);
  if (last.length > 1) {
    var W = 400, H = 140, P = 14;
    var vals = last.map(function (x) { return x.w; });
    var min = Math.min.apply(null, vals.concat([state.goals.w])) - 1;
    var max = Math.max.apply(null, vals) + 1;
    function X(i) { return P + i * (W - 2 * P) / (last.length - 1); }
    function Y(v) { return H - P - (v - min) / (max - min) * (H - 2 * P); }
    var pts = last.map(function (x, i) { return X(i).toFixed(1) + "," + Y(x.w).toFixed(1); }).join(" ");
    var gy = Y(state.goals.w).toFixed(1);
    box.innerHTML = "<svg viewBox=\"0 0 " + W + " " + H + "\">" +
      "<line x1='" + P + "' y1='" + gy + "' x2='" + (W - P) + "' y2='" + gy + "' stroke='#4C8C4A' stroke-dasharray='5,4' stroke-width='1.5'/>" +
      "<polyline points='" + pts + "' fill='none' stroke='#5E1F2E' stroke-width='2.5'/>" +
      last.map(function (x, i) { return "<circle cx='" + X(i).toFixed(1) + "' cy='" + Y(x.w).toFixed(1) + "' r='3.5' fill='#5E1F2E'/>"; }).join("") +
      "</svg>";
  } else {
    box.innerHTML = "<div class='empty-meal'>" + esc(t("noStreak")) + "</div>";
  }
}

/* ---------- groceries ---------- */
var STAPLES = [
  ["Chicken breast", "Pechuga de pollo"], ["Eggs", "Huevos"], ["Greek yogurt", "Yogur griego"],
  ["Oats", "Avena"], ["Brown rice", "Arroz integral"], ["Black beans", "Frijoles negros"],
  ["Spinach", "Espinaca"], ["Broccoli", "Brócoli"], ["Bananas", "Bananas"],
  ["Apples", "Manzanas"], ["Avocados", "Aguacates"], ["Almonds", "Almendras"],
  ["Olive oil", "Aceite de oliva"], ["Sweet potatoes", "Batatas"]
];

function renderGroceries() {
  $("grocTitle").textContent = t("grocTitle");
  $("grocInput").placeholder = t("grocPh");
  $("addGrocBtn").textContent = t("addBtn2");
  $("staplesBtn").textContent = t("staples");
  $("clearGrocBtn").textContent = t("clearChecked");
  var box = $("grocList");
  box.innerHTML = "";
  state.groceries.forEach(function (g, i) {
    var row = document.createElement("div");
    row.className = "grocitem" + (g.done ? " done" : "");
    var cb = document.createElement("input");
    cb.type = "checkbox"; cb.checked = !!g.done;
    cb.onchange = function () { state.groceries[i].done = cb.checked; saveGroceries(); renderGroceries(); };
    var sp = document.createElement("span");
    sp.textContent = g.name;
    var del = document.createElement("button");
    del.className = "delbtn"; del.textContent = "×";
    del.onclick = function () { state.groceries.splice(i, 1); saveGroceries(); renderGroceries(); };
    row.appendChild(cb); row.appendChild(sp); row.appendChild(del);
    box.appendChild(row);
  });
}

/* ---------- recommended targets ---------- */
function renderRecSelects() {
  var acts = [["1.2", t("actSed")], ["1.375", t("actLight")], ["1.55", t("actMod")], ["1.725", t("actVery")]];
  var goals = [["lose1", t("goalLose1")], ["lose05", t("goalLose05")], ["maintain", t("goalMaintain")], ["gain", t("goalGain")]];
  var a = $("recAct"); a.innerHTML = "";
  acts.forEach(function (o, i) {
    var op = document.createElement("option");
    op.value = o[0]; op.textContent = o[1];
    if (i === 2) op.selected = true;
    a.appendChild(op);
  });
  var g = $("recGoal"); g.innerHTML = "";
  goals.forEach(function (o, i) {
    var op = document.createElement("option");
    op.value = o[0]; op.textContent = o[1];
    if (i === 0) op.selected = true;
    g.appendChild(op);
  });
}

function calcRec() {
  var age = parseInt($("recAge").value, 10);
  var ft = parseInt($("recFt").value, 10);
  var inch = parseInt($("recIn").value, 10) || 0;
  var lb = parseFloat($("recWt").value);
  var out = $("recOut");
  if (!age || !ft || !lb) {
    out.classList.remove("hidden");
    out.innerHTML = esc(t("needFields"));
    return;
  }
  var kg = lb / 2.20462, cm = (ft * 12 + inch) * 2.54;
  var bmr = 10 * kg + 6.25 * cm - 5 * age - 161; // Mifflin-St Jeor, women
  var tdee = bmr * parseFloat($("recAct").value);
  var adj = { lose1: -500, lose05: -250, maintain: 0, gain: 250 }[$("recGoal").value] || 0;
  var cal = Math.round((tdee + adj) / 10) * 10;
  var floored = false;
  if (cal < 1200) { cal = 1200; floored = true; }
  var p = Math.round(0.9 * lb);
  var f = Math.round(cal * 0.25 / 9);
  var c = Math.max(0, Math.round((cal - p * 4 - f * 9) / 4));
  out.classList.remove("hidden");
  out.innerHTML = "<b>" + esc(t("recOut")) + ":</b><br>" +
    cal + " " + esc(t("calWord")) + " · " + p + "g " + esc(t("protein")) +
    " · " + c + "g " + esc(t("carbs")) + " · " + f + "g " + esc(t("fat")) +
    (floored ? "<br><small>" + esc(t("recFloor")) + "</small>" : "") +
    "<br><button class='btn-primary wide' id='useRecBtn'>" + esc(t("useGoals")) + "</button>";
  $("useRecBtn").onclick = function () {
    state.goals.cal = cal; state.goals.p = p; state.goals.c = c; state.goals.f = f;
    saveGoals(); renderSettings(); renderChrome();
    if (state.view === "today") renderToday();
  };
}

/* ---------- disclaimer ---------- */
function renderDisc() {
  $("discTitle").textContent = t("discTitle");
  $("discText").textContent = t("discText");
  $("discOk").textContent = t("discOk");
  var ds = $("discSet");
  if (ds) ds.textContent = t("discText");
}
function renderSettings() {
  $("setTitle").textContent = t("setTitle");
  $("goalsH").textContent = t("goalsH");
  $("gCalL").textContent = t("gCal"); $("gPL").textContent = t("gP");
  $("gCL").textContent = t("gC"); $("gFL").textContent = t("gF"); $("gWL").textContent = t("gW");
  $("saveSetBtn").textContent = t("save");
  $("usdaH").textContent = t("usdaH");
  $("usdaHint").textContent = t("usdaHint");
  $("saveUsdaBtn").textContent = t("saveKey");
  $("dataH").textContent = t("dataH");
  $("exportBtn").textContent = t("export");
  $("recH").textContent = t("recH");
  $("recHint").textContent = t("recHint");
  $("rAgeL").textContent = t("rAge"); $("rHtL").textContent = t("rHt");
  $("rWtL").textContent = t("rWt"); $("rActL").textContent = t("rAct");
  $("rGoalL").textContent = t("rGoal");
  $("calcBtn").textContent = t("calcBtn");
  renderRecSelects();
  if (!$("recWt").value) $("recWt").value = 135;
  renderDisc();
  $("setCal").value = state.goals.cal; $("setP").value = state.goals.p;
  $("setC").value = state.goals.c; $("setF").value = state.goals.f; $("setW").value = state.goals.w;
  $("usdaKey").value = state.usdaKey;
}

/* ---------- views ---------- */
function showView(v) {
  state.view = v;
  document.querySelectorAll(".bottomnav button").forEach(function (b) {
    b.classList.toggle("on", b.dataset.view === v);
  });
  ["today", "weight", "groceries", "settings"].forEach(function (x) {
    $("view-" + x).classList.toggle("hidden", x !== v);
  });
  if (v === "today") renderToday();
  if (v === "weight") renderWeight();
  if (v === "groceries") renderGroceries();
  if (v === "settings") renderSettings();
}

/* ---------- events ---------- */
document.querySelectorAll(".langtoggle button").forEach(function (b) {
  b.onclick = function () {
    state.lang = b.dataset.lang;
    localStorage.setItem("fuel_lang", state.lang);
    renderChrome(); renderDisc(); showView(state.view);
  };
});
document.querySelectorAll(".bottomnav button").forEach(function (b) {
  b.onclick = function () { showView(b.dataset.view); window.scrollTo(0, 0); };
});
$("prevDay").onclick = function () { state.dateOff--; state.date = todayStr(state.dateOff); renderToday(); };
$("nextDay").onclick = function () { if (state.dateOff < 0) { state.dateOff++; state.date = todayStr(state.dateOff); renderToday(); } };
$("foodSearch").addEventListener("input", function (e) { renderFoodResults(e.target.value); });
$("qMinus").onclick = function () { state.modalQty = Math.max(0.5, Math.round((state.modalQty - 0.5) * 10) / 10); $("qVal").textContent = state.modalQty; };
$("qPlus").onclick = function () { state.modalQty = Math.round((state.modalQty + 0.5) * 10) / 10; $("qVal").textContent = state.modalQty; };
$("foodPhoto").addEventListener("change", function (e) {
  var f = e.target.files[0];
  if (!f) { state.modalPhoto = null; return; }
  var r = new FileReader();
  r.onload = function () { state.modalPhoto = r.result; };
  r.readAsDataURL(f);
});
$("fmAdd").onclick = addModalFood;
$("fmClose").onclick = closeFoodModal;
$("foodModal").addEventListener("click", function (e) { if (e.target === $("foodModal")) closeFoodModal(); });
$("logWeightBtn").onclick = function () {
  var w = parseFloat($("weightInput").value);
  if (!w || w < 80 || w > 400) return;
  var ds = todayStr(0);
  state.weights = state.weights.filter(function (x) { return x.d !== ds; });
  state.weights.push({ d: ds, w: Math.round(w * 10) / 10 });
  saveWeights();
  $("weightInput").value = "";
  renderWeight();
};
$("addGrocBtn").onclick = function () {
  var v = $("grocInput").value.trim();
  if (!v) return;
  state.groceries.push({ name: v, done: false });
  saveGroceries(); $("grocInput").value = "";
  renderGroceries();
};
$("grocInput").addEventListener("keydown", function (e) { if (e.key === "Enter") $("addGrocBtn").click(); });
$("staplesBtn").onclick = function () {
  var have = state.groceries.map(function (g) { return g.name.toLowerCase(); });
  STAPLES.forEach(function (s) {
    var name = state.lang === "es" ? s[1] : s[0];
    if (have.indexOf(name.toLowerCase()) < 0) state.groceries.push({ name: name, done: false });
  });
  saveGroceries(); renderGroceries();
};
$("clearGrocBtn").onclick = function () {
  state.groceries = state.groceries.filter(function (g) { return !g.done; });
  saveGroceries(); renderGroceries();
};
$("saveSetBtn").onclick = function () {
  state.goals.cal = parseInt($("setCal").value) || DEFAULT_GOALS.cal;
  state.goals.p = parseInt($("setP").value) || DEFAULT_GOALS.p;
  state.goals.c = parseInt($("setC").value) || DEFAULT_GOALS.c;
  state.goals.f = parseInt($("setF").value) || DEFAULT_GOALS.f;
  state.goals.w = parseInt($("setW").value) || DEFAULT_GOALS.w;
  saveGoals();
  $("saveSetBtn").textContent = t("saved");
  setTimeout(function () { $("saveSetBtn").textContent = t("save"); }, 1200);
  renderChrome();
};
$("saveUsdaBtn").onclick = function () {
  state.usdaKey = $("usdaKey").value.trim();
  localStorage.setItem("fuel_usda", state.usdaKey);
  $("saveUsdaBtn").textContent = t("saved");
  setTimeout(function () { $("saveUsdaBtn").textContent = t("saveKey"); }, 1200);
};
$("calcBtn").onclick = calcRec;
$("discOk").onclick = function () {
  localStorage.setItem("fuel_disc", "1");
  $("discModal").classList.add("hidden");
};
$("exportBtn").onclick = function () {
  var data = { goals: state.goals, weights: state.weights, groceries: state.groceries, logs: {} };
  for (var i = 0; i < 60; i++) {
    var ds = todayStr(-i), raw = localStorage.getItem(logKey(ds));
    if (raw) data.logs[ds] = JSON.parse(raw);
  }
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fuel-data.json";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
};

/* ---------- boot ---------- */
loadAll();
renderChrome();
renderDisc();
showView("today");
if (!localStorage.getItem("fuel_disc")) {
  $("discModal").classList.remove("hidden");
}
