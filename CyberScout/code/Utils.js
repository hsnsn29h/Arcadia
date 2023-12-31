// Utility class containing static methods for common tasks
class Utils {

  // Static method to create an HTML element with specified attributes and children
  static elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    // Set attributes for the created element
    for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
    }
    // Append children to the created element
    for (let child of children) {
      dom.appendChild(child);
    }
    return dom;
  }

  // Static method to create an HTML table representing the level grid
  static drawGrid(level) {
    return this.elt("table", {
      class: "background",
      style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
      this.elt("tr", {style: `height: ${scale}px`},
        ...row.map(type => this.elt("td", {class: type})))
    ));
  }

  // Static method to create HTML elements representing actors in the game
  static drawActors(actors) {
    return this.elt("div", {}, ...actors.map(actor => {
      let rect = this.elt("div", {class: `actor ${actor.type}`});
      // Set styles for actor's size and position
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    }));
  }

  // Static method to check if two actors overlap
  static overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
  }
}
