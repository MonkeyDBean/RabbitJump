/**
 * Created by Bean on 2016/6/29.
 */
enum Cell_Style{
    cellStyle_empty,
    cellStyle_Player,
    cellStyle_Wall,
    cellStyle_Carrot,
    cellStyle_Platform,
    cellStyle_RedDot,
    cellStyle_Spike
}

class Cell extends eui.Group{
    public bg:eui.Image;
    public myStyle:Cell_Style;
    public eatEffect:effectAnimation;

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
        this.bg.x  = this.anchorOffsetX;
        this.bg.y = this.anchorOffsetY;
        switch(cellType)
        {
            case 0:
                this.bg.source = "ground";
                this.myStyle = Cell_Style.cellStyle_empty;
                break;
            case 1:
                this.bg.source = "pic_player";
                this.myStyle = Cell_Style.cellStyle_Player;
                this.bg.rotation = 0;
                break;
            case 2:
                let randBrick = Math.floor(Math.random() * 5);
                switch(randBrick)
                {
                    case 0:
                        this.bg.source = "pic_brick0";
                        break;
                    case 1:
                        this.bg.source = "pic_brick1";
                        break;
                    case 2:
                        this.bg.source = "pic_brick2";
                        break;
                    case 3:
                        this.bg.source = "pic_brick3";
                        break;
                    case 4:
                        this.bg.source = "pic_brick4";
                        break;
                    default:
                        this.bg.source = "pic_brick0";
                        ;
                }
                this.myStyle = Cell_Style.cellStyle_Wall;
                this.bg.rotation = 0;
                break;
            case 3:
                this.bg.source = "pic_carrot";
                this.myStyle = Cell_Style.cellStyle_Carrot;
                this.bg.rotation = 0;
                this.eatEffect = new effectAnimation("eat_Json","eat_Image");
                this.eatEffect.x = 8;
                this.eatEffect.y = 12;
                this.eatEffect.visible = false;
                this.addChild(this.eatEffect);
                break;
            case 4:
                this.bg.source = "pic_platform";
                this.myStyle = Cell_Style.cellStyle_Platform;
                this.bg.rotation = 0;
                break;
            case 5:
                this.bg.source = "pic_redDot";
                this.myStyle = Cell_Style.cellStyle_RedDot;
                this.bg.rotation = 0;
                break;
            case 6:
                this.bg.source = "pic_spikeR";
                this.bg.rotation = 180;
                this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            case 7:
                this.bg.source = "pic_spikeR";
                this.bg.rotation = -90;
                this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            case 8:
                this.bg.source = "pic_spikeR";
                this.bg.rotation = 0;
                this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            case 9:
                this.bg.source = "pic_spikeR";
                this.bg.rotation = 90;
                this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            default:
                this.bg.source = "ground";
                this.myStyle = Cell_Style.cellStyle_empty;
        }
        this.addChild(this.bg);
    }

    public getBg()
    {
        return this.bg;
    }
}