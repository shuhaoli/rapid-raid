var crates;
var placedCrates;
var remainingCrates = [];
var selectedCrate;


BasicGame.sCrate = function (game) {

};

BasicGame.sCrate.prototype = {

    create: function () {
        // add background image
        this.add.sprite(0,0,'background3');
        
        this.initTurrets();
        this.initCrates();
        this.initMap();
    },

    // initializes the background, buttons and pause panel
    initMap: function() {
       

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
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //Crate Implementation 
        crates = this.add.group();
        placedCrates = this.add.group();

        var numCrates = 8;
        var currentCrate;
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


            remainingCrates.push(currentCrate);
            crates.add(currentCrate);
        }

        this.physics.arcade.enable(crates);
        crates.enableBody = true;

        
        this.editButton = this.add.button(gameWidth - 110, 8, 'editButton', this.addCrate, this);
        this.doneButton = this.add.button(gameWidth - 55, 8, 'editButton', this.editCrates, this);   
    },

    placeCrate: function(pointer) {
        if (selectedCrate != null && !this.physics.arcade.overlap(selectedCrate, placedCrates)) {
            selectedCrate.body.velocity = 0;
            placedCrates.add(selectedCrate);
            selectedCrate = null;
        }
    },

    update: function () {
        if (selectedCrate != null) {
            // 60 is default speed, 50 is 50 ms time requirement
            this.physics.arcade.moveToPointer(selectedCrate, 60, this.input.activePointer, 50);
        }
    },

    restartGame: function() {
        this.state.start('SCrate');
    },

    // consider adding callback for resuming/pausing game in order to sync animation with actual pausing/resuming
    pauseGame: function () {
        if (!this.paused) {
            this.paused = true;
            // show pause panel
            this.pausePanel.show();
            // replace pause button with resume button
            this.pauseButton.visible = false;
            this.resumeButton.visible = true;
        }
        else {
            this.paused = false;
            // hide pause panel
            this.pausePanel.hide();
            // replace resume butotn with pause button
            this.resumeButton.visible = false;
            this.pauseButton.visible = true;
        }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    addCrate: function() {
        selectedCrate = remainingCrates.pop();
        this.input.onDown.add(this.placeCrate, this);
    },

    editCrates: function() {}
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