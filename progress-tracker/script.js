// // Select DOM elements
// const form = document.getElementById('workout-form');
// const tableBody = document.querySelector('#workout-table tbody');
// const ctx = document.getElementById('progressChart').getContext('2d');

// let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// // Render table
// function renderTable() {
//     tableBody.innerHTML = '';
//     workouts.forEach((w, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${w.date}</td>
//             <td>${w.exercise}</td>
//             <td>${w.sets}</td>
//             <td>${w.reps}</td>
//             <td>${w.weight}</td>
//             <td><button class="action-btn" onclick="deleteWorkout(${index})">Delete</button></td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// // Delete workout
// function deleteWorkout(index) {
//     workouts.splice(index, 1);
//     localStorage.setItem('workouts', JSON.stringify(workouts));
//     renderTable();
//     renderChart();
// }

// // Add workout
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const workout = {
//         date: document.getElementById('date').value,
//         exercise: document.getElementById('exercise').value,
//         sets: parseInt(document.getElementById('sets').value),
//         reps: parseInt(document.getElementById('reps').value),
//         weight: parseInt(document.getElementById('weight').value) || 0
//     };
//     workouts.push(workout);
//     localStorage.setItem('workouts', JSON.stringify(workouts));
//     renderTable();
//     renderChart();
//     form.reset();
// });

// // Chart.js setup
// let chart;

// function renderChart() {
//     const dates = workouts.map(w => w.date);
//     const weights = workouts.map(w => w.weight);

//     if (chart) chart.destroy();

//     chart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: dates,
//             datasets: [{
//                 label: 'Weight Progress (kg)',
//                 data: weights,
//                 borderColor: '#27ae60',
//                 backgroundColor: 'rgba(39, 174, 96, 0.2)',
//                 tension: 0.3,
//                 fill: true
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// }

// // Initial render
// renderTable();
// renderChart();

// ====== Config ======
const MUSCLE_GROUPS = [
  { name: "Chest", exercises: ["Bench Press", "Incline DB Press", "Push-ups", "Chest Fly"] },
  { name: "Abs", exercises: ["Crunches", "Plank (sec)", "Leg Raises", "Cable Crunch"] },
  { name: "Triceps", exercises: ["Skull Crusher", "Triceps Pushdown", "Overhead Extension", "Dips"] },
  { name: "Back", exercises: ["Deadlift", "Lat Pulldown", "Barbell Row", "Seated Cable Row"] },
  { name: "Biceps", exercises: ["Barbell Curl", "Dumbbell Curl", "Hammer Curl", "Preacher Curl"] },
  { name: "Legs", exercises: ["Squat", "Leg Press", "Lunges", "Romanian Deadlift"] },
  { name: "Shoulders", exercises: ["Overhead Press", "Lateral Raise", "Front Raise", "Rear Delt Fly"] },
];

const SIDEBAR = document.getElementById("muscle-list");
const PAGE_TITLE = document.getElementById("page-title");
const EXERCISE_SELECT = document.getElementById("exercise-select");
const CLEAR_ALL_BTN = document.getElementById("clear-all");

// // Form
// // Form
// const FORM = document.getElementById("workout-form");
// const DATE_IN = document.getElementById("date");
// const EX_IN = document.getElementById("exercise");
// const SETS_IN = document.getElementById("sets");
// const SETS_CONTAINER = document.getElementById("sets-container"); // <-- added

// // Dynamically generate per-set inputs when sets change
// SETS_IN.addEventListener("input", () => {
//   const setsCount = parseInt(SETS_IN.value || "0");
//   SETS_CONTAINER.innerHTML = ""; // clear previous inputs

//   for (let i = 1; i <= setsCount; i++) {
//     const div = document.createElement("div");
//     div.className = "set-row";
//     div.innerHTML = `
//       <label>Set ${i} - Reps: <input type="number" class="reps-set" min="1" required></label>
//       <label>Weight: <input type="number" class="weight-set" min="0" required></label>
//     `;
//     SETS_CONTAINER.appendChild(div);
//   }
// });

// const REPS_IN = document.getElementById("reps");
// const WEIGHT_IN = document.getElementById("weight");
// const SUBMIT_BTN = document.getElementById("submit-btn");
// ADD_EX_BTN.addEventListener("click", () => {
//   const div = document.createElement("div");
//   div.className = "exercise-block";
//   div.innerHTML = `
//     <input type="text" class="exercise-name" placeholder="Exercise Name" required />
//     <input type="number" class="exercise-sets" placeholder="Sets" min="1" required />
//     <div class="sets-container"></div>
//     <button type="button" class="remove-exercise">Remove Exercise</button>
//   `;
//   EXERCISES_CONTAINER.appendChild(div);

//   // Attach per-set dynamic input generation for this exercise
//   const setsInput = div.querySelector(".exercise-sets");
//   const setsContainer = div.querySelector(".sets-container");
//   setsInput.addEventListener("input", () => {
//     const setsCount = parseInt(setsInput.value || "0");
//     setsContainer.innerHTML = "";
//     for (let i = 1; i <= setsCount; i++) {
//       setsContainer.innerHTML += `
//         <label>Set ${i} - Reps: <input type="number" class="reps-set" min="1" required></label>
//         <label>Weight: <input type="number" class="weight-set" min="0" required></label>
//       `;
//     }
//   });

//   // Remove exercise button
//   div.querySelector(".remove-exercise").addEventListener("click", () => {
//     div.remove();
//   });
// });
// Form
const FORM = document.getElementById("workout-form");
const DATE_IN = document.getElementById("date");

// Container for multiple exercises
const EXERCISES_CONTAINER = document.getElementById("exercises-container");
const ADD_EX_BTN = document.getElementById("add-exercise-btn");

// Add new exercise block
ADD_EX_BTN.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "exercise-block";
  div.innerHTML = `
    <input type="text" class="exercise-name" placeholder="Exercise Name" required />
    <input type="number" class="exercise-sets" placeholder="Sets" min="1" required />
    <div class="sets-container"></div>
    <button type="button" class="remove-exercise">Remove Exercise</button>
    <hr>
  `;
  EXERCISES_CONTAINER.appendChild(div);

  // Attach per-set dynamic input generation for this exercise
  const setsInput = div.querySelector(".exercise-sets");
  const setsContainer = div.querySelector(".sets-container");
  setsInput.addEventListener("input", () => {
    const setsCount = parseInt(setsInput.value || "0");
    setsContainer.innerHTML = "";
    for (let i = 1; i <= setsCount; i++) {
      setsContainer.innerHTML += `
        <label>Set ${i} - Reps: <input type="number" class="reps-set" min="1" required></label>
        <label>Weight: <input type="number" class="weight-set" min="0" required></label>
      `;
    }
  });

  // Remove exercise button
  div.querySelector(".remove-exercise").addEventListener("click", () => {
    div.remove();
  });
});

