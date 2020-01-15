import datetime, os
import tailer
 
for lines in tailer.follow(open("/home/pi/blue_hydra/blue_hydra_rssi.log")):
    line = lines.split()
    if(line[1] == 'CL'):
        print(line[2])