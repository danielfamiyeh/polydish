import Circle from "./classes/Circle.js";
import Vector from "./classes/Vector.js";
import Food from "./classes/Food.js";
import Tools from "./classes/helper/Tools.js";
import Square from "./classes/Square.js";
import SpinSquare from "./classes/SpinSquare.js";

const WIDTH = 500,
    HEIGHT = 500;

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    target = new Vector(500,500),
    antList = [],
    foodList = [],
    keys = [],
    count = 0,
    shouldRefresh,
    nFrames = 1;


canvas.addEventListener("mousedown", function(e){
    canvas.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });
    target.x = e.clientX;
    target.y = e.clientY;
    foodList.push(new Food(new Vector(e.clientX, e.clientY), [Tools.randNum(0,255), Tools.randNum(0,255), Tools.randNum(0,255)]));
})

canvas.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
});
canvas.addEventListener("keyup", function(e){
    keys[e.keyCode] = false;
});

ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;



for(let i=0; i<50; i++)
{
    foodList.push(new Food(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Tools.randRGB()));
}

let s = new Square(new Vector(50,50), Vector.UnitVec(), 200, Tools.randRGB(), 1, 0.2,20,0.5,0.01);

for(let i=0; i<20; i++)
{
    antList.push(new Circle(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Vector.UnitVec(), Math.random() * 500, Tools.mutatedRGB(25,255,255), Math.random() * 5, Math.random(), Math.random() * WIDTH/10, Math.random() * 0.07, Math.random() * 10));
    antList.push(new Square(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Vector.UnitVec(), Math.random() * 500, Tools.mutatedRGB(255,165,0), Math.random()*5, Math.random(), Math.random() * WIDTH/10, Math.random() * 0.07, Math.random() * 10));
    if((Math.floor(Math.random() * 2))>0)antList.push(new SpinSquare(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Vector.UnitVec(), Math.random() * 500, Tools.mutatedRGB(25,255,), Math.random() * 5, Math.random(), Math.random() * WIDTH/10, Math.random() * 0.07, Math.random() * 10, Math.random()));
}
antList.push(s);
console.log(antList[3].constructor);


function render()
{   

    if(shouldRefresh) if(count % nFrames === 0)ctx.clearRect(0,0,WIDTH,HEIGHT);
    if(count%1===0)
    {
        antList.forEach(ant => ant.render(ctx,WIDTH,HEIGHT));
    }

    //foodList.forEach(food => food.render(ctx));
}

ctx.fillStyle="#000000";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
function update()
{
    if(keys[32])
    {
        canvas.toBlob(function(blob) {
    //saveAs(blob, "pretty image.png");
});
    }
    if(count < 500) //make generation length variable
        {
        if(foodList.length<50)
        {
            for(let i=0; i<50;i++) foodList.push(new Food(new Vector(Math.random() * WIDTH, Math.random()*HEIGHT),Tools.randRGB()));
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