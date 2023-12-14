// Class representing the game state
class State {
  // Constructor to initialize the game state with level, actors, status, movement, and direction
  constructor(level, actors, status, movement, direction) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    this.movement = movement;
    this.direction = direction;
  }

  // Static method to create a new game state with the starting position
  static start(level) {
    return new State(level, level.startActors, "playing", "idleRight", "right");
  }

  // Getter method to retrieve the player actor from the actors array
  get player() {
    return this.actors.find(a => a.type == "player");
  }
}

// Method to update the game state based on time and key input
State.prototype.update = function (time, keys) {
  // Update each actor in the game
  let actors = this.actors.map(actor => actor.update(time, this, keys));

  // Check for movement keys
  const rightKey = keys.ArrowRight || keys.d;
  const leftKey = keys.ArrowLeft || keys.a;
  const upKey = keys.ArrowUp || keys.w;

  // Adjust movement and direction based on key input
  if (upKey) {
    if (this.direction == "right") this.movement = "runRightJump";
    else if (this.direction == "left") this.movement = "runLeftJump";
    else this.movement = "jump";
  } else if (rightKey) {
    this.movement = "runRight";
    this.direction = "right";
  } else if (leftKey) {
    this.movement = "runLeft";
    this.direction = "left";
  } else if (this.direction == "right") {
    this.movement = "idleRight";
  } else {
    this.movement = "idleLeft";
  }

  // Create a new game state with updated information
  let newState = new State(this.level, actors, this.status, this.movement, this.direction);

  // If the game is not in playing status, return the new state
  if (newState.status != "playing") return newState;

  // Check for player collision with lava
  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  // Check for collisions between actors (excluding player)
  for (let actor of actors) {
    if (actor != player && Utils.overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }

  // Return the updated game state
  return newState;
};
