@echo off
title  展瑞5G工具箱（水遍开源版）
mode con cols=85 lines=26
setlocal enabledelayedexpansion
adb pull /at/cmdat 
if not exist "cmdat" (
adb shell mount -o remount,rw /
adb push file\at /
goto:0
else
)
del cmdat >nul 2>nul

:0
set "device="
for /f "tokens=*" %%a in ('wmic path Win32_PnPEntity where "Caption like '%%SPRD DIAG%%'" get Caption /value ^| find "="') do (
    set "device=%%a"
)

if not "%device%"=="" (
    for /f "tokens=2 delims==" %%b in ("%device%") do (
        set "portName=%%b"
        set "portName=!portName:~0!"
set ATDK=!portName!
    )
) else (
set ATDK={06}未检测到端口{0f}
)
setlocal enabledelayedexpansion
for /f "delims=" %%a in ('adb shell /at/cmdat AT+SPIMEI? ^| findstr /v "OK"') do (
    set "imei=%%a"
)
ECHO.
ECHO.
for /f "tokens=1" %%a in ('adb devices ^| findstr /i "device"') do (
    set "sn=%%a"
)
cls
ECHO. 
ECHO.   改串端口: %ATDK%      IMEI：%imei%      S N ：%sn%
ECHO. -----------------------------------------------------------------------------------
ECHO. 
ECHO. 
ECHO. 
ECHO.          1.安装展瑞驱动         2.展瑞改串工具        3.展瑞刷机工具
ECHO. 
ECHO.
ECHO.          4.备份原版后台         5.刷入58001后台       6.刷入8080后台
ECHO. 
ECHO.
ECHO.          7.刷入JC09原后台       8.刷入TM70原后台      9.还原备份后台
ECHO.
ECHO. 
ECHO.          10.提取刷机镜像       11.提取系统文件       12.清除并还原一切
ECHO. 
ECHO. 
ECHO. 
ECHO. 
ECHO.   13.一键修改IMEI       14.AT调试       15.刷入SSH       16.8080激活码计算器
ECHO.   
ECHO. 
ECHO. 
set /p n= 请选择: 
if "%n%"=="1" call :驱动
if "%n%"=="2" call :展瑞改串工具
if "%n%"=="3" call :展瑞刷机工具
if "%n%"=="4" call :备份原版后台
if "%n%"=="5" call :刷入58001后台
if "%n%"=="6" call :刷入8080后台
if "%n%"=="7" call :刷入JC09原后台
if "%n%"=="8" call :刷入TM70原后台
if "%n%"=="9" call :还原备份后台
if "%n%"=="10" call :提取刷机镜像
if "%n%"=="11" call :提取系统文件
if "%n%"=="12" call :清除并还原一切
if "%n%"=="13" call :一键修改IMEI
if "%n%"=="14" call :AT调试
if "%n%"=="15" call :SSH
goto 0

:SSH
echo.开始刷入..
adb shell mount -o remount,rw /
adb push file\ssh\ssh.tar /home/root/ >nul 2>nul
adb push file\ssh\ssh.sh /home/root/ >nul 2>nul
adb shell chmod 777 /home/root/ssh.sh
adb shell "cd /home/root/ && tar xvf ssh.tar"
adb shell rm -rf home/root/ssh.tar >nul 2>nul
adb shell bash /home/root/ssh.sh
adb shell rm -rf home/root/ssh.sh
adb shell bash /home/root/dropbear/script/start-sshd.sh
echo.
echo.
echo.请输入两次root并回车以设置用户名和密码为root
adb shell passwd root
echo.
goto:rebootyn

:AT调试
ECHO.
ECHO.
ECHO.
ECHO.
set /p at=请输入at指令：
adb shell /at/cmdat %at%
ECHO.
ECHO.
set /p n= 【   1：继续执行at      0：返回上级    】请选择: 
if "%n%"=="0" call :0
if "%n%"=="1" call :AT调试
goto:AT调试


:一键修改IMEI
ECHO.
ECHO.
ECHO.
set /p imei=请输入15位数 IMEI：
ECHO.
echo /at/cmdat AT+SPIMEI=0,"\"%imei%\"" > imei.sh
adb shell mount -o remount,rw / >nul 2>nul
adb push imei.sh / >nul 2>nul
del imei.sh / >nul 2>nul
adb shell bash imei.sh
adb shell rm imei.sh >nul 2>nul
for /f "delims=" %%a in ('adb shell /at/cmdat AT+SPIMEI? ^| findstr /v "OK"') do (
    set "imei2=%%a"
)
ECHO.
ECHO.新的imei为：%imei2%，重启生效.
ECHO.
PAUSE
goto:0

