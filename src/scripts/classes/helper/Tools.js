export default class Tools
{
    static rotate(ctx, shape, angle)
    {
        ctx.translate(shape.position.x, shape.position.y);
        ctx.rotate(angle);
        ctx.translate(-shape.position.x, -shape.position.y);
    }

    static randNum(lowerBound, upperBound)
    {
        return Math.random() * upperBound + lowerBound;
    }

    static randNumFloor(lowerBound, upperBound)
    {
        return Math.floor(Math.random() * upperBound + lowerBound);
    }
    static randRGB()
    {
        return [Tools.randNum(0,255), Tools.randNum(0,255), Tools.randNum(0,255)];
    }

    static mutatedRGB(r,g,b,pcent=0.1)
    {
        //Mutated RGB values are within +/- 10 % of parent's RGB
        let rBounds = pcent * r,
            gBounds = pcent * g,
            bBounds = pcent * b;

        return [Tools.randNum((r-rBounds),(r+rBounds)),Tools.randNum((g-gBounds),(g+gBounds)),Tools.randNum((b-bBounds),(b+bBounds))];

        
    }
}