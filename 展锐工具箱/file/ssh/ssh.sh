#!/bin/sh
mount -o remount,rw /
if [ -z "$(cat /etc/init.d/hostname.sh|grep start-sshd.sh)" ];then
echo -e "\n/home/root/dropbear/script/start-sshd.sh &\n" >> /etc/init.d/hostname.sh
fi
if [ -z "$(cat /etc/rcS.d/S39hostname.sh|grep start-sshd.sh)" ];then
echo -e "\n/home/root/dropbear/script/start-sshd.sh &\n" >> /etc/rcS.d/S39hostname.sh
fi


