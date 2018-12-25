/**
 * LeapRabbit目录下，egret clean -> egret build -> egret run -> egret publish
 */
class GameController
{
    private static instance:GameController;
    public static getInstance():GameController {
        if(this.instance == null) {
            this.instance = new GameController();
        }
        return this.instance;
    }

    // 游戏的临时数据
    public data : any;

    //场景Json数据
    public _stageJson:any;

    //当前关卡,用于读取地图
    public curLevel:number;

    //关卡最大层数
    public MaxLevel:number = 10;

    //记录每层开始时间
    public startTime_level:number = 0;

    //记录每层结束时间
    public endTime_level:number = 0;

    //记录每层持续时间
    public durationTime_level:number = 0;

    //地图
    public myMap:Maps;
    public myMapNext:Maps;
    public myMapThird:Maps;

    //地图移动速度
    private mapMoveSpeed:number;

    //角色
    public myPlayer:Player;

    //存放树以及叶子数组
    public treeArr;

    //第一关地面图片
    public groundImage:eui.Image;

    private myTimer:egret.Timer;

    /**
     * 初始化游戏数据，然后开始
     */
    public Init ()
    {
        GameView.m_UI.game_startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.preStartGame,this);
    }

    public preStartGame(){
        GameView.m_UI.game_startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.preStartGame,this);
        PlayAudio(6, 5, false, false);
        egret.Tween.get(GameView.m_UI.game_startButton).to({scaleX:0.8,scaleY:0.8},200).to({scaleX:1,scaleY:1},200).call(function(){
            this.StartGame();
        },this);
    }

    public StartGame ()
    {
        this.data = {
            "originalScore":0
        }
        this._stageJson = RES.getRes("stageJson");
        StopAllAudio();
        PlayAudio(0, 0.2, true, false);
        PlayAudio(5, 1, true, false);
        this.startTime_level = egret.getTimer();
        if(GameView.m_UI.start_group.parent)
        {
            GameView.m_UI.removeChild(GameView.m_UI.start_group);
            delete GameView.m_UI.start_group;
        }

        //初始分数为0
        GameView.m_UI.myPlayerScore.text = "0";
        this.curLevel = 1;

        this.data["originalScore"] = 0;
        this.mapMoveSpeed = 400;

        //加入树叶以及枝干
        this.treeArr = new Array();
        for(let i=0;i<3;i++)
        {
            this.treeArr[i] = new eui.Image();
            Main.euiLayer.addChild(this.treeArr[i]);
        }
        this.treeArr[0].source = "scene3";
        this.treeArr[0].x = 0;
        this.treeArr[0].y = -960;
        this.treeArr[1].source = "scene3";
        this.treeArr[1].x = 0;
        this.treeArr[1].y = 0;
        this.treeArr[2].source = "scene3";
        this.treeArr[2].x = 0;
        this.treeArr[2].y = 960;

        //第一关加入地面
        this.groundImage = new eui.Image();
        this.groundImage.source = "scene1";
        this.groundImage.width = 640;
        this.groundImage.height = 960;
        this.groundImage.anchorOffsetY = this.groundImage.height;
        this.groundImage.x = 0;
        this.groundImage.y = 960;
        Main.euiLayer.addChild(this.groundImage);

        //游戏运行,建三张地图
        this.myMap = new Maps();
        this.myMap.x = 320;
        this.myMap.y = 730;
        Main.euiLayer.addChild(this.myMap);
        this.myMap.nowLevel = 1;
        this.myMap.level_disp.text = "10";

        //输出当前地图关卡
        //console.log("This map level is: ",this.myMap.nowLevel);
        this.curLevel = 2;
        this.myMapNext = new Maps();
        this.myMapNext.x = 320;
        this.myMapNext.y = this.myMap.y-this.myMap.height;
        Main.euiLayer.addChild(this.myMapNext);
        this.myMapNext.nowLevel = 2;
        this.myMapNext.level_disp.text = "9";

        this.curLevel = 3;
        this.myMapThird = new Maps();
        this.myMapThird.x = 320;
        this.myMapThird.y = this.myMapNext.y-this.myMapNext.height;
        Main.euiLayer.addChild(this.myMapThird);
        this.myMapThird.nowLevel = 3;
        this.myMapThird.level_disp.text = "8";

        //重新添加map,保证当前地图处于三张地图的最上层
        Main.euiLayer.addChild(this.myMap);

        this.myPlayer = new Player();
        this.myPlayer.x = 125;
        this.myPlayer.y = this.myMap.height-150;
        this.myPlayer.playerLastY = this.myPlayer.y;
        this.myMap.addChild(this.myPlayer);
        GameView.m_UI.life_num.text = "10";

        //时间监听
        this.addGameTimeListener();
        Main.euiLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchJump,this);

        //生命
        Main.euiLayer.addChild(GameView.m_UI.life_heart);
        Main.euiLayer.addChild(GameView.m_UI.life_num);

        //分数
        Main.euiLayer.addChild(GameView.m_UI.myPlayerScore);
        Main.euiLayer.addChild(GameView.m_UI.myPlayerScoreBottom);
    }

    //每25ms执行一次处理
    private addGameTimeListener(){
        this.myTimer = new egret.Timer(25,0);
        this.myTimer.addEventListener(egret.TimerEvent.TIMER,this.GameFrameHandler,this);
        this.myTimer.start();
    }

    //添加监听
    private GameFrameHandler()
    {
        //正常地图移动
        this.mapMove();

        //指向地图的指针交换所指地图
        if((this.myPlayer.y+150)<0)
        {
            this.mapChange();
        }

        //枝干和叶子坐标更改
        this.changeTreePos();
    }

    private changeTreePos()
    {
        for(let i=0;i<3;i++)
        {
            //枝干和对应叶子坐标相同，只需要判断一个即可
            if(this.treeArr[i].y<=-1920)
            {
                for(let j=0;j<3;j++)
                {
                    if(this.treeArr[j].y>-200)
                    {
                        this.treeArr[i].y = this.treeArr[j].y+960;
                        break;
                    }
                }
            }
            else if(this.treeArr[i].y>=1920)
            {
                for(let j=0;j<3;j++)
                {
                    if(this.treeArr[j].y<200)
                    {
                        this.treeArr[i].y = this.treeArr[j].y-960;
                        break;
                    }
                }
            }
        }
    }

    private mapChange()
    {
        this.endTime_level = egret.getTimer();

        //每层经过的时间，单位秒
        this.durationTime_level = (this.endTime_level - this.startTime_level)/1000;
        this.startTime_level = this.endTime_level;
        switch(this.myMap.nowLevel)
        {
            case 1:
                if(100-this.durationTime_level*0.2 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(100-this.durationTime_level*0.2);
                }
                break;
            case 2:
                if(200-this.durationTime_level*0.4 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(200-this.durationTime_level*0.4);
                }
                break;
            case 3:
                if(300-this.durationTime_level*0.6 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(300-this.durationTime_level*0.6);
                }
                break;
            case 4:
                if(500-this.durationTime_level*0.8 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(500-this.durationTime_level*0.8);
                }
                break;
            case 5:
                if(700-this.durationTime_level > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(700-this.durationTime_level);
                }
                break;
            case 6:
                if(1000-this.durationTime_level*1.2 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(1000-this.durationTime_level*1.2);
                }
                break;
            case 7:
                if(2000-this.durationTime_level*1.4 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(2000-this.durationTime_level*1.4);
                }
                break;
            case 8:
                if(4000-this.durationTime_level*1.6 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(4000-this.durationTime_level*1.6);
                }
                break;
            case 9:
                if(7000-this.durationTime_level*1.8 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(7000-this.durationTime_level*1.8);
                }
                break;
            case 10:
                if(10000-this.durationTime_level*2 > 0)
                {
                    this.data["originalScore"] = this.data["originalScore"]+Math.floor(10000-this.durationTime_level*2);
                }
                break;
            default:
                ;
        }

        //生命分数计算
        this.data["originalScore"] += this.myPlayer.playerLife*50;
        GameView.m_UI.myPlayerScore.text = GameController.getInstance().data["originalScore"].toString();

        //生命重置为初始10的状态
        this.myPlayer.playerLife = 10;
        GameView.m_UI.life_num.text = this.myPlayer.playerLife.toString();
        if(this.myMapThird.y>this.myMap.y)
        {
            //刷新地图
            this.curLevel ++;
            this.myMapThird.readMap();
            this.myMapThird.x = 320;
            this.myMapThird.y = this.myMapNext.y-this.myMapNext.height;
        }
        let GloPos:egret.Point = this.myPlayer.getGlobalPoint();

        if(this.myPlayer.parent)
        {
            this.myPlayer.parent.removeChild(this.myPlayer);
        }
        let myMapTemp:Maps;
        myMapTemp = this.myMap;
        this.myMap = this.myMapNext;
        this.myMapNext = myMapTemp;

        myMapTemp = this.myMapNext;
        this.myMapNext = this.myMapThird;
        this.myMapThird = myMapTemp;

        this.myMap.displayWinFlag();

        this.myPlayer.runAnimation.mc.play(-1);
        this.myPlayer.slideAnimation.mc.play(-1);

        this.myMap.addChild(this.myPlayer);

        let localPos:egret.Point = this.myPlayer.parent.globalToLocal(GloPos.x,GloPos.y);

        this.myPlayer.x = localPos.x;
        this.myPlayer.y =localPos.y;

        //重新添加map,保证当前地图处于三张地图的最上层
        Main.euiLayer.addChild(this.myMap);

        //保证生命显示和分数显示在最上层
        //生命
        Main.euiLayer.addChild(GameView.m_UI.life_heart);
        Main.euiLayer.addChild(GameView.m_UI.life_num);

        //分数
        Main.euiLayer.addChild(GameView.m_UI.myPlayerScore);
        Main.euiLayer.addChild(GameView.m_UI.myPlayerScoreBottom);

        //输出当前地图关卡
        //console.log("This map level is: ",this.myMap.nowLevel);
    }

    private mapMove()
    {
        //角色位置限制在中央上下150像素
        if (this.myPlayer.getGlobalPoint().y < 580 && this.myPlayer.getGlobalPoint().y > 380)
        {
            this.mapMoveSpeed = 200;
            this.myMap.y += this.mapMoveSpeed/40;
            this.myMapNext.y += this.mapMoveSpeed/40;
            this.myMapThird.y += this.mapMoveSpeed/40;
            if(this.curLevel<4)
            {
                this.groundImage.y += this.mapMoveSpeed/40;
            }
        }
        else if(this.myPlayer.getGlobalPoint().y>600)
        {
            if(this.myPlayer.getGlobalPoint().y>650)
            {
                this.mapMoveSpeed = this.myPlayer.getSpeedY();
            }
            else
            {
                this.mapMoveSpeed = 400;
            }

            if(this.myPlayer.getPlayerState() == playState.state_slide)
            {
                this.mapMoveSpeed = this.myPlayer.getSlideSpeed();
            }
            this.myMap.y -= this.mapMoveSpeed/40;
            this.myMapNext.y -= this.mapMoveSpeed/40;
            this.myMapThird.y -= this.mapMoveSpeed/40;
            if(this.curLevel<4)
            {
                this.groundImage.y -= this.mapMoveSpeed/40;
            }
        }
        else if(this.myPlayer.getGlobalPoint().y <= 380)
        {
            this.mapMoveSpeed = this.myPlayer.getSpeedY();
            this.myMap.y += this.mapMoveSpeed/40;
            this.myMapNext.y += this.mapMoveSpeed/40;
            this.myMapThird.y += this.mapMoveSpeed/40;
            if(this.curLevel<4)
            {
                this.groundImage.y += this.mapMoveSpeed/40;
            }
        }

        //树叶枝干移动,角色非跑动状态
        if(this.myPlayer.getPlayerState() !== playState.state_idle)
        {
            for(let i=0;i<3;i++)
            {
                this.treeArr[i].y += 0.5;
            }
        }
    }

    private touchJump()
    {
        if(this.myPlayer.getJumpStage() == 0)
        {
            //滑动时监听到点击事件
            if(this.myPlayer.getPlayerState() == playState.state_slide)
            {
                this.myPlayer.setPlayerDirX(-this.myPlayer.getPlayerDirX());

                //方向向左
                if(this.myPlayer.getPlayerDirX() == -1)
                {
                    this.myPlayer.x -= 20;
                }
                else if(this.myPlayer.getPlayerDirX() == 1)//方向向右
                {
                    this.myPlayer.x += 20;
                }
            }
            this.myPlayer.changeState(playState.state_jump);
        }
        else if(this.myPlayer.getJumpStage() == 1)  //记录单次跳跃状态，jump和fall时均可二段跳
        {
            this.myPlayer.changeState(playState.state_twiceJump);
        }
    }

    //角色生命不为0，恢复游戏
    public recoverGame()
    {
        this.recoverGameEvent();
        this.myMap.x = 320;
        this.myMap.y = 730;
        this.myMapNext.x = 320;
        this.myMapNext.y = this.myMap.y-this.myMap.height;
        this.myMapThird.x = 320;
        this.myMapThird.y = this.myMap.y + this.myMapThird.height;
        this.myPlayer.x = 125;
        this.myPlayer.y = this.myMap.height-150;
    }

    public removeGameEvent()
    {
        this.myTimer.stop();
        this.myTimer.removeEventListener(egret.TimerEvent.TIMER,this.GameFrameHandler,this);
        delete this.myTimer;
        Main.euiLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchJump,this);
    }

    public removeTouchEvent()
    {
        Main.euiLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchJump,this);
    }

    public recoverGameEvent()
    {
        this.addGameTimeListener();
        Main.euiLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchJump,this);
    }

    /**
     * 游戏结束逻辑
     */
    public GameOver()
    {
        //console.log("1111:",this.data.originalScore);
        this.myPlayer.changeState(playState.state_dead);
        Main.euiLayer.removeChildren();
        StopAllAudio();
        DialogManager.open(EndView, "EndView", 1);
        EndView.m_UI.group_CurScore.text = this.data.originalScore.toString();
    }
}
