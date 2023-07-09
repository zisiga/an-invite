document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas.getContext('2d');

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#25598e');
    gradient.addColorStop(0.5, '#5e99cd');
    gradient.addColorStop(1, '#c5e2f6');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground();
  }

  // Initial setup
  resizeCanvas();

  // Handle window resize
  window.addEventListener('resize', resizeCanvas);

  const text = '*';
  let currentIndex = 0;
  let letterSpacing = 1000;

  function createLetter(x, y) {
    const letter = document.createElement('span');
    letter.textContent = text[currentIndex];
    letter.style.position = 'absolute';
    letter.style.left = x - 10 + letterSpacing * currentIndex + 'px';
    letter.style.top = y - 10 + 'px';
    letter.style.color = getRandomColor();
    letter.style.fontSize = '50px';
    document.body.appendChild(letter);
    currentIndex = (currentIndex + 1) % text.length;
    setTimeout(function() {
      letter.style.transition = 'opacity 1s ease-in-out';
      letter.style.opacity = '0';
      setTimeout(function() {
        letter.remove();
      }, 2000);
    }, 100);
  }

  function handleMove(event) {
    let x, y;
    if (event.touches) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    createLetter(x, y);
  }

  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: true });

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
