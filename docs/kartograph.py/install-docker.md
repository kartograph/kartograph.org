---
layout: docs
title: Installing Kartograph.py using Docker
---

← [Return to Kartograph.py Docs](/docs/kartograph.py/)

# Installing Kartograph.py using Docker

This is how to avoid the hassle of installing libraries into your local filesystem, that may potentially interfere with any existing Python installation. If in Mac OS X it allows you to avoid having to choose between Homebrew or virtualenv and maintaining that.

## Install Docker

    https://docs.docker.com/installation/

## Run/obtain kartograph image

If you are using Mac OS X/Windows, run "boot2docker" and execute the commands in the console provided. Also, read this first on how to setup guest additions to the VM: https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c

If you are using Linux preprend "sudo" to any docker command invokation.

Run the following command, it will obtain the prepackaged kartograph image (and all its dependencies)

    docker pull esmitperez/kartograph

## Test Installation

Download the 1:50m Admin 0 Countries shapefile from Natural Earth into a newly created folder "kartograph-test" in your home folder.

    mkdir ~/kartograph-test
    cd ~/kartograph-test;
    wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip
    unzip ne_50m_admin_0_countries.zip


Create a very basic map configuration by creating a new text file named "world.json" and paste the following content into it:

    {
       "layers": [{
          // /workdir is the VM's internal folder pointing to your local folder
           "src": "/workdir/ne_50m_admin_0_countries.shp"
       }]
    }


Then you create the map using the following command (assuming Mac OS X, mapping current folder to Docker VM's /workdir):

    docker run -ti -v `pwd`:/workdir esmitperez/kartograph -v `pwd`:/workdir  /workdir/world.json -o /workdir/world.svg


Congrats, that's it. Here's what you should see now.

![resulting map](http://new.tinygrab.com/f3aa221ede0ee6a8f06d0423a6e763d2526c9466a6.png)

There are more tests included in the Kartograph.py repository on Github.
