var crates;
var currentCrate;


BasicGame.sCrate = function (game) {

};

BasicGame.sCrate.prototype = {

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
        crates = this.add.group();

        var numCrates = 8;
        var xposCrateInit = 20;
        var yposCrateInit = 20;
        var xSpacing = 40;

        for (i = 0; i < numCrates; i++) {
            var randSelection = Math.floor((Math.random() * 3));
            var crateImage;
            if (randSelection == 0){
                crateImage = "darkcrate-32";
            } else if (randSelection == 1) {
                crateImage = "medcrate-24";
            } else {
                crateImage = "lightcrate-16";
            }

            currentCrate = crates.create(xposCrateInit + i*xSpacing, yposCrateInit, crateImage);
            currentCrate.anchor.setTo(0.5, 0.5);


            // currentSprite.originalPosition = currentCrate.position.clone();

            // currentCrate.inputEnabled = true;
            // currentCrate.input.enableDrag();

            // currentCrate.events.onDragStart.add(startDrag, this);
            // currentCrate.events.onDragStop.add(stopDrag, this);

            crates.add(currentCrate);
        }

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable(currentCrate, Phaser.Physics.ARCADE);
        this.input.onDown.add(this.placeCrate, this);

        this.editButton = this.add.button(gameWidth - 110, 8, 'editButton', this.editCrates, this);
        this.doneButton = this.add.button(gameWidth - 55, 8, 'doneButton', this.doneCrates, this);   
    },

    placeCrate: function(pointer) {
        currentCrate.body.velocity = 0;
        currentCrate = null;
    },

    update: function () {
        if (currentCrate != null) {
            // 60 is default speed, 50 is 50 ms time requirement
            this.physics.arcade.moveToPointer(currentCrate, 60, this.input.activePointer, 50);
        }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    editCrates: function() {},

    doneCrates: function() {}
};

// function startDrag(currentSprite) {
//     currentSprite.body.moves = false;    
// }


// function stopDrag(currentSprite) {
//     currentSprite.body.moves = true;
//     //this.physics.arcade.overlap(currentSprite, sprites, function(){
//     //    currentSprite.position.copyFrom(currentSprite.originalPosition);
//     //});
// }

// function editCrates() {
//     //!!!! this is a stub
// }

// function doneCrates() {
//     //!!! this is a stub
// }