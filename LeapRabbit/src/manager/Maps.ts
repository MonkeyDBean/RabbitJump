/**
 * Created by Bean on 2016/7/5.
 */
class Maps extends eui.Group {
    private sceneHeight:number;
    public mapCells:Array<Cell>;
    public platformCells:Array<Cell>;
    public brickCells:Array<Cell>;
    public carrotCells:Array<Cell>;
    public eatCarrotFlag;
    public spikeCells:Array<Cell>;
    public reddotCells:Array<redDot>;
    public redRootCells:Array<redDot>;
    public leftWallCells;
    public rightWallCells;

    public platformLong:Array<CellLong>;
    private platform_check:eui.Image;
    private checkPoint_win:eui.Image;
    private checkPoint_winU:eui.Image;
    private checkPoint_winB:eui.Image;
    private winSquare_mask:egret.Shape;
    public level_disp:eui.Label;

    public randomStage:number;
    public nowLevel:number;

    public constructor() {
        super();
        this.init();
    }

    private init()
    {
        this.readMap();
    }

    private readCheckPoint()
    {
        this.checkPoint_winU = new eui.Image();
        this.checkPoint_winB = new eui.Image();

        this.checkPoint_winU.source = "win_redflag1";
        this.checkPoint_winB.source = "win_redflag2";

        this.checkPoint_winU.x = 120;
        this.checkPoint_winB.x = 120;

        if(GameController.getInstance().curLevel == 1)
        {
            this.checkPoint_winU.y = this.height - 202;
            this.checkPoint_winB.y = this.height - 145;
        }
        else
        {
            this.checkPoint_winU.y = this.height - 113;
            this.checkPoint_winB.y = this.height - 56;
            this.checkPoint_winU.visible = false;
            this.winSquare_mask =  new egret.Shape();
            this.winSquare_mask.graphics.drawRect(this.checkPoint_winB.x ,this.checkPoint_winB.y, this.checkPoint_winB.width ,45);
            this.addChild(this.winSquare_mask);
            this.checkPoint_winB.mask = this.winSquare_mask;
        }
        this.addChild(this.checkPoint_winU);
        this.addChild(this.checkPoint_winB);

        this.platform_check = new eui.Image();
        this.platform_check.source = "check_platform";
        this.platform_check.x = 50;
        this.platform_check.y = this.height - 124;
        this.addChild(this.platform_check);
        this.level_disp = new eui.Label();
        this.level_disp.bold = true;
        this.level_disp.size = 40;
        this.level_disp.textColor = 0x582814;
        this.level_disp.x = 287;
        this.level_disp.y = this.height - 100;
        this.level_disp.text = (GameController.getInstance().MaxLevel+1-GameController.getInstance().curLevel).toString();

        if(GameController.getInstance().curLevel == 1)
        {
            this.level_disp.x = 275;
        }
        this.addChild(this.level_disp);
    }

    private readFinishPoint()
    {
        this.checkPoint_win = new eui.Image();
        this.checkPoint_win.source = "win_finishFlag";
        this.checkPoint_win.x = 85;
        this.checkPoint_win.y = this.height - 275;
        this.addChild(this.checkPoint_win);
        this.platform_check = new eui.Image();
        this.platform_check.source = "finish_point";
        this.platform_check.x = 50;
        this.platform_check.y = this.height - 124;
        this.addChild(this.platform_check);
    }
    public displayWinFlag()
    {
        if(GameController.getInstance().curLevel == GameController.getInstance().MaxLevel+2)
        {
            StopAudio(5);
            StopAllAudio();
            PlayAudio(8, 2, false, false);
            this.checkPoint_win.visible = true;
            egret.Tween.get(this.checkPoint_win).to({y:this.height - 318},1000).wait(2000).call(GameController.getInstance().GameOver,GameController.getInstance());
        }
        else
        {
            this.checkPoint_winU.visible = true;
            egret.Tween.get(this.checkPoint_winU).to({y:this.height - 202},600);
            egret.Tween.get(this.checkPoint_winB).to({y:this.height - 103},300).call(function(){
                this.removeChild(this.winSquare_mask);
                this.checkPoint_winB.mask = null;
            },this).to({y:this.height-145},300);
        }
    }

