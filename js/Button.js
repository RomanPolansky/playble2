class Button extends PIXI.Container
{
    constructor()
    {
        super()
        this.buttonSprite = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['button.png'] )
        this.buttonSprite.anchor.set(0.5)
        this.buttonText = new PIXI.Text('PLAY NOW',{
            fontFamily : 'BQ',
            fontSize: 65,
            fill : 0xffffff,
            align : 'center',
            stroke: 0x36930b,
            strokeThickness: 8
        })
        this.buttonText.anchor.set(0.5)
        
        this.addChild(this.buttonSprite)
        this.addChild(this.buttonText)

        this.interactive = true
        this.buttonMode = true
        this.on('pointerup', () => {
            console.log('go to store')
            clickSound.play()
        })
        this.ScaleAnim()
    }
    setScale(scale)
    {
        this.buttonSprite.scale.set(scale)
        this.buttonText.scale.set(scale*2)
    }
    ScaleAnim()
    {
        new TWEEN.Tween(this).to({ scale : {x:0.95, y:0.95} }, 550).yoyo(true).repeat(Infinity).start(game.time)
    }
    setPosition(x, y)
    {
        this.x = x
        this.y = y
    }
}