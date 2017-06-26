/*
Just a quick mock up.
Particles of user specified quantity move toward random trajectory at specified speed
Upon collision a particle will reverse the vector value respective to the offending canvas edge
Lines will form at an increasing opacity between two particles as they approach one another 
  w/in specified radius

Implement with something like so:

  function animate(){
    ctx.clearRect(0,0, cvs.width, cvs.height)
    systemInstance.update();
    window.requestAnimateShiv(animate)
  }
*/


var cvs = document.getElementById('canvasIDHere');
    ctx = cvs.getContext('2d'),
    system = [];

var Particle = function(){
  this.x;
  this.y;
  this.velocity = [];
}

Particle.prototype.init = function(){
  this.x = Math.random() * cvs.width;
  this.y = Math.random() * cvs.height;
  var speed = 1.8;
  var angle = (Math.random() * 360) * (Math.PI/180);
  this.velocity[0] = speed * Math.cos(angle);
  this.velocity[1] = speed * Math.sin(angle);
  for (var i = 0; i < 3; i++)
    this.velocity[i] *= Math.random() > .5 ? 1 : -1;
}

Particle.prototype.draw = function(){
  var size = 3;
  ctx.beginPath();
  ctx.rect(this.x, this.y, size, size);
  ctx.stroke();
  ctx.closePath();
}

Particle.prototype.update = function(){
  if (this.x < 0 || this.x > cvs.width)
    this.velocity[0] *= -1;
  
  if (this.y < 0 || this.y > cvs.height)
    this.velocity[1] *= -1;
  
  this.x += this.velocity[0];
  this.y += this.velocity[1];
}

var System = function(max, amount){
  this.particles = [];
  this.max = max;
  this.amount;
}

System.prototype.init = function(){
  for (var i = 0; i < this.amount; i++){
    var p = new Particle();
    p.init();
    this.particles.push(p);
  };
}

System.prototype.update = function(){
  for (var i = 0; i < this.particles.length; i++){
    var p1 = this.particles[i];
    p1.draw();
    for (var i2 = i + 1; i2 < this.particles[i2]; i2++){
      var p2 = this.particles[i2];
      var xDist = p2.x - p1.x;
      var yDist = p2.y - p1.y;
      var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist,2));
      if (dist < this.max){
        this.lineDraw(p1.x, p1.y, p2.x, p2.y, dist/this.max);
      }
    }
    p1.update();
  }
}


System.prototype.lineDraw = function(x1, y1, x2, y2, p){
  var alpha = 1 - p;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2, y2);
  ctx.globalAlpha = alpha;
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}
