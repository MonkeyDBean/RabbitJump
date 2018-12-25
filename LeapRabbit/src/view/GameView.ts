class GameView extends View {
    public static m_UI: GameViewSkin;

    public constructor()
    {
        super();
        DialogManager.remove("EndView");
    }

    /**
     * add方法执行完毕，调用该方法
     */
    public createChildren() {
        super.createChildren();
        GameView.m_UI = new GameViewSkin();
        this.addChild(GameView.m_UI);
    }
}

class GameViewSkin extends eui.Component
{
    public constructor ()
    {
        super ();

        // 指定Skin目录及全名
        this.skinName = "src/skins/GameSkin.exml";
        egret.Tween.get(this.click_tip,{loop:true}).to({alpha:0},100).wait(500).to({alpha:1},100).wait(500);
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);
    }
    public game_bg : eui.Image;
    public life_num:eui.Label;
    public life_heart:eui.Image;
    public game_startButton:eui.Image;
    public start_group:eui.Group;
    public myPlayerScore:eui.Label;
    public myPlayerScoreBottom:eui.Image;
    public click_tip:eui.Image;
}