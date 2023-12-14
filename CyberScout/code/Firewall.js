class Firewall {
  // Constructor for the Firewall class
  constructor(pos, basePos, wobble) {
    this.pos = pos;          // Current position of the firewall
    this.basePos = basePos;  // Base position of the firewall
    this.wobble = wobble;    // Wobble factor for animation
  }

  // Getter method for the type property
  get type() { return "firewall"; }

  // Static method to create a new firewall at a given position
  static create(pos) {
    // Set base position slightly offset from the provided position
    let basePos = pos.plus(new Vec(0.2, 0.1));
    // Create and return a new Firewall instance with a random wobble angle
    return new Firewall(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

// Set the size property for all instances of Firewall
Firewall.prototype.size = new Vec(0.8, 0.8);

// Method to handle collision with the firewall
Firewall.prototype.collide = function(state) {
  // Play a collect sound when colliding with the firewall
  var audio = new Audio('assets/collect.wav');
  audio.preload = 'auto';
  audio.play();
  
  // Filter out the current firewall from the list of actors
  let filtered = state.actors.filter(a => a != this);
  let status = state.status;
  
  // Check if there are no more firewalls in the filtered list
  if (!filtered.some(a => a.type == "firewall")) {
    // If no firewalls remain, the player has won
    status = "won";
    // Play a win sound
    var audio = new Audio('assets/win.ogg');
    audio.preload = 'auto';
    audio.play();
  }
  
  // Return a new state with the updated actor list and status
  return new State(state.level, filtered, status);
};

// Constants for wobbling animation
var wobbleSpeed = 8, wobbleDist = 0.07;

// Method to update the firewall's position based on time
Firewall.prototype.update = function(time) {
  // Calculate the new wobble based on time
  let wobble = this.wobble + time * wobbleSpeed;
  // Calculate the wobble position along the y-axis
  let wobblePos = Math.sin(wobble) * wobbleDist;
  // Return a new Firewall instance with updated position and wobble
  return new Firewall(this.basePos.plus(new Vec(0, wobblePos)),
                this.basePos, wobble);
};
