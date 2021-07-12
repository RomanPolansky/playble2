class BallRack extends PIXI.Container
{
    constructor()
    {
        super()
        
        this.spriteRack = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['ballrack.png'] )
        this.spriteRack.anchor.set(0.5)

        this.addChild(this.spriteRack)
    }
    getWidth()
    {
        return this.spriteRack.width
    }
    getHeight()
    {
        return this.spriteRack.height
    }
    setPosition(x, y)
    {
        this.spriteRack.x = x
        this.spriteRack.y = y
    }
    setScale(scale)
    {
        this.spriteRack.scale.set(scale)
    }
}