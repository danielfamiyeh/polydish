import Agent from "./Agent.js";
import Tools from "./helper/Tools.js";

export default class SpinSquare extends Agent
{
    constructor(p,v,e,c,ms = 0.5, ec=0.2,rop=10,sf, mr,dt)
    {
        super(p,v,e,c,ms, ec,rop,sf, mr);
        this._angle = 0;
        this._dTheta = dt
    }

    render(ctx,WIDTH,HEIGHT)
    {
        if(this._energy>0)
        {
            if(this._size < 0.01 * (WIDTH/4))
            {
                this._size += 0.01 * this._timeAlive;
            }
            ctx.save()
                Tools.rotate(ctx,this,this._angle);
                ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this._colour[2]},${(this._energy/this._initialEnergy)})`;
                ctx.strokeRect(this._position.x, this._position.y, this._size, this._size);
            ctx.restore();
            this._angle += this._dTheta;
        }
    }
}