import tailer
from subprocess import PIPE, run
 
for lines in tailer.follow(open("/home/pi/blue_hydra/blue_hydra_rssi.log")):
    line = lines.split()
    if(line[1] == 'CL'):
        print(line[2])
        # command = ['hcitool', 'name', line[2]]
        # result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
        # print(result.returncode, result.stdout, result.stderr)