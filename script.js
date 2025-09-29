const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let score = 0;
let playerX = 100;
let playerY = 200;
let speed = 15;

// Điều khiển bằng phím mũi tên
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && playerY > 0) playerY -= speed;
  if (e.key === "ArrowDown" && playerY < gameArea.offsetHeight - player.offsetHeight) playerY += speed;
  if (e.key === "ArrowLeft" && playerX > 0) playerX -= speed;
  if (e.key === "ArrowRight" && playerX < gameArea.offsetWidth - player.offsetWidth) playerX += speed;
  player.style.top = playerY + "px";
  player.style.left = playerX + "px";
});

// Tạo cá nhỏ hoặc chướng ngại vật
function createEnemy() {
  const enemy = document.createElement("img");
  let isObstacle = Math.random() < 0.3; // 30% ra cá lớn hoặc rác thải
  if (isObstacle) {
    enemy.src = Math.random() < 0.5 ? "images/ca-lon.png" : "tuirac.png";
    enemy.classList.add("obstacle");
  } else {
    enemy.src = "images/cahepnj.png";
    enemy.classList.add("enemy");
  }

  enemy.style.top = Math.floor(Math.random() * (gameArea.offsetHeight - 60)) + "px";
  enemy.style.left = gameArea.offsetWidth + "px";
  gameArea.appendChild(enemy);

  moveEnemy(enemy, isObstacle);
}

// Di chuyển cá
function moveEnemy(enemy, isObstacle) {
  let moveInterval = setInterval(() => {
    let enemyX = parseInt(enemy.style.left);
    if (enemyX < -60) {
      enemy.remove();
      clearInterval(moveInterval);
    } else {
      enemy.style.left = (enemyX - 5) + "px";

      // Va chạm
      if (isCollide(player, enemy)) {
        if (isObstacle) {
          alert("Bạn đã thua 😢. Điểm: " + score);
          location.reload();
        } else {
          score++;
          scoreDisplay.textContent = "Điểm: " + score;
          enemy.remove();
          clearInterval(moveInterval);
        }
      }
    }
  }, 40);
}

// Hàm kiểm tra va chạm
function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

// Sinh cá mỗi 2 giây
setInterval(createEnemy, 2000);
