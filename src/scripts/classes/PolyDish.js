import Dimension from "./helper/Dimension.js";
import Tools from "./helper/Tools.js";
import Circle from "./Circle.js";
import Square from "./Square.js";
import SpinSquare from "./SpinSquare.js";
import Food from "./Food.js";
import Vector from "./Vector.js";

export default class PolyDish
{
    /*Initial Energy, BaseRGB, maxSpeed, energyConsump, radOfPerce
steeringForce, mutationRate, maxSize + dTheta for SpinSquare
*/

    constructor(canvas,size,bgCol = "#000000")
    {
        //Canvas Elements
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._ctx.canvas.width = size.w;
        this._ctx.canvas.height = size.h;

        //Drawing Background
        this._ctx.fillStyle = bgCol;
        this._ctx.fillRect(0,0,size.w,size.h);

        //Screen Variables
        this._frameCount = 0;
        this._screenSize = size;

        //Initial Max values for species
        this._circInitVals = [500, Tools.randRGB(), 10, 0.2, 30, 0.7, 0.3, 3];
        this._squareInitVals = [500, Tools.randRGB(), 10, 0.2, 30, 0.5, 0.3, 1.5];
        this._spinSquareInitVals = [500, Tools.randRGB(), 10, 0.2, 30, 0.5, 0.3, 1.5, Tools.randNum() * 20];
        this._speciesList = [];
    }

    initSpecies(numCirc, numSquare, numSpinSquare, numFood, maxFood, stopAfter)
    {

        this._circList = Circle.genCircles(numCirc,this._screenSize.w,
            this._screenSize.h, this._circInitVals);
        
        this._squareList = Square.genSquares(numSquare,this._screenSize.w,
                this._screenSize.h, this._circInitVals);

        this._spinSquareList = SpinSquare.genSpinSquares(numSpinSquare,this._screenSize.w,
            this._screenSize.h, this._circInitVals);

        this._circList.forEach(c => this._speciesList.push(c));
        this._squareList.forEach(s => this._speciesList.push(s));
        this._spinSquareList.forEach(ss => this._speciesList.push(ss));

        this._foodList = Food.genFood(this._screenSize, numFood);

        this._maxFood = maxFood;
        
        this._stopAfter = stopAfter
    }

    run(nFrames)
    {
        this.render(nFrames)
        this.update();

        console.log("r");
    }

    render(nFrames=1)
    {
        if(this._frameCount < this._stopAfter)
        {
            if(this._frameCount % nFrames === 0)
            {
                this._speciesList.forEach(s => s.render(this._ctx, this._screenSize.w, this._screenSize.h));
            }
        }
    }

    update()
    {
        if(this._frameCount < this._stopAfter)
        {
            if(this._foodList.length < this._maxFood)
            {
              //  this._foodList.push(new Food(new Vector(Math.random() * this._screenSize.w, Math.random() * this._screenSize.h,)),
                //Tools.randRGB());
            }

            this._speciesList.forEach((s,i) => 
            {
            
                this._foodList.forEach((f,j) =>
                {
                    if(f != null)
                    {
                        if(Vector.Dist(s.position, f.position) < f.rop)
                        {
                            s.seek(f.position)
                            if(dist < 1 && !f.eaten)
                            {
                                f.eaten = true;
                                s.energy += 20;
                                s.changeColour(f);
                                this._foodList.splice(j,1);
                            }
                        }
                    }
                })
                s.keepInBounds(this._screenSize.w, this._screenSize.h);
                s.update(this._speciesList);
                if(s.energy <= 0)
                {
                    this._speciesList.splice(i,1);
                }
            });
        this._frameCount++;
        }
    }

    set bgCol(colour)
    {
        this._bgCol = colour;
    }
}