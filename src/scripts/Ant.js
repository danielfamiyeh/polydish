import Vector from "./Vector.js";

export default class Ant
{
    constructor(p,v,e,c,ms = 0.7, ec=0.2,roc=1)
    {
        this._position = p;
        this._velocity = v;
        this._maxSpeed = ms;
        this._acceleration = new Vector(0,0);
        this._trueColour = c;
        this._colour = c;
        this._energy = e;
        this._size = 100/this._energy;
        this._consumption = ec;
        this._reproduce = false;
        this._steeringForce = 0.01;

    }

    render(ctx)
    {
        if(this._energy > 0)
        {
            this._size = 100/(0.5*this._energy +1);
            
            ctx.fillStyle = `rgba(${this._colour[0]},${this._colour[1]},${this.colour[2]},${this._energy/1000})`;
            ctx.beginPath();
            ctx.arc(this._position.x, this._position.y, this._size, 0, 2*Math.PI);
            ctx.fill();
        }
    }

    update()
    {
        this._velocity.add(this._acceleration);
        this._position.add(this._velocity);
        this._acceleration.scale(0);
        if(this._energy > 0)
        {
            this._energy-=this._consumption;
        }
    }

    seek(target)
    {

        if(target.x != null && target.y != null)
        {
            let dir = Vector.Sub(target, this._position);
            dir.normalise();
            dir.scale(this._maxSpeed);
            let steer = Vector.Sub(dir, this._velocity);
            steer.normalise();
            steer.scale(this._steeringForce);
            this.addForce(steer);
        }
    }
    
    addForce(f)
    {
        this._acceleration.add(f);
    }

    get position()
    {
        return this._position;
    }

    get velocity()
    {
        return this._velocity;
    }

    get colour()
    {
        return this._colour;
    }

    get trueColour()
    {
        return this._trueColour;
    }

    get energy()
    {
        return this._energy;
    }
}