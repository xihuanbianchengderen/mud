// 保存玩家数据为JSON文件下载
window.MUD_COMMANDS.save = async function(args, GAME) {
    const playerData = GAME.player;
    const dataStr = JSON.stringify(playerData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = (playerData.name || "player") + ".json";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);

    GAME.showMsg("✅ 玩家数据已导出！", "info");
};

// 加载本地JSON文件作为玩家数据
window.MUD_COMMANDS.load = async function(args, GAME) {
    let input = document.getElementById('loadFileInput');
    if (!input) {
        input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.id = 'loadFileInput';
        input.style.display = 'none';
        document.body.appendChild(input);
    }

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                GAME.player = data; // 覆盖当前玩家
                GAME.showMsg("✅ 玩家数据已载入！", "info");
                if(window.MUD_COMMANDS.look)
                    window.MUD_COMMANDS.look([], GAME); // 刷新房间信息
            } catch (err) {
                GAME.showMsg("❌ 文件格式错误！", "error");
            }
        };
        reader.readAsText(file);
    };

    input.value = "";
    input.click();
};