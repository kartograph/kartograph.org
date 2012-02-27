
$(function() {

	var map = $K.map('#map');

	map.loadMap('map-upsidedown.svg', function() {
		map.addLayer('sea');
		map.addLayer('graticule');
		map.addLayer('countries');
		map.addLayer('sea', 'sea-outline');
	});

});
