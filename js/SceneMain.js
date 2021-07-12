class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()
    
    }
    Start() {
        this.firstBoard = new Board()
        this.secondBoard = new Board()
        this.ballRack = new BallRack()

        this.HorizontalState()

        this.addChild(this.firstBoard)
        this.addChild(this.secondBoard)
        this.addChild(this.ballRack)



        // this.preloader = new Preloader() 
        
        // this.starting = () =>
        // {
        //     console.log(this.preloader.isVisible)
        //     if (this.preloader.isVisible) {
        //         this.board = new Board()
        //         this.addChild(this.board)
        //         game.app.ticker.remove(this.starting)
        //     }
        // }
        // game.app.ticker.add(this.starting)
    }

    VerticalState()
    {
        let scale = game.app.view.height / (5/2 * this.ballRack.height/1.35 + this.firstBoard.height + this.secondBoard.height) * 1.1

        this.ballRack.setScale(scale / 1.33)
        this.firstBoard.setScale(scale)
        this.secondBoard.setScale(scale)

        this.step_1 = this.ballRack.getHeight() / 2
        this.step_2 = this.ballRack.getHeight() / 2
        this.step_3 = this.ballRack.getHeight() / 2

        this.x_1 = game.app.view.width / 2
        this.y_1 = this.step_1

        this.x_2 = game.app.view.width / 2
        this.y_2 = this.y_1 + this.step_2 + this.firstBoard.getHeight() / 2

        this.x_3 = game.app.view.width / 2
        this.y_3 = this.y_2 + this.secondBoard.getHeight()
        
        this.ballRack.setPosition(this.x_1, this.y_1)
        this.firstBoard.setPosition(this.x_2, this.y_2)
        this.secondBoard.setPosition(this.x_3, this.y_3)
    }

    HorizontalState()
    {
        let scale = game.app.view.width / (this.firstBoard.width/7 + this.firstBoard.width + this.firstBoard.width)

        if (this.firstBoard.height*scale + this.ballRack.height*scale >= game.app.view.height) {
            scale = game.app.view.height/(this.firstBoard.height*scale + this.ballRack.height*scale + this.ballRack.height*scale)
        }

        this.ballRack.setScale(scale / 1.2)
        this.firstBoard.setScale(scale)
        this.secondBoard.setScale(scale)

        this.step_1 = this.ballRack.getHeight() / 2
        this.step_2 = this.ballRack.getHeight() / 2
        this.step_3 = this.ballRack.getHeight() / 2 

        this.x_1 = game.app.view.width / 2
        this.y_1 = this.step_1

        this.x_2 = game.app.view.width / 3 - this.firstBoard.width/7.5 
        this.y_2 = this.y_1 + this.step_2 + this.firstBoard.getHeight() / 2

        this.x_3 = game.app.view.width / 3 * 2 + this.firstBoard.width/7.5 
        this.y_3 = this.y_2
        
        this.ballRack.setPosition(this.x_1, this.y_1)
        this.firstBoard.setPosition(this.x_2, this.y_2)
        this.secondBoard.setPosition(this.x_3, this.y_3)
    }
}