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
 * Created by Bean on 2016/7/4.
 */
var playState;
(function (playState) {
    playState[playState["state_idle"] = 0] = "state_idle";
    playState[playState["state_jump"] = 1] = "state_jump";
    playState[playState["state_twiceJump"] = 2] = "state_twiceJump";
    playState[playState["state_fall"] = 3] = "state_fall";
    playState[playState["state_slide"] = 4] = "state_slide";
    playState[playState["state_dead"] = 5] = "state_dead";
})(playState || (playState = {}));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.playerPosition = new egret.Point;
        _this.init();
        return _this;
    }
    Player.prototype.init = function () {
        this.width = 50;
        this.height = 100;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.playerMoveEffectImage = new eui.Image();
        this.playerMoveEffectImage.source = "slide1";
        this.playerMoveEffectImage.width = 50;
        this.playerMoveEffectImage.height = 120;
        this.playerMoveEffectImage.anchorOffsetX = this.playerMoveEffectImage.width / 2;
        this.playerMoveEffectImage.anchorOffsetY = this.playerMoveEffectImage.height / 2;
        this.playerMoveEffectImage.x = 30;
        this.playerMoveEffectImage.y = -30;
        this.playerMoveEffectImage.visible = false;
        this.addChild(this.playerMoveEffectImage);
        this.runAnimation = new PlayerAnimationX("runActor_Json", "runActor_Image", -1);
        this.runAnimation.x = 35;
        this.runAnimation.y = 35;
        this.runAnimation.visible = true;
        this.runAnimation.scaleX = this.runAnimation.scaleY = 1.2;
        this.addChild(this.runAnimation);
        this.slideAnimation = new PlayerAnimationX("slideActor_Json", "slideActor_Image", -1);
        this.slideAnimation.x = this.anchorOffsetX;
        this.slideAnimation.y = 45;
        this.slideAnimation.visible = false;
        this.addChild(this.slideAnimation);
        //fall
        this.playerFallImage = new eui.Image();
        this.playerFallImage.source = "fallActor1";
        this.playerFallImage.width = 69;
        this.playerFallImage.height = 126;
        this.playerFallImage.anchorOffsetX = this.playerFallImage.width / 2;
        this.playerFallImage.anchorOffsetY = this.playerFallImage.height / 2;
        this.playerFallImage.x = 30;
        this.playerFallImage.y = 45;
        this.playerFallImage.visible = false;
        this.addChild(this.playerFallImage);
        //dead
        this.playerDeadImage = new eui.Image();
        this.playerDeadImage.source = "deadActor";
        this.playerDeadImage.width = 84;
        this.playerDeadImage.height = 127;
        this.playerDeadImage.anchorOffsetX = this.playerDeadImage.width / 2;
        this.playerDeadImage.anchorOffsetY = this.playerDeadImage.height / 2;
        this.playerDeadImage.x = 15;
        this.playerDeadImage.y = 40;
        this.playerDeadImage.visible = false;
        this.addChild(this.playerDeadImage);
        //jump
        this.playerJumpImage = new eui.Image();
        this.playerJumpImage.source = "jumpActor1";
        this.playerJumpImage.width = 67;
        this.playerJumpImage.height = 126;
        this.playerJumpImage.anchorOffsetX = this.playerJumpImage.width / 2;
        this.playerJumpImage.anchorOffsetY = this.playerJumpImage.height / 2;
        this.playerJumpImage.x = 30;
        this.playerJumpImage.y = 40;
        this.playerJumpImage.visible = false;
        this.addChild(this.playerJumpImage);
        this.playerTwiceJump = new eui.Image();
        this.playerTwiceJump.source = "twiceJump";
        this.playerTwiceJump.width = 70;
        this.playerTwiceJump.height = 70;
        this.playerTwiceJump.anchorOffsetX = this.playerTwiceJump.width / 2;
        this.playerTwiceJump.anchorOffsetY = this.playerTwiceJump.height / 2;
        this.playerTwiceJump.x = 25;
        this.playerTwiceJump.y = 30;
        this.playerTwiceJump.visible = false;
        this.addChild(this.playerTwiceJump);
        this.moveEffectCounter = 0;
        this.myState = playState.state_idle;
        this.playerLastState = this.myState;
        this.speedX = 400;
        this.speedYOriginal = 1000;
        this.speedY = this.speedYOriginal;
        this.speedYAccelerate = 2500;
        this.slideSpeed = 200;
        this.directionX = 1;
        this.distanceY = 0;
        this.directionY = -1;
        this.jumpStage = 0;
        this.playerLife = 1;
        this.addMyTimeListener();
    };
    Player.prototype.addMyTimeListener = function () {
        this.myTimer = new egret.Timer(25, 0);
        this.myTimer.addEventListener(egret.TimerEvent.TIMER, this.playerFrameHandler, this);
        this.myTimer.start();
    };
    Player.prototype.getGlobalPoint = function () {
        this.playerPosition = this.parent.localToGlobal(this.x, this.y);
        return this.playerPosition;
    };
    Player.prototype.printPlayerState = function () {
        switch (this.myState) {
            case 0:
                console.log("player state:", "state_idle");
                break;
            case 1:
                console.log("player state:", "state_jump");
                break;
            case 2:
                console.log("player state:", "state_twiceJump");
                break;
            case 3:
                console.log("player state:", "state_fall");
                break;
            case 4:
                console.log("player state:", "state_slide");
                break;
        }
    };
    Player.prototype.playerFrameHandler = function () {
        this.playerLastY = this.y;
        this.slideEffectDisplay();
        this.carrotCollision();
        this.reddotCollision();
        this.spikeCollision();
        switch (this.myState) {
            case playState.state_idle:
                if (this.moveEffectCounter % 5 == 0) {
                    var runEffect = new effectAnimation("runEffect_Json", "runEffect_Image");
                    var GloPos = this.getGlobalPoint();
                    var localPos = this.parent.globalToLocal(GloPos.x, GloPos.y);
                    runEffect.width = 25;
                    runEffect.height = 25;
                    runEffect.anchorOffsetX = this.width / 2;
                    runEffect.anchorOffsetY = this.height / 2;
                    runEffect.mc.anchorOffsetX = runEffect.mc.width;
                    runEffect.mc.anchorOffsetY = runEffect.mc.height;
                    runEffect.mc.x = runEffect.width;
                    runEffect.mc.y = runEffect.height;
                    if (this.directionX == -1) {
                        runEffect.scaleX = -1;
                        runEffect.x = localPos.x + 5;
                    }
                    else if (this.directionX == 1) {
                        runEffect.scaleX = 1;
                        runEffect.x = localPos.x - 5;
                    }
                    runEffect.y = localPos.y + 72;
                    runEffect.visible = true;
                    GameController.getInstance().myMap.addChild(runEffect);
                    runEffect.mc.play(1);
                }
                this.moveEffectCounter++;
                this.idleCollision();
                break;
            case playState.state_jump:
            case playState.state_twiceJump:
                this.jumpCollision();
                break;
            case playState.state_slide:
                this.slideCollision();
                break;
            case playState.state_fall:
                this.fallCollision();
                break;
            default:
                ;
        }
    };
    Player.prototype.slideEffectDisplay = function () {
        if (this.myState == playState.state_slide) {
            if (this.directionX == -1) {
                this.playerMoveEffectImage.scaleX = -1;
                this.playerMoveEffectImage.x = 20;
            }
            else if (this.directionX == 1) {
                this.playerMoveEffectImage.scaleX = 1;
                this.playerMoveEffectImage.x = 30;
            }
            if (this.moveEffectCounter == 30) {
                this.moveEffectCounter = 18;
            }
            if (this.moveEffectCounter % 3 == 0) {
                this.playerMoveEffectImage.source = "slide" + (this.moveEffectCounter / 3 + 1).toString();
            }
        }
        this.moveEffectCounter++;
    };
    //idle
    Player.prototype.idleCollision = function () {
        var bottomCollison = false;
        if (this.x >= 575) {
            this.x = 575;
            this.setPlayerDirX(-1);
        }
        else if (this.x <= 25) {
            this.x = 25;
            this.setPlayerDirX(1);
        }
        this.x += this.directionX * this.speedX / 40;
        for (var i = 0; i < GameController.getInstance().myMap.brickCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.brickCells[i], this)) {
                if (GameController.getInstance().myMap.brickCells[i].y < (this.y + 50) && GameController.getInstance().myMap.brickCells[i].y > (this.y - 50)) {
                    if (this.directionX == -1) {
                        this.setPlayerDirX(1);
                        this.x = GameController.getInstance().myMap.brickCells[i].x + 50;
                        this.x += this.directionX * this.speedX / 40;
                        return;
                    }
                    else if (this.directionX == 1) {
                        this.setPlayerDirX(-1);
                        this.x = GameController.getInstance().myMap.brickCells[i].x - 50;
                        this.x += this.directionX * this.speedX / 40;
                        return;
                    }
                }
                else if (GameController.getInstance().myMap.brickCells[i].y > this.y) {
                    bottomCollison = true;
                    break;
                }
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformLong.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformLong[i], this)) {
                bottomCollison = true;
                break;
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformCells[i], this) && (GameController.getInstance().myMap.platformCells[i].y > this.y)) {
                bottomCollison = true;
                break;
            }
        }
        if (bottomCollison == false) {
            this.speedY = 0;
            this.changeState(playState.state_fall);
            return;
        }
    };
    Player.prototype.slideCollision = function () {
        var slideColliFlag = false;
        this.y += this.directionY * this.slideSpeed / 40;
        for (var i_1 = 0; i_1 < GameController.getInstance().myMap.platformLong.length; i_1++) {
            if (this.hitTest(GameController.getInstance().myMap.platformLong[i_1], this)) {
                if (GameController.getInstance().myMap.platformLong[i_1].y > (this.y + 50) && GameController.getInstance().myMap.platformLong[i_1].y <= (this.y + 75)) {
                    this.y = GameController.getInstance().myMap.platformLong[i_1].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformCells[i], this)) {
                if (GameController.getInstance().myMap.platformCells[i].y > (this.y + 50) && GameController.getInstance().myMap.platformCells[i].y <= (this.y + 75)) {
                    this.y = GameController.getInstance().myMap.platformCells[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
            }
        }
        for (var i_2 = 0; i_2 < GameController.getInstance().myMap.brickCells.length; i_2++) {
            if (this.hitTest(GameController.getInstance().myMap.brickCells[i_2], this)) {
                slideColliFlag = true;
                if (i_2 < (GameController.getInstance().myMap.brickCells.length - 1)) {
                    if (this.directionX == -1) {
                        for (var j = i_2 + 1; j < GameController.getInstance().myMap.brickCells.length; j++) {
                            if (((GameController.getInstance().myMap.brickCells[i_2].x + 50) == GameController.getInstance().myMap.brickCells[j].x) && (((GameController.getInstance().myMap.brickCells[i_2].y + 50) == GameController.getInstance().myMap.brickCells[j].y) || ((GameController.getInstance().myMap.brickCells[i_2].y + 100) == GameController.getInstance().myMap.brickCells[j].y))) {
                                if (this.hitTest(GameController.getInstance().myMap.brickCells[j], this)) {
                                    this.x = GameController.getInstance().myMap.brickCells[i_2].x + 50;
                                    this.y = GameController.getInstance().myMap.brickCells[j].y - 75;
                                    this.changeState(playState.state_idle);
                                    return;
                                }
                            }
                        }
                    }
                    else if (this.directionX == 1) {
                        for (var k = i_2 + 1; k < GameController.getInstance().myMap.brickCells.length; k++) {
                            if (((GameController.getInstance().myMap.brickCells[i_2].x - 50) == GameController.getInstance().myMap.brickCells[k].x) && (((GameController.getInstance().myMap.brickCells[i_2].y + 50) == GameController.getInstance().myMap.brickCells[k].y) || ((GameController.getInstance().myMap.brickCells[i_2].y + 100) == GameController.getInstance().myMap.brickCells[k].y))) {
                                if (this.hitTest(GameController.getInstance().myMap.brickCells[k], this)) {
                                    this.x = GameController.getInstance().myMap.brickCells[i_2].x - 50;
                                    this.y = GameController.getInstance().myMap.brickCells[k].y - 75;
                                    this.changeState(playState.state_idle);
                                    return;
                                }
                            }
                        }
                    }
                }
                if (this.directionX == -1) {
                    for (var j = 0; j < GameController.getInstance().myMap.platformCells.length; j++) {
                        if (((GameController.getInstance().myMap.brickCells[i_2].x + 50) == GameController.getInstance().myMap.platformCells[j].x) && (((GameController.getInstance().myMap.brickCells[i_2].y + 50) == GameController.getInstance().myMap.platformCells[j].y) || ((GameController.getInstance().myMap.brickCells[i_2].y + 100) == GameController.getInstance().myMap.platformCells[j].y))) {
                            if (this.hitTest(GameController.getInstance().myMap.platformCells[j], this)) {
                                this.x = GameController.getInstance().myMap.brickCells[i_2].x + 50;
                                this.y = GameController.getInstance().myMap.platformCells[j].y - 75;
                                this.changeState(playState.state_idle);
                                return;
                            }
                        }
                    }
                }
                if (this.directionX == 1) {
                    for (var k = 0; k < GameController.getInstance().myMap.platformCells.length; k++) {
                        if (((GameController.getInstance().myMap.brickCells[i_2].x - 50) == GameController.getInstance().myMap.platformCells[k].x) && (((GameController.getInstance().myMap.brickCells[i_2].y + 50) == GameController.getInstance().myMap.platformCells[k].y) || ((GameController.getInstance().myMap.brickCells[i_2].y + 100) == GameController.getInstance().myMap.platformCells[k].y))) {
                            if (this.hitTest(GameController.getInstance().myMap.platformCells[k], this)) {
                                this.x = GameController.getInstance().myMap.brickCells[i_2].x - 50;
                                this.y = GameController.getInstance().myMap.platformCells[k].y - 75;
                                this.changeState(playState.state_idle);
                                return;
                            }
                        }
                    }
                }
            }
        }
        if (this.x >= 575 || this.x <= 25) {
            slideColliFlag = true;
            for (var i_3 = 0; i_3 < GameController.getInstance().myMap.brickCells.length; i_3++) {
                if (this.hitTest(GameController.getInstance().myMap.brickCells[i_3], this)) {
                    if (GameController.getInstance().myMap.brickCells[i_3].y > (this.y + 50) && GameController.getInstance().myMap.brickCells[i_3].y <= (this.y + 75)) {
                        this.y = GameController.getInstance().myMap.brickCells[i_3].y - 75;
                        this.changeState(playState.state_idle);
                        return;
                    }
                }
            }
        }
        if (slideColliFlag == false) {
            this.speedY = 0;
            this.changeState(playState.state_fall);
        }
    };
    Player.prototype.fallCollision = function () {
        var distance_a;
        distance_a = this.speedY / 40 + this.directionY * this.speedYAccelerate / 1600 * 0.5;
        this.distanceY += distance_a;
        this.y += distance_a;
        this.speedY = this.speedY + this.directionY * this.speedYAccelerate / 40;
        if (this.speedY > 60 && this.speedY < 120) {
            this.playerFallImage.source = "fallActor2";
        }
        else if (this.speedY > 120) {
            this.playerFallImage.source = "fallActor3";
        }
        if (this.x >= 575) {
            this.x = 576;
            this.changeState(playState.state_slide);
        }
        else if (this.x <= 25) {
            this.x = 24;
            this.changeState(playState.state_slide);
        }
        else {
            if (this.playerLastState !== playState.state_slide) {
                this.x += this.directionX * this.speedX / 40;
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformLong.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformLong[i], this)) {
                if (GameController.getInstance().myMap.platformLong[i].y - 25 > this.y) {
                    this.y = GameController.getInstance().myMap.platformLong[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformCells[i], this)) {
                if (GameController.getInstance().myMap.platformCells[i].y - 40 > this.y) {
                    this.y = GameController.getInstance().myMap.platformCells[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.brickCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.brickCells[i], this)) {
                if (GameController.getInstance().myMap.brickCells[i].y - 40 > this.y) {
                    this.y = GameController.getInstance().myMap.brickCells[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
                else {
                    if (i < (GameController.getInstance().myMap.brickCells.length - 1)) {
                        if (this.directionX == -1) {
                            for (var j = i + 1; j < GameController.getInstance().myMap.brickCells.length; j++) {
                                if (((GameController.getInstance().myMap.brickCells[i].x + 50) == GameController.getInstance().myMap.brickCells[j].x) && ((GameController.getInstance().myMap.brickCells[i].y + 50) == GameController.getInstance().myMap.brickCells[j].y) || ((GameController.getInstance().myMap.brickCells[i].y + 100) == GameController.getInstance().myMap.brickCells[j].y)) {
                                    if (this.hitTest(GameController.getInstance().myMap.brickCells[j], this)) {
                                        this.x = GameController.getInstance().myMap.brickCells[i].x + 49;
                                        this.y = GameController.getInstance().myMap.brickCells[j].y - 75;
                                        this.changeState(playState.state_slide);
                                        return;
                                    }
                                }
                            }
                        }
                        else if (this.directionX == 1) {
                            for (var k = i + 1; k < GameController.getInstance().myMap.brickCells.length; k++) {
                                if (((GameController.getInstance().myMap.brickCells[i].x - 50) == GameController.getInstance().myMap.brickCells[k].x) && ((GameController.getInstance().myMap.brickCells[i].y + 50) == GameController.getInstance().myMap.brickCells[k].y) || ((GameController.getInstance().myMap.brickCells[i].y + 100) == GameController.getInstance().myMap.brickCells[k].y)) {
                                    if (this.hitTest(GameController.getInstance().myMap.brickCells[k], this)) {
                                        this.x = GameController.getInstance().myMap.brickCells[i].x - 49;
                                        this.y = GameController.getInstance().myMap.brickCells[k].y - 75;
                                        this.changeState(playState.state_slide);
                                        return;
                                    }
                                }
                            }
                        }
                        if (this.directionX == -1) {
                            this.x = GameController.getInstance().myMap.brickCells[i].x + 49;
                        }
                        else if (this.directionX == 1) {
                            this.x = GameController.getInstance().myMap.brickCells[i].x - 49;
                        }
                        this.changeState(playState.state_slide);
                        return;
                    }
                    else {
                        if (this.directionX == -1) {
                            this.x = GameController.getInstance().myMap.brickCells[i].x + 49;
                        }
                        else if (this.directionX == 1) {
                            this.x = GameController.getInstance().myMap.brickCells[i].x - 49;
                        }
                        this.changeState(playState.state_slide);
                        return;
                    }
                }
            }
        }
    };
    //jump or twice jump
    Player.prototype.jumpCollision = function () {
        var distance_a;
        distance_a = this.speedY / 40 + this.directionY * this.speedYAccelerate / 1600 * 0.5;
        this.y -= distance_a;
        this.distanceY += distance_a;
        this.speedY = this.speedY + this.directionY * this.speedYAccelerate / 40;
        if (this.distanceY < 80 && this.distanceY > 40) {
            this.playerJumpImage.source = "jumpActor2";
        }
        else if (this.distanceY < 120) {
            this.playerJumpImage.source = "jumpActor3";
        }
        else if (this.distanceY < 160) {
            this.playerJumpImage.source = "jumpActor4";
        }
        else if (this.distanceY < 199) {
            this.playerJumpImage.source = "jumpActor5";
        }
        if (this.x >= 575) {
            this.x = 576;
            this.changeState(playState.state_slide);
            return;
        }
        else if (this.x <= 25) {
            this.x = 24;
            this.changeState(playState.state_slide);
            return;
        }
        else {
            this.x += this.directionX * this.speedX / 40;
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformLong.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformLong[i], this)) {
                if (GameController.getInstance().myMap.platformLong[i].y > (this.y + 50) && GameController.getInstance().myMap.platformLong[i].y <= (this.y + 75)) {
                    this.y = GameController.getInstance().myMap.platformLong[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.platformCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.platformCells[i], this)) {
                if (GameController.getInstance().myMap.platformCells[i].y > (this.y + 40) && GameController.getInstance().myMap.platformCells[i].y <= (this.y + 75)) {
                    this.y = GameController.getInstance().myMap.platformCells[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
            }
        }
        for (var i = 0; i < GameController.getInstance().myMap.brickCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.brickCells[i], this)) {
                if ((GameController.getInstance().myMap.brickCells[i].y + 40) <= this.y) {
                    if (i == (GameController.getInstance().myMap.brickCells.length - 1)) {
                        this.y = GameController.getInstance().myMap.brickCells[i].y + 76;
                        this.changeState(playState.state_fall);
                        return;
                    }
                    for (var j = i + 1; j < GameController.getInstance().myMap.brickCells.length; j++) {
                        if ((GameController.getInstance().myMap.brickCells[i].x == GameController.getInstance().myMap.brickCells[j].x) && ((GameController.getInstance().myMap.brickCells[i].y + 50) == GameController.getInstance().myMap.brickCells[j].y)) {
                            if (this.directionX == -1) {
                                this.x = GameController.getInstance().myMap.brickCells[i].x + 49;
                            }
                            else if (this.directionX == 1) {
                                this.x = GameController.getInstance().myMap.brickCells[i].x - 49;
                            }
                            this.changeState(playState.state_slide);
                            return;
                        }
                    }
                    this.y = GameController.getInstance().myMap.brickCells[i].y + 76;
                    this.changeState(playState.state_fall);
                    return;
                }
                else if (GameController.getInstance().myMap.brickCells[i].y > (this.y + 50) && GameController.getInstance().myMap.brickCells[i].y <= (this.y + 75)) {
                    this.y = GameController.getInstance().myMap.brickCells[i].y - 75;
                    this.changeState(playState.state_idle);
                    return;
                }
                else {
                    if (this.directionX == -1) {
                        this.x = GameController.getInstance().myMap.brickCells[i].x + 49;
                    }
                    else if (this.directionX == 1) {
                        this.x = GameController.getInstance().myMap.brickCells[i].x - 49;
                    }
                    this.changeState(playState.state_slide);
                    return;
                }
            }
        }
        if (this.distanceY >= 199) {
            this.speedY = 0;
            this.changeState(playState.state_fall);
            return;
        }
    };
    Player.prototype.changeState = function (curState) {
        this.playerLastState = this.myState;
        this.myState = curState;
        this.distanceY = 0;
        this.moveEffectCounter = 0;
        if (curState != playState.state_idle) {
            StopAudio(5);
        }
        //slide
        if (this.myState == playState.state_slide) {
            this.playerMoveEffectImage.visible = true;
        }
        else {
            this.playerMoveEffectImage.visible = false;
        }
        switch (curState) {
            case playState.state_idle:
                PlayAudio(5, 1, true, false);
                this.playerFallImage.visible = false;
                this.playerDeadImage.visible = false;
                this.playerJumpImage.visible = false;
                this.playerTwiceJump.visible = false;
                this.slideAnimation.visible = false;
                this.runAnimation.visible = true;
                this.jumpStage = 0;
                break;
            case playState.state_jump:
                PlayAudio(3, 3, false, false);
                this.playerJumpImage.source = "jumpActor1";
                this.playerJumpImage.visible = true;
                this.playerFallImage.visible = false;
                this.playerDeadImage.visible = false;
                this.playerTwiceJump.visible = false;
                this.slideAnimation.visible = false;
                this.runAnimation.visible = false;
                this.directionY = -1;
                this.speedY = this.speedYOriginal;
                this.jumpStage = 1;
                var jumpEffect = new effectAnimation("jumpEffect_Json", "jumpEffect_Image");
                var GloPos = this.getGlobalPoint();
                var localPos = this.parent.globalToLocal(GloPos.x, GloPos.y);
                if (this.directionX == -1) {
                    jumpEffect.scaleX = -1;
                    jumpEffect.x = localPos.x + 80;
                }
                else if (this.directionX == 1) {
                    jumpEffect.scaleX = 1;
                    jumpEffect.x = localPos.x - 80;
                }
                jumpEffect.y = localPos.y - 40;
                jumpEffect.visible = true;
                GameController.getInstance().myMap.addChild(jumpEffect);
                jumpEffect.mc.play(1);
                break;
            case playState.state_twiceJump:
                PlayAudio(7, 3, false, false);
                this.playerFallImage.visible = false;
                this.playerDeadImage.visible = false;
                this.playerJumpImage.visible = false;
                this.playerTwiceJump.visible = true;
                this.slideAnimation.visible = false;
                this.runAnimation.visible = false;
                if (this.directionX == -1) {
                    egret.Tween.removeTweens(this.playerTwiceJump);
                    this.playerTwiceJump.rotation = 0;
                    egret.Tween.get(this.playerTwiceJump, { loop: true }).to({ rotation: -360 }, 500); //�����
                }
                else if (this.directionX == 1) {
                    egret.Tween.removeTweens(this.playerTwiceJump);
                    this.playerTwiceJump.rotation = 0;
                    egret.Tween.get(this.playerTwiceJump, { loop: true }).to({ rotation: 360 }, 500); //���ҹ�
                }
                this.directionY = -1;
                this.speedY = this.speedYOriginal;
                this.jumpStage = 2;
                var twiceEffect = new effectAnimation("twiceEffect_Json", "twiceEffect_Image");
                //run
                twiceEffect.width = 120;
                twiceEffect.height = 60;
                twiceEffect.anchorOffsetX = this.width / 2;
                twiceEffect.anchorOffsetY = this.height / 2;
                twiceEffect.mc.anchorOffsetX = twiceEffect.mc.width;
                twiceEffect.mc.anchorOffsetY = twiceEffect.mc.height;
                twiceEffect.mc.x = twiceEffect.width;
                twiceEffect.mc.y = twiceEffect.height;
                var GloPos = this.getGlobalPoint();
                var localPos = this.parent.globalToLocal(GloPos.x, GloPos.y);
                if (this.directionX == -1) {
                    twiceEffect.scaleX = -1;
                    twiceEffect.x = localPos.x + 130;
                }
                else if (this.directionX == 1) {
                    twiceEffect.scaleX = 1;
                    twiceEffect.x = localPos.x - 130;
                }
                twiceEffect.y = localPos.y + 5;
                twiceEffect.visible = true;
                GameController.getInstance().myMap.addChild(twiceEffect);
                twiceEffect.mc.play(1);
                break;
            case playState.state_slide:
                this.playerFallImage.visible = false;
                this.playerDeadImage.visible = false;
                this.playerJumpImage.visible = false;
                this.playerTwiceJump.visible = false;
                this.slideAnimation.visible = true;
                this.runAnimation.visible = false;
                this.directionY = 1;
                this.jumpStage = 0;
                this.playerMoveEffectImage.source = "slide1";
                this.playerMoveEffectImage.width = 50;
                this.playerMoveEffectImage.height = 120;
                this.playerMoveEffectImage.anchorOffsetX = this.playerMoveEffectImage.width / 2;
                this.playerMoveEffectImage.anchorOffsetY = this.playerMoveEffectImage.height / 2;
                if (this.directionX == -1) {
                    this.playerMoveEffectImage.scaleX = -1;
                    this.playerMoveEffectImage.x = 20;
                }
                else if (this.directionX == 1) {
                    this.playerMoveEffectImage.scaleX = 1;
                    this.playerMoveEffectImage.x = 30;
                }
                this.playerMoveEffectImage.y = -30;
                break;
            case playState.state_fall:
                this.playerFallImage.source = "fallActor1";
                this.playerFallImage.visible = true;
                this.playerDeadImage.visible = false;
                this.playerJumpImage.visible = false;
                this.playerTwiceJump.visible = false;
                this.slideAnimation.visible = false;
                this.runAnimation.visible = false;
                this.directionY = 1;
                break;
            case playState.state_dead:
                StopAudio(5);
                StopAllAudio();
                PlayAudio(1, 2, false, false);
                this.playerFallImage.visible = false;
                this.playerDeadImage.visible = true;
                this.playerJumpImage.visible = false;
                this.playerTwiceJump.visible = false;
                this.slideAnimation.visible = false;
                this.runAnimation.visible = false;
                egret.Tween.get(this.playerDeadImage).to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250).to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 200); //��������
                var deadEffect = new effectAnimation("deadEffect_Json", "deadEffect_Image");
                var GloPos = this.getGlobalPoint();
                var localPos = this.parent.globalToLocal(GloPos.x, GloPos.y);
                if (this.directionX == -1) {
                    deadEffect.scaleX = -1;
                    deadEffect.x = localPos.x + 40;
                }
                else if (this.directionX == 1) {
                    deadEffect.scaleX = 1;
                    deadEffect.x = localPos.x - 40;
                }
                deadEffect.y = localPos.y - 55;
                deadEffect.visible = true;
                GameController.getInstance().myMap.addChild(deadEffect);
                GameController.getInstance().myMap.addChild(this);
                deadEffect.mc.play(1);
                break;
            default:
                ;
        }
    };
    Player.prototype.spikeCollision = function () {
        for (var i = 0; i < GameController.getInstance().myMap.spikeCells.length; i++) {
            if (this.hitTestSpike(GameController.getInstance().myMap.spikeCells[i], this, GameController.getInstance().myMap.spikeCells[i].getBg().rotation)) {
                this.playerDead();
                return;
            }
        }
    };
    Player.prototype.reddotCollision = function () {
        for (var i = 0; i < GameController.getInstance().myMap.reddotCells.length; i++) {
            if (this.hitTestRed(GameController.getInstance().myMap.reddotCells[i].getBg(), this)) {
                this.playerDead();
                return;
            }
        }
    };
    Player.prototype.carrotCollision = function () {
        for (var i = 0; i < GameController.getInstance().myMap.carrotCells.length; i++) {
            if (this.hitTest(GameController.getInstance().myMap.carrotCells[i], this)) {
                if (GameController.getInstance().myMap.carrotCells[i].bg.visible == true) {
                    GameController.getInstance().myMap.carrotCells[i].bg.visible = true;
                    GameController.getInstance().myMap.carrotCells[i].bg.visible = false;
                    GameController.getInstance().myMap.carrotCells[i].eatEffect.visible = true;
                    GameController.getInstance().myMap.carrotCells[i].eatEffect.mc.play(1);
                    if (GameController.getInstance().myMap.eatCarrotFlag[i] == 0) {
                        PlayAudio(2, 3, false, false);
                        GameController.getInstance().data["originalScore"] += 30;
                        GameView.m_UI.myPlayerScore.text = GameController.getInstance().data["originalScore"].toString();
                        GameController.getInstance().myMap.eatCarrotFlag[i] = 1;
                    }
                }
            }
        }
    };
    Player.prototype.setPlayerDirX = function (dirX) {
        this.directionX = dirX;
        this.setPlayerRotation();
        this.moveEffectCounter = 0;
    };
    Player.prototype.getPlayerDirX = function () {
        return this.directionX;
    };
    Player.prototype.setPlayerRotation = function () {
        if (this.directionX == -1) {
            //run
            this.runAnimation.scaleX = -1.2;
            this.runAnimation.scaleY = 1.2;
            this.runAnimation.x = 15;
            //slide
            this.slideAnimation.scaleX = -1;
            //fall
            this.playerFallImage.scaleX = -1;
            this.playerFallImage.x = 15;
            //dead
            this.playerDeadImage.scaleX = -1;
            this.playerDeadImage.x = 35;
            //jump
            this.playerJumpImage.scaleX = -1;
            this.playerJumpImage.x = 18;
            //twice
            this.playerTwiceJump.scaleX = -1;
        }
        else {
            //run
            this.runAnimation.scaleX = this.runAnimation.scaleY = 1.2;
            this.runAnimation.x = 35;
            //slide
            this.slideAnimation.scaleX = 1;
            //fall
            this.playerFallImage.scaleX = 1;
            this.playerFallImage.x = 30;
            //dead
            this.playerDeadImage.scaleX = 1;
            this.playerDeadImage.x = 15;
            //jump
            this.playerJumpImage.scaleX = 1;
            this.playerJumpImage.x = 30;
            //twice
            this.playerTwiceJump.scaleX = 1;
        }
    };
    Player.prototype.getJumpStage = function () {
        return this.jumpStage;
    };
    Player.prototype.getSpeedY = function () {
        return this.speedY;
    };
    Player.prototype.getDirectionY = function () {
        return this.directionY;
    };
    Player.prototype.getPlayerState = function () {
        return this.myState;
    };
    Player.prototype.getSlideSpeed = function () {
        return this.slideSpeed;
    };
    Player.prototype.playerDead = function () {
        this.changeState(playState.state_dead);
        this.removePlayerFrameHandle();
        GameController.getInstance().removeGameEvent();
        egret.setTimeout(function () {
            this.playerLife--;
            if (this.playerLife > 0) {
                this.playerRelive();
                GameController.getInstance().recoverGame();
                GameView.m_UI.life_num.text = this.playerLife.toString();
                return;
            }
            else {
                GameController.getInstance().GameOver();
            }
        }, this, 1000);
    };
    Player.prototype.playerRelive = function () {
        StopAllAudio();
        PlayAudio(0, 0.2, true, false);
        this.playerLastState = playState.state_idle;
        this.changeState(playState.state_idle);
        this.recoverPlayerFrameHandle();
    };
    Player.prototype.removePlayerFrameHandle = function () {
        this.myTimer.stop();
        this.myTimer.removeEventListener(egret.TimerEvent.TIMER, this.playerFrameHandler, this);
        delete this.myTimer;
    };
    Player.prototype.recoverPlayerFrameHandle = function () {
        this.addMyTimeListener();
    };
    Player.prototype.hitTest = function (obj1, obj2) {
        var aa = obj1.parent.localToGlobal(obj1.x, obj1.y);
        var bb = obj2.parent.localToGlobal(obj2.x, obj2.y);
        var rect1 = new egret.Rectangle(aa.x - obj1.width / 2, aa.y - obj1.height / 2, obj1.width, obj1.height);
        var rect2 = new egret.Rectangle(bb.x - obj2.width / 2, bb.y - obj2.height / 2, obj2.width, obj2.height);
        return rect1.intersects(rect2);
    };
    Player.prototype.hitTestSpike = function (obj1, obj2, rotat) {
        var aa = obj1.parent.localToGlobal(obj1.x, obj1.y);
        var bb = obj2.parent.localToGlobal(obj2.x, obj2.y);
        var rect1;
        var rect2 = new egret.Rectangle(bb.x - obj2.width / 2, bb.y - obj2.height / 2, obj2.width, obj2.height);
        if (rotat == 0) {
            rect1 = new egret.Rectangle(aa.x - 10, aa.y - 10, 20, 15);
        }
        else if (rotat == 90) {
            rect1 = new egret.Rectangle(aa.x - 10, aa.y - 10, 15, 20);
        }
        else if (rotat == 180) {
            rect1 = new egret.Rectangle(aa.x - 10, aa.y - 10, 20, 15);
        }
        else if (rotat == -90) {
            rect1 = new egret.Rectangle(aa.x - 10, aa.y - 10, 15, 20);
        }
        return rect1.intersects(rect2);
    };
    Player.prototype.hitTestRed = function (obj1, obj2) {
        var aa = obj1.parent.localToGlobal(obj1.x, obj1.y);
        var bb = obj2.parent.localToGlobal(obj2.x, obj2.y);
        var rect1 = new egret.Rectangle(aa.x - 18, aa.y - 18, 36, 36);
        var rect2 = new egret.Rectangle(bb.x - obj2.width / 2, bb.y - obj2.height / 2, obj2.width, obj2.height);
        return rect1.intersects(rect2);
    };
    return Player;
}(eui.Group));
