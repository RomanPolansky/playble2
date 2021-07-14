class Board extends PIXI.Container
{
    constructor()
    {
        super()
        
        this.sprite = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['bingoboard.png'] )
        this.sprite.anchor.set(0.5)
        
        let graphics = new PIXI.Graphics();

        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawRect(0, 0, 300, 200);

        this.addChild(this.sprite)
    }
    setPosition(x, y)
    {
        this.x = x
        this.y = y
    }
    setScale(scale)
    {
        this.scale.set(scale)
    }
    numFill(arr)
    {
        let gapX = 71,
            gapY = 72
        this.numCont = new PIXI.Container()
        for (let i = 0; i < arr.length; i++)
        {
            gapY = 0 + 72 * i
            for (let j = 0; j < 5; j++)
            {
                let num = new PIXI.Text(arr[i][j] ,{fontFamily : 'Arial', fontSize: 40, fontWeight: 700, fill : 0x0000, align : 'center'})
                num.hitArea = new PIXI.Circle(0, -5, 30)
                num.interactive = true
                num.buttonMode = true
                num.anchor.set(0.5)
                num.scale.set(0.9)
                this.numCont.addChild(num)
                num.x = -143 + gapX * j
                num.y = -125 + gapY
                if (j === 1) {num.x += 1.5}
                if (j === 4) {num.x -= 1.5}
                
                num.on('pointerup', () => {
                    new TWEEN.Tween(num).to({ scale : { x : 1.22, y : 1.22}}, 180).start(game.time).onComplete(()=>{
                        new TWEEN.Tween(num).to({ scale : { x : 1, y : 1}}, 180).start(game.time)
                    })
                })
            }            
        }
        this.addChild(this.numCont)
    }
}