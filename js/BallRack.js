class BallRack extends PIXI.Container
{
    constructor(board1, board2)
    {
        super()

        this.firstBoard = board1
        this.secondBoard = board2
        this.firstBoardNum = board1.numTexturesArr
        this.secondBoardNum = board2.numTexturesArr

        this.spriteRack = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['ballrack.png'] )
        this.spriteCircle = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['circleBar.png'] )
        this.spriteRack.anchor.set(0.5)
        this.spriteCircle.anchor.set(0.5)

        this.spriteRack.scale.set(1, 1.05)
        this.spriteRack.x -= this.spriteCircle.width/3
        this.spriteCircle.x -= this.spriteCircle.width/3

        this.spriteCircle.x += this.spriteRack.width/2
        this.spriteCircle.y -= 3

        this.moveCount = 4
        this.moveCountText = new PIXI.Text( this.moveCount ,{fontFamily : 'Arial', fontSize: 64, fontWeight: 700, align : 'center'})
        this.moveCountText.anchor.set(0.5)

        this.moveCountText.x = this.spriteCircle.x
        this.moveCountText.y = this.spriteCircle.y + 5

        this.addChild(this.spriteRack)
        this.addChild(this.spriteCircle)
        this.addChild(this.moveCountText)

        this.DefaultFill()

        this.Start()
    }
    Start()
    {
        this.firstTimer = 1000
        this.firstTick = () => {
            this.firstTimer -= game.app.ticker.deltaMS
            if (this.firstTimer <= 0)
            {
                this.NewBall()
                game.app.ticker.remove(this.firstTick)
                game.app.ticker.add(this.startTick)
                game.app.ticker.add(this.startTickSup)
                game.app.ticker.add(this.startTickSupBoard)
            }
        }
        game.app.ticker.add(this.firstTick)

        this.defaultTimer = 5000
        this.timer = this.defaultTimer
        this.timerSup = this.defaultTimer
        this.timerSupBoard = this.defaultTimer
        this.isSupported = false
        this.isSupportedBoard = false
        this.startTick = () =>
        {
            this.timer -= game.app.ticker.deltaMS
            if (this.timer <= 0)
            {
                if (this.moveCount > 1) this.NewBall()
                else if (this.moveCount == 1)
                {
                    this.NewBall()
                    this.MoveScale()
                    game.app.ticker.remove(this.startTick)
                }
                this.timer = this.defaultTimer
            }
        }
        this.startTickSup = () =>
        {
            this.timerSup -= game.app.ticker.deltaMS
            if (this.timerSup <= this.defaultTimer/2 && !this.isSupported){
                game.app.ticker.addOnce(()=>{
                    this.SupportAnim()
                })
                this.isSupported = true
            }
            if (this.timerSup <= 0)
            {
                this.timerSup = this.defaultTimer
                this.isSupported = false
            }
        }
        this.startTickSupBoard = () =>
        {
            this.timerSupBoard -= game.app.ticker.deltaMS
            if (this.timerSupBoard <= this.defaultTimer/2 && !this.isSupportedBoard){
                game.app.ticker.addOnce(()=>{
                    this.firstBoard.SupportAnim()
                    this.secondBoard.SupportAnim()
                })
                this.isSupportedBoard = true
            }
            if (this.timerSupBoard <= 0)
            {
                this.timerSupBoard = this.defaultTimer
            }
        } 
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
    DecrementMove()
    {
        if (this.moveCount > 0)
        {
            this.moveCount--
            this.moveCountText.text = this.moveCount   
        }
    }
    MoveScale()
    {
        new TWEEN.Tween(this.moveCountText).to({ scale : {x:1.1, y:1.1} }, 400).yoyo(true).repeat(Infinity).easing(TWEEN.Easing.Back.Out).start(game.time)
    }
    NewBall()
    {
        let ballCont = new Ball()
    
        activeBall.push(ballCont)
        clickedBall.push(ballCont.children[1].text) 
        this.addChild(ballCont)

        
        activeBall[activeBall.length - 1].x = ballCont.x - this.spriteRack.width/2 + ballCont.ball.width - 50
        activeBall[activeBall.length - 1].scale.set(0)

       
        new TWEEN.Tween(activeBall[activeBall.length - 1]).to({ scale : {x:1, y:1} }, 300).easing(TWEEN.Easing.Back.Out).start(game.time)

        for (let i = 0; i < activeBall.length - 1; i++)
        {
            if (activeBall.length > 6)
            {
                if (i !== 0)
                {
                    new TWEEN.Tween(activeBall[i]).to({ x : activeBall[i].x + ballCont.ball.width }, 350).start(game.time)
                } 
            } else {
                new TWEEN.Tween(activeBall[i]).to({ x : activeBall[i].x + ballCont.ball.width }, 350).start(game.time)
            }
        }
        if (activeBall.length > 6)
        {
            new TWEEN.Tween(activeBall[0]).to({ scale : {x:0, y:0} }, 200).start(game.time).onComplete(()=>{
                activeBall[0].destroy()
                activeBall.splice(0, 1)
            })
        }
        
        this.DecrementMove()
    }
    DefaultFill()
    {
        for (let i = 0; i < 6; i++)
        {
            let ballCont = new Ball()
    
            activeBall.push(ballCont)    
            this.addChild(ballCont)
            
            activeBall[activeBall.length - 1].x = ballCont.x - this.spriteRack.width/2 + ballCont.ball.width - 50

            for (let j = 0; j < activeBall.length - 1; j++)
            {
                activeBall[j].x = activeBall[j].x + ballCont.ball.width
            } 
        }
    }

    SupportAnim()
    {
        for (let i in activeBall)
        {
            let flag = false
            for (let j in this.firstBoardNum)
            {
                for (let k in this.firstBoardNum[j])
                {
                    if (activeBall[i].children[1].text === this.firstBoardNum[j][k].text && !this.firstBoardNum[j][k].isClicked)
                    {
                        flag = true
                    }
                }
            }
            for (let j in this.secondBoardNum)
            {
                for (let k in this.secondBoardNum[j])
                {
                    if (activeBall[i].children[1].text === this.secondBoardNum[j][k].text && !this.secondBoardNum[j][k].isClicked)
                    {
                        flag = true
                    }
                }

            }
            if (flag)
            {
                new TWEEN.Tween(activeBall[i]).to({ scale : {x:1.1, y:1.1} }, 200).delay(600 - 100*i).start(game.time).onComplete(()=>{
                    new TWEEN.Tween(activeBall[i]).to({ scale : {x:1, y:1} }, 200).start(game.time)
                })
            }
        }
    }
}