class Fireball {
    constructor(pos, speed, reset) {
      this.pos = pos;
      this.speed = speed;
      this.reset = reset;
    }
  
    get type() { return "fireball"; }
  
    static create(pos, ch) {
      if (ch == "=") {
        return new Fireball(pos, new Vec(2, 0));
      } else if (ch == "|") {
        return new Fireball(pos, new Vec(0, 2));
      } else if (ch == "v") {
        return new Fireball(pos, new Vec(0, 3), pos);
      }
    }
  }
  
  Fireball.prototype.size = new Vec(1, 1);

  Fireball.prototype.collide = function(state) {
    var audio = new Audio('/assets/death.wav');
    audio.preload = 'auto';
    audio.play();

    return new State(state.level, state.actors, "lost");
    
  };

  Fireball.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Fireball(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Fireball(this.reset, this.speed, this.reset);
    } else {
      return new Fireball(this.pos, this.speed.times(-1));
    }
  };

