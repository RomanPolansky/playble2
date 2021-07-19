class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()
    }
    Start() {
        this.preloader = new Preloader() 
        
        this.starting = () =>
        {
            if (this.preloader.isVisible) {
                this.firstBoard = new Board()
                this.secondBoard = new Board()
                this.ballRack = new BallRack()
                this.button = new Button()

                this.firstBoard.numFill(board_num_1)
                this.secondBoard.numFill(board_num_2)

                this.resize(window.innerWidth, window.innerHeight)
        
                this.addChild(this.firstBoard)
                this.addChild(this.secondBoard)
                this.addChild(this.ballRack)
                this.addChild(this.button)

                game.app.ticker.remove(this.starting)
            }
        }
        game.app.ticker.add(this.starting)
    }

    resize(width, height)
    {
        width/height < 1.1 ? this.VerticalState(width, height) : this.HorizontalState(width, height)
    }

    VerticalState(width, height)
    {
        this.ballRack.setScale(1)
        this.firstBoard.setScale(1)
        this.secondBoard.setScale(1)
        this.button.setScale(1)

        let scale = height / (this.ballRack.height/1.33 + this.firstBoard.height + this.secondBoard.height + this.button.height/1.6)

        this.ballRack.setScale(scale / 1.33)
        this.firstBoard.setScale(scale)
        this.secondBoard.setScale(scale)
        this.button.setScale(scale / 1.6)

        this.step = this.ballRack.height / 2

        this.x_1 = game.app.view.width / 2
        this.y_1 = this.step

        this.x_2 = game.app.view.width / 2
        this.y_2 = this.y_1 + this.step + this.firstBoard.height / 2

        this.x_3 = game.app.view.width / 2
        this.y_3 = this.y_2 + this.secondBoard.height
        
        this.ballRack.setPosition(this.x_1, this.y_1)
        this.firstBoard.setPosition(this.x_2, this.y_2)
        this.secondBoard.setPosition(this.x_3, this.y_3)
        this.button.setPosition(this.x_3, this.y_3 + this.secondBoard.height/2 + this.button.height/2)
    }

    HorizontalState(width, height)
    {
        this.ballRack.setScale(1)
        this.firstBoard.setScale(1)
        this.secondBoard.setScale(1)
        this.button.setScale(1)

        let scale = height / (this.ballRack.height/1.2 + this.firstBoard.height + this.button.height/1.8)

        this.ballRack.setScale(scale / 1.2)
        this.firstBoard.setScale(scale)
        this.secondBoard.setScale(scale)
        this.button.setScale(scale / 1.8)

        this.step = this.ballRack.height / 1.7

        this.x_1 = game.app.view.width / 2
        this.y_1 = this.step

        this.x_2 = game.app.view.width/2 - this.firstBoard.width/2
        this.y_2 = this.y_1 + this.step + this.firstBoard.height / 2

        this.x_3 = game.app.view.width/2 + this.secondBoard.width/2
        this.y_3 = this.y_2
        
        this.ballRack.setPosition(this.x_1, this.y_1)
        this.firstBoard.setPosition(this.x_2, this.y_2)
        this.secondBoard.setPosition(this.x_3, this.y_3)
        this.button.setPosition(game.app.view.width / 2, this.y_3 + this.firstBoard.height / 2 + this.button.height / 2.5)
    }
}