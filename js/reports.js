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
        borderWidth: 2,
        pointBackgroundColor: [
          "#ff0000", "#ff9900", "#33cc33", "#3399ff", "#9933ff"
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
            color: "rgba(0,0,0,0.3)",
            borderDash: [2, 4],
            lineWidth: 1
          },
          angleLines: {
            color: "rgba(0,0,0,0.4)",
            borderDash: [2, 4],
            lineWidth: 1
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
