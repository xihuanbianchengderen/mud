from flask import Flask, request, jsonify, send_from_directory
import os
import json

app = Flask(__name__, static_folder='public')
PLAYER_DIR = 'players'

if not os.path.exists(PLAYER_DIR):
    os.makedirs(PLAYER_DIR)

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/api/ping')
def ping():
    return 'pong', 200

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('public', path)

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    if not username or len(username) > 20:
        return jsonify({'error': '用户名不合法'}), 400
    player_file = os.path.join(PLAYER_DIR, f"{username}.json")
    if not os.path.exists(player_file):
        # 新用户，创建默认存档
        player = {
            "name": username,
            "inventory": [],
            "health": 30,
            "maxHealth": 30,
            "location": None,
            # ...其它属性...
        }
        with open(player_file, 'w', encoding='utf-8') as f:
            json.dump(player, f, ensure_ascii=False, indent=2)
        return jsonify({"msg":"新角色已创建", "player": player})
    else:
        with open(player_file, 'r', encoding='utf-8') as f:
            player = json.load(f)
        return jsonify({"msg":"欢迎回来", "player": player})

@app.route('/api/save', methods=['POST'])
def save():
    data = request.json
    username = data.get('username')
    player = data.get('player')
    if not username or not player:
        return jsonify({'error':'参数错误'}), 400
    player_file = os.path.join(PLAYER_DIR, f"{username}.json")
    with open(player_file, 'w', encoding='utf-8') as f:
        json.dump(player, f, ensure_ascii=False, indent=2)
    return jsonify({"msg":"存档已保存"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)