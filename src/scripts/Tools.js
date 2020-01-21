export default class Tools
{
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
}