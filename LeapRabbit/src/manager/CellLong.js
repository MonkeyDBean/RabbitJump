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
 * Created by Bean on 2016/6/29.
 */
var CellLong = (function (_super) {
    __extends(CellLong, _super);
    function CellLong() {
        var _this = _super.call(this) || this;
        _this.width = 600;
        _this.height = 50;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.bg = new eui.Image();
        _this.bg.width = 600;
        _this.bg.height = 50;
        _this.bg.anchorOffsetX = _this.bg.width / 2;
        _this.bg.anchorOffsetY = _this.bg.height / 2;
        _this.bg.x = _this.anchorOffsetX;
        _this.bg.y = _this.anchorOffsetY;
        _this.bg.source = "pic_platformLong";
        _this.addChild(_this.bg);
        return _this;
    }
    CellLong.prototype.getBg = function () {
        return this.bg;
    };
    return CellLong;
}(eui.Group));
