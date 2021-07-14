class BallRack extends PIXI.Container
{
    constructor()
    {
        super()
        
        this.spriteRack = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['ballrack.png'] )
        this.spriteCircle = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['circleBar.png'] )
        this.spriteRack.anchor.set(0.5)
        this.spriteCircle.anchor.set(0.5)

        this.addChild(this.spriteRack)
        this.addChild(this.spriteCircle)
    }
    setPosition(x, y)
    {
        this.spriteRack.x = x
        this.spriteRack.y = y

        this.spriteCircle.x = x + this.spriteRack.width/2
        this.spriteCircle.y = y
    }
    setScale(scale)
    {
        this.spriteRack.scale.set(scale)
        this.spriteCircle.scale.set(scale)
    }
}