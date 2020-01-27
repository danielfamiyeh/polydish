import Tools from "./helper/Tools.js";
import Circle from "./Circle.js";
import Square from "./Square.js";
import SpinSquare from "./SpinSquare.js";
import Food from "./Food.js";
import Vector from "./Vector.js";

export default class PolyDish
{
    /*Initial Energy, BaseRGB, maxSpeed, energyConsump, radOfPercep
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
        this._circInitVals = [500, Tools.randRGB(), 5, 0.2, 30, 0.09, 0.3, 10];
        this._squareInitVals = [500, Tools.randRGB(), 5, 0.2, 30, 0.09, 0.3, 10];
        this._spinSquareInitVals = [500, Tools.randRGB(), 4, 0.2, 30, 0.09, 0.3, 10, Tools.randNum() * 5];
        this._speciesList = [];
    }

    initSpecies(numCirc, numSquare, numSpinSquare, numFood, maxFood, stopAfter)
    {
        //Initialise lists of species
        this._circList = Circle.genCircles(numCirc,this._screenSize.w*0.75,
            this._screenSize.h, this._circInitVals);
        this._squareList = Square.genSquares(numSquare,this._screenSize.w*0.75,
                this._screenSize.h, this._squareInitVals);
        this._spinSquareList = SpinSquare.genSpinSquares(numSpinSquare,this._screenSize.w*0.8,
            this._screenSize.h, this._spinSquareInitVals);
        
        //Add shape lists to main species list
        this._circList.forEach(c => this._speciesList.push(c));
        this._squareList.forEach(s => this._speciesList.push(s));
        this._spinSquareList.forEach(ss => this._speciesList.push(ss));

        //Initialise food
        this._foodList = Food.genFood(this._screenSize, numFood);
        
        //Set limits
        this._maxFood = maxFood;
        this._stopAfter = stopAfter;
    }

    run(nFrames)
    {
        this.render(nFrames)
        this.update();
    }

    render(nFrames=1)
    {
        if(this._frameCount < this._stopAfter)
        {
            if(this._frameCount % nFrames === 0)
            {
                this._speciesList.forEach(s => {
                    let dist = Vector.Dist(new Vector(this._screenSize.w/2, this._screenSize.h/2), s.position);
                    if(dist < this._screenSize.h/2)
                    {
                        s.render(this._ctx, this._screenSize.w, this._screenSize.h)
                    }
                });
            }
        }
    }

    update()
    {
        if(this._frameCount < this._stopAfter)
        {
            if(this._foodList.length < this._maxFood)
            {
                this._foodList.push(new Food(new Vector(Math.random() * this._screenSize.w, Math.random() * this._screenSize.h), Tools.randRGB()));
            }

            this._speciesList.forEach((s,i) => 
            {
            
                this._foodList.forEach((f,j) =>
                {
                    if(f != null)
                    {
                        let dist = Vector.Dist(s.position, f.position);
                        if(dist < s.rop)
                        {
                            s.seek(f.position)
                            if(dist < 1)
                            {
                                s.changeColour(f);
                                f.eaten = true;
                                s.energy += 20;
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


    //Save canvas as image
    saveImage()
    {
        this._canvas.toBlob(function(blob) {
            saveAs(blob, "polydish.png");
        });
    }

    //Getters and setters

    get circInitVals()
    {
        return this._circInitVals;
    }

    set circInitVals(vals)
    {
        this._circInitVals = vals;
    }

    set squareInitVals(vals)
    {
        this._squareInitVals = vals;
    }

    set spinSquareInitVals(vals)
    {
        this._spinSquareInitVals = vals;
    }

    get squareInitVals()
    {
        return this._squareInitVals;
    }

    get spinSquareInitVals()
    {
        return this._spinSquareInitVals;
    }

    set bgCol(colour)
    {
        this._bgCol = colour;
    }
}