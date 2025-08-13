window.MUD_COMMANDS = window.MUD_COMMANDS || {};
window.MUD_COMMANDS["name"] = function(args, game) {
    const newName = args.slice(1).join(' ').trim();
    if (!newName) {
        game.showMsg("用法：name 你的新名字", "warn");
        return;
    }
    // 可加长度、敏感词等校验
    if (newName.length > 12) {
        game.showMsg("名字太长啦，最多12个字符！", "warn");
        return;
    }
    game.player.name = newName;
    game.showMsg(`你的角色名已修改为：<b>${newName}</b>`, "success");
};