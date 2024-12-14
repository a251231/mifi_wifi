#!/bin/sh

mount -o remount,rw /

sed -i '/start/d' /etc/init.d/hostname.sh
sed -i '/start/d' /etc/rcS.d/S39hostname.sh

if [ -z "$(cat /etc/init.d/hostname.sh|grep run.sh)" ];then
echo -e "\n/home/root/58001/58001.sh &\n" >> /etc/init.d/hostname.sh
fi
if [ -z "$(cat /etc/rcS.d/S39hostname.sh|grep run.sh)" ];then
echo -e "\n/home/root/58001/58001.sh &\n" >> /etc/rcS.d/S39hostname.sh
fi
if [ -z "$(cat /etc/hosts|grep devupline)" ];then
echo "" >> /etc/hosts
echo "127.0.0.1 hyyrdz.com" >> /etc/hosts
echo "127.0.0.1 111.231.103.170" >> /etc/hosts
echo "127.0.0.1 203.107.6.88" >> /etc/hosts
echo "127.0.0.1 www.devupline.com" >> /etc/hosts
echo "127.0.0.1 devupline.com" >> /etc/hosts
echo "127.0.0.1 dm.yunqitec.com" >> /etc/hosts
echo "127.0.0.1 yunqitec.com" >> /etc/hosts
echo "127.0.0.1 ota-1253691939.file.myqcloud.com" >> /etc/hosts
echo "127.0.0.1 file.myqcloud.com" >> /etc/hosts
echo "127.0.0.1 myqcloud.com" >> /etc/hosts
echo "127.0.0.1 ota.mumuiot.com" >> /etc/hosts
echo "127.0.0.1 mumuiot.com" >> /etc/hosts
echo "127.0.0.1 reportinfo.freewo.com.cn" >> /etc/hosts
echo "127.0.0.1 fota.redstone.net.cn" >> /etc/hosts
fi

chmod 777 /home/root/58001/at_server
chmod 777 /home/root/58001/58001.sh
chmod 777 /home/root/58001/vnstat
chmod 777 /home/root/58001/vnstatd
rm "$0"