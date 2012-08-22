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

## Adding Map Layers

The most important configuration (and the only one which you cannot leave out) is ``layers``. 
    
**New:** The upcoming version of Kartograph will also support an dictionary of dictionaries, with layer ids as keys.

    {
        "layers": {
            "mylayer": {
            
            },
            "anotherlayer": {
            
            }
        }
    }

The old syntax is still supported (but deprecated). It required ``layers`` to be a list of dictionaries, one for each layer. You can name (and should) name the layer using ``layer.id``.

    {
        "layers": [{
            "id": "mylayer"
        }, {
            "id": "anotherlayer"
        }]
    }

If you forgot defining a layer id, Kartograph automatically named your layer as "layer_X".

## Adding Shapefile Layers    
    
If your geodata is stored in a shapefile, just pass the filename at ``layer.src``. 

    "mylayer": {
        "src": "countries.shp"
    }
    
Internally, Kartograph.py works with WGS84 coordinate system (EPSG:4326). It will look for a projection definition (which in the above example would be a file named **countries.prj**) and eventually project the geometry back to WGS84.

### Filtering

Sometimes you don't want your entire shapefile to be added to the map. You can use the ``layer.filter`` attribute to define which shapes you want. The following definition would add only those shapes that have a data attribute *ISO* set to "*FRA*".

    "mylayer":  {
        "src": "countries.shp",
        "filter": ["ISO", "=", "FRA"]
    }
    
Read more about the [filter syntax](/docs/kartograph.py/filter.html).

### Keeping the attributes

Most of the time you want Kartograph.py to include some of the data attributes defined in your shapefile. That's what you can use ``layer.attributes`` for.

    "mylayer": {
        "src": "countries.shp",
        "attributes": ["ISO3", "NAME"]
    }

The above configuration would add ``data-ISO3`` attributes to each of the rendered SVG paths.

    <path data-ISO3="USA" … />

Sometimes (actually pretty often) you find shapefiles with ugly, uppercase attributes, and you'd like to rename them. Therefor Kartograph.py accepts a dictionary in which the keys are the **new** attribute name and the values are the **source** attributes names.

    "mylayer": {
        "src": "countries.shp",
        "attributes": {
            "iso": "ISO3"
        }
    }
    
This would change the path in the resulting SVG to: 

    <path data-iso="USA" … />
    
**Note:** there's one specialty with the attribute name **id**. This would not only be added to ``data-id`` but also to the plain ``id`` attribute. This comes in handy if you want to post-process your SVG in graphic software like Illustrator, which ignores any data attributes, but displays the path ids.

    "mylayer": {
        "src": "countries.shp",
        "attributes": {
            "id": "ISO3"
        }
    }

## Advanced Layer Processing

Kartograph supports a range of

### Joining features within a layer



### ...

## Adding PostGIS layers

You can add a PostGIS layer too.

    "mylayer": {
        "id": "mylayer",
        "src": "postgis:dbname=osm",
        "table": "planet_osm_polygon",
        "query": "boundary = 'administrative'"
    }

## Special Layers

### Graticule

The following would add graticule lines for every 5°.

    "mygraticule": {
        "special": "graticule",
        "latitudes": 5,
        "longitudes": 5
    }

### Sea 

The sea layer is especially useful in non-rectangular world maps, where the 'background' layer could be a circle, a cone or whatever geometry.

    "background": {
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

