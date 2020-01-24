export default class Dimension
{
    constructor(w,h)
    {
        this._w = w;
        this._h = h;
    }

    get w()
    {
        return this._w;
    }

    get h()
    {
        return this._h;
    }
}