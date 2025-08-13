window.MUD_COMMANDS = window.MUD_COMMANDS || {};
window.MUD_COMMANDS["help"] = window.MUD_COMMANDS["h"] = function(args, game) {
    [
      "主要命令:",
      "look/l           - 查看当前房间",
      "go/move [方向] 或 north/east... - 移动",
      "get/take [名称]  - 拾取房间内某个道具",
      "drop [名称]      - 丢弃背包里的某个道具",
      "inventory/i      - 查看背包",
      "name [名字]      - 设置你的角色名",
      "login [名字]      - 登录游戏",
      "logout           - 登出游戏",
      "save              - 保存游戏",
      "load              - 加载游戏",
      "clear             - 清空屏幕",
      "help/h           - 显示帮助"
    ].forEach(s=>game.showMsg(s,"info"));
};