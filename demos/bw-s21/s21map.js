$(function() {

	$('#title .v').addClass('inactive');

	$.loadAssets({
		urls: {
			ltag: '../data/bw-ltag2011_.csv',
			s21: '../data/bw-s21_.csv'
		},
		success: function(content) {
	
			// import some classes
			var SVGMap = svgmap.SVGMap, 
				Color = svgmap.color.Color,
				Categories = svgmap.color.scale.Categories,
				Ramp = svgmap.color.scale.Ramp;

			window.map = new SVGMap('#map');
			
			$(window).resize(function() {
				map.resize();
			});
			
			
			map.loadMap('../maps/bw-cartogram-pop.svg', function(map) {
	
				map.addLayer('gemeinden', 'bg');
				map.addLayer('gemeinden', 'gemeinden', 'key');
				
				// prepare data
				var ltag, s21, tooltips = {}, data = {}, key, row, j;
				
				ltag = $.parseCSV({
					csv: content.ltag,
					map: true
				});
				
				s21 = $.parseCSV({
					csv: content.s21,
					map: true
				});
				
				for (j in s21.rows) {
					row = s21.rows[j];
					key = "0" + row['id'];
					row['contra'] = row['Ja-Stimmen'] / row['Gueltige Stimmen']
					row['pro'] = row['Nein-Stimmen'] / row['Gueltige Stimmen']
					row['s21pc'] = (row['Nein-Stimmen']-row['Ja-Stimmen']) / row['Gueltige Stimmen']
					row['s21wb'] = row['Gueltige Stimmen'] / row['Stimmberechtigte']
					data[key] = row;
				}
				
				for (j in ltag.rows) {
					row = ltag.rows[j];
					key = "0" + row['id'];
					if (data.hasOwnProperty(key)) {
						data[key]['ltwb'] = row['Gueltige Stimmen'] / row['Wahlberechtigte'];
						data[key]['cdu'] = row['CDU'] / row['Gueltige Stimmen'];
						data[key]['gruene'] = row['GRUENE'] / row['Gueltige Stimmen'];
						data[key]['spd'] = row['SPD'] / row['Gueltige Stimmen'];
						data[key]['fdp'] = row['FDP'] / row['Gueltige Stimmen'];
						data[key]['linke'] = row['DIE LINKE'] / row['Gueltige Stimmen'];
						
						var max = Math.max(row['CDU'],row['GRUENE'],row['SPD'],row['FDP'],row['DIE LINKE']);
						if (max == row["CDU"]) data[key]['ltmaj'] = 'cdu';
						if (max == row["GRUENE"]) data[key]['ltmaj'] = 'gruene';
						if (max == row["SPD"]) data[key]['ltmaj'] = 'spd';
						if (max == row["FDP"]) data[key]['ltmaj'] = 'fdp';
						if (max == row["DIE LINKE"]) data[key]['ltmaj'] = 'linke';
					}
					// data[key] = ltag.rows[j];
				}
				
				// tooltips
				for (j in s21.rows) {
					row = s21.rows[j];
					key = "0" + row['id'];
					tooltips[key] = [row.name, '']
					
					tooltips[key][1] =
						'<table><tr><td colspan="2" class="lbl">S21-VOLKSBEGEHREN:</td></tr>'
						+'<tr><th>Pro:</th><td>'+row['Nein-Stimmen']+' ('+Math.round(row['Nein-Stimmen'] / row['Gueltige Stimmen']*100)+'%)</td></tr>'
						+'<tr><th>Contra:&nbsp;</th><td>'+row['Ja-Stimmen']+' ('+Math.round(row['Ja-Stimmen'] / row['Gueltige Stimmen']*100)+'%)</td></tr>'
						+'<tr><th>Wahlbeteiligung:&nbsp;</th><td>'+(Math.round(1000*row['s21wb'])/10)+'%</td></tr>'	
						+'<tr><td colspan="2" class="lbl l2">LANDTAGSWAHL 2011:</td></tr>'
						+'<tr><th>Wahlbeteiligung:&nbsp;</th><td>'+(Math.round(1000*row['ltwb'])/10)+'%</td></tr>'	
						+'</table>';
					
					var bch = 80, max = 0, v, p, i, part = ['cdu','gruene','spd','fdp','linke'];
					for (i in part) {
						max = Math.max(row[part[i]], max)
					}
					tooltips[key][1] += '<div class="barchart" style="height:'+bch+'px">';
					for (i in part) {
						v = Math.round(1000*row[part[i]])/10+'%';
						bh = row[part[i]] / max * bch;
						tooltips[key][1] += '<div class="col" style="margin-top:'+(bch-bh)+'px">';
						tooltips[key][1] += '<div class="bar '+part[i]+'" style="height:'+bh+'px"><div class="lbl">'+v+'</div></div>';
						tooltips[key][1] += '<div class="lbl">'+part[i].toUpperCase()+'</div>';
						tooltips[key][1] += '</div>';
					}
					
					tooltips[key][1] += '</div>'
				}
				
				var scales = {};
				scales['s21pc'] = svgmap.color.scale.BWO;
				scales['s21pc'].center = 0;
				scales['s21pc'].setClasses(11);
				scales['s21wb'] = new Ramp(Color.hsl(180,.65,.98), Color.hsl(230,1,.1));
				scales['s21wb'].setClasses(7);
				scales['ltwb'] = scales['s21wb'];
				
				scales['cdu'] = new Ramp(Color.hsl(220,.05,.98), '#222222');
				scales['cdu'].setClasses(7);
				scales['gruene'] = new Ramp(Color.hsl(120,.61,.98), Color.hsl(120,.62,.25));
				scales['gruene'].setClasses(7);
				scales['spd'] = new Ramp(Color.hsl(0,.61,.98), Color.hsl(0,.62,.15));
				scales['spd'].setClasses(7);
				scales['fdp'] = new Ramp(Color.hsl(60,.61,.98), Color.hsl(60,.62,.15));
				scales['fdp'].setClasses(7);
				scales['linke'] = new Ramp(Color.hsl(320,.61,.98), Color.hsl(320,.62,.15));
				scales['linke'].setClasses(7);
				
				scales['ltmaj'] = new Categories({
					cdu: '#555',
					gruene: '#4DD34D',
					spd: '#CC3333',
					fdp: '#EEEEBB',
					linke: '#dd44dd'
				});
				
				map.tooltips({
					content: tooltips
				});
				
				
				/*
				map.addLayerEvent('click', function(evt) {
					console.log(evt.target);
				}, 'fg');
				*/
					
				
				var showMap = function(id) {
					$('#title .v').addClass('inactive');
					$('#title #'+id).removeClass('inactive');
								
					map.choropleth({
						data: data,
						key: id,
						colorscale: scales[id]
					});
					
					console.log(scales[id]);
				};
				
				$('#title .v').click(function(evt) {
					id = evt.target.getAttribute('id');
					if (id == null) {
						id = evt.target.parentNode.getAttribute('id');
					}
					showMap(id);
					
					
				});
				
				showMap('s21wb');
				
					
			}, { padding: -50, halign: 'left', valign: 'center' }); // end map.loadSVG() ...
		
		} // end success: function() { ..	
	});	
});