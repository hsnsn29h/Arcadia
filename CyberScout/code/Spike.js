// Class representing the spike object
class Spike {
  // Constructor to initialize the spike's position, speed, and reset position
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  // Getter method to return the type of the spike
  get type() {
    return "spike";
  }

  // Static method to create a new spike at a specified position based on the character
  static create(pos, ch) {
    if (ch == "=") {
      return new Spike(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Spike(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Spike(pos, new Vec(0, 3), pos);
    }
  }
}

// Set the size of the spike object using a prototype property
Spike.prototype.size = new Vec(1, 1);

// Method to handle collisions with the spike object
Spike.prototype.collide = function (state) {
  // Play death sound
  var audio = new Audio('assets/death.wav');
  audio.preload = 'auto';
  audio.play();

  // Increase spike death counter
  Game.deathsS += 1;

  // Return a new state with updated information after collision
  return new State(state.level, state.actors, "lost");
};

// Method to update the spike's position and behavior over time
Spike.prototype.update = function (time, state) {
  // Calculate the new position based on the current speed and time
  let newPos = this.pos.plus(this.speed.times(time));

  // Check for collisions with walls in the new position
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Spike(newPos, this.speed, this.reset);
  } else if (this.reset) {
    // If there is a reset position, move the spike to the reset position
    return new Spike(this.reset, this.speed, this.reset);
  } else {
    // If there is no reset position, reverse the spike's speed (bounce off the wall)
    return new Spike(this.pos, this.speed.times(-1));
  }
};
