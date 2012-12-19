---
layout: docs
title: Installing Kartograph.py on Mac OS X
---

← [Return to Kartograph.py Docs](/docs/kartograph.py/)

# Installing Kartograph.py on Mac OS X

Before installing Kartograph, please install the GDAL Complete Framework as provided by William Kyngesburye on kyngchaos.com: [http://www.kyngchaos.com/software/frameworks](http://www.kyngchaos.com/software/frameworks). 

Then install the required Python packages. The recommended way is to this in a [virtualenv](http://www.virtualenv.org/en/latest/). Otherwise you probably need to ``sudo`` every pip call.

    pip install -r https://raw.github.com/kartograph/kartograph.py/master/requirements.txt
    
Some users reported that the install of the ``gdal`` package fails. The way around this is to use the pre-compiled package included in GDAL Complete Framework. You need to include them into your ``PYTHONPATH``. This can be done either in the ``activate`` script of your virtualenv or in your shell login script.

    export PYTHONPATH=$PYTHONPATH:/Library/Frameworks/GDAL.framework/Versions/1.9/Python/2.7/site-packages

Use ``requirements-nogdal.txt`` to install all required packages except ``gdal``.

    pip install -r https://raw.github.com/kartograph/kartograph.py/master/requirements-nogdal.txt
    
Then you should be ready to install Kartograph.    
    
    pip install https://github.com/kartograph/kartograph.py/zipball/master


# Test Installation

Download the 1:50m Admin 0 Countries shapefile from Natural Earth into a newly created folder "kartograph-test" in your home folder.

    mkdir ~/kartograph-test
    cd ~/kartograph-test;
    wget http://www.nacis.org/naturalearth/50m/cultural/50m-admin-0-countries.zip
    unzip 50m-admin-0-countries.zip


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

# Troubleshooting

* Speaking about shapely, this [installation guide](http://tumblr.pauladamsmith.com/post/17663153373/howtoinstallgdalshapely) might help you getting it running on Mac OS.
* During the install Python will need to compile packages, make sure that you have a working compiler on your system. Installing XCode with the Command line Utils helps.


Do you want to improve this installation instructions? Please, drop me an [email](feedback@kartograph.org).