/**
    @module loader
    @namespace game
**/
game.module(
    'engine.loader'
)
.body(function(){ 'use strict';

/**
    @class Loader
    @extends game.Class
**/
game.Loader = game.Class.extend({
    /**
        Game scene to start, when loader is finished.
        @property {game.Scene} gameScene
    **/
    gameScene: null,
    /**
        Number of files loaded.
        @property {Number} loaded
    **/
    loaded: 0,
    /**
        Percent of files loaded.
        @property {Number} percent
    **/
    percent: 0,
    done: false,
    timerId: 0,
    assets: [],
    audioAssets: [],
    audioUnloaded: 0,
    startTime: null,
    endTime: null,
    tweens: [],

    init: function(gameScene, resources, audioResources) {
        if(this.backgroundColor) {
            var bg = new game.Graphics();
            bg.beginFill(this.backgroundColor);
            bg.drawRect(0, 0, game.system.width, game.system.height);
            game.system.stage.addChild(bg);
        }

        this.gameScene = gameScene;
        this.timer = new game.Timer();

        var i, path;
        for (i = 0; i < resources.length; i++) {
            path = this.getPath(resources[i]);
            this.assets.push(path);
        }

        for (i = 0; i < audioResources.length; i++) {
            this.audioAssets.push(audioResources[i]);
        }
        this.audioUnloaded = this.audioAssets.length;

        if(this.assets.length > 0) {
            this.loader = new game.AssetLoader(this.assets, true);
            this.loader.onProgress = this.progress.bind(this);
            this.loader.onComplete = this.complete.bind(this);
            this.loader.onError = this.error.bind(this);
        }

        if(this.assets.length === 0 && this.audioAssets.length === 0) this.percent = 100;

        this.initStage();

        if(this.assets.length === 0 && this.audioAssets.length === 0) this.ready();
        else this.startTime = Date.now();
    },

    initStage: function() {
        this.text = new game.Text(this.percent+'%',{font:'30px Arial',fill:'#ffffff'});
        this.text.position.x = game.system.width / 2 - this.text.width / 2;
        this.text.position.y = game.system.height/2 + 80;
        game.system.stage.addChild(this.text);

        var imageData = 'data:image/png;base64,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';
        if(game.device.ie) imageData += '?' + Date.now();
        this.symbol = new game.Sprite(game.system.width/2 - 8, game.system.height/2 + 70, PIXI.Texture.fromImage(imageData, true), {
            anchor: {x: 0.5, y: 1.0},
            rotation: -0.1
        });
        game.system.stage.addChild(this.symbol);

        if(game.Tween) {
            var tween = new game.Tween(this.symbol, {rotation: 0.1}, 0.5, {
                easing: game.Tween.Easing.Cubic.InOut,
                loop: game.Tween.Loop.Reverse
            });
            this.tweens.push(tween);
            tween.start();
        }
    },

    getPath: function(path) {
        return game.system.retina || game.system.hires ? path.replace(/\.(?=[^.]*$)/, '@2x.') : path;
    },

    start: function() {
        if(this.assets.length > 0) this.loader.load();
        else this.loadAudio();
        this.loopId = game.setGameLoop(this.run.bind(this), game.system.canvas);
    },

    error: function() {
        if(!this.text) return;
        this.text.setText('ERR');
        this.text.updateTransform();
        this.text.position.x = game.system.width / 2 - this.text.width / 2;
        this.onPercentChange = function() {};
    },

    progress: function() {
        this.loaded++;
        this.percent = Math.round(this.loaded / (this.assets.length + this.audioAssets.length) * 100);
        this.onPercentChange();
    },

    onPercentChange: function() {
        if(!this.text) return;
        this.text.setText(this.percent+'%');
        this.text.updateTransform();
        this.text.position.x = game.system.width / 2 - this.text.width / 2;
    },

    complete: function() {
        if(this.audioAssets.length > 0) this.loadAudio();
        else this.ready();
    },

    loadAudio: function() {
        for (var i = this.audioAssets.length - 1; i >= 0; i--) {
            this.audioAssets[i].load(this.audioLoaded.bind(this));
        }
    },

    audioLoaded: function(path, status) {
        this.progress();

        if(status) {
            this.audioUnloaded--;
        }
        else {
            if(this.text) this.text.setText('ERR');
            throw('Failed to load audio: ' + path);
        }

        if(this.audioUnloaded === 0) this.ready();
    },

    run: function() {
        game.Timer.update();
        this.delta = this.timer.delta();
        this.update();
        this.render();
    },

    update: function() {
        for (var i = this.tweens.length - 1; i >= 0; i--) {
            this.tweens[i].update();
            if(this.tweens[i].complete) this.tweens.erase(this.tweens[i]);
        }
    },

    render: function() {
        game.system.renderer.render(game.system.stage);
    },

    ready: function() {
        if(this.done) return;
        this.done = true;

        var timeout = game.Loader.timeout * 1000;
        if(this.startTime) {
            this.endTime = Date.now();
            timeout -= this.endTime - this.startTime;
        }
        if(timeout < 100) timeout = 100;

        if(game.system.retina || game.system.hires) {
            for(var i in game.TextureCache) {
                if(i.indexOf('@2x') !== -1) {
                    game.TextureCache[i.replace('@2x', '')] = game.TextureCache[i];
                    delete game.TextureCache[i];
                }
            }
        }

        setTimeout(this.preEnd.bind(this), timeout);
    },

    preEnd: function() {
        this.end();
    },

    end: function() {
        game.Timer.time = Number.MIN_VALUE;
        game.clearGameLoop(this.loopId);
        game.system.setScene(this.gameScene);
    }
});

/**
    Minimum time to show preloader, in seconds.
    @attribute {Number} timeout
    @default 0.5
    @example
        game.Loader.timeout = 1;
**/
game.Loader.timeout = 0.5;

});
