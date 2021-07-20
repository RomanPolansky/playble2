class Num extends PIXI.Text
{
    constructor(text)
    {
        super(text, {fontFamily : 'Arial', fontSize: 40, fontWeight: 700, align : 'center'})

        this.hitArea = new PIXI.Circle(0, -5, 30)
        this.interactive = true
        this.buttonMode = true
        this.anchor.set(0.5)
        
        this.isClicked = false
        
        this.preBingo = false
        this.Circle = null

        this.bingo = false
        this.bingoObj = null
    }
}