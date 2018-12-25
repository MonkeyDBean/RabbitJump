var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        var _this = _super.call(this) || this;
        DialogManager.remove("GameView");
        return _this;
    }
    EndView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        EndView.m_UI = new EndViewSkin();
        this.addChild(EndView.m_UI);
        EndView.m_UI.tryAgain_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryAgain, EndView.m_UI);
        EndView.m_UI.moreGame_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.more, EndView.m_UI);
        //添加分享监听
        EndView.m_UI.authorText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hrefEvent, EndView.m_UI);
        EndView.m_UI.xinlang_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareXinlang, EndView.m_UI);
        EndView.m_UI.qq_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareQQ, EndView.m_UI);
        EndView.m_UI.txWeibo_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareTxWeibo, EndView.m_UI);
        EndView.m_UI.erweima_Icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareIt, EndView.m_UI);
    };
    //author新浪主页链接跳转
    EndView.prototype.hrefEvent = function () {
        this.authorHref = "http://weibo.com/monkeybeanZ";
        //进入author新浪微博主页
        window.open(this.authorHref, 'newwindow');
    };
    //分享到新浪微博
    EndView.prototype.shareXinlang = function () {
        this.containerText = "MonkeyBean Game : 化身砰砰兔，止步哪一层？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/ppTu/resource/assets_self/game/pptu_Icon.png";
        var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.containerText + '&url=' + this.url + '&content=utf-8&sourceUrl=' + this.url + '&pic=' + this.imgUrl;
        window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
    };
    //分享到qq
    EndView.prototype.shareQQ = function () {
        this.containerText = "MonkeyBean Game : 化身砰砰兔，止步哪一层？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/ppTu/resource/assets_self/game/pptu_Icon.png";
        var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + this.containerText + '&url=' + this.url + '&pics=' + this.imgUrl;
        window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
    };
    //分享到腾讯微博
    EndView.prototype.shareTxWeibo = function () {
        this.containerText = "MonkeyBean Game : 化身砰砰兔，止步哪一层？ ";
        this.url = window.location.href;
        this.imgUrl = "http://monkeybean.applinzi.com/ppTu/resource/assets_self/game/pptu_Icon.png";
        var shareqqstring = 'http://v.t.qq.com/share/share.php?title=' + this.containerText + '&url=' + this.url + '&pic=' + this.imgUrl;
        window.open(shareqqstring, 'newwindow', 'height=100,width=100,top=100,left=100');
    };
    //二维码
    EndView.prototype.shareIt = function () {
        window.open(window.location.href, 'newwindow');
    };
    //移除分享监听
    EndView.prototype.removeShare = function () {
        EndView.m_UI.authorText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hrefEvent, EndView.m_UI);
        EndView.m_UI.xinlang_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareXinlang, EndView.m_UI);
        EndView.m_UI.qq_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareQQ, EndView.m_UI);
        EndView.m_UI.txWeibo_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareTxWeibo, EndView.m_UI);
        EndView.m_UI.erweima_Icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareIt, EndView.m_UI);
    };
    EndView.prototype.tryAgain = function () {
        EndView.m_UI.tryAgain_button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tryAgain, EndView.m_UI);
        this.removeShare();
        egret.Tween.get(EndView.m_UI.tryAgain_button).to({ scaleX: 1.05, scaleY: 1.05 }, 150).to({ scaleX: 1, scaleY: 1 }, 100);
        egret.setTimeout(function () {
            DialogManager.open(GameView, "GameView", 1);
            GameController.getInstance().StartGame();
        }, this, 300);
    };
    EndView.prototype.more = function () {
        EndView.m_UI.moreGame_button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.more, EndView.m_UI);
        this.removeShare();
        egret.Tween.get(EndView.m_UI.moreGame_button).to({ scaleX: 1.05, scaleY: 1.05 }, 150).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    return EndView;
}(View));
var EndViewSkin = (function (_super) {
    __extends(EndViewSkin, _super);
    function EndViewSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/skins/EndSkin.exml";
        _this.tryAgain_button.width = 221;
        _this.tryAgain_button.height = 100;
        _this.tryAgain_button.anchorOffsetX = _this.tryAgain_button.width / 2;
        _this.tryAgain_button.anchorOffsetY = _this.tryAgain_button.height / 2;
        _this.tryAgain_button.x = 166;
        _this.tryAgain_button.y = 897;
        _this.moreGame_button.width = 221;
        _this.moreGame_button.height = 100;
        _this.moreGame_button.anchorOffsetX = _this.moreGame_button.width / 2;
        _this.moreGame_button.anchorOffsetY = _this.moreGame_button.height / 2;
        _this.moreGame_button.x = 472;
        _this.moreGame_button.y = 897;
        return _this;
    }
    EndViewSkin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return EndViewSkin;
}(eui.Component));
