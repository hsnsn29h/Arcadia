class State {
    constructor(level, actors, status, movement, direction) {
      this.level = level;
      this.actors = actors;
      this.status = status;
      this.movement = movement;
      this.direction = direction;
    }
  
    static start(level) {
      return new State(level, level.startActors, "playing", "idleRight", "right");
    }
  
    get player() {
      return this.actors.find(a => a.type == "player");
    }
  }
  



  State.prototype.update = function(time, keys) {
    let actors = this.actors
      .map(actor => actor.update(time, this, keys));

      if(keys.ArrowUp) {

        if(this.direction == "right") this.movement = "runRightJump";
      else if(this.direction == "left") this.movement = "runLeftJump";
      else this.movement = "jump";

      }
      else if(keys.ArrowRight) {this.movement = "runRight"; this.direction = "right";}
      else if(keys.ArrowLeft) {this.movement = "runLeft"; this.direction = "left";}
      else if(this.direction == "right") this.movement = "idleRight";
      else this.movement = "idleLeft";

      
      
    let newState = new State(this.level, actors, this.status, this.movement, this.direction);
  
    if (newState.status != "playing") return newState;
  
    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }

    
   

  
    for (let actor of actors) {
      if (actor != player && Utils.overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }
    return newState;
  };

