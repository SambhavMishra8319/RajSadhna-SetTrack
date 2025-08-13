// Select DOM elements
const form = document.getElementById('workout-form');
const tableBody = document.querySelector('#workout-table tbody');
const ctx = document.getElementById('progressChart').getContext('2d');

let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// Render table
function renderTable() {
    tableBody.innerHTML = '';
    workouts.forEach((w, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${w.date}</td>
            <td>${w.exercise}</td>
            <td>${w.sets}</td>
            <td>${w.reps}</td>
            <td>${w.weight}</td>
            <td><button class="action-btn" onclick="deleteWorkout(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete workout
function deleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    renderTable();
    renderChart();
}

// Add workout
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const workout = {
        date: document.getElementById('date').value,
        exercise: document.getElementById('exercise').value,
        sets: parseInt(document.getElementById('sets').value),
        reps: parseInt(document.getElementById('reps').value),
        weight: parseInt(document.getElementById('weight').value) || 0
    };
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    renderTable();
    renderChart();
    form.reset();
});

// Chart.js setup
let chart;

function renderChart() {
    const dates = workouts.map(w => w.date);
    const weights = workouts.map(w => w.weight);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Weight Progress (kg)',
                data: weights,
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Initial render
renderTable();
renderChart();
