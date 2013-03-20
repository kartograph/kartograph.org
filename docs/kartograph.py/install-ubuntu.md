---
layout: docs
title: Installing Kartograph.py on Ubuntu
---

← [Return to Kartograph.py Docs](/docs/kartograph.py/)

# Installing Kartograph.py on Ubuntu

This is how install Kartograph.py on a fresh Ubuntu 12.10 system. Might work on older 12.X systems as well.

## Installing the pre-requisites

    sudo apt-get install libxslt1-dev python-dev python-shapely python-gdal python-pyproj python-pip

## Install Kartograph.py

Install Kartograph.py directly from Github

    sudo pip install https://github.com/kartograph/kartograph.py/zipball/master -r https://raw.github.com/kartograph/kartograph.py/master/requirements.txt

## Test Installation

Download the 1:50m Admin 0 Countries shapefile from Natural Earth into a newly created folder "kartograph-test" in your home folder.

    mkdir ~/kartograph-test
    cd ~/kartograph-test;
    wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip
    unzip ne_50m_admin_0_countries.zip


Create a very basic map configuration by creating a new text file named "world.json" and paste the following content into it:

    {
       "layers": [{
           "src": "ne_50m_admin_0_countries.shp"
       }]
    }


Then you create the map using the following command:


    kartograph world.json -o world.svg


Congrats, that's it. Here's what you should see now.

![resulting map](http://new.tinygrab.com/f3aa221ede0ee6a8f06d0423a6e763d2526c9466a6.png)

There are more tests included in the Kartograph.py repository on Github.