    public readMap()
    {
        if(GameController.getInstance().curLevel <= GameController.getInstance().MaxLevel+1)
        {
            this.removeChildren();
        }
        if(GameController.getInstance().curLevel >= 4&&GameController.getInstance().curLevel <= GameController.getInstance().MaxLevel+1)
        {
            for(let i=0;i<this.mapCells.length;i++)
            {
                delete this.mapCells[i];
            }
            delete this.mapCells;

            for(let i=0;i<this.brickCells.length;i++)
            {
                delete this.brickCells[i];
            }
            delete this.brickCells;

            for(let i=0;i<this.platformCells.length;i++)
            {
                delete this.platformCells[i];
            }
            delete this.platformCells;

            for(let i=0;i<this.carrotCells.length;i++)
            {
                delete this.carrotCells[i];
            }
            delete this.carrotCells;

            for(let i=0;i<this.eatCarrotFlag.length;i++)
            {
                delete this.eatCarrotFlag[i];
            }
            delete this.eatCarrotFlag;

            for(let i=0;i<this.spikeCells.length;i++)
            {
                delete this.spikeCells[i];
            }
            delete this.spikeCells;

            for(let i=0;i<this.reddotCells.length;i++)
            {
                delete this.reddotCells[i];
            }
            delete this.reddotCells;

            for(let i=0;i<this.redRootCells.length;i++)
            {
                delete this.redRootCells[i];
            }
            delete this.redRootCells;
        }
        if(GameController.getInstance().curLevel == 4)
        {
            Main.euiLayer.removeChild(GameController.getInstance().groundImage);
            delete GameController.getInstance().groundImage;
        }

        if(GameController.getInstance().curLevel <= GameController.getInstance().MaxLevel)
        {
            this.randomStage = Math.ceil(Math.random() * 3);
            this.sceneHeight = GameController.getInstance()._stageJson["CheckPoint" + GameController.getInstance().curLevel + "_Stage" + this.randomStage]["stage_length"];

            this.height = this.sceneHeight * 50;
            this.width = 600;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height;

            this.nowLevel = GameController.getInstance().curLevel;
            this.mapCells = new Array();
            this.brickCells = new Array();
            this.platformCells = new Array();
            this.carrotCells = new Array();
            this.eatCarrotFlag = new Array();
            this.spikeCells = new Array();
            this.reddotCells = new Array();
            this.redRootCells = new Array();
            this.platformLong = new Array();
            for(let i = 0;i<2;i++)
            {
                this.platformLong[i] = new CellLong();
                this.platformLong[i].x = 300;
                if(i == 0)
                {
                    this.platformLong[i].y = this.height - 75;
                }
                else if(i==1)
                {
                    this.platformLong[i].y = this.height - 475;
                }
                this.addChild(this.platformLong[i]);
            }
            this.readWall();
            for (let i = 0; i < this.sceneHeight * 12; i++)
            {
                let curCellType:number = GameController.getInstance()._stageJson["CheckPoint" + GameController.getInstance().curLevel + "_Stage" + this.randomStage]["GridType"][i];
                this.mapCells[i] = new Cell(curCellType);
                this.mapCells[i].x = 50 * (i % 12) + this.mapCells[i].width / 2;
                this.mapCells[i].y = 50 * Math.floor(i / 12) + this.mapCells[i].height / 2;
                if (curCellType !== 0)
                {
                    this.addChild(this.mapCells[i]);
                }
                switch (curCellType)
                {
                    case 2:
                        this.brickCells.push(this.mapCells[i]);
                        break;
                    case 3:
                        this.carrotCells.push(this.mapCells[i]);
                        egret.Tween.get(this.mapCells[i].getBg(),{loop:true}).to({scaleX:1.1,scaleY:1.1},400).to({scaleX:1,scaleY:1},400); //��С���Ķ���
                        this.eatCarrotFlag.push(0);
                        break;
                    case 4:
                        this.platformCells.push(this.mapCells[i]);
                        break;
                    case 5:
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        this.spikeCells.push(this.mapCells[i]);
                        break;
                    default:
                        ;
                }
            }
            this.readCheckPoint();
            if(GameController.getInstance().curLevel == 8)
            {
                if(this.randomStage == 1)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 300;
                    this.redRootCells[0].y = 1100;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetY = 175;
                    this.reddotCells[0].x = 300;
                    this.reddotCells[0].y = 1100;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetY = 125;
                    this.reddotCells[1].x = 300;
                    this.reddotCells[1].y = 1100;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);


                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetY = 75;
                    this.reddotCells[2].x = 300;
                    this.reddotCells[2].y = 1100;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetY = -125;
                    this.reddotCells[3].x = 300;
                    this.reddotCells[3].y = 1100;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetY = -75;
                    this.reddotCells[4].x = 300;
                    this.reddotCells[4].y = 1100;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetY = -25;
                    this.reddotCells[5].x = 300;
                    this.reddotCells[5].y = 1100;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 0;
                    this.redRootCells[1].y = 150;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetX = 75;
                    this.reddotCells[6].x = 0;
                    this.reddotCells[6].y = 150;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetX = 125;
                    this.reddotCells[7].x = 0;
                    this.reddotCells[7].y = 150;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[2] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[2].x = 0;
                    this.redRootCells[2].y = 450;
                    this.addChild(this.redRootCells[2]);

                    this.reddotCells[8] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[8].anchorOffsetX = 75;
                    this.reddotCells[8].x = 0;
                    this.reddotCells[8].y = 450;
                    this.addChild(this.reddotCells[8]);
                    egret.Tween.get(this.reddotCells[8],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[9] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[9].anchorOffsetX = 125;
                    this.reddotCells[9].x = 0;
                    this.reddotCells[9].y = 450;
                    this.addChild(this.reddotCells[9]);
                    egret.Tween.get(this.reddotCells[9],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[3] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[3].x = 600;
                    this.redRootCells[3].y = 150;
                    this.addChild(this.redRootCells[3]);

                    this.reddotCells[10] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[10].anchorOffsetX = -75;
                    this.reddotCells[10].x = 600;
                    this.reddotCells[10].y = 150;
                    this.addChild(this.reddotCells[10]);
                    egret.Tween.get(this.reddotCells[10],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[11] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[11].anchorOffsetX = -25;
                    this.reddotCells[11].x = 600;
                    this.reddotCells[11].y = 150;
                    this.addChild(this.reddotCells[11]);
                    egret.Tween.get(this.reddotCells[11],{loop:true}).to({rotation:-360},6000);

                    this.redRootCells[4] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[4].x = 600;
                    this.redRootCells[4].y = 450;
                    this.addChild(this.redRootCells[4]);

                    this.reddotCells[12] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[12].anchorOffsetX = -75;
                    this.reddotCells[12].x = 600;
                    this.reddotCells[12].y = 450;
                    this.addChild(this.reddotCells[12]);
                    egret.Tween.get(this.reddotCells[12],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[13] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[13].anchorOffsetX = -25;
                    this.reddotCells[13].x = 600;
                    this.reddotCells[13].y = 450;
                    this.addChild(this.reddotCells[13]);
                    egret.Tween.get(this.reddotCells[13],{loop:true}).to({rotation:-360},6000);


                }
                else if(this.randomStage == 2)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 300;
                    this.redRootCells[0].y = 1100;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetY = 175;
                    this.reddotCells[0].x = 300;
                    this.reddotCells[0].y = 1100;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetY = 125;
                    this.reddotCells[1].x = 300;
                    this.reddotCells[1].y = 1100;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetY = 75;
                    this.reddotCells[2].x = 300;
                    this.reddotCells[2].y = 1100;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetY = -125;
                    this.reddotCells[3].x = 300;
                    this.reddotCells[3].y = 1100;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetY = -75;
                    this.reddotCells[4].x = 300;
                    this.reddotCells[4].y = 1100;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetY = -25;
                    this.reddotCells[5].x = 300;
                    this.reddotCells[5].y = 1100;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 300;
                    this.redRootCells[1].y = 350;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetY = 175;
                    this.reddotCells[6].x = 300;
                    this.reddotCells[6].y = 350;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetY = 125;
                    this.reddotCells[7].x = 300;
                    this.reddotCells[7].y = 350;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[8] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[8].anchorOffsetY = 75;
                    this.reddotCells[8].x = 300;
                    this.reddotCells[8].y = 350;
                    this.addChild(this.reddotCells[8]);
                    egret.Tween.get(this.reddotCells[8],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[9] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[9].anchorOffsetY = -125;
                    this.reddotCells[9].x = 300;
                    this.reddotCells[9].y = 350;
                    this.addChild(this.reddotCells[9]);
                    egret.Tween.get(this.reddotCells[9],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[10] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[10].anchorOffsetY = -75;
                    this.reddotCells[10].x = 300;
                    this.reddotCells[10].y = 350;
                    this.addChild(this.reddotCells[10]);
                    egret.Tween.get(this.reddotCells[10],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[11] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[11].anchorOffsetY = -25;
                    this.reddotCells[11].x = 300;
                    this.reddotCells[11].y = 350;
                    this.addChild(this.reddotCells[11]);
                    egret.Tween.get(this.reddotCells[11],{loop:true}).to({rotation:360},6000);
                }
                else if(this.randomStage == 3)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 0;
                    this.redRootCells[0].y = 950;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetX = 75;
                    this.reddotCells[0].x = 0;
                    this.reddotCells[0].y = 950;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetX = 125;
                    this.reddotCells[1].x = 0;
                    this.reddotCells[1].y = 950;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 0;
                    this.redRootCells[1].y = 1250;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetX = 75;
                    this.reddotCells[2].x = 0;
                    this.reddotCells[2].y = 1250;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetX = 125;
                    this.reddotCells[3].x = 0;
                    this.reddotCells[3].y = 1250;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[2] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[2].x = 600;
                    this.redRootCells[2].y = 950;
                    this.addChild(this.redRootCells[2]);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetX = -75;
                    this.reddotCells[4].x = 600;
                    this.reddotCells[4].y = 950;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetX = -25;
                    this.reddotCells[5].x = 600;
                    this.reddotCells[5].y = 950;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:-360},6000);

                    this.redRootCells[3] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[3].x = 600;
                    this.redRootCells[3].y = 1250;
                    this.addChild(this.redRootCells[3]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetX = -75;
                    this.reddotCells[6].x = 600;
                    this.reddotCells[6].y = 1250;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetX = -25;
                    this.reddotCells[7].x = 600;
                    this.reddotCells[7].y = 1250;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:-360},6000);

                    this.redRootCells[4] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[4].x = 300;
                    this.redRootCells[4].y = 350;
                    this.addChild(this.redRootCells[4]);

                    this.reddotCells[8] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[8].anchorOffsetY = 175;
                    this.reddotCells[8].x = 300;
                    this.reddotCells[8].y = 350;
                    this.addChild(this.reddotCells[8]);
                    egret.Tween.get(this.reddotCells[8],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[9] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[9].anchorOffsetY = 125;
                    this.reddotCells[9].x = 300;
                    this.reddotCells[9].y = 350;
                    this.addChild(this.reddotCells[9]);
                    egret.Tween.get(this.reddotCells[9],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[10] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[10].anchorOffsetY = 75;
                    this.reddotCells[10].x = 300;
                    this.reddotCells[10].y = 350;
                    this.addChild(this.reddotCells[10]);
                    egret.Tween.get(this.reddotCells[10],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[11] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[11].anchorOffsetY = -125;
                    this.reddotCells[11].x = 300;
                    this.reddotCells[11].y = 350;
                    this.addChild(this.reddotCells[11]);
                    egret.Tween.get(this.reddotCells[11],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[12] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[12].anchorOffsetY = -75;
                    this.reddotCells[12].x = 300;
                    this.reddotCells[12].y = 350;
                    this.addChild(this.reddotCells[12]);
                    egret.Tween.get(this.reddotCells[12],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[13] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[13].anchorOffsetY = -25;
                    this.reddotCells[13].x = 300;
                    this.reddotCells[13].y = 350;
                    this.addChild(this.reddotCells[13]);
                    egret.Tween.get(this.reddotCells[13],{loop:true}).to({rotation:360},6000);
                }
            }

            if(GameController.getInstance().curLevel == 9)
            {
                if(this.randomStage == 1)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 150;
                    this.redRootCells[0].y = 1300;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetY = -25;
                    this.reddotCells[0].x = 150;
                    this.reddotCells[0].y = 1300;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetY = -75;
                    this.reddotCells[1].x = 150;
                    this.reddotCells[1].y = 1300;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 300;
                    this.redRootCells[1].y = 1300;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetY = -25;
                    this.reddotCells[2].x = 300;
                    this.reddotCells[2].y = 1300;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetY = -75;
                    this.reddotCells[3].x = 300;
                    this.reddotCells[3].y = 1300;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[2] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[2].x = 200;
                    this.redRootCells[2].y = 250;
                    this.addChild(this.redRootCells[2]);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetY = 75;
                    this.reddotCells[4].x = 200;
                    this.reddotCells[4].y = 250;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetY = 125;
                    this.reddotCells[5].x = 200;
                    this.reddotCells[5].y = 250;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[3] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[3].x = 400;
                    this.redRootCells[3].y = 250;
                    this.addChild(this.redRootCells[3]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetY = 75;
                    this.reddotCells[6].x = 400;
                    this.reddotCells[6].y = 250;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetY = 125;
                    this.reddotCells[7].x = 400;
                    this.reddotCells[7].y = 250;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:-360},6000);

                }
                else if(this.randomStage == 2)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 200;
                    this.redRootCells[0].y = 1400;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetX = -25;
                    this.reddotCells[0].x = 200;
                    this.reddotCells[0].y = 1400;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetX = -75;
                    this.reddotCells[1].x = 200;
                    this.reddotCells[1].y = 1400;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 0;
                    this.redRootCells[1].y = 1500;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetX = -25;
                    this.reddotCells[2].x = 0;
                    this.reddotCells[2].y = 1500;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetX = -75;
                    this.reddotCells[3].x = 0;
                    this.reddotCells[3].y = 1500;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[2] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[2].x = 200;
                    this.redRootCells[2].y = 250;
                    this.addChild(this.redRootCells[2]);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetY = 75;
                    this.reddotCells[4].x = 200;
                    this.reddotCells[4].y = 250;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetY = 125;
                    this.reddotCells[5].x = 200;
                    this.reddotCells[5].y = 250;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[3] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[3].x = 400;
                    this.redRootCells[3].y = 250;
                    this.addChild(this.redRootCells[3]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetY = 75;
                    this.reddotCells[6].x = 400;
                    this.reddotCells[6].y = 250;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetY = 125;
                    this.reddotCells[7].x = 400;
                    this.reddotCells[7].y = 250;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:-360},6000);
                }
                else if(this.randomStage == 3)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 150;
                    this.redRootCells[0].y = 250;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetX = -25;
                    this.reddotCells[0].x = 150;
                    this.reddotCells[0].y = 250;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetX = -75;
                    this.reddotCells[1].x = 150;
                    this.reddotCells[1].y = 250;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 500;
                    this.redRootCells[1].y = 300;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetX = -25;
                    this.reddotCells[2].x = 500;
                    this.reddotCells[2].y = 300;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetX = -75;
                    this.reddotCells[3].x = 500;
                    this.reddotCells[3].y = 300;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[2] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[2].x = 0;
                    this.redRootCells[2].y = 550;
                    this.addChild(this.redRootCells[2]);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetX = -25;
                    this.reddotCells[4].x = 0;
                    this.reddotCells[4].y = 550;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetX = -75;
                    this.reddotCells[5].x = 0;
                    this.reddotCells[5].y = 550;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[3] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[3].x = 200;
                    this.redRootCells[3].y = 1400;
                    this.addChild(this.redRootCells[3]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetX = -25;
                    this.reddotCells[6].x = 200;
                    this.reddotCells[6].y = 1400;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetX = -75;
                    this.reddotCells[7].x = 200;
                    this.reddotCells[7].y = 1400;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[4] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[4].x = 0;
                    this.redRootCells[4].y = 1500;
                    this.addChild(this.redRootCells[4]);

                    this.reddotCells[8] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[8].anchorOffsetX = -25;
                    this.reddotCells[8].x = 0;
                    this.reddotCells[8].y = 1500;
                    this.addChild(this.reddotCells[8]);
                    egret.Tween.get(this.reddotCells[8],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[9] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[9].anchorOffsetX = -75;
                    this.reddotCells[9].x = 0;
                    this.reddotCells[9].y = 1500;
                    this.addChild(this.reddotCells[9]);
                    egret.Tween.get(this.reddotCells[9],{loop:true}).to({rotation:360},6000);

                }
            }

            if(GameController.getInstance().curLevel == 10)
            {
                if(this.randomStage == 1)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 250;
                    this.redRootCells[0].y = 450;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetY = 225;
                    this.reddotCells[0].x = 250;
                    this.reddotCells[0].y = 450;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetY = 175;
                    this.reddotCells[1].x = 250;
                    this.reddotCells[1].y = 450;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetY = 125;
                    this.reddotCells[2].x = 250;
                    this.reddotCells[2].y = 450;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetY = 75;
                    this.reddotCells[3].x = 250;
                    this.reddotCells[3].y = 450;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetY = -25;
                    this.reddotCells[4].x = 250;
                    this.reddotCells[4].y = 450;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetY = -75;
                    this.reddotCells[5].x = 250;
                    this.reddotCells[5].y = 450;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetY = -125;
                    this.reddotCells[6].x = 250;
                    this.reddotCells[6].y = 450;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetY = -175;
                    this.reddotCells[7].x = 250;
                    this.reddotCells[7].y = 450;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 300;
                    this.redRootCells[1].y = 450;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[8] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[8].anchorOffsetY = 225;
                    this.reddotCells[8].x = 300;
                    this.reddotCells[8].y = 450;
                    this.addChild(this.reddotCells[8]);
                    egret.Tween.get(this.reddotCells[8],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[9] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[9].anchorOffsetY = 175;
                    this.reddotCells[9].x = 300;
                    this.reddotCells[9].y = 450;
                    this.addChild(this.reddotCells[9]);
                    egret.Tween.get(this.reddotCells[9],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[10] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[10].anchorOffsetY = 125;
                    this.reddotCells[10].x = 300;
                    this.reddotCells[10].y = 450;
                    this.addChild(this.reddotCells[10]);
                    egret.Tween.get(this.reddotCells[10],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[11] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[11].anchorOffsetY = 75;
                    this.reddotCells[11].x = 300;
                    this.reddotCells[11].y = 450;
                    this.addChild(this.reddotCells[11]);
                    egret.Tween.get(this.reddotCells[11],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[12] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[12].anchorOffsetY = -25;
                    this.reddotCells[12].x = 300;
                    this.reddotCells[12].y = 450;
                    this.addChild(this.reddotCells[12]);
                    egret.Tween.get(this.reddotCells[12],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[13] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[13].anchorOffsetY = -75;
                    this.reddotCells[13].x = 300;
                    this.reddotCells[13].y = 450;
                    this.addChild(this.reddotCells[13]);
                    egret.Tween.get(this.reddotCells[13],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[14] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[14].anchorOffsetY = -125;
                    this.reddotCells[14].x = 300;
                    this.reddotCells[14].y = 450;
                    this.addChild(this.reddotCells[14]);
                    egret.Tween.get(this.reddotCells[14],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[15] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[15].anchorOffsetY = -175;
                    this.reddotCells[15].x = 300;
                    this.reddotCells[15].y = 450;
                    this.addChild(this.reddotCells[15]);
                    egret.Tween.get(this.reddotCells[15],{loop:true}).to({rotation:360},6000);
                }
                else if(this.randomStage == 2 || this.randomStage == 3)
                {
                    this.redRootCells[0] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[0].x = 100;
                    this.redRootCells[0].y = 250;
                    this.addChild(this.redRootCells[0]);

                    this.reddotCells[0] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[0].anchorOffsetY = 125;
                    this.reddotCells[0].x = 100;
                    this.reddotCells[0].y = 250;
                    this.addChild(this.reddotCells[0]);
                    egret.Tween.get(this.reddotCells[0],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[1] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[1].anchorOffsetY = 75;
                    this.reddotCells[1].x = 100;
                    this.reddotCells[1].y = 250;
                    this.addChild(this.reddotCells[1]);
                    egret.Tween.get(this.reddotCells[1],{loop:true}).to({rotation:-360},6000);

                    this.redRootCells[1] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[1].x = 250;
                    this.redRootCells[1].y = 250;
                    this.addChild(this.redRootCells[1]);

                    this.reddotCells[2] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[2].anchorOffsetY = 125;
                    this.reddotCells[2].x = 250;
                    this.reddotCells[2].y = 250;
                    this.addChild(this.reddotCells[2]);
                    egret.Tween.get(this.reddotCells[2],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[3] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[3].anchorOffsetY = 75;
                    this.reddotCells[3].x = 250;
                    this.reddotCells[3].y = 250;
                    this.addChild(this.reddotCells[3]);
                    egret.Tween.get(this.reddotCells[3],{loop:true}).to({rotation:360},6000);

                    this.redRootCells[2] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[2].x = 100;
                    this.redRootCells[2].y = 650;
                    this.addChild(this.redRootCells[2]);

                    this.reddotCells[4] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[4].anchorOffsetY = 125;
                    this.reddotCells[4].x = 100;
                    this.reddotCells[4].y = 650;
                    this.addChild(this.reddotCells[4]);
                    egret.Tween.get(this.reddotCells[4],{loop:true}).to({rotation:-360},6000);

                    this.reddotCells[5] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[5].anchorOffsetY = 75;
                    this.reddotCells[5].x = 100;
                    this.reddotCells[5].y = 650;
                    this.addChild(this.reddotCells[5]);
                    egret.Tween.get(this.reddotCells[5],{loop:true}).to({rotation:-360},6000);

                    this.redRootCells[3] = new redDot(redDot_Style.cellStyle_RedRoot);
                    this.redRootCells[3].x = 250;
                    this.redRootCells[3].y = 650;
                    this.addChild(this.redRootCells[3]);

                    this.reddotCells[6] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[6].anchorOffsetY = 125;
                    this.reddotCells[6].x = 250;
                    this.reddotCells[6].y = 650;
                    this.addChild(this.reddotCells[6]);
                    egret.Tween.get(this.reddotCells[6],{loop:true}).to({rotation:360},6000);

                    this.reddotCells[7] = new redDot(redDot_Style.cellStyle_RedDot);
                    this.reddotCells[7].anchorOffsetY = 75;
                    this.reddotCells[7].x = 250;
                    this.reddotCells[7].y = 650;
                    this.addChild(this.reddotCells[7]);
                    egret.Tween.get(this.reddotCells[7],{loop:true}).to({rotation:360},6000);
                }
            }
        }
        else if(GameController.getInstance().curLevel == GameController.getInstance().MaxLevel+1)
        {
            this.sceneHeight = GameController.getInstance()._stageJson["AllFinish"]["stage_length"];
            this.height = this.sceneHeight * 50;
            this.width = 600;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height;
            this.nowLevel = GameController.getInstance().curLevel;
            this.mapCells = new Array();
            this.platformCells = new Array();
            this.brickCells = new Array();
            this.carrotCells = new Array();
            this.eatCarrotFlag = new Array();
            this.spikeCells = new Array();
            this.reddotCells = new Array();
            this.platformLong = new Array();
            this.platformLong[0] = new CellLong();
            this.platformLong[0].x = 300;
            this.platformLong[0].y = this.height - 75;
            this.addChild(this.platformLong[0]);

            for (let i = 0; i < this.sceneHeight * 12; i++)
            {
                let curCellType:number = GameController.getInstance()._stageJson["AllFinish"]["GridType"][i];
                this.mapCells[i] = new Cell(curCellType);
                this.mapCells[i].x = 50 * (i % 12) + this.mapCells[i].width / 2;
                this.mapCells[i].y = 50 * Math.floor(i / 12) + this.mapCells[i].height / 2;
                if (curCellType !== 0)
                {
                    this.addChild(this.mapCells[i]);
                }

                switch (curCellType)
                {
                    case 2:
                        this.brickCells.push(this.mapCells[i]);
                        break;
                    case 3:
                        this.carrotCells.push(this.mapCells[i]);
                        this.eatCarrotFlag.push(0);
                        break;
                    case 4:
                        this.platformCells.push(this.mapCells[i]);
                        break;
                    case 5:
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        this.spikeCells.push(this.mapCells[i]);
                        break;
                    default:
                        ;
                }
            }
            this.readWall();
            this.readFinishPoint();
        }
        else if(GameController.getInstance().curLevel ==  GameController.getInstance().MaxLevel+2)
        {
            GameController.getInstance().removeTouchEvent();
        }
    }

    private readWall()
    {
        this.leftWallCells = new Array();
        this.rightWallCells = new Array();

        let i=0;
        do{
            this.leftWallCells[i] = new eui.Image();
            this.leftWallCells[i].source = "pic_wall";
            this.leftWallCells[i].width = 20;
            this.leftWallCells[i].height = 845;
            this.leftWallCells[i].anchorOffsetX = this.leftWallCells[i].width/2;
            this.leftWallCells[i].anchorOffsetY = this.leftWallCells[i].height;
            this.leftWallCells[i].x = -10;

            this.rightWallCells[i] = new eui.Image();
            this.rightWallCells[i].source = "pic_wall";
            this.rightWallCells[i].width = 20;
            this.rightWallCells[i].height = 845;
            this.rightWallCells[i].anchorOffsetX = this.rightWallCells[i].width/2;
            this.rightWallCells[i].anchorOffsetY = this.rightWallCells[i].height;
            this.rightWallCells[i].x = 610;

            if(GameController.getInstance().curLevel == 1)
            {
                this.leftWallCells[i].y = this.height+240-i*this.leftWallCells[i].height;
                this.rightWallCells[i].y = this.height+240-i*this.rightWallCells[i].height;
            }
            else
            {
                this.leftWallCells[i].y = this.height-i*this.leftWallCells[i].height;
                this.rightWallCells[i].y = this.height-i*this.rightWallCells[i].height;
            }
            this.addChild(this.leftWallCells[i]);
            this.addChild(this.rightWallCells[i]);
            i++;
        }while(this.rightWallCells[i-1].y>0);
    }
}