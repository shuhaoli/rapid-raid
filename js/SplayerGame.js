var walls;
var scoreBoxL;
var scoreL = 0;
var hpL = [];
var gameStarted;
var startEndText;

BasicGame.SplayerGame = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.SplayerGame.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.sprite(0,0,'backgroundGame');
        this.initKeyInput();
        this.initTurrets();
        this.initCrates();
        this.initSprites();
        this.initBoudaries();
        this.initScore();
        this.initMap();
    },

    // initalizes key input
    initKeyInput: function() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
        }
    },

    // initializes the background, buttons and pause panel
    initMap: function() {
        gameStarted = false;
        startEndText = this.add.text(gameWidth/2, gameHeight/2, "Press Any Key to Begin", styleSelection);
        this.input.keyboard.addCallbacks(this, this.onKeyDown);
        startEndText.anchor.setTo(0.5, 0.5);    
        // add buttons
        var buttonWidth = 60;
        var buttonHeight = 20;
        var ypos = scorebarHeight + gameHeight
        var xpos = gameWidth - buttonWidth;

         // add pause button
        this.pauseButton = this.add.button(xpos, ypos, 'smallButton', this.pauseGame, this);
        this.pauseButtonText = this.add.text(xpos + buttonWidth/3, ypos + buttonHeight/2, "Pause", styleSmall);
        this.pauseButtonText.anchor.setTo(0, 0.35);

        // add resume button and set to invisible
        this.playButton = this.add.button(xpos, ypos, 'smallButton', this.pauseGame, this);
        this.playButtonText = this.add.text(xpos + buttonWidth/3, ypos + buttonHeight/2, "Play", styleSmall);
        this.playButtonText.anchor.setTo(0, 0.35);
        this.playButton.visible = false;
        this.playButtonText.visible = false;
        this.paused = false;

        // add pause panel
        this.pausePanel = new PausePanel(this.game);
        this.add.existing(this.pausePanel);
    },

    // initializes turrets
    initTurrets: function() {
        // add turrets with appropriate placement
        var numTurrets = 16;
        var tbspacing = 15;
        var btwspacing = 14;
        var turretSize = 32;


        for (var i = 0; i < numTurrets; i++) {
            if (i < numTurrets/2) {
                this.add.sprite(0,scorebarHeight + i*(turretSize + btwspacing) + tbspacing, 'turretL');
            }
            else {
                this.turret = this.add.sprite(gameWidth - 28, scorebarHeight + (i - numTurrets/2)*(turretSize + btwspacing) + tbspacing, 'turretR');
            }
        }
    },

    // initialize crates
    initCrates: function() {
        crates = this.add.group();
        for (var i = 0; i < aplacedCrates.length; i++) {
            var crateInfo = aplacedCrates[i];
            var currentCrate = crates.create(crateInfo['x'], crateInfo['y'], crateInfo['key']);
            currentCrate.anchor.setTo(0.5, 0.5);
            this.physics.arcade.enable(currentCrate);
            currentCrate.enableBody = true;
            currentCrate.body.immovable = true;
            crates.add(currentCrate);
        }
        this.physics.arcade.enable(crates);
    },

    // initalizes sprites
    initSprites: function() {
        var spriteSize = 32;
        var pos = Math.floor(Math.random() * 2);
        if (pos == 0) {
            this.spriteL = this.add.sprite(gameWidth/2, scorebarHeight + spriteSize,'spriteL');
        }
        else if (pos == 1) {
            this.spriteL = this.add.sprite(gameWidth/2, gameHeight - spriteSize,'spriteL');
        }
        this.spriteL.animations.add('walk');
        this.spriteL.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.spriteL);
    },

    initBoudaries: function() {
        walls = this.add.group();

        leftWall = this.add.sprite(0, scorebarHeight);
        this.physics.arcade.enable(leftWall);
        leftWall.enableBody = true;
        leftWall.body.setSize(28, gameHeight, 0, 0);
        leftWall.body.immovable = true;
        walls.add(leftWall);

        rightWall = this.add.sprite(gameWidth - 28, scorebarHeight);
        this.physics.arcade.enable(rightWall);
        rightWall.enableBody = true;
        rightWall.body.setSize(28, gameHeight, 0, 0);
        rightWall.body.immovable = true;
        walls.add(rightWall);

        topWall = this.add.sprite(0, 0);
        this.physics.arcade.enable(topWall);
        topWall.enableBody = true;
        topWall.body.setSize(gameWidth, scorebarHeight + 5, 0, 0);
        topWall.body.immovable = true;
        walls.add(topWall);

        bottomWall = this.add.sprite(0, scorebarHeight + gameHeight - 5);
        this.physics.arcade.enable(bottomWall);
        bottomWall.enableBody = true;
        bottomWall.body.setSize(gameWidth, menubarHeight + 5, 0, 0);
        bottomWall.body.immovable = true;
        walls.add(bottomWall);

        this.physics.arcade.enable(walls);

    },

    initScore: function() {
        var xpos;
        var ypos = 25;
        var hpSpacing = 12;
        var hpStart = 4;
        var currenthp;

        xpos = 40 + 12*3;
        this.add.sprite(5, 5, 'player');
        scoreBoxL = this.add.text(80, 5, "0", styleMed);
        scoreBoxL.anchor.setTo(1, 0);

        for (i = 0; i < hpStart; i++) {
            currentHp = this.add.sprite(xpos - i*hpSpacing, ypos, 'hp');
            hpL.push(currentHp);
        }
    },

    update: function () {
        if (gameStarted && !this.paused) {
            this.moveSpriteL();
            this.physics.arcade.collide(this.spriteL, walls);
            this.physics.arcade.collide(this.spriteL, crates);
        }            
    },

    updateLeftScore: function(amount) {
        scoreL += amount;
        scoreBoxL.setText(scoreL);
    },

    updateLeftHP: function(amount) {
        if (hpL.length >= amount) {
            while (amount-- != 0)
                hpL.pop().destroy();
        }
        else {
            startEndText.setText("Game Over");
            timer = this.time.create(false);
            timer.add(2000, this.gameOver, this);
            timer.start();
        }
    },

    moveSpriteL: function() {
        this.spriteL.body.velocity.x = 0;
        this.spriteL.body.velocity.y = 0;

        if (this.wasd.up.isDown || this.cursors.up.isDown) {
            this.spriteL.body.velocity.y = -100;
        }
        else if (this.wasd.down.isDown || this.cursors.down.isDown) {
            this.spriteL.body.velocity.y = 100;
        }
        if (this.wasd.left.isDown || this.cursors.left.isDown) {
            this.spriteL.body.velocity.x = -100;
        }
        else if (this.wasd.right.isDown || this.cursors.right.isDown) {
            this.spriteL.body.velocity.x = 100;
        }  
    },

    // consider adding callback for resuming/pausing game in order to sync animation with actual pausing/resuming
    pauseGame: function () {
        if (!this.paused) {
            this.paused = true;
            // show pause panel
            this.pausePanel.show();
            // replace pause button with resume button
            this.pauseButton.visible = false;
            this.pauseButtonText.visible = false;
            this.playButton.visible = true;
            this.playButtonText.visible = true;
            this.spriteL.animations.stop(null, true);
        }
        else {
            this.paused = false;
            // hide pause panel
            this.pausePanel.hide();
            // replace resume butotn with pause button
            this.playButton.visible = false;
            this.playButtonText.visible = false;
            this.pauseButton.visible = true;
            this.pauseButtonText.visible = true;
            this.spriteL.animations.play('walk', 20, true);
        }
    },

    restartGame: function() {
        this.resetInfo();
        this.state.start('SCrate');
    },


    quitGame: function (pointer) {
        this.resetInfo();
        this.state.start('MainMenu');
    },

    gameOver: function() {
        this.resetInfo();
        this.state.start('Sscore');
    },

    // call when game is ending (either restart/gameover)
    // if any of this info is needed in a future state, remove from here
    resetInfo: function() {
        scoreBoxL = null;
        aplacedCrates = [];
        hpL = [];
        hpR = [];
    },

    onKeyDown: function() {        
        if (!gameStarted) {
            startEndText.setText("");
            this.spriteL.animations.play('walk', 20, true);
            gameStarted = true;
        }
    }    
};
