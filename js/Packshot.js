class Packshot extends PIXI.Container
{
    constructor()
    {
        super()

        this.logo = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['title.png'] )
        this.logo.anchor.set(0.5)
        this.logo.x = -20

        this.button = new Button()
        this.button.setScale(0.5)

        this.logo.y = -this.button.height + 10
        this.button.y = +this.button.height + 80

        this.addChild(this.logo)
        this.addChild(this.button)
        this.resize()
    }
    resize()
    {
        let scaleVal = game.app.view.height/(this.logo.height + this.button.height)
        if (game.app.view.width <= this.logo.width*scaleVal)
        {
            scaleVal = game.app.view.width/(this.logo.width)
        }
        
        this.scale.set(scaleVal + 0.06)
        
        this.setPosition(game.app.view.width/2, game.app.view.height/2)
    }
    setPosition(xPos, yPos)
    {
        this.y = yPos
        this.x = xPos
    }
}