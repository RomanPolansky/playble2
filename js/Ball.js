class Ball extends PIXI.Container
{
    constructor()
    {
        super()

        this.ballNum = new PIXI.Text( newNumArr[0] ,{fontFamily : 'Arial', fontSize: 40, fontWeight: 700, align : 'center'})
        let ballSrc
        if (newNumArr[0] < 16)                        ballSrc = 'red.png'
        if (newNumArr[0] >= 16 && newNumArr[0] < 31)  ballSrc = 'orange.png'
        if (newNumArr[0] >= 31 && newNumArr[0] < 46)  ballSrc = 'yellow.png'
        if (newNumArr[0] >= 46 && newNumArr[0] < 61)  ballSrc = 'blue.png'
        if (newNumArr[0] >= 61 && newNumArr[0] < 100) ballSrc = 'purple.png'

        newNumArr.splice(0, 1)

        this.ball = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures[ballSrc] )
        this.ballNum.anchor.set(0.5)
        this.ball.anchor.set(0.5)
        this.ball.scale.set(0.44)
        
        this.ballNum.y += 3
        this.y -= 3

        this.addChild(this.ball)
        this.addChild(this.ballNum)
    }
}