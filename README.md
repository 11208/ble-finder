
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install cmake -y

sudo apt-get install bluez bluez-test-scripts python-bluez python-dbus libsqlite3-dev ubertooth
git clone https://github.com/pwnieexpress/blue_hydra.git
cd blue_hydra/
bundle install
sudo apt-get install ruby-dev bundler
bundle install
blue_hydra --help

sudo ./bin/blue_hydra

sudo apt-get install cmake libusb-1.0-0-dev make gcc g++ libbluetooth-dev pkg-config libpcap-dev python-numpy python-pyside python-qt4
wget https://github.com/greatscottgadgets/libbtbb/archive/2018-12-R1.tar.gz -O libbtbb-2018-12-R1.tar.gz
tar -xf libbtbb-2018-12-R1.tar.gz
cd libbtbb-2018-12-R1
mkdir build
cd build
 cmake ..
make
sudo make install
cd ~
wget https://github.com/greatscottgadgets/ubertooth/releases/download/2018-12-R1/ubertooth-2018-12-R1.tar.xz
tar xf ubertooth-2018-12-R1.tar.xz
cd ubertooth-2018-12-R1/host
mkdir build
cd build
cmake ..
make
sudo make install
cd ~
sudo ldconfig
ubertooth-util -v