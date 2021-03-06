class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()
    }
    Start() {
        this.preloader = new Preloader(true) 
        
        this.starting = () =>
        {
            if (this.preloader.isVisible) {
                this.firstBoard = new Board()
                this.secondBoard = new Board()
                this.ballRack = new BallRack(this.firstBoard, this.secondBoard)
                this.button = new Button()

                this.firstBoard.numFill(board_num_1)
                this.secondBoard.numFill(board_num_2)

                this.resize(window.innerWidth, window.innerHeight)
        
                this.addChild(this.ballRack)
                this.addChild(this.firstBoard)
                this.addChild(this.secondBoard)
                this.addChild(this.button)

                game.app.ticker.add(this.checkTime)
                game.app.ticker.remove(this.starting)
            }
        }
        game.app.ticker.add(this.starting)
        
        this.checkTime = () =>
        {
            if (this.ballRack != null && this.ballRack != undefined)
            {
                if (this.ballRack.rackTimer == -1)
                {
                    this.ToPackshot()
                    game.app.ticker.remove(this.checkTime)
                }
            }
        }
        
    }
    ToPackshot()
    {
        this.preloader = new Preloader()
        this.starting = () =>
        {
            if (this.preloader.isVisible) {
                for (let i = 0; i < this.children.length; i++)
                {
                    this.children[i].alpha = 0
                    this.children[i].scale.set(0)
                }

                this.packshot = new Packshot()
                this.packshot.x = game.app.view.width/2
                this.packshot.y = game.app.view.height/2
                
                this.addChild(this.packshot)

                game.app.ticker.remove(this.starting)
            }
        }
        game.app.ticker.add(this.starting)
    }

    resize(width, height)
    {
        if (this.ballRack !== undefined &&
            this.firstBoard !== undefined &&
            this.secondBoard !== undefined &&
            this.button !== undefined)
        {
            width/height < 1.1 ? this.VerticalState(width, height) : this.HorizontalState(width, height)
        }
        if (this.packshot !== undefined)
        {
            this.packshot.resize()
        }
    }

    VerticalState(width, height)
    {
        this.ballRack.setScale(1)
        this.firstBoard.setScale(1)
        this.secondBoard.setScale(1)
        this.button.setScale(1)

        let scale = height / (this.ballRack.height/1.4 + this.firstBoard.height + this.secondBoard.height + this.button.height/2)

        this.ballRack.setScale(scale / 1.4)
        this.firstBoard.setScale(scale)
        this.secondBoard.setScale(scale)
        this.button.setScale(scale / 3)

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
        this.button.setPosition(this.x_3, this.y_3 + this.secondBoard.height/2 + this.button.height/1.5)
    }

    HorizontalState(width, height)
    {
        this.ballRack.setScale(1)
        this.firstBoard.setScale(1)
        this.secondBoard.setScale(1)
        this.button.setScale(1)

        let scale = height / (this.ballRack.height/1.2 + this.firstBoard.height + this.button.height/2)

        this.ballRack.setScale(scale / 1.2)
        this.firstBoard.setScale(scale)
        this.secondBoard.setScale(scale)
        this.button.setScale(scale / 3)

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
        this.button.setPosition(game.app.view.width / 2, this.y_3 + this.firstBoard.height / 2 + this.button.height / 1.8)
    }
}