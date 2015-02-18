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

var sprites;

BasicGame.SplayerGame.prototype = {
    // start game in paused state
    create: function () {
        // add background image
        this.add.sprite(0,0,'background3');
        
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

        var medButtonWidth = 50;
        var medButtonHeight = 40;

        // add edit button
        this.editButton = this.add.button(gameWidth - medButtonWidth, 0, 'medButton', editCrates, this);
        this.editButtonText = this.add.text(gameWidth - medButtonWidth, medButtonHeight/2, 'Edit', styleMed);        
        this.editButtonText.anchor.setTo(0, 0.35);

        // add add button
        this.addButton = this.add.button(gameWidth - medButtonWidth*2, 0, 'medButton', doneCrates, this);
        this.addButtonText = this.add.text(gameWidth - medButtonWidth*2, medButtonHeight/2, 'Add', styleMed);
        this.addButtonText.anchor.setTo(0, 0.35);

        // add pause panel
        this.pausePanel = new PausePanel(this.game);
        this.add.existing(this.pausePanel);

        // add turrets with appropriate placement
        tbspacing = 15;
        btwspacing = 14;
        turretSize = 32;

        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                this.add.sprite(0,scorebarHeight + i*(turretSize + btwspacing) + tbspacing, 'turretL');
            }
            else {
                this.turret = this.add.sprite(gameWidth - 28, scorebarHeight + (i - 8)*(turretSize + btwspacing) + tbspacing, 'turretR');
            }
        }

        //Crate Implementation 
        sprites = this.add.group();

        var currentSprite;
        var numCrates = 8;
        var xposCrateInit = 20;
        var yposCrateInit = 20;
        var xSpacing = 40;

        for (i = 0; i < 8; i++) {
            var randSelection = Math.floor((Math.random() * 3));
            var crateImage;
            if (randSelection == 0){
                crateImage = "darkcrate-32";
            } else if (randSelection == 1) {
                crateImage = "medcrate-24";
            } else {
                crateImage = "lightcrate-16";
            }

            currentSprite = sprites.create(xposCrateInit + i*xSpacing, yposCrateInit, crateImage);
            currentSprite.anchor.setTo(0.5, 0.5);

            this.physics.arcade.enable(currentSprite);

            currentSprite.originalPosition = currentSprite.position.clone();

            currentSprite.inputEnabled = true;
            currentSprite.input.enableDrag();

            currentSprite.events.onDragStart.add(startDrag, this);
            currentSprite.events.onDragStop.add(stopDrag, this);

            sprites.add(currentSprite);
        }

       

    },



    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //if (!this.paused) 
         //   this.turret.reset(Math.random()*gameWidth, Math.random()*gameHeight);
    },

    restartGame: function() {
        this.state.start('SplayerGame');
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
        }
    },


    quitGame: function (pointer) {

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }


};

function startDrag(currentSprite) {
    currentSprite.body.moves = false;    
}


function stopDrag(currentSprite) {
    currentSprite.body.moves = true;
    //this.physics.arcade.overlap(currentSprite, sprites, function(){
    //    currentSprite.position.copyFrom(currentSprite.originalPosition);
    //});
}

function editCrates() {
    //!!!! this is a stub
}

function doneCrates() {
    //!!! this is a stub
}
