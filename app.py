import os
import tailer
from subprocess import PIPE, run
 
# for lines in tailer.follow(open("/home/pi/blue_hydra/blue_hydra_rssi.log")):
#     line = lines.split()
#     if(line[1] == 'CL'):
#         print(line[2])
        # command = ['hcitool', 'name', line[2]]
        # result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
        # print(result.returncode, result.stdout, result.stderr)

filename = "/home/pi/blue_hydra/blue_hydra_rssi.log"
checkList = []
print(os.stat(filename).st_mtime)
with open(filename) as fp:
    for lines in fp:
        line = lines.split()
        if(line[1] == 'CL'):
            mac = line[2]
            if mac not in checkList:
                checkList.append(mac)
                print(mac)