// Form submit: collect all exercises and sets
FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const exercises = [];
  document.querySelectorAll(".exercise-block").forEach(block => {
    const name = block.querySelector(".exercise-name").value.trim();
    const setsData = [];
    block.querySelectorAll(".set-row, .sets-container label").forEach((row, idx) => {
      const repsInput = row.querySelector(".reps-set");
      const weightInput = row.querySelector(".weight-set");
      if (repsInput && weightInput) {
        setsData.push({
          reps: parseInt(repsInput.value),
          weight: parseFloat(weightInput.value)
        });
      }
    });
    if (name && setsData.length > 0) {
      exercises.push({ name, setsData });
    }
  });

  const workoutEntry = {
    date: DATE_IN.value,
    exercises
  };

  // Save to localStorage (or your existing workouts array)
  let workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
  workouts.push(workoutEntry);
  localStorage.setItem("workouts", JSON.stringify(workouts));

  alert("Workout saved!");
  FORM.reset();
  EXERCISES_CONTAINER.innerHTML = ""; // Clear exercises for new entry
});


// Filters
const FROM_DATE = document.getElementById("from-date");
const TO_DATE = document.getElementById("to-date");
const SEARCH_EX = document.getElementById("search-exercise");
const APPLY_FILTERS = document.getElementById("apply-filters");
const RESET_FILTERS = document.getElementById("reset-filters");

// Table
const T_BODY = document.querySelector("#workout-table tbody");
const EMPTY_STATE = document.getElementById("empty-state");

