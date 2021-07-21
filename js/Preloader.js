class Preloader
{
    app = game.app /* canvas */

    colorArray = [
        0xff0f00,
        0xff7b00,
        0xffa900,
        0x0087ff,
        0x6500ff
    ]
    figArray = [
        this.preFig1,
        this.preFig2,
        this.preFig3,
        this.preFig4,
        this.preFig5
    ]
    isVertical
    isVisible = false
    owerflowLength = 1000
    container = new PIXI.Container()

    constructor(isText)
    {
        this.isText = isText
        if (this.app.view.width > this.app.view.height)
        {
            this.isVertical = true
        } else
        {
            this.isVertical = false
        }

        for (let i in this.figArray)
        {
            if (this.isVertical)
            {
                this.figArray[i] = new PIXI.Graphics()
                this.figArray[i].beginFill(this.colorArray[i],)
                this.figArray[i].drawRect(
                    this.app.view.width,           /* x position */
                    i * this.app.view.height/5,    /* y position */
                    this.app.view.width + this.owerflowLength,
                    this.app.view.height/5
                )

            }
            else
            {
                this.figArray[i] = new PIXI.Graphics()
                this.figArray[i].beginFill(this.colorArray[i],)
                this.figArray[i].drawRect(
                    i * this.app.view.width/5,    /* x position */
                    this.app.view.height,         /* y position */
                    this.app.view.width/5,
                    this.app.view.height + this.owerflowLength
                )
            }
            this.container.addChild(this.figArray[i])
        }
        if (isText)
        {
            this.AddText()
        }

        this.app.stage.addChild(this.container)

        for (let i in this.figArray)
        {
            if (this.isVertical)
            {
                new TWEEN.Tween(this.figArray[i]).to({ x : -this.app.view.width }, 300 + 20 * i).start(game.time).onComplete(()=>{

                    if (i == 4) this.isVisible = true

                    new TWEEN.Tween(this.figArray[i]).to({ x : this.app.view.width + this.owerflowLength/2}, 600).delay(800).start(game.time).onComplete(()=>{
                        if (i == 4) this.Destroy()
                    })
                })
            }
            else
            {
                new TWEEN.Tween(this.figArray[i]).to({ y : -this.app.view.height }, 300 + 20 * i).start(game.time).onComplete(()=>{

                    if (i == 4) this.isVisible = true
                    
                    new TWEEN.Tween(this.figArray[i]).to({ y : this.app.view.height + this.owerflowLength/2}, 600).delay(800).start(game.time).onComplete(()=>{
                        if (i == 4) this.Destroy()
                    })
                })
            }
        }

        window.addEventListener('resize', ()=>{
            this.Resize()
        })
    }
    AddText()
    {
        let txt,
            txtSize
        if (!this.isVertical)
        {
            txt = 'FIND\nTHE\nBINGO'
        }
        else
        {
            txt = `FIND THE BINGO`
        }

        txtSize = 60
        if (this.app.view.width >= 750 && this.app.view.height >= 750) txtSize = 80
        if (this.app.view.width >= 1000 && this.app.view.height >= 1000) txtSize = 100
        
        this.text = new PIXI.Text(txt,{
            fontFamily : 'BQ',
            fontSize: txtSize,
            fill : 0xffffff,
            align : 'center',
            stroke: 0x000000,
            strokeThickness: 6
        })
        this.text.anchor.set(0.5)
        this.text.x = this.app.view.width / 2
        this.text.y = this.app.view.height / 2
        this.text.alpha = 0
        new TWEEN.Tween(this.text).to({ alpha : 1 }, 250).start(game.time).onComplete(()=>{
            new TWEEN.Tween(this.text).to({ alpha : 0 }, 250).delay(800).start(game.time)
        })
        this.container.addChild(this.text)
    }
    Destroy()
    {
        for (let i in this.figArray){
            this.figArray[i].destroy()
        }
        this.figArray = []
    }
    Resize() {
        if (this.text != undefined && this.text != null)
        {
            this.text.scale.set(0)
            this.text.alpha = 0
        }
        if (this.figArray.length == 5)
        {
            for (let i in this.figArray){
                if (this.isVertical)
                {
                    this.figArray[i].height = this.app.view.height/5
                } else 
                {
                    this.figArray[i].width = this.app.view.width/5
                }
            }
        }   
    }
}