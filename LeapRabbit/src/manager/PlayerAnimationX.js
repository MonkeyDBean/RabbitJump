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
/**
 * Created by Bean on 2016/7/7.
 */
var PlayerAnimationX = (function (_super) {
    __extends(PlayerAnimationX, _super);
    function PlayerAnimationX(str1, str2, number) {
        var _this = _super.call(this) || this;
        _this.width = 50;
        _this.height = 100;
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
        //playTimes:number — 播放次数。   参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
        _this.mc.play(number);
        _this.addChild(_this.mc);
        return _this;
    }
    return PlayerAnimationX;
}(egret.Sprite));