// Stats
const TOTAL_SETS = document.getElementById("total-sets");
const TOTAL_REPS = document.getElementById("total-reps");
const TOTAL_ENTRIES = document.getElementById("total-entries");
const MAX_WEIGHT = document.getElementById("max-weight");

// Chart
const CTX = document.getElementById("progressChart").getContext("2d");
let chart;

// App state
let currentMuscle = "Chest";
let workouts = [];          // full list from storage for current muscle
let filtered = [];          // filtered for table & stats
let editIndex = null;       // editing row index (within workouts)

// ====== Helpers ======
const keyFor = muscle => `workouts_${muscle}`;

function loadFromStorage(muscle) {
  return JSON.parse(localStorage.getItem(keyFor(muscle))) || [];
}

function saveToStorage(muscle, data) {
  localStorage.setItem(keyFor(muscle), JSON.stringify(data));
}

function formatDate(iso) {
  // keep as yyyy-mm-dd for sorting and display
  return iso || "";
}

function withinRange(dateStr, fromStr, toStr) {
  if (!dateStr) return false;
  if (fromStr && dateStr < fromStr) return false;
  if (toStr && dateStr > toStr) return false;
  return true;
}

function applyCurrentFilters() {
  const from = FROM_DATE.value || null;
  const to = TO_DATE.value || null;
  const q = (SEARCH_EX.value || "").trim().toLowerCase();

  filtered = workouts.filter(w => {
    const inDate = withinRange(w.date, from, to);
    const inSearch = !q || w.exercise.toLowerCase().includes(q);
    return inDate && inSearch;
  });

  renderTable();
  renderStats();
  renderChart();
}

// ====== UI: Sidebar & Header ======
function setupSidebar() {
  SIDEBAR.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      SIDEBAR.querySelectorAll("li").forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      loadMuscle(li.dataset.muscle);
    });
  });
}

function populateExerciseSelect(muscle) {
  EXERCISE_SELECT.innerHTML = `<option value="" disabled selected>Select common exercise</option>`;
  const group = MUSCLE_GROUPS.find(m => m.name === muscle);
  if (!group) return;
  group.exercises.forEach(ex => {
    const opt = document.createElement("option");
    opt.value = ex;
    opt.textContent = ex;
    EXERCISE_SELECT.appendChild(opt);
  });
}

// ====== Load Muscle ======
function loadMuscle(muscle) {
  currentMuscle = muscle;
  PAGE_TITLE.textContent = `Progress Tracker — ${muscle}`;
  populateExerciseSelect(muscle);
  workouts = loadFromStorage(muscle);
  editIndex = null;
  SUBMIT_BTN.textContent = "Add Workout";
  resetFiltersOnly();
  applyCurrentFilters();
}

