window.MUD_COMMANDS = window.MUD_COMMANDS || {};
window.MUD_COMMANDS["look"] = window.MUD_COMMANDS["l"] = function(args, game) {
    const room = game.rooms[game.player.location];
    if(!room){ game.showMsg("未知地点！",'error'); return;}
    game.showMsg(`<b>[${room.area_name} - ${room.name}]</b>`,'info');
    game.showMsg(room.desc,'info');
    if(room.items && room.items.length>0){
      game.showMsg("你看到这里有：",'info');
      room.items.forEach(item=>game.showMsg(` - ${item}`,'info'));
    }
    if(room.npcs && room.npcs.length>0){
      game.showMsg("这里有人："+room.npcs.join("、"),'info');
    }
    const exits=room.exits?Object.keys(room.exits):[];
    if(exits.length>0) game.showMsg("出口："+exits.join(', '),'info');
};
window.MUD_COMMANDS["l"] = window.MUD_COMMANDS["look"]; // 支持缩写