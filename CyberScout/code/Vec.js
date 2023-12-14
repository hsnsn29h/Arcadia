// Vector class representing a 2D vector with x and y components
class Vec {
  // Constructor to initialize the vector with x and y components
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Method to add another vector to the current vector
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  // Method to multiply the vector by a scalar factor
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}
