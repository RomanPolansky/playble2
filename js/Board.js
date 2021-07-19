class Board extends PIXI.Container
{
    constructor()
    {
        super()
        this.numTexturesArr = [
            [],
            [],
            [],
            [],
            []
        ]
        this.bingoCount = 0
        this.bingoAnimCompleted = 0
        
        this.sprite = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['bingoboard.png'] )
        this.sprite.anchor.set(0.5)

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
            gapY = 71
    
        for (let i = 0; i < arr.length; i++)
        {
            gapY = 0 + 71 * i
            for (let j = 0; j < 5; j++)
            {
                let num = new Num(arr[i][j])

                num.x = -143 + gapX * j
                num.y = -125 + gapY
                if (j === 1) {num.x += 1.5}
                if (j === 4) {num.x -= 1.5}
                
                this.addChild(num)
                this.DefaultDaubAdd(defaultDaub, num)
                num.on('pointerup', () => {
                    this.NumClick(num)
                })

                this.numTexturesArr[i][j] = num
            }            
        }
        this.CircleAdd()
    }
    NumClick(num)
    {
        let isContain = false
        for (let i in clickedBall)
        {
            if (clickedBall[i] == num.text)
            {
                isContain = true
                break
            }
        }
        if (!num.isClicked)
        {
            if (isContain) 
            {
                num.isClicked = true
                if (num.Circle)
                {
                    num.Circle.destroy()
                }
                let daub = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['daub.png'] )
                let spark = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] )
                daub.anchor.set(0.5)
                daub.scale.set(0)
                daub.x = num.x
                daub.y = num.y - 3
                
                spark.scale.set(0)
                spark.x = num.x
                spark.y = num.y - 3
                this.addChild(spark)
                this.addChild(daub)

                new TWEEN.Tween(daub).to({ scale : {x:0.5, y:0.5} }, 240).easing(TWEEN.Easing.Back.Out).start(game.time)
                new TWEEN.Tween(spark).to({ scale : {x:0.5, y:0.5} }, 220).easing(TWEEN.Easing.Back.Out).start(game.time).onComplete(() => {
                    new TWEEN.Tween(spark).to({ scale : {x:0, y:0}, alpha : 0 }, 200).start(game.time)
                })
                this.CircleAdd()
            }
            else
            {
                new TWEEN.Tween(num).to({ scale : { x : 1.15, y : 1.15 } }, 150).start(game.time).onComplete(() => {
                    new TWEEN.Tween(num).to({ scale : { x : 1, y : 1 } }, 150).start(game.time).onComplete
                })
            }
        }
    }
    DefaultDaubAdd(arr, num)
    {
        for (let i in arr)
        {
            if (arr[i] == num.text)
            {
                num.isClicked = true
                let daub = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['daub.png'] )
                daub.anchor.set(0.5)
                daub.scale.set(0.5)
                daub.x = num.x
                daub.y = num.y - 3
                this.addChild(daub)
            }
        }
    }
    CircleAdd()
    {
        for (let i = 0; i < this.numTexturesArr.length; i++)
        {
            let horisontal = 0
            
            for (let j = 0; j < this.numTexturesArr[i].length; j++)
            {
                if (this.numTexturesArr[i][j].isClicked) {
                    horisontal++

                    if (horisontal == 4)
                    {
                        let tArr = this.numTexturesArr[i]
                        
                        for (let k = 0; k < tArr.length; k++)
                        {
                            if (!tArr[k].isClicked && !tArr[k].preBingo)
                            {
                                tArr[k].preBingo = true
                            }
                        }
                    }
                    if (horisontal == 5)
                    {
                        let tArr = this.numTexturesArr[i]
                        
                        for (let k = 0; k < tArr.length; k++)
                        {
                            if (tArr[k].isClicked && !tArr[k].bingo)
                            {
                                tArr[k].bingo = true
                            }
                        }
                    }
                }
            }
        }
        for (let j = 0; j < this.numTexturesArr[0].length; j++)
        {
            let vertical = 0
            let tArr = []
            for (let i = 0; i < this.numTexturesArr.length; i++){tArr.push(this.numTexturesArr[i][j])}
            for (let i = 0; i < this.numTexturesArr.length; i++)
            {
                if (this.numTexturesArr[i][j].isClicked)
                {
                    vertical++
                    if (vertical == 4)
                    {
                        for (let k = 0; k < tArr.length; k++)
                        {
                            if (!tArr[k].isClicked && !tArr[k].preBingo)
                            {
                                tArr[k].preBingo = true
                            }
                        }
                    }
                    if (vertical == 5)
                    {
                        
                        for (let k = 0; k < tArr.length; k++)
                        {
                            if (tArr[k].isClicked && !tArr[k].bingo)
                            {
                                tArr[k].bingo = true
                            }
                        }
                    }
                }
            }
        }
        let diag1 = 0
        for (let i = 0; i < this.numTexturesArr.length; i++)
        {
            if (this.numTexturesArr[i][i].isClicked)
            {
                diag1++
                if (diag1 == 4)
                {
                    for (let i = 0; i < this.numTexturesArr.length; i++)
                    {
                        if (!this.numTexturesArr[i][i].isClicked && !this.numTexturesArr[i][i].preBingo)
                        {
                            this.numTexturesArr[i][i].preBingo = true
                        }
                    }
                }
                if (diag1 == 5)
                {
                    
                    for (let i = 0; i < this.numTexturesArr.length; i++)
                    {
                        if (this.numTexturesArr[i][i].isClicked && !this.numTexturesArr[i][i].bingo)
                        {
                            this.numTexturesArr[i][i].bingo = true
                        }
                    }
                }
            }
        }

        let diag2 = 0
        for (let i = 0; i < this.numTexturesArr.length; i++)
        {
            if (this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].isClicked)
            {
                diag2++
                if (diag2 == 4)
                {
                    for (let i = 0; i < this.numTexturesArr.length; i++)
                    {
                        if (!this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].isClicked && !this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].preBingo)
                        {
                            this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].preBingo = true
                        }
                    }
                }
                if (diag2 == 5)
                {
                    
                    for (let i = 0; i < this.numTexturesArr.length; i++)
                    {
                        if (this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].isClicked && !this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].bingo)
                        {
                            this.numTexturesArr[i][this.numTexturesArr.length - 1 - i].bingo = true
                        }
                    }
                }
            }
        }
        this.CircleHandler()
        this.BingoHandler()
    }
    
    CircleHandler()
    {
        for (let i = 0; i < this.numTexturesArr.length; i++)
        {
            for (let j = 0; j < this.numTexturesArr[i].length; j++)
            {
                let num = this.numTexturesArr[i][j]
                
                if (num.preBingo && !num.Circle)
                {
                    let circle = new PIXI.Graphics()
                    circle.lineStyle(8, 0xff3b00, 0.45)
                    circle.drawCircle(num.x, num.y - 3, 30)
            
                    let circleShadow = new PIXI.Graphics()
                    circleShadow.lineStyle(3, 0x000000, 0.25)
                    circleShadow.drawCircle(num.x, num.y - 3, 32)

                    let circleCont = new PIXI.Container()
                    circleCont.addChild(circle)
                    circleCont.addChild(circleShadow)

                    this.addChild(circleCont)
                    num.Circle = circleCont
                }
            }
        }
    }
    BingoHandler()
    {
        let count = 0
        for (let i = 0; i < this.numTexturesArr.length; i++)
        {
            for (let j = 0; j < this.numTexturesArr[i].length; j++)
            {
                let num = this.numTexturesArr[i][j]
                
                if (num.bingo && !num.bingoObj)
                {
                    let bingo = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['bingo.png'] )
                    bingo.anchor.set(0.5)
                    bingo.scale.set(0)
                    bingo.x = num.x
                    bingo.y = num.y
                    this.addChild(bingo)
                    num.bingoObj = bingo
                    new TWEEN.Tween(bingo).to({ scale : {x:0.35, y:0.35} }, 200).easing(TWEEN.Easing.Back.Out).start(game.time)
                    count++
                }
            }
        }
     
        if (count >= 4 && count < 9)
        {
            this.bingoCount += 1
        }
        if (count >= 9 && count < 13)
        {
            this.bingoCount += 2
        }
        if (count >= 13 && count < 17)
        {
            this.bingoCount += 3
        }
       
        this.BingoAnim()
    }

    BingoAnim()
    {
        if (this.bingoCount > this.bingoAnimCompleted)
        {
            console.log('бинго', this.bingoCount)
            let bingo = new Bingo()
            this.addChild(bingo)
            this.bingoAnimCompleted++

            console.log('выполнено', this.bingoAnimCompleted)

            let time = 0
            let func = () =>
            {
                time += game.app.ticker.deltaMS
                if (time >= 2300)
                {
                    game.app.ticker.remove(func)
                    this.BingoAnim()
                }
            }
            game.app.ticker.add(func)
        }
    }
}