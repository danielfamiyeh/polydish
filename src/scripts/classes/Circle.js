import Agent from "./Agent.js";

export default class Circle extends Agent
{
    constructor(p,v,e,c,ms = 0.5, ec=0.2,rop=10,sf, mr)
    {
        super(p,v,e,c,ms, ec,rop,sf, mr);
    }

    render(ctx,WIDTH,HEIGHT)
    {
        if(this._energy > 0)
        {
            if(this._size < 0.02*WIDTH/4)
            {
                this._size += 0.0005 * this._timeAlive;
            }
            
            ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this.colour[2]},${0.2})`;
            ctx.beginPath();
            ctx.arc(this._position.x, this._position.y, this._size, 0, 2*Math.PI);
            ctx.stroke();
        }
    }

    
}