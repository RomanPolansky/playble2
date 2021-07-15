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
        if (!num.isClicked)
        {
            num.isClicked = true
            if (num.Circle)
            {
                num.Circle.destroy()
            }
            let daub = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['daub.png'] )
            daub.anchor.set(0.5)
            daub.scale.set(0)
            daub.x = num.x
            daub.y = num.y - 3
            this.addChild(daub)
            new TWEEN.Tween(daub).to({ scale : {x:0.5, y:0.5} }, 150).easing(TWEEN.Easing.Back.Out).start(game.time)
            this.CircleAdd()
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
                        console.log(tArr)
                        for (let k = 0; k < tArr.length; k++)
                        {
                            if (!tArr[k].isClicked && !tArr[k].preBingo)
                            {
                                console.log(tArr[k])
                                tArr[k].preBingo = true
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
            }
        }
        this.CircleHandler()
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
}