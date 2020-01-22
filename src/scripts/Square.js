import Agent from "./Agent.js"

export default class Square extends Agent
{
    constructor(p,v,e,c,ms = 0.5, ec=0.2,rop=10,sf, mr)
    {
        super(p,v,e,c,ms, ec,rop,sf, mr);
    }
    render(ctx)
    {
        if(this._energy > 0)
        {
            if(this._size < 3)
                {
                    this._size += 0.0001 * this._timeAlive;
                }
            ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this._colour[2]},${(this._energy/this._initialEnergy)-0.3})`;
            ctx.strokeRect(this._position.x, this._position.y, this._size*10, this._size*10);
        }
    }
}