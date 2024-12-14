#!/bin/sh

crond -b -l 0 -L /tmp/crond.log
bash /home/root/9527/8080/8080.sh &
bash /home/root/9527/start.sh &
bash /home/root/fwd/start.sh &
 
