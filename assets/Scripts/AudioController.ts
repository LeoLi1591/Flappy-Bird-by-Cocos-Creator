import { _decorator,AudioSource,AudioClip,audioEngine, BoxCollider2D, Collider2D, IPhysics2DContact, Canvas, Collider, Component, EventTouch, log, Node, Quat, Contact2DType } from 'cc';
import { GameStatus, MainController } from './MainController';
const { ccclass, property } = _decorator;

export enum SoundType
{
    Sound_Fly = 0,
    Sound_Score,
    Sound_Die,
    Sound_Die2,
}
@ccclass('AudioController')
export class AudioController extends Component {
    @property(AudioClip)
    backgroundMusic: AudioClip = null;

    @property(AudioClip)
    flySound: AudioClip = null;

    @property(AudioClip)
    scoreSound: AudioClip = null;

    @property(AudioClip)
    dieSound: AudioClip = null;

    @property(AudioClip)
    dieSound2: AudioClip = null;

    start() 
    {
        // this.backgroundMusic.play(this.backgroundMusic,true);
    }

    playSound(type:SoundType)
    {
        if(type == SoundType.Sound_Fly)
        {
            this.flySound.play(this.flySound,false);
        }else if(type == SoundType.Sound_Score)
        {
            this.scoreSound.play(this.scoreSound,false);
        }else if(type == SoundType.Sound_Die)
        {
            this.dieSound.play(this.dieSound,false);
        }else if(type == SoundType.Sound_Die2)
        {
            this.dieSound2.play(this.dieSound,false);
        }
    }

}


