@echo off
title  չ��5G�����䣨ˮ�鿪Դ�棩
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
set ATDK={06}δ��⵽�˿�{0f}
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
ECHO.   �Ĵ��˿�: %ATDK%      IMEI��%imei%      S N ��%sn%
ECHO. -----------------------------------------------------------------------------------
ECHO. 
ECHO. 
ECHO. 
ECHO.          1.��װչ������         2.չ��Ĵ�����        3.չ��ˢ������
ECHO. 
ECHO.
ECHO.          4.����ԭ���̨         5.ˢ��58001��̨       6.ˢ��8080��̨
ECHO. 
ECHO.
ECHO.          7.ˢ��JC09ԭ��̨       8.ˢ��TM70ԭ��̨      9.��ԭ���ݺ�̨
ECHO.
ECHO. 
ECHO.          10.��ȡˢ������       11.��ȡϵͳ�ļ�       12.�������ԭһ��
ECHO. 
ECHO. 
ECHO. 
ECHO. 
ECHO.   13.һ���޸�IMEI       14.AT����       15.ˢ��SSH       16.8080�����������
ECHO.   
ECHO. 
ECHO. 
set /p n= ��ѡ��: 
if "%n%"=="1" call :����
if "%n%"=="2" call :չ��Ĵ�����
if "%n%"=="3" call :չ��ˢ������
if "%n%"=="4" call :����ԭ���̨
if "%n%"=="5" call :ˢ��58001��̨
if "%n%"=="6" call :ˢ��8080��̨
if "%n%"=="7" call :ˢ��JC09ԭ��̨
if "%n%"=="8" call :ˢ��TM70ԭ��̨
if "%n%"=="9" call :��ԭ���ݺ�̨
if "%n%"=="10" call :��ȡˢ������
if "%n%"=="11" call :��ȡϵͳ�ļ�
if "%n%"=="12" call :�������ԭһ��
if "%n%"=="13" call :һ���޸�IMEI
if "%n%"=="14" call :AT����
if "%n%"=="15" call :SSH
goto 0

:SSH
echo.��ʼˢ��..
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
echo.����������root���س��������û���������Ϊroot
adb shell passwd root
echo.
goto:rebootyn

:AT����
ECHO.
ECHO.
ECHO.
ECHO.
set /p at=������atָ�
adb shell /at/cmdat %at%
ECHO.
ECHO.
set /p n= ��   1������ִ��at      0�������ϼ�    ����ѡ��: 
if "%n%"=="0" call :0
if "%n%"=="1" call :AT����
goto:AT����


:һ���޸�IMEI
ECHO.
ECHO.
ECHO.
set /p imei=������15λ�� IMEI��
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
ECHO.�µ�imeiΪ��%imei2%��������Ч.
ECHO.
PAUSE
goto:0

:�������ԭһ��
adb shell mount -o remount,rw /
adb shell rm -rf /home/root/*
adb push file\QC\hostname.sh /etc/init.d/
adb push file\QC\S39hostname.sh /etc/rcS.d/
ECHO.
ECHO.ok
timeout 3 >nul 2>nul
goto 0

:��ȡϵͳ�ļ�
ECHO.   
ECHO.
ECHO.   
ECHO.
set /p tq=�����뱣����ļ�����
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


:��ȡˢ������
ECHO.
ECHO.�Լ��Ӵ��룬
ECHO.
pause
goto:0

:��ԭ���ݺ�̨
ECHO.   
ECHO.
ECHO.   
set /p WEB=�����뱸�ݵĺ�̨�ļ�:
file\7z\7z.exe  x  -y -o. %WEB% -p"">nul>nul 2>nul
adb shell mount -o remount,rw /
adb shell rm -rf /srv/www
adb push www /srv/
rd /s /q www
goto:rebootyn

:ˢ��TM70ԭ��̨
adb shell mount -o remount,rw /
adb shell rm -rf /srv/www
adb push file\TM70\www /srv/
echo.
goto:rebootyn

:ˢ��JC09ԭ��̨
adb shell mount -o remount,rw /
adb shell rm -rf /srv/www
adb push file\JC09\www /srv/
echo.
goto:rebootyn

:ˢ��8080��̨
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

:ˢ��58001��̨
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
set /p n= ִ����ϣ��Ƿ������豸�� Y/N ������/��������ѡ��
if "%n%"=="y" call :rebooty
if "%n%"=="Y" call :rebooty
if "%n%"=="n" call :ZGZR
if "%n%"=="N" call :ZGZR
goto:rebootyn

:rebooty
adb shell reboot
goto:0

:����ԭ���̨
md WEB���� >nul 2>nul
adb pull /srv/www 
set /p mm=�����뱣����ļ�����
tar cvf WEB����\%mm%.tar www
rd /s /q www
ECHO.
ECHO.ok
timeout 3 >nul 2>nul
goto:0

:չ��ˢ������
start file/flash/flash.exe
goto:0

:չ��Ĵ�����
start file/WriteIMEI/WriteIMEI.exe
goto:0

:����
start file/drive/DPInst64.exe
goto:0





























