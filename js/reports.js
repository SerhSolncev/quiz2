document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('loading');

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500)

  const canvas = document.getElementById('myRadarChart');
  const rawValues = canvas.dataset.values.split(',').map(Number);
  const maxValue = Number(canvas.dataset.max) || 30;
  const labels = canvas.dataset.labels.split(',');

  const ctx = canvas.getContext("2d");

  // градиент для области
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(0, 123, 255, 0.5)");
  gradient.addColorStop(1, "rgba(255, 100, 50, 0.3)");

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: "Оценка",
        data: rawValues,
        fill: true,
        backgroundColor: gradient,
        borderColor: "transparent",
        borderWidth: 1,
        pointBackgroundColor: [
          "#ffd324", "#30d065", "#f17072", "#969EFF", "#f49c5d", "#56ADF5"
        ],
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 0,
          max: maxValue,
          ticks: {
            display: false
          },
          grid: {
            color: "rgba(40,40,40,0.7)",
            borderDash: [5, 5],
            lineWidth: 0.5
          },
          angleLines: {
            color: "transparent",
            lineWidth: 1.5
          },
          pointLabels: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
})
