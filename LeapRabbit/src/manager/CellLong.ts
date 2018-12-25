/**
 * Created by Bean on 2016/6/29.
 */
class CellLong extends eui.Group{
    public bg:eui.Image;
    public constructor()
    {
        super();
        this.width = 600;
        this.height = 50;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.bg = new eui.Image();
        this.bg.width = 600;
        this.bg.height = 50;
        this.bg.anchorOffsetX = this.bg.width/2;
        this.bg.anchorOffsetY = this.bg.height/2;
        this.bg.x  = this.anchorOffsetX;
        this.bg.y = this.anchorOffsetY;
        this.bg.source = "pic_platformLong";
        this.addChild(this.bg);
    }
    public getBg()
    {
        return this.bg;
    }
}