import Agent from "./Agent.js";
import Tools from "./helper/Tools.js";
import Vector from "./Vector.js";

export default class SpinSquare extends Agent
{
    constructor(pos, vel, energy, col, maxSpeed, energyConsump, radOfPercep, steerForce, mutrate, dTheta)
    {
        super(pos, vel, energy, col, maxSpeed, energyConsump, radOfPercep, steerForce, mutrate);
        this._angle = 0;
        this._dTheta = dTheta
    }

    static genSpinSquares(amount, width, height, maxVals)
    {
        let list = [];
        for(let i=0; i<amount; i++)
        {
            list.push(new SpinSquare(new Vector(Math.random() * width, Math.random() * height),
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
        if(this._energy>0)
        {
            if(this._size < 0.01 * (WIDTH/2))
            {
                this._size += 0.01 * this._timeAlive;
            }
            ctx.save()
                Tools.rotate(ctx,this,this._angle);
                ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this._colour[2]},${(0.55*this._energy/this._initialEnergy)})`;
                ctx.strokeRect(this._position.x, this._position.y, this._size, this._size);
            ctx.restore();
            this._angle += this._dTheta;
        }
    }
}