/**
 * Created by Bean on 2016/7/7.
 */
class  PlayerAnimationX extends egret.Sprite
{
    private  mcf:egret.MovieClipDataFactory;
    public  mc:egret.MovieClip;
    public  constructor(str1:string,str2:string,number:number)
    {
        super();
        this.width = 50;
        this.height = 100;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        let data = RES.getRes(str1);
        let tex =  RES.getRes(str2);
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip();
        this.mc.movieClipData = this.mcf.generateMovieClipData();
        this.mc.anchorOffsetX =  this.mc.width;
        this.mc.anchorOffsetY =  this.mc.height;
        this.mc.x = this.width;
        this.mc.y = this.height;

        //playTimes:number — 播放次数。   参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
        this.mc.play(number);
        this.addChild(this.mc);
    }
}