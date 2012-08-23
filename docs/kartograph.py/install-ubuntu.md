---
layout: docs
title: Installing Kartograph.py on Ubuntu
---
# Installing Kartograph.py on Ubuntu

This is how install Kartograph on a fresh Ubuntu 12.04 system. At first you need to make sure that you have the following libraries installed. They are needed to compile the dependencies for Kartograph. Note that this instructions work with version 0.4.6 and will probably not work with older versions.


    sudo apt-get install libxslt1-dev
    sudo apt-get install python-dev
    sudo apt-get install python-shapely


Then you probably want to install virtualenv which allows you to run Kartograph in a safe environment:

    sudo apt-get install python-virtualenv

Now create and activate a new virtual environment for Kartograph. We name it just "K" and locate it in your home folder:


    cd ~
    virtualenv K
    cd K
    source bin/activate


Download and install Kartograph.py


    git clone https://github.com/kartograph/kartograph.py.git kartograph-src
    cd kartograph-src
    python setup.py install

## Test Installation

Download the 1:50m Admin 0 Countries shapefile from Natural Earth into a newly created folder "kartograph-test" in your home folder.

    mkdir ~/kartograph-test
    cd ~/kartograph-test;
    wget http://www.nacis.org/naturalearth/50m/cultural/50m-admin-0-countries.zip
    unzip 50m-admin-0-countries.zip


Create a very basic map configuration by creating a new text file named "world.json" and paste the following content into it:

    {
       "layers": {
           "src": "ne_50m_admin_0_countries.shp" 
       }
    }


Then you create the map using the following command:


    kartograph world.json -o world.svg


Congrats, that's it. Here's what you should see now.

![resulting map](http://new.tinygrab.com/f3aa221ede0ee6a8f06d0423a6e763d2526c9466a6.png)