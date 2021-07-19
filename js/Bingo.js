class Bingo extends PIXI.Container
{
    constructor()
    {
        super()
        this.Rect()
        this.y += 15
    }
    Rect()
    {
        this.rect = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['rect.png'] )
        this.rect.interactive = true
        this.rect.anchor.set(0.5)
        this.rect.alpha = 0.8
        this.rect.scale.set(0)
        this.addChild(this.rect)
        new TWEEN.Tween(this.rect).to({ scale : {x:1, y:1} }, 200).delay(200).easing(TWEEN.Easing.Back.Out).start(game.time).onComplete(() => {
            this.Letters()
        })
    }
    Letters()
    {
        let spark_1 = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] ),
            spark_2 = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] ),
            spark_3 = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['spark.png'] )

        spark_2.x -= 100
        spark_3.x += 100
        this.addChild(spark_1)
        this.addChild(spark_2)
        this.addChild(spark_3)
        
        let B = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['B.png'] )
        let I = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['I.png'] )
        let N = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['N.png'] )
        let G = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['G.png'] )
        let O = new PIXI.Sprite( PIXI.Loader.shared.resources[jsonSS].textures['O.png'] )

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