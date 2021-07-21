class Packshot extends PIXI.Container
{
    constructor()
    {
        super()

        this.logo = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['title.png'] )
        this.logo.anchor.set(0.5)
        this.logo.scale.set(0.8)
        this.logo.x = -20

        this.button = new Button()
        this.button.setScale(0.5)

        this.logo.y = -this.button.height/1.5
        this.button.y = +this.button.height + 50

        this.addChild(this.logo)
        this.addChild(this.button)
        this.resize()
    }
    resize()
    {
        let scaleVal = game.app.view.height/(this.logo.height + this.button.height + 50)
        if (game.app.view.width <= this.logo.width*scaleVal)
        {
            scaleVal = game.app.view.width/(this.logo.width)
        }
        
        this.scale.set(scaleVal)
        
        this.setPosition(game.app.view.width/2, game.app.view.height/2)
    }
    setPosition(xPos, yPos)
    {
        this.y = yPos
        this.x = xPos
    }
}