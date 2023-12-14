class DOMDisplay {
  // Constructor for the DOMDisplay class
  constructor(parent, level) {
    // Create a game div element with a grid and append it to the parent
    this.dom = Utils.elt("div", { class: "game" }, Utils.drawGrid(level));

    // Initialize properties for actor layer and screen
    this.actorLayer = null;
    this.screen = document.createElement("div");
    this.screen.id = "screen";

    // Create a home button and set its onclick behavior
    let homeButton = document.createElement("image");
    homeButton.id = "home-button";
    homeButton.onclick = function () {
      // Navigate to the games page
      window.location.href = "/games.html";
    };
    this.screen.appendChild(homeButton);

    // Create a music button and set its onclick behavior
    let music = document.createElement("image");
    if (Game.music.paused) music.id = "music-button2";
    else
      music.id = "music-button";
    music.onclick = function () {
      // Toggle music and change the button icon
      Game.musicMute();
      if (music.id == "music-button") music.id = "music-button2";
      else music.id = "music-button";
    };
    this.screen.appendChild(music);

    // Append the game div to the screen and the screen to the parent
    this.screen.append(this.dom);
    parent.appendChild(this.screen);
  }

  // Method to clear the display
  clear() { this.dom.remove(); this.screen.remove(); }
}

// Default scale for rendering
var scale = 20;

// SyncState method for updating the display based on the game state
DOMDisplay.prototype.syncState = function (state) {
  // Get dimensions and scroll positions of the display
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let left = this.dom.scrollLeft, right = left + width;
  let top = this.dom.scrollTop, bottom = top + height;

  // Remove the existing actor layer if it exists
  if (this.actorLayer) {
    this.dom.removeChild(this.actorLayer); // Remove instead of using remove()
  }

  // Draw the actors and create a DocumentFragment to avoid reflow
  this.actorLayer = Utils.drawActors(state.actors);
  let fragment = document.createDocumentFragment();
  fragment.appendChild(this.actorLayer);
  this.dom.appendChild(fragment);

  // Set the class of the display to reflect game state
  this.dom.className = ['game', state.status, state.movement].join(' ');

  // Set margin for scrolling based on width
  let margin = width / 3;

  // Calculate the player's center position in scaled units
  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  // Adjust scroll positions to keep the player in view
  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }

  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};
