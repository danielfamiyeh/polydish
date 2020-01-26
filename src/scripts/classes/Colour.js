export default class Colour
{
    constructor(r,g,b,a=1)
    {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    static Random()
    {
        return new Colour(Math.floor(Math.random() * 256),
                            Math.floor(Math.random() * 256),
                                Math.floor(Math.random() * 256));
    }

    setColour(ctx)
    {
        ctx.fillStyle = `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }

    get compliment()
    {
        return new Colour(255-this._r, 255-this._g, 255-this._b,this._a);
    }

    get r()
    {
        return this._r;
    }

    get g()
    {
        return this._b;
    }

    get b()
    {
        return this._b;
    }

    get rgb()
    {
        return {r : this._r,
                 g : this._g,
                    b : this._b};
    }

    get rgba()
    {
        return {r : this._r,
                g : this._g,
                b : this._b,
                a : this._a};
    }

    rgbaAsList()
    {
        return [this._r, this._g, this._b, this._a];
    }

    rgbAsList()
    {
        return [this._r, this._g, this._b];
    }

    set alpha(a)
    {
        this._a = a;
    }
}