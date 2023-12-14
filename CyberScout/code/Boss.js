// Class for the angry robot:
class Boss {
  // Constructor for the Boss class
  constructor(pos, speed, reset) {
    this.pos = pos;        // Current position of the boss
    this.speed = speed;    // Movement speed of the boss
    this.reset = reset;    // Reset position for the boss
  }

  // Getter method for the type property (to be used in CSS for styling)
  get type() { return "boss"; }

  // Static method to create a new boss at a given position with a default speed
  static create(pos) {
    // Create the boss with a default speed
    return new Boss(pos, new Vec(5, 2.5));
  }
}

// Set the size property for all instances of Boss
Boss.prototype.size = new Vec(1, 1);

// Method to handle collision with the boss
Boss.prototype.collide = function (state) {
  // Play a death sound when colliding with the boss
  var audio = new Audio('assets/death.wav');
  audio.preload = 'auto';
  audio.play();

  // Increase the death by boss counter in the game
  Game.deathsB += 1;

  // Return a new state with the same level and actors, but a "lost" status
  return new State(state.level, state.actors, "lost");
};

// Method to update the boss's position based on time and game state
Boss.prototype.update = function (time, state) {
  // Decide movement direction using xx and yy based on player position to track them
  let xx, yy;

  if (state.player.pos.x - this.pos.x > 0) xx = 1;
  else if (state.player.pos.x - this.pos.x == 0) xx = 0;
  else xx = -1;

  if (state.player.pos.y - this.pos.y > 0) yy = 1;
  else if (state.player.pos.y - this.pos.x == 0) yy = 0;
  else yy = -1;

  // Adjust speed with direction
  let newSpeed = new Vec(this.speed.x * xx, this.speed.y * yy);

  // Assign a new position based on speed
  let newPos = this.pos.plus(newSpeed.times(time));

  // Check if the new position is valid, otherwise handle reset or change direction
  if (!state.level.touches(newPos, this.size, "player")) {
    return new Boss(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Boss(this.reset, this.speed, this.reset);
  } else {
    return new Boss(this.pos, this.speed.times(-1));
  }
};
