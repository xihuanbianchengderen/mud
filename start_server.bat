@echo off
REM 切换到当前脚本所在目录
cd /d %~dp0

REM 激活虚拟环境（如果你有的话）
REM call venv\Scripts\activate

REM 启动 Flask 服务器
python server.py

pause