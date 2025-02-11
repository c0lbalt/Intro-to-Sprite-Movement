let cyclops;
let robot;
let green_girl;
let characters = [];

function preload() {
  cyclops = loadImage("cyclops.png");
  robot = loadImage("robot.png");
  green_girl = loadImage("green_girl.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  characters.push(new Character(random(80, width - 80), random(80, height - 80), cyclops));
  characters.push(new Character(random(80, width - 80), random(80, height - 80), robot));
  characters.push(new Character(random(80, width - 80), random(80, height - 80), green_girl));

  // Add animations for each character
  characters.forEach(character => {
    character.addAnimation("down", new SpriteAnimation(character.image, 6, 5, 6));
    character.addAnimation("up", new SpriteAnimation(character.image, 0, 5, 6));
    character.addAnimation("stand", new SpriteAnimation(character.image, 0, 0, 1));
    character.addAnimation("left", new SpriteAnimation(character.image, 0, 0, 9));
    character.addAnimation("right", new SpriteAnimation(character.image, 0, 0, 9));
    character.currentAnimation = "stand";
  });
}

function draw() {
  background(220);


  characters.forEach(character => {
    character.draw();
  });
}

function keyPressed() {
  characters.forEach(character => {
    character.keyPressed();
  });
}

function keyReleased() {
  characters.forEach(character => {
    character.keyReleased();
  });
}

class Character {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.image = image; 
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
          break;
        case "right":
          this.x += 2;
          break;
        case "left":
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true;
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animations[this.currentAnimation].flipped = false;
        break;
    }
  }

  keyReleased() {

    if (keyPressed === LEFT_ARROW){
      this.currentAnimation = "stand";
      this.animations[this.currentAnimation].flipped = true;
    } else if (keyPressed === RIGHT_ARROW){
      this.currentAnimation ="stand";
      this.animations[this.currentAnimation].flipped = false;
    } else {
      this.currentAnimation = "stand";
      this.animations[this.currentAnimation].flipped = false;
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = (this.flipped) ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 6 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}