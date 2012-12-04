---
layout: docs
title: Kartograph.js Docs — Symbol Maps
---

# Symbol Maps

You can add symbols to a map using the ``map.addSymbols`` function. You need to provide a config dictionary filled with at least the following properties:


* ``type`` — defines which kind of symbols you want to use
* ``data`` — an array of data objects of which each will be represented by a symbol
* ``location`` — a function which returns an array [longitude, latitude]


    map.addSymbols({
        type: Kartograph.Label,
        data: myDataset,
        location: function(d) { return [] },
        text: function(d) { return 'Foo'; } 
    });


In the above example, ``myDataset`` could be an array or dictionary of items. Kartograph would create one symbol for each item.

## Symbol Types

### Labels

To label a layer in your map you can use . If ``location()`` returns a string in the format *"LAYER_ID**.**PATH_ID"*, Kartograph will try to calculate a nice position in the center of that layer path.


    map.addSymbols({
        type: Kartograph.Label,
        data: map.getLayer('countries').getPathsData(),
        location: function(d) { return 'countries.' + d.id; },
        text: function(d) { return d.name; }
    });


### Circles/Bubbles

[![symbol map demo](symbol-map.png)](/showcase/symbols/)

See this example

    map.addSymbols({
        type: Kartograph.Bubble,
        data: map.getLayer('countries').getPathsData(),
        location: function(d) { return 'countries.' + d.id; },
        radius: function(d) { return 20; },
        style: 'fill:red',
        title: function(d) { return d.name; }
    });

### Labeled Bubbles

...

### Images

You can use the symbol API to add image marker to your map.

### Create your own symbol type

## Sorting Symbols

Sometimes it's useful to control the order in which symbols are drawn to the map. A typical example are sized circles that are more usable when drawn from largest to smallest.

    map.addSymbols({
        type: Kartograph.Bubble,
        sortBy: 'radius desc',
        radius: function(d) { return Math.sqrt(d.value); }
    });

## Removing Symbols

To remove a group of symbols from your map, simply call ``map.removeSymbols()``. If you added multiple symbol layers, you can pass and index to specify the one to remove. Otherwise, all symbols will be removed.

    // remove the second symbol group
    map.removeSymbols(1);
    // remove all symbol groups
    map.removeSymbols();

## Advanced Symbol Layouts