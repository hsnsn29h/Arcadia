// Class representing the robot character
class Robot {
  // Constructor to initialize the robot's position, speed, and reset position
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  // Getter method to return the type of the robot
  get type() {
    return "robot";
  }

  // Static method to create a new robot at a specified position based on the character
  static create(pos, ch) {
    if (ch == "=") {
      return new Robot(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Robot(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Robot(pos, new Vec(0, 3), pos);
    }
  }
}

// Set the size of the robot character using a prototype property
Robot.prototype.size = new Vec(1, 1);

// Method to handle collisions with the robot
Robot.prototype.collide = function (state) {
  // Play death sound
  var audio = new Audio('assets/death.wav');
  audio.preload = 'auto';
  audio.play();

  // Increase robot death counter
  Game.deathsR += 1;

  // Return a new state with updated information after collision
  return new State(state.level, state.actors, "lost");
};

// Method to update the robot's position and behavior over time
Robot.prototype.update = function (time, state) {
  // Calculate the new position based on the current speed and time
  let newPos = this.pos.plus(this.speed.times(time));

  // Check for collisions with walls in the new position
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Robot(newPos, this.speed, this.reset);
  } else if (this.reset) {
    // If there is a reset position, move the robot to the reset position
    return new Robot(this.reset, this.speed, this.reset);
  } else {
    // If there is no reset position, reverse the robot's speed (bounce off the wall)
    return new Robot(this.pos, this.speed.times(-1));
  }
};
