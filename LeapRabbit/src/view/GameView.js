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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        DialogManager.remove("EndView");
        return _this;
    }
    /**
     * add方法执行完毕，调用该方法
     */
    GameView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameView.m_UI = new GameViewSkin();
        this.addChild(GameView.m_UI);
    };
    return GameView;
}(View));
var GameViewSkin = (function (_super) {
    __extends(GameViewSkin, _super);
    function GameViewSkin() {
        var _this = _super.call(this) || this;
        // 指定Skin目录及全名
        _this.skinName = "src/skins/GameSkin.exml";
        egret.Tween.get(_this.click_tip, { loop: true }).to({ alpha: 0 }, 100).wait(500).to({ alpha: 1 }, 100).wait(500);
        return _this;
    }
    GameViewSkin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    return GameViewSkin;
}(eui.Component));
