import Ant from "./Ant.js";
import Vector from "./Vector.js";


let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    target = new Vector(500,500),
    antList = [],
    count = 0;

const WIDTH = 500,
    HEIGHT = 500;


canvas.addEventListener("mousedown", function(e){
    target.x = e.clientX;
    target.y = e.clientY;
})

ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;
let ant = new Ant(new Vector(250,250), new Vector(0,0), 200, [100,100,100]);
antList.push(ant);

function render()
{
  //  ctx.clearRect(0,0,WIDTH,HEIGHT);
  if(count%1===0)
  {
    antList.forEach(ant => ant.render(ctx));
  }
}

function update()
{
    antList.forEach(ant => {
        ant.seek(target);
        ant.update();
    })
    count++;
}

function main()
{
    render();
    update();

    window.requestAnimationFrame(main);
}

main();