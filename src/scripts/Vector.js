import Tools from "./Tools.js";

export default class Vector
{
    constructor(x,y)
    {
        this._x = x;
        this._y = y;
    }

    static UnitVec()
    {
        let x = Tools.randNum(-1,2),
            y = Tools.randNum(-1,2);

        return Vector.Normalise(new Vector(x,y));
    }

    static Scale(v,lambda)
    {
        return new Vector(v.x * lambda, v.y*lambda);
    }

    static Sub(v1,v2)
    {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static Add(v1,v2)
    {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static Dot(v1,v2)
    {
        return (v1.x * v2.x + v1.y * v2.y);
    }

    static Normalise(v)
    {
        return new Vector(v.x / v.mag, v.y / v.mag);
    }

    add(v)
    {
        this._x += v.x;
        this._y += v.y;
    }

    sub(v)
    {
        this._x -= v.x;
        this._y -= v.y;
    }

    dot(v)
    {
        return this._x * v.x + this._y * v.y;
    }

    normalise()
    {
        this._x /= this.mag;
        this._y /= this.mag;
    }

    scale(lambda)
    {
        this._x *= lambda;
        this._y *= lambda;
    }

    constrain(mag)
    {
        if(this.mag > mag)
        {
            this.normalise();
            this.scale(mag)
        }
    }

    get x()
    {
        return this._x;
    }

    get y()
    {
        return this._y;
    }

    get mag()
    {
        return Math.sqrt(this._x ** 2 + this._y ** 2);;
    }

    set x(x)
    {
        this._x = x;
    }

    set y(y)
    {
        this._y = y;
    }
}
