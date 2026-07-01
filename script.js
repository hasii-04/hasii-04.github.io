const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (storedTheme) {
  root.dataset.theme = storedTheme;
} else if (prefersLight) {
  root.dataset.theme = "light";
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
});

document.getElementById("year").textContent = new Date().getFullYear();

const canvas = document.getElementById("signalCanvas");
const ctx = canvas?.getContext("2d");

function drawSignal() {
  if (!canvas || !ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const isLight = root.dataset.theme === "light";

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.74)" : "rgba(16, 25, 24, 0.74)";
  ctx.strokeStyle = isLight ? "rgba(11, 157, 115, 0.25)" : "rgba(64, 215, 161, 0.25)";
  ctx.lineWidth = 1;

  const grid = 40;
  for (let x = 20; x < width; x += grid) {
    for (let y = 20; y < height; y += grid) {
      ctx.beginPath();
      ctx.arc(x, y, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const nodes = [
    [70, 88], [190, 54], [320, 102], [465, 72],
    [118, 210], [252, 178], [394, 226], [510, 180],
    [82, 335], [228, 306], [360, 344], [498, 310]
  ];

  ctx.lineWidth = 2;
  ctx.strokeStyle = isLight ? "rgba(11, 157, 115, 0.44)" : "rgba(64, 215, 161, 0.5)";

  const links = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6],
    [6, 7], [4, 8], [8, 9], [9, 10], [10, 11], [5, 9], [2, 6]
  ];

  links.forEach(([start, end]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[start][0], nodes[start][1]);
    ctx.lineTo(nodes[end][0], nodes[end][1]);
    ctx.stroke();
  });

  nodes.forEach(([x, y], index) => {
    const radius = index % 3 === 0 ? 8 : 6;
    ctx.beginPath();
    ctx.fillStyle = index % 4 === 0 ? "#f6c96f" : isLight ? "#0b9d73" : "#40d7a1";
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = isLight ? "rgba(11, 157, 115, 0.16)" : "rgba(64, 215, 161, 0.18)";
    ctx.lineWidth = 10;
    ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
    ctx.stroke();
  });
}

drawSignal();
themeToggle?.addEventListener("click", drawSignal);
