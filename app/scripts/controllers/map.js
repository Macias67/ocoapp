'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('MapCtrl', [
		'$scope', '$rootScope', '$timeout', 'NgMap', '$http',
		function ($scope, $rootScope, $timeout, NgMap, $http) {
			var vm = this;
			
			vm.mapStyles = [
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers"    : [{"color": "#3e128a"}] // nombre de colonias
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers"    : [{"color": "#f2f2f2"}] // cuadras
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers"    : [{"visibility": "off"}]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers"    : [{"saturation": -100}, {"lightness": 45}]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers"    : [{"visibility": "simplified"}]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers"    : [{"color": "#ffffff"}]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers"    : [{"visibility": "off"}]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers"    : [{"visibility": "off"}]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers"    : [{"color": "#dde6e8"}, {"visibility": "on"}]
				}
			];
			vm.places    = [];
			
			var map;
			var i;
			var a;
			var newMarkers          = [];
			var resultsArray        = [];
			var visibleMarkersId    = [];
			var visibleMarkersOnMap = [];
			var markerCluster;
			var markerTarget        = 'modal';
			var marker;
			var _places             = [];
			
			NgMap.getMap().then(function (rmap) {
				map = rmap;
				
				$http({
					url         : "http://beta.json-generator.com/api/json/get/Ek1ynn3Mf",
					method      : 'GET',
					responseType: 'json'
				}).then(function (results) {
					_places = results.data;
					placeMarkers(results.data);
					ratingPassive(".results-wrapper .results");
				}).catch(function (error) {
					console.error(error);
				});
			});
			
			
			function placeMarkers(markers) {
				newMarkers = [];
				angular.forEach(markers, function (value, index) {
					
					var markerContent = document.createElement('div');
					var thumbnailImage;
					
					if (value.marker_image != undefined) {
						thumbnailImage = value.marker_image;
					}
					else {
						thumbnailImage = "http://miguia32.com/jsons/img/clientes/befei-32.jpg";
					}
					
					if (value.featured == 1) {
						markerContent.innerHTML =
							'<div class="marker" data-id="' + value.id + '">' +
							'<div class="title">' + value.title + '</div>' +
							'<div class="marker-wrapper">' +
							'<div class="tag"><i class="fa fa-check"></i></div>' +
							'<div class="pin">' +
							'<div class="image" style="background-image: url(' + thumbnailImage + ');"></div>' +
							'</div>' +
							'</div>' +
							'</div>';
					}
					else {
						markerContent.innerHTML =
							'<div class="marker" data-id="' + value.id + '">' +
							'<div class="title">' + value.title + '</div>' +
							'<div class="marker-wrapper">' +
							'<div class="pin">' +
							'<div class="image" style="background-image: url(' + thumbnailImage + ');"></div>' +
							'</div>' +
							'</div>';
					}
					
					// Latitude, Longitude and Address
					if (value.latitude && value.longitude && value.address) {
						renderRichMarker(value, "latitudeLongitude", index, markerContent);
					}
					// Only Address
					else if (value.address && !value.latitude && !value.longitude) {
						renderRichMarker(value, "address", index, markerContent);
					}
					// Only Latitude and Longitude
					else if (value.latitude && value.longitude && !value.address) {
						renderRichMarker(value, "latitudeLongitude", index, markerContent);
					}
					// No coordinates
					else {
						console.log("No location coordinates");
					}
					
				});
				
				function renderRichMarker(value, method, index, markerContent) {
					
					if (method == "latitudeLongitude") {
						// verifico que marcadores estan en el mapa
						//console.log(map.getBounds().contains(new google.maps.LatLng(value.latitude, value.longitude)));
						
						marker = new RichMarker({
							position : new google.maps.LatLng(value.latitude, value.longitude),
							map      : map,
							draggable: false,
							content  : markerContent,
							flat     : true
						});
						
						google.maps.event.addListener(marker, 'click', (function (marker, index, saludo) {
							return function () {
								if (markerTarget == "sidebar") {
									//openSidebarDetail($(this.content.firstChild).attr("data-id"));
									console.log("open sidebar");
								}
								else if (markerTarget == "infobox") {
									//openInfobox($(this.content.firstChild).attr("data-id"), this, value);
									console.log("open infobox");
								}
								else if (markerTarget == "modal") {
									console.log("open modal");
									//openModal($(this.content.firstChild).attr("data-id"), "modal_item.php");
								}
							}
						})(marker, index));
						
						newMarkers.push(marker);
					}
					else if (method == "address") {
						a              = index;
						var geocoder   = new google.maps.Geocoder();
						var geoOptions = {
							address: value.address
						};
						geocoder.geocode(geoOptions, geocodeCallback(markerContent, index));
					}
				}
				
				function geocodeCallback(markerContent, index) {
					
					return function (results, status) {
						
						if (status == google.maps.GeocoderStatus.OK) {
							
							marker = new RichMarker({
								position : results[0].geometry.location,
								map      : map,
								draggable: false,
								content  : markerContent,
								flat     : true
							});
							
							newMarkers.push(marker);
							
							//renderResults();
							
							google.maps.event.addListener(marker, 'click', (function (marker, index) {
								return function () {
									if (markerTarget == "sidebar") {
										//openSidebarDetail($(this.content.firstChild).attr("data-id"));
										console.log("open sidebar desde geocodeCallback");
									}
									else if (markerTarget == "infobox") {
										//openInfobox($(this.content.firstChild).attr("data-id"), this, 0);
										console.log("open infobox desde geocodeCallback");
									}
									else if (markerTarget == "modal") {
										//openModal($(this.content.firstChild).attr("data-id"), "modal_item.php");
										console.log("open modal desde geocodeCallback");
									}
								}
							})(marker, index));
							
						}
						else {
							console.log("Geocode failed " + status);
						}
					}
				}
				
				map.addListener('idle', function (event) {
					renderResults();
				});
				
				renderResults();
				
				function renderResults() {
					//visibleMarkersId    = [];
					//visibleMarkersOnMap = [];
					vm.places           = [];
					
					angular.forEach(newMarkers, function (value, index) {
						if (map.getBounds().contains(value.getPosition())) {
							//visibleMarkersOnMap.push(value);
							//visibleMarkersId.push($(value.content.firstChild).attr("data-id"));
							value.setVisible(true);
							
							$timeout(function () {
								vm.places.push(_places[index]);
							}, 300);
						}
						else {
							value.setVisible(false);
						}
					});
					console.log(vm.places);
				}
				
			}
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
				
				$timeout(function () {
					$rootScope.$pageOnLoad = false;
				}, 1000);
			});
		}
	]);