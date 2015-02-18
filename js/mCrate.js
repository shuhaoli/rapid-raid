
BasicGame.mCrate = function (game) {

     //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.mCrate.prototype = {

    create: function () {
        this.initMap();
        this.initTurrets();
        this.initCrates();
    },

    // initializes the background, buttons and pause panel
    initMap: function() {
         // add background image
        this.add.sprite(0,0,'background3');
        
        // add menu buttons
        var buttonWidth = 60;
        var buttonHeight = 20;
        var ypos = scorebarHeight + gameHeight + (menubarHeight - buttonHeight)/2;
        var xpos = gameWidth - buttonWidth;


        // add pause button and set to invisible
        this.pauseButton = this.add.button(xpos, ypos, 'pauseButton', this.pauseGame, this);

        // add resume button and set to invisible
        this.resumeButton = this.add.button(xpos, ypos, 'resumeButton', this.pauseGame, this);
        this.resumeButton.visible = false;
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

    // initializes crates/crate placement bar
    initCrates: function() {        
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

        this.editButton = this.add.button(gameWidth - 110, 8, 'editButton', editCrates, this);
        this.doneButton = this.add.button(gameWidth - 55, 8, 'doneButton', doneCrates, this);   
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
