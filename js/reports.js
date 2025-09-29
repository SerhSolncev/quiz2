document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('loading');

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500)

  const ctx = document.getElementById('myRadarChart');
  const rawValues = ctx.dataset.values.split(',').map(Number);
  const maxValue = Number(ctx.dataset.max) || 30;
  const labels = ctx.dataset.labels.split(',');

  // нормализуем значения к шкале (например, 25/30 = 0.83)
  const values = rawValues.map(v => v);

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: "Оценка",
        data: values,
        fill: true,
        backgroundColor: "rgba(100, 150, 250, 0.3)",
        borderColor: "rgba(100, 150, 250, 0.8)",
        pointBackgroundColor: "rgba(255, 100, 50, 0.9)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 100, 50, 1)",
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: {
            color: "rgba(0,0,0,0.4)",
            lineWidth: 1
          },
          grid: {
            color: "rgba(0,0,0,0.3)",
            lineWidth: 1,
            circular: false
          },
          min: 0,
          max: maxValue,   // <-- здесь используем максимум из data-атрибута
          ticks: {
            stepSize: Math.round(maxValue / 5), // красиво делим сетку
            display: false
          },
          pointLabels: {
            display: false
            // font: {
            //   size: 14
            // },
            // color: "#333"
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
