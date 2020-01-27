import RGB from "./RGB.js";

//HSV Colour Class

export default class HSV
{
    constructor(h, s, v)
    {
        this._h = h;
        this._s = s;
        this._v = v;
    }

    //HSV to RGB conerter
    asRGB()
    {
        let C = this._v * this._s,
            X = C * (1-Math.abs(this._h/60) % 2 - 1),
            m = this._v - C,
            r, g, b;

        var rPrime = 0, gPrime = 0, bPrime = 0;
        if(this._h >= 0 && this._h < 60)
        {
            rPrime = C;
            gPrime = X;
        }
        else if(this._h >= 60 && this._h < 120)
        {
            rPrime = X;
            gPrime = C;
        }

        else if(this._h >= 120 && this._h < 180)
        {
            gPrime = C;
            bPrime = X;
        }

        else if(this._h >= 180 && this._h < 240)
        {
            gPrime = X;
            bPrime = C;
        }

        else if(this._h >= 240 && this._h < 300)
        {
            rPrime = X;
            bPrime = C;
        }

        else if(this._h >= 300 && this._h < 360)
        {
            rPrime = C;
            bPrime = X;
        }

        r = ((rPrime + m) * 255);
        g = ((gPrime + m) * 255);
        b = ((bPrime + m) * 255);

        return new RGB(r,g,b);
    }

    get h()
    {
        return this._h;
    }

    get s()
    {
        return this._s;
    }

    get v()
    {
        return this._v;
    }
}