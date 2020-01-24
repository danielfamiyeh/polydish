import Circle from "./classes/Circle.js";
import Vector from "./classes/Vector.js";
import Food from "./classes/Food.js";
import Tools from "./classes/helper/Tools.js";
import Square from "./classes/Square.js";
import SpinSquare from "./classes/SpinSquare.js";

const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

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
       // saveAs(blob, "polydish.png");
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

let genLength = 500,
    maxFood = 50;

//Circle inital max values
let initialEnergyCirc = 500,
baselineRGBCirc = Tools.randRGB(),
maxSpeedCirc = 10,
energyConsumptionCirc = 0.2,
radOfPercepCirc = 30,
maxSteeringForceCirc = 0.7,
maxMutationRateCirc = 0.3,
maxSizeCirc = 3;

//Square initial max values
let initialEnergySq = 500,
    baselineRGBSq = Tools.randRGB(),
    maxSpeedSq = 10,
    energyConsumptionSq = 0.2,
    radOfPercepSq = 30,
    maxSteeringForceSq = 0.5,
    maxMutationRateSq = 0.3,
    maxSizeSqr = 1.5;


//Spin Square initial max values
let initialEnergySSq = 500,
    baselineRGBSSq = Tools.randRGB(),
    maxSpeedSSq = 10,
    maxSteeringForceSSq = 0.2,
    maxMutationRateSSq = 0.3,
    energyConsumptionSSq = 0.2,
    radOfPercepSSq = 30,
    maxSizeSSqr = 2,
    dTheta = Math.random();

function getCircMax()
{
    return [initialEnergyCirc, baselineRGBCirc, maxSpeedCirc,energyConsumptionCirc,
        radOfPercepCirc,maxSteeringForceCirc,maxMutationRateCirc];
}

function getSquareMax()
{
    return [initialEnergySq, baselineRGBSq, maxSpeedSq, energyConsumptionSq,
        radOfPercepSq,maxSteeringForceSq,maxMutationRateSq];
}

function getSpinSquareMax()
{
    return [initialEnergySSq, baselineRGBSSq, maxSpeedSSq, energyConsumptionSSq,
        radOfPercepSSq,maxSteeringForceSSq,maxMutationRateSSq];
}

let circList = Circle.genCircles(20, WIDTH,HEIGHT,getCircMax()),
    squareList = Square.genSquares(20,WIDTH,HEIGHT,getSquareMax()),
    spinSquareList = SpinSquare.genSquares(20,WIDTH,HEIGHT,getSpinSquareMax());

circList.forEach(c=>antList.push(c));
squareList.forEach(s=>antList.push(s));
spinSquareList.forEach(ss => antList.push(ss));


for(let i=0; i<1; i++)
{
    foodList.push(new Food(new Vector(Tools.randNum(0,WIDTH), Tools.randNum(0,HEIGHT)), Tools.randRGB()));
}


function render()
{   
    if(shouldRefresh) if(count % nFrames === 0)ctx.clearRect(0,0,WIDTH,HEIGHT);
    antList.forEach(ant => ant.render(ctx,WIDTH,HEIGHT));
}

ctx.fillStyle="#000000";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
function update()
{
    if(count < genLength) //make generation length variable
        {
        if(foodList.length<maxFood)
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