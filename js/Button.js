class Button extends PIXI.Container
{
    constructor()
    {
        super()
        this.buttonSprite = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['buttonPS.png'] )
        this.buttonSprite.anchor.set(0.5)
        
        this.addChild(this.buttonSprite)
    }
    setScale(scale)
    {
        this.buttonSprite.scale.set(scale)
    }
    setPosition(x, y)
    {
        this.x = x
        this.y = y
    }
}