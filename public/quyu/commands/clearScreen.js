window.MUD_COMMANDS["clear"] = function(args, game) {
    document.getElementById('output').innerHTML = '';
    // 重新输出欢迎内容
    if(needLogin){
       showMsg("=========================================","info");
       showMsg(" 🏡 欢迎来到MUD终端 ","info");
       showMsg("<b>请先输入：</b> login 用户名 或 load 存档", "info");
       showMsg((ONLINE_MODE?"<b>当前为联网模式，可云端同步角色。</b>":"<b>当前为本地离线模式，仅在浏览器保存。</b>"),"info")
       showMsg("=========================================","info");
   } else{
       showMsg("=========================================","info");
       showMsg(" 🏡 欢迎回来, <b>"+loginUser+"</b>！","info");
       showMsg((ONLINE_MODE?"<b>当前为联网模式，可云端同步角色。</b>":"<b>当前为本地离线模式，仅在浏览器保存。</b>"),"info")
       showMsg("=========================================","info");
   }
};