This maps demonstrates some features of the <a href="http://github.com/svgmap">svgmap</a> library. Here, a perspective map of the United States is shown along with some cities sized by population (taken from [geonames.org](http://download.geonames.org/export/dump/)) and the poverty level per state (taken from [Guardian Data Blog](http://www.guardian.co.uk/news/datablog/interactive/2011/sep/15/us-poverty-mapped)).

The map is created using:

    svgmap regions USA --proj satellite --lat0 29 --lon0 -80 --dist 1.5