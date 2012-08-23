---
layout: docs
title: Kartograph.js Docs
toc:
    loading-svg: Loading SVG maps
---

# Kartograph.js Documentation

*Work in progress.*

## Getting started

The first step is to create an empty HTML document, include ``jQuery``, ``RaphaelJS`` and ``Kartograph.js``. You also need a container element for your map.

    <html>
        <head>
            <script src="jquery.min.js"></script>
            <script src="raphael-min.js"></script>
            <script src="kartograph.js"></script>
        </head>
        <body>
            <div id="map"></div>
        </body>
    </html>

Once the document has loaded you can initialize your Kartograph map using:

	var map = Kartograph.map('#map');

If the namespace ``Kartograph`` sounds too long for you, you can use the alias ``$K`` instead.

	var map = $K.map('#div');

By default Kartograph.js will try to fit the map into the container element. If the container element has a height of 0, the map will be sized to fit the width while maintaining the aspect ratio of the map data. However, you can override this by providing explicit ``width`` and ``height``.

	var map = Kartograph.map('#map', 600, 400);

## Loading SVG maps

Now you want to load your SVG using ``loadMap(map_url, callback)``. 


	map.loadMap('mymap.svg', function() {
   		// do something with your map, add layers etc.
	});


**Note:** Due to cross-domain access restrictions, you probably need to store your SVG files on the same domain as your map.


In case that your callback function lives outside the scope of your map the map instance is passed to the callback function as the first argument.


	function callback(mymap) {
   		// do something with mymap, add layers etc.
	}
	map.loadMap('mymap.svg', callback);


**Note:** If you call ``loadMap`` again, any existing map content will be removed.


### Advanced options

``loadMap()`` supports some additional parameters which you can access by passing a dictionary as third parameter:

	map.loadMap(map_url, callback, options);


The following options are available:

* **padding**: custom padding around the map. Use negative padding to hide the strokes at the edge.
* **halign**: Horizontal alignment of the map inside the map container. Possible values are ``left``, ``center`` and ``right``. Default is ``center``.
* **valign**: Vertical alignment of the map inside the map container. Possible values are ``top``, ``center``, ``bottom``. Default is ``center``.
* **zoom**: Zoom level. 1 = no zoom

## Displaying Map Layers

Each Kartograph SVG map contains one or more layers (stored in SVG groups). Kartograph.js allows you to add these layers to your interactive map. The most simple way to add a layer is to call ``map.addLayer()`` with the layer name as first argument.

	map.loadMap('mymap.svg', function() {
   		map.addLayer('mylayer');
	})


### Renaming layers

You can also give the layer a new name. This is especially useful if you add the same layer several times and want to style them differently.

	map.addLayer('mylayer', { name: 'newlayername' });


### Specifying a key attribute for layer paths

In Kartograph SVG maps, each path can hold a range of data attributes. In some situations one of these attributes can be used as a key for identifying the paths, which is used by some features of Kartograph.js. To specify the key attribute you can set the ``key`` option to the name of the attribute.

	map.addLayer('mylayer', { key: 'ISO' });


## Map Styling

Kartograph.js provides different ways to style your maps.

### Map styling using CSS
You can load a stylesheet for your map using ``loadCSS``. Of course, you could also just include the stylesheet using ``<link …>``, but this wouldn't work in Internet Explorer, since RaphaelJS renders using VML there. In fact ``loadCSS()`` will load the stylesheet, parse it and apply the styles by converting the CSS attributes to the corresponding Raphael calls.

	map.loadCSS('map.css', function() {
		map.loadMap('mymap.svg', function() {
			map.addLayer('layer');
		});
	});


### Map styling without CSS

You can also style your map directly using the Kartograph.js API.

	map.addLayer('mylayer', {
		styles: {
			fill: '#cdd',
			'stroke-width': 0.5
   		}
	});


You can achieve the same using ``style()``.

	map.addLayer('mylayer');
	map.getLayer('mylayer').style('fill', '#cdd');


### Conditional styling

By passing functions instead of values you can apply conditional styling. This way you can easily create a choropleth map.


	map.getLayer('mylayer').style('fill', function(data) {
		return data.id == "foo" ? '#d00' : '#ccc';
	});


**Hint:** You can also use [SVG filter](#filter) to style your maps.


## Events

### Listening to mouse events

It's easy to respond to mouse events. Kartograph supports the following events: ``click``, ``dblclick``, ``mouseenter``, ``mouseleave``. Please refer the jQuery mouse event documentation to learn more about the different event types.

	map.addLayer('mylayer', {
		click: function(data, path, event) {
			// handle mouse clicks
			// *data* holds the data dictionary of the clicked path
			// *path* is the raphael object
			// *event* is the original JavaScript event
		}
	});


### Multiple event handlers

Of course you can add event handlers later, too.

	map.getLayer('mylayer')
		.on('click', function(data, path, event) {
			// do something nice
			console.log(data);
			path.attr('fill', 'red');
			console.log(e.mouseX, e.mouseY);
		});



## Tooltips

### Setting simple built-in tooltips

Using the ``titles`` property you can set the ``title`` attribute for each path of a layer. If you provide a function it will be evaluated for each layer path. The path data will be passed as the first argument.


	map.addLayer('mylayer', {
		titles: function(data) { 
			return data.name; 
		}
	});


### Advanced tooltips using jQuery.qtips

For more advanced tooltips you need to include the jQuery qTips plugin.

    <script src="jquery.qtips.js"></script>

### Create your own tooltips

Of course, if you don't want to use qTips you can also implement your own tooltip solution using the mouse event handlers ``mouseenter`` and ``mouseleave``. See [Events](#events).



## Symbol Maps

### Add symbols

Kartograph.js provides an easy API to add symbols to your map.


    map.addSymbols({
        type: Kartograph.Label,
        data: myDataset,
        location: function(d) { return [] },
        text: function(d) { return 'Foo'; } 
    });


In the above example, ``myDataset`` could be an array or dictionary of items. Kartograph would create one symbol for each item.

### Labels

sdsd

### Label a map layer

To label a layer in your map you can use . If ``location()`` returns a string in the format *"LAYER_ID**.**PATH_ID"*, Kartograph will try to calculate a nice position in the center of that layer path.


    map.addSymbols({
        type: Kartograph.Label,
        data: map.getLayer('countries').getPathsData(),
        location: function(d) { return 'countries.' + d.id; },
        text: function(d) { return d.name; }
    });


### Circles



### Images

You can use the symbol API to add image marker to your map.

## Dot-Grids

???

## SVG Filter

## Geo-Paths

The GeoPath API allows you to add SVG paths with WGS84 coordinates. Kartograph will project each point and create an SVG path.

    map.addGeoPath(points, commands);


If ``commands`` is not provided, Kartograph.js will connect the points by straight lines.

To learn more about SVG paths, please read the RaphaelJS documentation.

### Straight line example


    function pt(lon, lat) {
        return new Kartograph.LonLat(lon, lat);
    }
    map.addGeoPath([pt(52.1, 11), pt(51.3, 10)]);


### Closed polygons

To create

    var pts = […]; // array of polygon points
    map.addGeoPolygon(pts, 'mypolygon') 

## ..