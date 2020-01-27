import HSV from "./HSV.js";

export default class RGB
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
        return new RGB(Math.floor(Math.random() * 256),
                            Math.floor(Math.random() * 256),
                                Math.floor(Math.random() * 256));
    }

    setColour(ctx)
    {
        ctx.fillStyle = `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }

    //Triadic Harmony
    triadic()
    {
        let colAsHSV = this.asHSV(),
        posComp = new HSV(colAsHSV[0] + 60, colAsHSV[1], colAsHSV[2]),
        negComp = new HSV(colAsHSV[0] - 60, colAsHSV[1], colAsHSV[2]);

        return [posComp.asRGB(), negComp.asRGB()];
    }

    //RGB to HSV converter
    asHSV()
    {
        let rPrime = this._r/255,
            gPrime = this._g/255,
            bPrime = this._b/255,
            cMax = Math.max(rPrime, gPrime, bPrime),
            cMin = Math.min(rPrime, gPrime, bPrime),
            discriminant = cMax - cMin;
        var hue = 0, sat = 0, value = 0;

        if(discriminant > 0)
        {
            if(cMax === rPrime)
            {
                hue = 60 * (((gPrime - bPrime)/discriminant) % 6);
            }

            else if(cMax === gPrime)
            {
                hue = 60 * (((bPrime - rPrime)/discriminant) + 2);
            }

            else if(cMax === bPrime)
            {
                hue = 60 * (((rPrime - gPrime) / discriminant) + 4);
            }
        }

        if(cMax != 0) sat = discriminant/cMax;

        value = cMax;

        return [hue, sat, value];
    }

    get compliment() // change from getter function
    {
        return new RGB(255-this._r, 255-this._g, 255-this._b,this._a);
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