---
layout: docs
title: Installing Kartograph.py on Windows
---

← [Return to Kartograph.py Docs](/docs/kartograph.py/)

# Installing Kartograph.py on Windows

*soon to come*.

Do you want to help writing this installation instructions? Please, drop me an [email](hello@kartograph.org).

## Pre-requirements

Kartograph depends on the following software packages:
* [Python 2.7.x](http://python.org/download/) + [setuptools](http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20)
* [GDAL](http://pypi.python.org/pypi/GDAL/1.9.1#windows)
* [shapely](http://pypi.python.org/pypi/Shapely/1.0.14#downloads)
* optional: [PostgreSQL](http://www.postgresql.org/download/windows/) and [PostGIS](http://postgis.refractions.net/download/windows/)

You may need to install MinGW to compile some of the Python extensions during build.

## Install Kartograph

* Download and unzip the [Kartograph repository as ZIP file](https://github.com/kartograph/kartograph.py/zipball/master).

* From the command line, change to the kartograph directory and run the installation script.
```cmd
cd c:\path\to\kartograph
python setup.py install
```

