enum redDot_Style{
    cellStyle_RedDot,
    cellStyle_RedRoot
}

class redDot extends eui.Group{
    private bg:eui.Image;
    public myStyle:redDot_Style;

    public constructor(cellType:number)
    {
        super();
        this.width = this.height = 50;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.bg = new eui.Image();
        this.bg.width=this.bg.height=50;
        this.bg.anchorOffsetX = this.bg.width/2;
        this.bg.anchorOffsetY = this.bg.height/2;
        this.bg.x  = 25;
        this.bg.y = 25;

        switch(cellType)
        {
            case redDot_Style.cellStyle_RedDot:
                this.bg.source = "redDot";
                this.myStyle = redDot_Style.cellStyle_RedDot;
                break;
            case redDot_Style.cellStyle_RedRoot:
                this.bg.source = "redDotRoot";
                this.myStyle = redDot_Style.cellStyle_RedRoot;
                this.bg.rotation = 0;
                break;
            default:;
        }
        this.addChild(this.bg);
    }

    public getBg()
    {
        return this.bg;
    }
}