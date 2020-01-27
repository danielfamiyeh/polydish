import Agent from "./Agent.js";
import Tools from "./helper/Tools.js";
import Vector from "./Vector.js";

export default class Circle extends Agent
{
    constructor(pos, vel, energy, col, maxspeed, energconsump, rop, steer, mutrate)
    {
        super(pos, vel, energy, col, maxspeed, energconsump, rop, steer, mutrate);
    }

    static genCircles(amount, width, height, maxVals)
    {
        let list = [];
        for(let i=0; i<amount; i++)
        {
            list.push(new Circle(new Vector(Math.random() * width + 0.2*width, Math.random() * height),
                                    Vector.UnitVec(),
                                    Math.random() * maxVals[0],
                                    Tools.mutatedRGB(maxVals[1][0], maxVals[1][1], maxVals[1][2]),
                                    Math.random() * maxVals[2],
                                    Math.random() * maxVals[3],
                                    Math.random() * maxVals[4],
                                    Math.random() * maxVals[5],
                                    Math.random() * maxVals[6]));
        }
        return list;
    }

    render(ctx,WIDTH,HEIGHT)
    {
        if(this._energy > 0)
        {
            if(this._size < 0.02*WIDTH/20)
            {
                this._size += 0.0005 * this._timeAlive;
            }

            ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this.colour[2]},${0.55*(this._energy/this._initialEnergy)})`;
            ctx.beginPath();
            ctx.arc(this._position.x, this._position.y, this._size, 0, 2*Math.PI);
            ctx.stroke();
        }
    }

    reproduce(antList) //Reproductive Functions
    {
        if(antList.length < 150)
        {
            antList.forEach(ant => {
                let dist = Vector.Sub(ant.position, this._position).mag;

                if(dist > 0 && dist <= 10 && ant != this && this.constructor === ant.constructor)
                {
                    let midPoint = Tools.randNumFloor(0,this.genome.length);   
                    let childGenome = this.crossover(this.genome, ant.genome, midPoint);
                    if(Math.random() * 100 <= this._mutationRate * 100) this.mutate(childGenome);
                    let newAnt = new Circle(childGenome[0], childGenome[1], childGenome[2], childGenome[3], childGenome[4], childGenome[5], childGenome[6], childGenome[7], this._mutationRate);
                    antList.push(newAnt);
                    this._energy-=50;
                }
            })
        }
    }    
}