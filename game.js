var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var platforms;
var player;
var hat;
var score;
var death;
var cursors;
var points = 0;
var jumpButton;
var jumpTime = 0;

function preload() {
    console.log("preloading...")
    game.load.image('player','assets/dick.jpg')
    game.load.image('hat','assets/mexican.png')
    game.load.image('platform','assets/platform.png')
}

function create() { 
    game.stage.backgroundColor = '#72C257';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 250;
    player = game.add.sprite(0,0,'player');
    game.physics.enable(player,Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.10;
    player.body.collideWorldBounds = true;
    platforms = this.add.physicsGroup();
    platforms.create(50, 200, 'platform');
    platforms.create(200, 200, 'platform');
    platforms.create(300, 250, 'platform');
    platforms.create(400, 250, 'platform');
    platforms.create(200, 400, 'platform');
    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);
    hats = this.add.physicsGroup();
    hats.create(125, 170, 'hat');
    hats.create(315, 150, 'hat');
    hats.create(410, 150, 'hat');
    hats.create(205, 350, 'hat');

    score = game.add.text(0, 0, _pointsText());
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    cursors = game.input.keyboard.createCursorKeys();
}
function _pointsText() {
    return "You have deported " + points + " mexican(s).";
}


function update() {
    game.backgroundColor = '#ff0000';
     game.physics.arcade.collide(player, platforms);
     game.physics.arcade.collide(hats, platforms);
     game.physics.arcade.overlap(player, hats, incrementScore);

    player.body.velocity.x = 0;


    if (cursors.left.isDown) {
        player.body.velocity.x = -120;
    }

    if (cursors.right.isDown) {
        player.body.velocity.x = 120;
    }
}

function incrementScore(p, s) {
    s.kill();
    points += 1;
}
if (cursors.up.isDown && (player.body.touching.down || player.body.onFloor()) && game.time.now > jumpTime) {
        player.body.velocity.y = -170;
        jumpTime = game.time.now + 750;
    }


