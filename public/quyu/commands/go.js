window.MUD_COMMANDS = window.MUD_COMMANDS || {};
window.MUD_COMMANDS["go"] = window.MUD_COMMANDS["move"] = function(args, game) {
    // args: ["go", "east"] 或 ["move", "north"]
    const dir = args[1] ? args[1].toLowerCase() : null;
    if(!dir) {
        game.showMsg("用法：go [方向]，如 go north", 'warn');
        return;
    }
    const curRoom = game.rooms[game.player.location];
    if(!curRoom || !curRoom.exits || !curRoom.exits[dir]) {
        game.showMsg("那个方向没有出路。", 'warn');
        return;
    }
    const next = curRoom.exits[dir];
    if(!game.rooms[next]) {
        game.showMsg("未知目标房间！", 'error');
        return;
    }
    game.player.location = next;
    // 自动执行look命令显示新房间
    if(window.MUD_COMMANDS.look) {
        window.MUD_COMMANDS.look([], game);
    } else {
        game.showMsg("你来到了新房间。");
    }
};

// 也可以支持直接 north/south/east/west 指令
["north","south","east","west"].forEach(function(dir){
  window.MUD_COMMANDS[dir]=function(args,game){
      // 支持直接输入 north 等
      window.MUD_COMMANDS.go([dir],game);
  };
});