import { _decorator, BoxCollider2D, Collider2D, IPhysics2DContact, Canvas, Collider, Component, EventTouch, log, Node, Quat, Contact2DType } from 'cc';
import { GameStatus, MainController } from './MainController';
import { SoundType } from './AudioController';
const { ccclass, property } = _decorator;


@ccclass('BirdController')
export class BirdController extends Component {
    @property(Canvas)
    Canvas : Canvas = null;

    speed : number = 0;
    mainController: MainController = null;

    protected onLoad(): void{
        this.Canvas.node.on(Node.EventType.TOUCH_START , this.onTouchStart,this);
        this.mainController = this.Canvas.getComponent(MainController);
    }

    start() {
        let collider = this.getComponent(BoxCollider2D)
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

    update(deltaTime: number) {
        // end the game
        if(this.mainController.gameStatus != GameStatus.Game_Playing) return;

        this.moveBird();

        // over the screen also end game
        if(this.node.getPosition().y >= 270 || this.node.getPosition().y <= -270){
            this.mainController.audioControl.playSound(SoundType.Sound_Die);
            this.mainController.gameOver();
            this.speed = 0;
        }
    }

    // click bird and let its speed up
    onTouchStart(event : EventTouch){
        // check the bird status
        if(this.mainController.gameStatus != GameStatus.Game_Playing) return;

        this.mainController.audioControl.playSound(SoundType.Sound_Fly);
        this.speed = 2;
    }


    // move 
    moveBird(){
        this.speed -= 0.05;
        var pos = this.node.getPosition();
        pos.y += this.speed;
        this.node.setPosition(pos);
        var angle = (this.speed/2) * 30;
        if(angle >= 30){
            angle = 30;
        }
        this.node.setRotation(Quat.fromEuler(new Quat(),0,0,angle));
    }


    // touch listener
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.mainController.audioControl.playSound(SoundType.Sound_Die2);
        this.mainController.gameOver() 
        this.speed = 0
    }
}


