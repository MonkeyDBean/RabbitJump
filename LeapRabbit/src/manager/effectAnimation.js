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
var effectAnimation = (function (_super) {
    __extends(effectAnimation, _super);
    function effectAnimation(str1, str2) {
        var _this = _super.call(this) || this;
        _this.width = 90;
        _this.height = 90;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        var data = RES.getRes(str1);
        var tex = RES.getRes(str2);
        _this.mcf = new egret.MovieClipDataFactory(data, tex);
        _this.mc = new egret.MovieClip();
        _this.mc.movieClipData = _this.mcf.generateMovieClipData();
        _this.mc.anchorOffsetX = _this.mc.width;
        _this.mc.anchorOffsetY = _this.mc.height;
        _this.mc.x = _this.width;
        _this.mc.y = _this.height;
        _this.addChild(_this.mc);
        _this.visible = false;
        _this.mc.addEventListener(egret.Event.COMPLETE, _this.removePlayerXAnimation, _this);
        return _this;
    }
    effectAnimation.prototype.removePlayerXAnimation = function (evt) {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return effectAnimation;
}(egret.Sprite));
