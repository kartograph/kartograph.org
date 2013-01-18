---
layout: docs
title: Kartograph.js Docs — Symbol Maps
---

*This tutorial is work in progress. If you want to help improving this, you're invited to [fork it on Github](https://github.com/kartograph/kartograph.org/blob/master/docs/kartograph.js/dorling.md)*

# Creating Dorling Cartograms

It's a small step from a Bubble symbol map to a Dorling cartogram. At first you set up your base map layer.

    map.addLayer('regions', {
        key: 'id'  // define which feature attribute holds the unique identifiers
    });

It's up to you whether you want to show the geographical map or not. If you don't want to, just set the ``opacity`` to zero.

    map.addLayer('regions', {
        key: 'id',
        styles: {
            opacity: 0
        }
    });

Now add symbols of the type ``Bubble`` to your map.

    symbols = map.addSymbols({
        type: Kartograph.Bubble,
        data: ...
        location: function(d) {
            // return id of a map layer path to position
            // the symbol on its centroid
            return 'mylayer.' + d.pathId;
        },
        radius: function(d) {
            // define radius depending on some data, e.g. population
            return Math.sqrt(d.population / maxPop) * 30;
        }
    });

Last thing you need to do is to run the dorlingLayout helper on your symbols:

    Kartograph.dorlingLayout(symbols);
