// Create an audio element for the game music and set the initial volume
let music = new Audio('assets/music.mp3');
let musicVolume = 0.25;

// Class for outer methods and storing death counts
class Game {
  static musicMute() {
    // Toggle music volume between 0 and the original volume
    if (music.volume > 0) music.volume = 0;
    else music.volume = musicVolume;
  }

  // Static death counters for spikes, robots, bosses respectively 
  static deathsS = 0;
  static deathsR = 0;
  static deathsB = 0;
}

// Function to track key presses and releases
function trackKeys(keys) {
  let down = Object.create(null);

  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }

  // Add event listeners for keydown and keyup events
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);

  return down;
}

// Function to navigate back to the games page
function home() {
  window.location.href = "/games.html";
}

// Define keys for player controls
var arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "a", "d", "w"]);

// Function to start the game by navigating to the platformer.html page
function start() {
  window.location.href = "platformer.html";
}

// Function to run the game animation loop
function runAnimation(frameFunc) {
  let lastTime = null;

  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      // Call the frame function with the time step and check for termination
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    // Request the next animation frame
    requestAnimationFrame(frame);
  }

  // Start the animation loop
  requestAnimationFrame(frame);
}

// Function to run a single level of the game
function runLevel(level, Display, leveln) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;

  // Check if the level number is the last level to apply special styling
  if (leveln == 5) {
    let x = this.document.querySelector(".background");
    x.classList.remove("background");
    x.classList.add("background2");
  }

  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        // Clear the display and resolve the level status
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

// Function to run the entire game using a list of level plans and a display
async function runGame(plans, Display) {
  let startTime = Date.now();
  let finishTime;
  
  // Set up and play the game music
  music.loop = true;
  music.volume = musicVolume;
  music.play();

  // Loop through each level and run it
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]), Display, level);

    // If the player won, move to the next level
    if (status == "won") {
      level++;

      // Change music for the last level
      if (level == 5) {
        music.src = "assets/chase.mp3";
        music.loop = true;
        musicVolume = 0.5;

        // Set the music volume if it's not muted
        if (music.volume != 0) music.volume = musicVolume;
        music.play();
      }
    }
  }

  // Calculate and store the total time and death counts
  finishTime = Date.now();
  finishTime -= startTime;
  finishTime /= 1000;
  finishTime /= 60;
  localStorage.setItem("time", finishTime);
  localStorage.setItem("deathsS", Game.deathsS);
  localStorage.setItem("deathsR", Game.deathsR);
  localStorage.setItem("deathsB", Game.deathsB);

  // Navigate to the end.html page
  window.location.href = "end.html";
}
