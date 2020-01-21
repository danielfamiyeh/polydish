import Ant from "./Ant.js";
import Vector from "./Vector.js";
import Food from "./Food.js";
import Tools from "./Tools.js";

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    target = new Vector(500,500),
    antList = [],
    foodList = [],
    count = 0;

const WIDTH = 300,
    HEIGHT = 300;

canvas.addEventListener("mousedown", function(e){
    target.x = e.clientX;
    target.y = e.clientY;
    foodList.push(new Food(new Vector(e.clientX, e.clientY), [Tools.randNum(0,255), Tools.randNum(0,255), Tools.randNum(0,255)]));
})

ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;
let ant = new Ant(new Vector(250,250), new Vector(0,0), 1000, [200,100,100]);
antList.push(ant);
for(let i=0; i<10; i++)
{
    foodList.push(new Food(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), [Tools.randNum(255), Tools.randNum(255), Tools.randNum(255)]));
}

for(let i=0; i<50; i++)
{
    antList.push(new Ant(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Vector.UnitVec(), 100, Tools.randRGB()));
    console.log(antList[i].trueColour);
    antList[i].steeringForce = Tools.randNum(0.01, 0.05);
}

function render()
{
  //  ctx.clearRect(0,0,WIDTH,HEIGHT);
  if(count%1===0)
  {
    antList.forEach(ant => ant.render(ctx));
  }

//  foodList.forEach(food => food.render(ctx));
}

function update()
{
    console.log(antList.length);
    if(foodList.length<30)
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
        ant.update(antList);
        if(ant.energy <= 0)
        {
            antList.splice(aIndex,1);
        }
    })
    count++;
}

function main()
{
    render();
    update();

    window.requestAnimationFrame(main);
}

function arrayRemove(arr, index)
{
    for(let i=arr.length; i>0; --i)
    {
        if(i === index)
        {
            arr.splice(i, 1);
        }
    }
}

main();