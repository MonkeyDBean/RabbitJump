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
var redDot_Style;
(function (redDot_Style) {
    redDot_Style[redDot_Style["cellStyle_RedDot"] = 0] = "cellStyle_RedDot";
    redDot_Style[redDot_Style["cellStyle_RedRoot"] = 1] = "cellStyle_RedRoot";
})(redDot_Style || (redDot_Style = {}));
var redDot = (function (_super) {
    __extends(redDot, _super);
    function redDot(cellType) {
        var _this = _super.call(this) || this;
        _this.width = _this.height = 50;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.bg = new eui.Image();
        _this.bg.width = _this.bg.height = 50;
        _this.bg.anchorOffsetX = _this.bg.width / 2;
        _this.bg.anchorOffsetY = _this.bg.height / 2;
        _this.bg.x = 25;
        _this.bg.y = 25;
        switch (cellType) {
            case redDot_Style.cellStyle_RedDot:
                _this.bg.source = "redDot";
                _this.myStyle = redDot_Style.cellStyle_RedDot;
                break;
            case redDot_Style.cellStyle_RedRoot:
                _this.bg.source = "redDotRoot";
                _this.myStyle = redDot_Style.cellStyle_RedRoot;
                _this.bg.rotation = 0;
                break;
            default: ;
        }
        _this.addChild(_this.bg);
        return _this;
    }
    redDot.prototype.getBg = function () {
        return this.bg;
    };
    return redDot;
}(eui.Group));
