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
var Cell_Style;
(function (Cell_Style) {
    Cell_Style[Cell_Style["cellStyle_empty"] = 0] = "cellStyle_empty";
    Cell_Style[Cell_Style["cellStyle_Player"] = 1] = "cellStyle_Player";
    Cell_Style[Cell_Style["cellStyle_Wall"] = 2] = "cellStyle_Wall";
    Cell_Style[Cell_Style["cellStyle_Carrot"] = 3] = "cellStyle_Carrot";
    Cell_Style[Cell_Style["cellStyle_Platform"] = 4] = "cellStyle_Platform";
    Cell_Style[Cell_Style["cellStyle_RedDot"] = 5] = "cellStyle_RedDot";
    Cell_Style[Cell_Style["cellStyle_Spike"] = 6] = "cellStyle_Spike";
})(Cell_Style || (Cell_Style = {}));
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(cellType) {
        var _this = _super.call(this) || this;
        _this.width = _this.height = 50;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.bg = new eui.Image();
        _this.bg.width = _this.bg.height = 50;
        _this.bg.anchorOffsetX = _this.bg.width / 2;
        _this.bg.anchorOffsetY = _this.bg.height / 2;
        _this.bg.x = _this.anchorOffsetX;
        _this.bg.y = _this.anchorOffsetY;
        switch (cellType) {
            case 0:
                _this.bg.source = "ground";
                _this.myStyle = Cell_Style.cellStyle_empty;
                break;
            case 1:
                _this.bg.source = "pic_player";
                _this.myStyle = Cell_Style.cellStyle_Player;
                _this.bg.rotation = 0;
                break;
            case 2:
                var randBrick = Math.floor(Math.random() * 5);
                switch (randBrick) {
                    case 0:
                        _this.bg.source = "pic_brick0";
                        break;
                    case 1:
                        _this.bg.source = "pic_brick1";
                        break;
                    case 2:
                        _this.bg.source = "pic_brick2";
                        break;
                    case 3:
                        _this.bg.source = "pic_brick3";
                        break;
                    case 4:
                        _this.bg.source = "pic_brick4";
                        break;
                    default:
                        _this.bg.source = "pic_brick0";
                        ;
                }
                _this.myStyle = Cell_Style.cellStyle_Wall;
                _this.bg.rotation = 0;
                break;
            case 3:
                _this.bg.source = "pic_carrot";
                _this.myStyle = Cell_Style.cellStyle_Carrot;
                _this.bg.rotation = 0;
                _this.eatEffect = new effectAnimation("eat_Json", "eat_Image");
                _this.eatEffect.x = 8;
                _this.eatEffect.y = 12;
                _this.eatEffect.visible = false;
                _this.addChild(_this.eatEffect);
                break;
            case 4:
                _this.bg.source = "pic_platform";
                _this.myStyle = Cell_Style.cellStyle_Platform;
                _this.bg.rotation = 0;
                break;
            case 5:
                _this.bg.source = "pic_redDot";
                _this.myStyle = Cell_Style.cellStyle_RedDot;
                _this.bg.rotation = 0;
                break;
            case 6:
                _this.bg.source = "pic_spikeR";
                _this.bg.rotation = 180;
                _this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            case 7:
                _this.bg.source = "pic_spikeR";
                _this.bg.rotation = -90;
                _this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            case 8:
                _this.bg.source = "pic_spikeR";
                _this.bg.rotation = 0;
                _this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            case 9:
                _this.bg.source = "pic_spikeR";
                _this.bg.rotation = 90;
                _this.myStyle = Cell_Style.cellStyle_Spike;
                break;
            default:
                _this.bg.source = "ground";
                _this.myStyle = Cell_Style.cellStyle_empty;
        }
        _this.addChild(_this.bg);
        return _this;
    }
    Cell.prototype.getBg = function () {
        return this.bg;
    };
    return Cell;
}(eui.Group));
