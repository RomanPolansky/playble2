class Game extends PIXI.Container
{
    constructor()
    {
        super()

        this.app = new PIXI.Application({
            width: 100,
            height: 150,
            antialias: true,
            transparent: false
        })
        document.body.appendChild(this.app.view)


        this.time = 0.0;
        this.deltaTime = 0.0;
    }
    Init()
    {
        this.Start();
    }
    Start()
    {   
        window.addEventListener('resize', ()=>{
            this.Resize()
        })
        this.Resize()
        this.scene = new SceneMain();
        this.app.stage.addChild(this)
        this.addChild(this.scene);
        this.scene.Start(); 
        this.app.ticker.add(this.Update.bind(this));
    }
    Update()
    {
        this.deltaTime = this.app.ticker.deltaMS
        this.time += this.deltaTime
        TWEEN.update(this.time)
    }
    Resize()
    {
        let width = window.innerWidth
        let height = window.innerHeight
        this.app.renderer.resize(width, height)
    }
}