//第几个音乐,音量(大于0),是否循环,是否继续播放
function PlayAudio (num, volume, isLoop, isContinue)
{
    if(audio.SupportAudio())
    {
        audio.play(num, volume, isLoop, isContinue);
    }
    //console.log("播放了" + num);
}

function StopAudio (num)
{
    audio.stop(num)
    //console.log("停止了" + num);
}

function StopAllAudio()
{
    audio.stopAll();
    //console.log("停止了所有声音");
}