// ====== Table ======
function renderTable() {
  T_BODY.innerHTML = "";
  if (!filtered.length) {
    EMPTY_STATE.style.display = "block";
    return;
  }
  EMPTY_STATE.style.display = "none";

  filtered
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((w, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${formatDate(w.date)}</td>
        <td>${w.exercise}</td>
        <td>${w.sets}</td>
        <td>${w.reps}</td>
        <td>${w.weight}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${w._id}">Edit</button>
          <button class="action-btn delete-btn" data-id="${w._id}">Delete</button>
        </td>
      `;
      T_BODY.appendChild(tr);
    });

  // bind actions
  T_BODY.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      startEdit(id);
    });
  });
  T_BODY.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      deleteWorkout(id);
    });
  });
}

// ====== Form Add / Edit / Delete ======
function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

FORM.addEventListener("submit", e => {
  e.preventDefault();

  const entry = {
    _id: editIndex !== null ? workouts[editIndex]._id : makeId(),
    date: DATE_IN.value,
    exercise: EX_IN.value.trim(),
    sets: parseInt(SETS_IN.value || "0", 10),
    reps: parseInt(REPS_IN.value || "0", 10),
    weight: parseFloat(WEIGHT_IN.value || "0")
  };

  if (!entry.date || !entry.exercise || entry.sets <= 0 || entry.reps <= 0) {
    alert("Please fill date, exercise, sets and reps correctly.");
    return;
  }

  if (editIndex !== null) {
    workouts[editIndex] = entry;
    editIndex = null;
    SUBMIT_BTN.textContent = "Add Workout";
  } else {
    workouts.push(entry);
  }

  saveToStorage(currentMuscle, workouts);
  FORM.reset();
  applyCurrentFilters();
});

function startEdit(id) {
  const idx = workouts.findIndex(w => w._id === id);
  if (idx === -1) return;
  const w = workouts[idx];
  DATE_IN.value = w.date;
  EX_IN.value = w.exercise;
  SETS_IN.value = w.sets;
  REPS_IN.value = w.reps;
  WEIGHT_IN.value = w.weight;
  editIndex = idx;
  SUBMIT_BTN.textContent = "Update Workout";
}

function deleteWorkout(id) {
  const idx = workouts.findIndex(w => w._id === id);
  if (idx === -1) return;
  workouts.splice(idx, 1);
  saveToStorage(currentMuscle, workouts);
  applyCurrentFilters();
}

CLEAR_ALL_BTN.addEventListener("click", () => {
  if (confirm(`Clear all ${currentMuscle} workouts?`)) {
    workouts = [];
    saveToStorage(currentMuscle, workouts);
    applyCurrentFilters();
  }
});

// ====== Filters ======
function resetFiltersOnly() {
  FROM_DATE.value = "";
  TO_DATE.value = "";
  SEARCH_EX.value = "";
}

APPLY_FILTERS.addEventListener("click", e => {
  e.preventDefault();
  applyCurrentFilters();
});

RESET_FILTERS.addEventListener("click", e => {
  e.preventDefault();
  resetFiltersOnly();
  applyCurrentFilters();
});

EXERCISE_SELECT.addEventListener("change", () => {
  EX_IN.value = EXERCISE_SELECT.value;
});

// ====== Stats ======
function renderStats() {
  const totalSets = filtered.reduce((s, w) => s + (w.sets || 0), 0);
  const totalReps = filtered.reduce((s, w) => s + (w.reps || 0), 0);
  const maxWeight = filtered.reduce((m, w) => Math.max(m, Number(w.weight || 0)), 0);
  TOTAL_SETS.textContent = totalSets;
  TOTAL_REPS.textContent = totalReps;
  TOTAL_ENTRIES.textContent = filtered.length;
  MAX_WEIGHT.textContent = maxWeight;
}

// ====== Chart (multiple exercises per muscle) ======
function renderChart() {
  if (chart) chart.destroy();

  // Unique sorted dates within filtered range
  const labels = [...new Set(filtered.map(w => w.date))].sort();

  // Group by exercise
  const byExercise = {};
  filtered.forEach(w => {
    if (!byExercise[w.exercise]) byExercise[w.exercise] = [];
    byExercise[w.exercise].push({ date: w.date, weight: Number(w.weight || 0) });
  });

  const colors = [
    "#27ae60","#e67e22","#3498db","#9b59b6","#e74c3c",
    "#1abc9c","#8e44ad","#2ecc71","#d35400","#34495e"
  ];

  const datasets = Object.keys(byExercise).map((ex, i) => {
    const series = labels.map(d => {
      const item = byExercise[ex].find(x => x.date === d);
      return item ? item.weight : null;
    });
    return {
      label: ex,
      data: series,
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length] + "55",
      tension: 0.3,
      spanGaps: true,
      fill: true
    };
  });

  chart = new Chart(CTX, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      interaction: { mode: "nearest", intersect: false },
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Weight (kg)" } },
        x: { title: { display: true, text: "Date" } }
      }
    }
  });
}

// ====== Init ======
function init() {
  setupSidebar();
  loadMuscle(currentMuscle);
}
init();
const setsData = [];
document.querySelectorAll(".set-row").forEach(row => {
  const reps = parseInt(row.querySelector(".reps-set").value);
  const weight = parseFloat(row.querySelector(".weight-set").value);
  setsData.push({ reps, weight });
});

const entry = {
  _id: editIndex !== null ? workouts[editIndex]._id : makeId(),
  date: document.getElementById("date").value,
  exercise: document.getElementById("exercise").value.trim(),
  setsData
};

// Then push to workouts array and save to localStorage as usual
