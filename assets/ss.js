let isLoad = false
let jsonSS = 'assets/ss.json'
PIXI.Loader.shared
           .add(jsonSS)
           .load(gameStart)