:清除并还原一切
adb shell mount -o remount,rw /
adb shell rm -rf /home/root/*
adb push file\QC\hostname.sh /etc/init.d/
adb push file\QC\S39hostname.sh /etc/rcS.d/
ECHO.
ECHO.ok
timeout 3 >nul 2>nul
goto 0

:提取系统文件
ECHO.   
ECHO.
ECHO.   
ECHO.
set /p tq=请输入保存的文件名：
md %tq%\mnt
adb pull etc %tq%
adb pull bin %tq%
adb pull lib %tq%
adb pull sbin %tq%
adb pull usr %tq%
adb pull srv %tq%
adb pull mnt/uaerdata/ %tq%\mnt\
adb pull mnt/data/ %tq%\mnt\
tar cvf %tq%.tar %tq%
rd /s /q %tq%
ECHO.
ECHO.ok
timeout 3 >nul 2>nul
goto 0


:提取刷机镜像
ECHO.
ECHO.自己加代码，
ECHO.
pause
goto:0

:还原备份后台
ECHO.   
ECHO.
ECHO.   
set /p WEB=请拖入备份的后台文件:
file\7z\7z.exe  x  -y -o. %WEB% -p"">nul>nul 2>nul
adb shell mount -o remount,rw /
adb shell rm -rf /srv/www
adb push www /srv/
rd /s /q www
goto:rebootyn

:刷入TM70原后台
adb shell mount -o remount,rw /
adb shell rm -rf /srv/www
adb push file\TM70\www /srv/
echo.
goto:rebootyn

:刷入JC09原后台
adb shell mount -o remount,rw /
adb shell rm -rf /srv/www
adb push file\JC09\www /srv/
echo.
goto:rebootyn

:刷入8080后台
adb shell mount -o remount,rw /
adb pull /home/root/r106/.key >nul 2>nul
adb shell rm -rf /home/root/r106 >nul 2>nul
adb push file\8080\setup.sh /home/root/
adb push file\8080\58001 /home/root/
adb push .at /home/root/ >nul 2>nul
del .at >nul 2>nul
adb shell chmod 777 /home/root/setup.sh
adb shell "cd /home/root/ && bash setup.sh"
echo.
goto:rebootyn

:刷入58001后台
adb shell mount -o remount,rw /
adb pull /home/root/.at >nul 2>nul
adb shell rm /home/root/.sim >nul 2>nul
adb shell rm /home/root/at_server >nul 2>nul
adb shell rm /home/root/index.html >nul 2>nul
adb shell rm /home/root/sim >nul 2>nul
adb shell rm /home/root/start.sh >nul 2>nul
adb shell rm /home/root/vnstat >nul 2>nul
adb shell rm /home/root/vnstatd >nul 2>nul
adb shell rm -rf /home/root/html >nul 2>nul
adb push file\58001\setup.sh /home/root/
adb push file\58001\58001 /home/root/
adb push .at /home/root/ >nul 2>nul
del .at >nul 2>nul
adb shell chmod 777 /home/root/setup.sh
adb shell "cd /home/root/ && bash setup.sh"
echo.
goto:rebootyn

:rebootyn
echo.-----------------------------------------------------------------------------------------------------{06}
echo.
echo.
echo.
set /p n= 执行完毕，是否重启设备【 Y/N ：重启/跳过】请选择：
if "%n%"=="y" call :rebooty
if "%n%"=="Y" call :rebooty
if "%n%"=="n" call :ZGZR
if "%n%"=="N" call :ZGZR
goto:rebootyn

:rebooty
adb shell reboot
goto:0

:备份原版后台
md WEB备份 >nul 2>nul
adb pull /srv/www 
set /p mm=请输入保存的文件名：
tar cvf WEB备份\%mm%.tar www
rd /s /q www
ECHO.
ECHO.ok
timeout 3 >nul 2>nul
goto:0

:展瑞刷机工具
start file/flash/flash.exe
goto:0

:展瑞改串工具
start file/WriteIMEI/WriteIMEI.exe
goto:0

:驱动
start file/drive/DPInst64.exe
goto:0





























