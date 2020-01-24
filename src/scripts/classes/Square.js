import Agent from "./Agent.js"
import Tools from "./helper/Tools.js";
import Vector from "./Vector.js";

export default class Square extends Agent
{
    constructor(pos, vel, energy, col, maxspeed, energconsump, rop, steer, mutrate)
    {
        super(pos, vel, energy, col, maxspeed, energconsump, rop, steer, mutrate);
        this._angle = 0;
    }

    static genSquares(amount, width, height, maxVals)
    {
        let list = [];
        for(let i=0; i<amount; i++)
        {
            list.push(new Square(new Vector(Math.random() * width, Math.random() * height),
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

    render(ctx, WIDTH)
    {
        if(this._energy > 0)
        {
            if(this._size < 0.01 * WIDTH/4)
            {
                this._size += 0.01 * this._timeAlive;
            }
            ctx.save();
            Tools.rotate(ctx,this, Math.atan2(this.heading.y,this.heading.x));
            ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this._colour[2]},${0.3*(this._energy/this._initialEnergy)})`;
            ctx.strokeRect(this._position.x, this._position.y, this._size, this._size);
            ctx.restore();
        }
    }
}