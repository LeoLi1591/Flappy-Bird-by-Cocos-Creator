import { _decorator,AudioSource, BoxCollider2D, Button, Collider2D, Component, Director, director, EventTouch, instantiate, Label, log, Node, Prefab, Quat, Sprite, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export enum GameStatus{
    Game_Ready = 0,
    Game_Playing,
    Game_Over,
}

import { AudioController } from './AudioController';
import { SoundType } from './AudioController';

@ccclass('MainController')
export class MainController extends Component {
   // @property(Label)
   // label : Label = null;

    @property(Sprite)
    SpBackGround : Sprite[] = [null,null];

    @property(Prefab)
    pipePrefab : Prefab  = null;

    @property(Node)
    bird : Node = null;

    @property(Label)
    scoreLabel:Label = null;

    audioControl = null;

    pipe : Node[]  = [null,null,null];

    gameStatus : GameStatus = GameStatus.Game_Ready;
    spGameOver:Sprite = null;
    spGameStart:Sprite = null;
    restartBtn:Sprite = null;
    gameScore = 0;

    onLoad(){
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(Sprite);
        this.spGameOver.node.active = false;
        this.spGameStart = this.node.getChildByName("GameStart").getComponent(Sprite)
        this.spGameStart.node.on(Node.EventType.TOUCH_END, this.touchStartBtn, this)
        this.spGameStart.node.active = true;
        this.spGameOver.node.on(Node.EventType.TOUCH_END, this.touchStartBtn, this)
        this.bird.active =false;
        this.restartBtn = this.node.getChildByName("restartBtn").getComponent(Sprite);
        this.restartBtn.node.active = false;
        this.scoreLabel.node.active = false;
        this.gameScore = 0;
        this.audioControl = this.node.getChildByName("AudioNode").getComponent("AudioController");
    }

    start() {
        console.log("hello2")
        this.gameStatus = GameStatus.Game_Ready;
        this.generatePipes();                
    }

    update(deltaTime: number) {
        if(this.gameStatus != GameStatus.Game_Playing) return;
        this.moveBackGround();
        this.movePipe();
    }

    // listener to touch event to start game
    touchStartBtn(event:EventTouch){
        this.bird.active =true;
        this.restartBtn.node.active = false;
        this.spGameStart.node.active =false;
        this.gameStatus = GameStatus.Game_Playing;
        this.spGameOver.node.active = false;
        for(var i=0;i<3;i++){
            var pos = this.pipe[i].getPosition()
            pos.x = 170 + 200 * i
            var minY = -170
            var maxY = 170
            pos.y = minY + Math.random() * (maxY - minY)
            this.pipe[i].setPosition(pos)
        }
        
        this.bird.setPosition(new Vec3(0,0,0))
        this.bird.setRotation(new Quat())

        this.gameScore = 0;
        this.scoreLabel.string = this.gameScore.toString();

        this.scoreLabel.node.active = true;
    }


    // move the background backward to make bird as flying forward
    moveBackGround(){
        for (var i = 0; i < 2; i++) {
            var pos = this.SpBackGround[i].node.getPosition();
            pos.x -= 1.0;
            if (pos.x <= -288) {
                pos.x = 288;
            }
            this.SpBackGround[i].node.setPosition(pos)
        }
    }

    // create pipes in beginning
    generatePipes(){
        for(var i = 0; i <3; i++){
            this.pipe[i] = instantiate(this.pipePrefab);

            this.node.getChildByName("Pipe").addChild(this.pipe[i]);

            var pos = this.pipe[i].getPosition();
            pos.x = 170 + 200 * i;
            var minY = -170;
            var maxY = 170
            pos.y = minY + Math.random() * (maxY - minY);
            this.pipe[i].setPosition(pos);
        }
        console.log("hello")
    }

    // generate pipes during the game and move it backward
    movePipe(){
        for(var i = 0 ;i < 3; i++){
            var pos = this.pipe[i].getPosition();
            pos.x -= 1;
            if(pos.x <= -170){
                pos.x = 430;
                var minY = -150;
                var maxY = 150;
                pos.y = minY + Math.random() * (maxY - minY);
            }
            if(pos.x == this.bird.getPosition().x)
            {
                this.gameScore++;
                this.scoreLabel.string = this.gameScore.toString();
                this.audioControl.playSound(SoundType.Sound_Score);
            }
            this.pipe[i].setPosition(pos);
        }
    }

    //game over
    gameOver(){
        this.gameStatus = GameStatus.Game_Over;
        this.spGameOver.node.active = true;
        this.restartBtn.node.active = true;
        console.log("game over");
    }
}


