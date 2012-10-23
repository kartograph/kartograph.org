---
layout: docs
title: Installing Kartograph.py on Ubuntu
---

← [Return to Kartograph.py Docs](/docs/kartograph.py/)

# Installing Kartograph.py on Ubuntu

This is how install Kartograph.py on a fresh Ubuntu 12.10 system. Might work on older 12.X systems as well.

## Installing the pre-requisites

At first you need to make sure that you have the following libraries installed. They are needed to compile the dependencies for Kartograph.


    sudo apt-get install libxslt1-dev
    sudo apt-get install python-dev
    sudo apt-get install python-shapely
    sudo apt-get install python-gdal
    sudo apt-get install python-pyproj


## Setup a virtual environment

Then you probably want to install virtualenv which allows you to run Kartograph in a safe environment:

    sudo apt-get install python-virtualenv
    sudo pip install virtualenvwrapper
    mkdir ~/.virtualenvs
    echo source /usr/local/bin/virtualenvwrapper.sh >> ~/.profile

Now create and activate a new virtual environment for Kartograph. We name it just "K" in this case. Later, whenever you want to work with Kartograph you simply call ``workon K`` to start your session.

    mkvirtualenv K

## Install Kartograph.py

Install Kartograph.py directly from Github

    pip install https://github.com/kartograph/kartograph.py/zipball/master

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

There are more tests included in the Kartograph.py repository on Github.