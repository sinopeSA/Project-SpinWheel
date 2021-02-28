//Set up basic game with Phaser

//brackets IDE
let prizes_config ={
    count:12,
    prize_name :[ "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"]
};

let config = {
    width : 1024,
    height : 720,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
let game = new Phaser.Game(config);
    
function preload(){
    //load an image
    console.log(this);
    this.load.image('background',"Assets/back.jpg");
    this.load.image('wheel',"Assets/wheel.png");
    
    this.load.image('stand',"Assets/stand.png"); this.load.image('pin',"Assets/pin.png");
    
    
}
function create(){
    //create that image
    let W = game.config.width;
    let H = game.config.height;
    
    this.add.sprite(W/2,H/2,'background');
    
    let pin = this.add.sprite(W/2,H/2-250,'pin').setScale(0.25);
    
    pin.depth = 3;
    
    this.add.sprite(W/2,H/2 + 250,'stand').setScale(0.25);
    
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); 
    console.log(this.wheel.depth);
    this.input.on("pointerdown",spinwheel,this);
    
    font_style ={
        font : "bold 30px Arial",
        align : " Center",
        color: "red",
    }
    this.game_text = this.add.text(W/2 - 225, 30,"Welcome to Spin and Win",font_style);
    
}
function update(){
    console.log("In Update");
    //this.wheel.angle -= 1;
    
}

function spinwheel(){
    console.log("Time to spin the wheel");
    
    let rounds = Phaser.Math.Between(2,4);
    console.log(rounds);
    
    let extra_degrees = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_degrees;
     let idx = prizes_config.count -(1+Math.floor(extra_degrees/(360/prizes_config.count)));
    
    let tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease:"Cubic.easeOut",
        duration: 3000,
        callbackScope:this,
        onComplete :function(){
            this.game_text.setText("You Won "+prizes_config.prize_name[idx]);
        },
    });
}