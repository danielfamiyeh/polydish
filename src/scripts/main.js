import Circle from "./Circle.js";
import Vector from "./Vector.js";
import Food from "./Food.js";
import Tools from "./Tools.js";
import Square from "./Square.js";

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    target = new Vector(500,500),
    antList = [],
    foodList = [],
    count = 0;

const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;



canvas.addEventListener("mousedown", function(e){
    target.x = e.clientX;
    target.y = e.clientY;
    foodList.push(new Food(new Vector(e.clientX, e.clientY), [Tools.randNum(0,255), Tools.randNum(0,255), Tools.randNum(0,255)]));
})

ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

for(let i=0; i<100; i++)
{
    foodList.push(new Food(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Tools.randRGB()));
}

let s = new Square(new Vector(50,50), Vector.UnitVec(), 200, Tools.randRGB(), 1, 0.2,20,0.5,0.01);

for(let i=0; i<25; i++)
{
    antList.push(new Circle(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Vector.UnitVec(), Math.random() * 500, Tools.randRGB(), Math.random(), Math.random(), Math.random() * WIDTH/10, Math.random() * 0.07, Math.random() * 10));
//    antList[i].shouldSwarm = (Math.floor(Math.random() * 2) > 0) ? true : false;
    antList.push(new Square(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Vector.UnitVec(), Math.random() * 500, Tools.randRGB(), Math.random(), Math.random(), Math.random() * WIDTH/10, Math.random() * 0.07, Math.random() * 10));
}
antList.push(s);

function render()
{
  //  ctx.clearRect(0,0,WIDTH,HEIGHT);
  if(count%1===0)
  {
    antList.forEach(ant => ant.render(ctx));
  }

  //foodList.forEach(food => food.render(ctx));
}

function update()
{
    if(count < 700) //make generation length variable
        {
        if(foodList.length<50)
        {
            foodList.push(new Food(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)),Tools.randRGB()));
        }

        antList.forEach((ant, aIndex) => {
            foodList.forEach((food,index) => {
                if(food != null)
                {
                    let dist = Vector.Sub(food.position, ant.position).mag;
                    if(dist < ant.rop)
                    {
                        ant.seek(food.position);
                        if(dist < 1)
                        {
                            if(food.eaten != true)
                            {
                                food.eaten = true;
                                ant.energy+=10;
                                ant.changeColour(food);
                                foodList.splice(index,1); 
                            }  
                        }
                    }
                }
            })

            ant.keepInBounds(WIDTH,HEIGHT);
            ant.update(antList);
            if(ant.energy <= 0)
            {
                antList.splice(aIndex,1);
            }
        })
        count++;
    }
}

function main()
{
    render();
    update();

    window.requestAnimationFrame(main);
}

main();