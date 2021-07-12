class Board extends PIXI.Container
{
    constructor()
    {
        super()
        
        this.sprite = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['bingoboard.png'] )
        this.sprite.anchor.set(0.5)
        
        this.addChild(this.sprite)
    }
    getWidth()
    {
        return this.sprite.width
    }
    getHeight()
    {
        return this.sprite.height
    }
    setPosition(x, y)
    {
        this.sprite.x = x
        this.sprite.y = y
    }
    setScale(scale)
    {
        this.sprite.scale.set(scale)
    }
}