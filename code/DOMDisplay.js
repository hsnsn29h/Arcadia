
class DOMDisplay {
    constructor(parent, level) {
      this.dom = Utils.elt("div", {class: "game"}, Utils.drawGrid(level));
      this.actorLayer = null;
      parent.appendChild(this.dom);
    }
  
    clear() { this.dom.remove(); }
  }
  
  var scale = 20;
  
  
  
  DOMDisplay.prototype.syncState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = Utils.drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status} ${state.movement}`;
    this.scrollPlayerIntoView(state);
  };
  
  DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;
  
    // The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;
  
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
                           .times(scale);
  
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


