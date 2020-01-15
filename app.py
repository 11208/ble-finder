import datetime, os
import tailer
 
for line in tailer.follow(open("/home/pi/blue_hydra/blue_hydra_rssi.log")):
    print(line)