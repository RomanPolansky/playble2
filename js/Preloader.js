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

    constructor()
    {
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
    Destroy()
    {
        for (let i in this.figArray){
            this.figArray[i].destroy()
        }
        this.figArray = []
    }
    Resize() {
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