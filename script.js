class Snake {
    constructor() {
      this.body = [];
      this.body[0] = new Block(10, 10);
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.total = 0;
    }
  
    draw() {
      this.body.forEach(block => block.draw());
    }
  
    update() {
      const head = this.body[this.body.length - 1];
      const newHead = new Block(head.x + this.xSpeed, head.y + this.ySpeed);
      this.body.push(newHead);
  
      if (this.body.length > this.total) {
        this.body.shift();
      }
    }
  
    eat(fruit) {
      const head = this.body[this.body.length - 1];
      if (head.x === fruit.x && head.y === fruit.y) {
        this.total++;
        return true;
      }
      return false;
    }
  
    checkCollision() {
      const head = this.body[this.body.length - 1];
      for (let i = 0; i < this.body.length - 1; i++) {
        if (head.x === this.body[i].x && head.y === this.body[i].y) {
          alert("Game Over!");
          location.reload();
        }
      }
      if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
        alert("Game Over!");
        location.reload();
      }
    }
  
    changeDirection(direction) {
      switch(direction) {
        case 'Up':
          if (this.ySpeed !== 1) {
            this.xSpeed = 0;
            this.ySpeed = -1;
          }
          break;
        case 'Down':
          if (this.ySpeed !== -1) {
            this.xSpeed = 0;
            this.ySpeed = 1;
          }
          break;
        case 'Left':
          if (this.xSpeed !== 1) {
            this.xSpeed = -1;
            this.ySpeed = 0;
          }
          break;
        case 'Right':
          if (this.xSpeed !== -1) {
            this.xSpeed = 1;
            this.ySpeed = 0;
          }
          break;
      }
    }
  }
  
  class Block {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    draw() {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
    }
  }
  
  class Fruit {
    constructor() {
      this.x;
      this.y;
    }
  
    pickLocation() {
      this.x = Math.floor(Math.random() * columns);
      this.y = Math.floor(Math.random() * rows);
    }
  
    draw() {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
    }
  }
  
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");
  
  const scale = 20;
  const rows = canvas.height / scale;
  const columns = canvas.width / scale;
  const speed = 100;
  
  let snake;
  let fruit;
  
  (function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
  
    window.setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fruit.draw();
      snake.update();
      snake.draw();
  
      if (snake.eat(fruit)) {
        fruit.pickLocation();
      }
  
      snake.checkCollision();
      document.getElementById("scoreValue").innerText = snake.total;
  
    }, speed);
  }());

  function onKeyDown(event) {
    const key = event.key;
    switch(key) {
        case 'w':
            snake.changeDirection('Up');
            break;
        case 'a':
            snake.changeDirection('Left');
            break;
        case 's':
            snake.changeDirection('Down');
            break;
        case 'd':
            snake.changeDirection('Right');
            break;
    }
  }

  document.addEventListener('keydown', onKeyDown);
  