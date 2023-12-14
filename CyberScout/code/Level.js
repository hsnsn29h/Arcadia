// Mapping of characters to their corresponding level object types
var levelChars = {
  ".": "empty",       // Empty space
  "#": "wall",        // Wall
  "@": Player,        // Player character
  "o": Firewall,      // Firewall
  "=": Robot,         // Horizontal Robot
  "|": Robot,         // Vertical Robot
  "v": Spike,         // Spike
  "b": Boss           // Boss
};

// Class representing a game level
class Level {
  // Constructor to initialize the level based on a plan
  constructor(plan) {
    // Split the plan into rows and convert each character to an array
    let rows = plan.trim().split("\n").map(l => [...l]);

    // Set the height and width of the level
    this.height = rows.length;
    this.width = rows[0].length;

    // Initialize the starting actors array
    this.startActors = [];

    // Create a 2D array representing the level
    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        // Get the type of the actor based on the character
        let type = levelChars[ch];
        if (typeof type == "string") return type;

        // If the type is not a string, create an instance of the actor
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }
}

// Method to check if a position and size touches a specified type in the level
Level.prototype.touches = function (pos, size, type) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      // Check if the position is outside the level boundaries
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      // Get the type of the current cell
      let here = isOutside ? "wall" : this.rows[y][x];
      // Check if the cell type matches the specified type
      if (here == type) return true;
    }
  }
  return false;
};
