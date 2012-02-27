
$(function() {

	var map = $K.map('#map');

	map.loadMap('cea-map.svg', function() {
		map.addLayer('sea', 'sea');
		map.addLayer('countries');
		map.addLayer('graticule');
		map.addLayer('equator');
		map.addLayer('sea', 'sea-outline');
	});

});
