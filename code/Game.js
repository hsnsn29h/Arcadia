function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

var arrowKeys =
  trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      //let fps = (1/(time/1000 - lastTime/1000));
      //if(fps < 100) console.log('fps drop: ' , fps.toFixed(2));
      //console.log(fps.toFixed(2));
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
     requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
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
        console.log(state.status);
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

async function runGame(plans, Display) {
  var audio = new Audio('/assets/music.mp3');
  audio.loop = true;
  audio.volume = 0.25;
  audio.play();
  for (let level = 0; level < plans.length;) {
    let status = await runLevel(new Level(plans[level]),
                                Display);
    if (status == "won") level++;
  }
  console.log("You've won!");
}
