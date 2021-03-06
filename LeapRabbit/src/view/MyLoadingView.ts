class MyLoadingView extends View {
    public  m_UI: MyLoadingViewSkin;

    public constructor()
    {
        super();
    }

    public createChildren()
    {
        super.createChildren();
        this.m_UI= new MyLoadingViewSkin();
        this.addChild(this.m_UI);
        this.showAnimation();
    }
    public  showAnimation(){
        egret.Tween.get(this.m_UI.whiteDot1, {loop: true}).to({alpha:0}, 1).wait(100).to({alpha:1}, 1).wait(300);
        egret.Tween.get(this.m_UI.whiteDot2, {loop: true}).to({alpha:0}, 1).wait(200).to({alpha:1}, 1).wait(200);
        egret.Tween.get(this.m_UI.whiteDot3, {loop: true}).to({alpha:0}, 1).wait(300).to({alpha:1}, 1).wait(100);
    }
}

class MyLoadingViewSkin extends eui.Component
{
    public constructor ()
    {
        super ();
        this.skinName = "src/skins/MyLoadingSkin.exml";
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);
    }
    public myLoadingBg : eui.Image;
    public whiteDot1 : eui.Image;
    public whiteDot2 : eui.Image;
    public whiteDot3 : eui.Image;
}
