---
layout: docs
title: Kartograph.py Docs
---

# Kartograph.py Documentation


## Installing Kartograph

The easiest way to install Kartograph.py to 

    python setup.py install

## Using Kartograph.py

Essentially there are two different ways of using Kartograph.py: the command-line or using the Python library.

### Kartograph.py as a command line utility

After installing. The map configuration can be written in JSON or YAML.

    kartograph -s styles.css config.json -o mymap.svg
    
### Using Kartograph.py within Python

The second way is to include Kartograph in a Python script. You could

    from kartograph import Kartograph
    K = Kartograph()
    K.generate(config, outfile='mymap.svg')
    
The following chapters will cover the details of the map configuration syntax. 

## Adding Layers

The only required attribute is ``layers``.

    { "layers": [] }
    
### Shapefile Layers    

Each layer may have the following attributes:

    {
        "id": "mylayer",
        "src": "countries.shp"
    }

### PostGIS layers

You can add a PostGIS layer too.

    {
        "id": "mylayer",
        "src": "postgis:dbname=osm",
        "table": "planet_osm_polygon",
        "query": "boundary = 'administrative'"
    }

## Special Layers

### Graticule

The following would add graticule lines for every 5°.

    {
        "special": "graticule",
        "latitudes": 5,
        "longitudes": 5
    }

### Sea 

    {
        "special": "sea",
    }

## Projection 

## CSS-Styling

Kartograph.py allows you to style your SVG maps using CSS.

On the command line you can use the ``-s`` or ``--style`` parameter.

    kartograph -s style.css config.json -o map.svg
    
### Per-layer styling

To style a specific layer you simply set some rules for the layer id.

    #mylayer {
        fill: red;
    }
    
### Re-use styles for several layers

Of course you can re-use 

    #mylayer, #anotherlayer {
        stroke: none;
    }
    
However, if you have lots of layers this might be a bit too much. Another way is to assign classes to your layers

    {
        "id": "mylayer",
        "class": "roads"
    }
    
Then you can add per-class styles

    .roads {
        stroke-width: 2px;
    }
    
### Conditional styling



## Setting Export Parameters

In the ``export`` section you can customize.

### Map size

    "export": {
       "width": 1000,
       "height": 500
    }

Instead of defining the width/height explicitly, you can also use a combination of width/height and a **ratio**. 

    "export": {
       "width": 1000,
       "ratio": 0.5
    }

If you leave out either the width or height and have no ratio specified, Kartograph will automatically use the ratio of the projected map.

    "export": {
       "width": 1000
    }

### Round coordinates

If you set ``export.round`` to other values than **false** (which is the default), all point coordinates will be rounded to the specified number of digits. The following would force Kartograph to round all coordinates to the first decimal digit (e.g. 115.4 instead of 115.38749493). This significantly reduces the file size of the resulting maps.

    "export": {
       "round": 1
    }

