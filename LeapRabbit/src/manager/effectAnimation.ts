class  effectAnimation extends egret.Sprite
{
    private  mcf:egret.MovieClipDataFactory;
    public  mc:egret.MovieClip;
    public  constructor(str1:string,str2:string)
    {
        super();
        this.width = 90;
        this.height = 90;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        var data = RES.getRes(str1);
        var tex =  RES.getRes(str2);
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip();
        this.mc.movieClipData = this.mcf.generateMovieClipData();
        this.mc.anchorOffsetX =  this.mc.width;
        this.mc.anchorOffsetY =  this.mc.height;
        this.mc.x = this.width;
        this.mc.y = this.height;

        this.addChild(this.mc);
        this.visible = false;
        this.mc.addEventListener(egret.Event.COMPLETE, this.removePlayerXAnimation, this);
    }
    private  removePlayerXAnimation(evt:egret.Event):void
    {
      if(this.parent!=null)
      {
          this.parent.removeChild(this);
      }
    }
}