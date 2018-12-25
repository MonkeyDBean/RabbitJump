class EndView extends View {

    public static m_UI: EndViewSkin;

    //author的新浪微博主页
    public authorHref:string;

    //分享的文字内容
    public containerText:string;

    //分享的链接
    public url:string;

    //分享的图片链接
    public imgUrl:string;

    public constructor ()
    {
        super ();
        DialogManager.remove("GameView");
    }

    public createChildren ()
    {
        super.createChildren ();
        EndView.m_UI = new EndViewSkin ();
        this.addChild( EndView.m_UI );

        EndView.m_UI.tryAgain_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tryAgain,EndView.m_UI);
        EndView.m_UI.moreGame_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.more,EndView.m_UI);

        //添加分享监听
        EndView.m_UI.authorText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hrefEvent,EndView.m_UI);
        EndView.m_UI.xinlang_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareXinlang,EndView.m_UI);
        EndView.m_UI.qq_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareQQ,EndView.m_UI);
        EndView.m_UI.txWeibo_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareTxWeibo,EndView.m_UI);
        EndView.m_UI.erweima_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareIt,EndView.m_UI);
    }

    //author新浪主页链接跳转
    private hrefEvent(){
        this.authorHref = "http://weibo.com/monkeybeanZ";

        //进入author新浪微博主页
        window.open(this.authorHref, 'newwindow');
    }

    //分享到新浪微博
    private shareXinlang(){
        this.containerText = "MonkeyBean Game : 化身砰砰兔，止步哪一层？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/ppTu/resource/assets_self/game/pptu_Icon.png";
        var sharesinastring:string='http://v.t.sina.com.cn/share/share.php?title='+this.containerText+'&url='+this.url+'&content=utf-8&sourceUrl='+this.url+'&pic='+this.imgUrl;
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
    }

    //分享到qq
    private shareQQ(){
        this.containerText = "MonkeyBean Game : 化身砰砰兔，止步哪一层？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/ppTu/resource/assets_self/game/pptu_Icon.png";
        var shareqqzonestring:string='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+this.containerText+'&url='+this.url+'&pics='+this.imgUrl;
        window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
    }

    //分享到腾讯微博
    private shareTxWeibo(){
        this.containerText = "MonkeyBean Game : 化身砰砰兔，止步哪一层？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/ppTu/resource/assets_self/game/pptu_Icon.png";
        var shareqqstring:string='http://v.t.qq.com/share/share.php?title='+this.containerText+'&url='+this.url+'&pic='+this.imgUrl;
        window.open(shareqqstring,'newwindow','height=100,width=100,top=100,left=100');
    }

    //二维码
    private shareIt()
    {
        window.open(window.location.href, 'newwindow');
    }

    //移除分享监听
    private removeShare()
    {
        EndView.m_UI.authorText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hrefEvent,EndView.m_UI);
        EndView.m_UI.xinlang_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareXinlang,EndView.m_UI);
        EndView.m_UI.qq_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareQQ,EndView.m_UI);
        EndView.m_UI.txWeibo_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareTxWeibo,EndView.m_UI);
        EndView.m_UI.erweima_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shareIt,EndView.m_UI);
    }

    private tryAgain () {
        EndView.m_UI.tryAgain_button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tryAgain,EndView.m_UI);
        this.removeShare();

        egret.Tween.get(EndView.m_UI.tryAgain_button).to({scaleX:1.05,scaleY:1.05},150).to({scaleX:1,scaleY:1},100);

        egret.setTimeout(function() {
            DialogManager.open(GameView,"GameView",1);
            GameController.getInstance().StartGame ();
        }, this, 300);

    }

    private more () {
        EndView.m_UI.moreGame_button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.more,EndView.m_UI);
        this.removeShare();
        egret.Tween.get(EndView.m_UI.moreGame_button).to({scaleX:1.05,scaleY:1.05},150).to({scaleX:1,scaleY:1},100);
    }
}

class EndViewSkin extends eui.Component
{
    public constructor ()
    {
        super ();
        this.skinName = "src/skins/EndSkin.exml";
        this.tryAgain_button.width = 221;
        this.tryAgain_button.height = 100;
        this.tryAgain_button.anchorOffsetX = this.tryAgain_button.width/2;
        this.tryAgain_button.anchorOffsetY = this.tryAgain_button.height/2;
        this.tryAgain_button.x = 166;
        this.tryAgain_button.y = 897;

        this.moreGame_button.width = 221;
        this.moreGame_button.height = 100;
        this.moreGame_button.anchorOffsetX = this.moreGame_button.width/2;
        this.moreGame_button.anchorOffsetY = this.moreGame_button.height/2;
        this.moreGame_button.x = 472;
        this.moreGame_button.y = 897;
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);
    }

    public group_CurScore:eui.Label;
    public tryAgain_button:eui.Image;
    public moreGame_button:eui.Image;

    //分享图标
    public authorText:eui.Label;
    public shareText:eui.Label;
    public xinlang_Icon:eui.Image;
    public qq_Icon:eui.Image;
    public txWeibo_Icon:eui.Image;
    public erweima_Icon:eui.Image;
}