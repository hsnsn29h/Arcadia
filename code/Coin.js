class Coin {
    constructor(pos, basePos, wobble) {
      this.pos = pos;
      this.basePos = basePos;
      this.wobble = wobble;
    }
  
    get type() { return "coin"; }
  
    static create(pos) {
      let basePos = pos.plus(new Vec(0.2, 0.1));
      return new Coin(basePos, basePos,
                      Math.random() * Math.PI * 2);
    }
  }
  
  Coin.prototype.size = new Vec(0.8, 0.8);

  Coin.prototype.collide = function(state) {
    var audio = new Audio('/assets/collect.wav');
    audio.preload = 'auto';
    audio.play();
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) {
      status = "won";
      var audio = new Audio('/assets/win.ogg');
      audio.preload = 'auto';
      audio.play();
    }
    return new State(state.level, filtered, status);
  };

  var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.update = function(time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
                  this.basePos, wobble);
};

