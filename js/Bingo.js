class Bingo extends PIXI.Container
{
    constructor(count)
    {
        super()
        this.Rect(count)
        this.y += 16
    }
    Rect(count)
    {
        let src
        if (count == 0) src = 'bingoBG1.png'
        if (count == 1) src = 'bingoBG2.png'
        if (count == 2) src = 'bingoBG3.png'
        this.rect = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures[src] )
        this.rect.interactive = true
        this.rect.anchor.set(0.5)
        this.rect.alpha = 0.75
        this.rect.scale.set(0)
        this.addChild(this.rect)
        new TWEEN.Tween(this.rect).to({ scale : {x:0.99, y:0.99} }, 200).delay(200).easing(TWEEN.Easing.Back.Out).start(game.time).onComplete(() => {
            this.Letters()
        })
    }
    Letters()
    {   
        let B = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['B.png'] )
        let I = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['I.png'] )
        let N = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['N.png'] )
        let G = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['G.png'] )
        let O = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['O.png'] )

        let spark1 = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] ),
            spark2 = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] ),
            spark3 = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] )
        let sparkArr = [spark1, spark3, spark2]
        
        for (let i in sparkArr)
        {
            sparkArr[i].anchor.set(0.5)
            sparkArr[i].alpha = 0
            this.addChild(sparkArr[i])
         
            new TWEEN.Tween(sparkArr[i]).to({ alpha : 1 }, 250).start(game.time)
            new TWEEN.Tween(sparkArr[i]).to({ angle : 360 }, 3500).repeat(Infinity).start(game.time)
        }
        spark1.scale.set(0.8)
        spark2.scale.set(0.85)
        spark3.scale.set(0.8)

        spark1.x -= spark2.width/2.5
        spark3.x += spark2.width/2.5

        let lettersArr = [ B, I, N, G, O ]
        let coordArr = [ -110, -70, -18, 45, 110 ]
        for (let i in lettersArr)
        {
            lettersArr[i].scale.set(0.0)
            lettersArr[i].anchor.set(0.5)
            lettersArr[i].x += coordArr[i]

            this.addChild(lettersArr[i])
            new TWEEN.Tween(lettersArr[i]).to({ scale : {x : 0.9 , y : 0.9} }, 200).delay(100 + 100*i).easing(TWEEN.Easing.Back.Out).start(game.time)
        }
        
        new TWEEN.Tween(this).to({ scale : {x : 0.0 , y : 0.0} }, 100).delay(2000).start(game.time).onComplete(()=>{
            this.destroy()
        })     
    }
}