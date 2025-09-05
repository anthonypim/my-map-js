document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  var map = L.map('homebuilder-map').setView([42.0371, -82.7386], 13);

  // Light basemap
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Dark gold pin icon
  var goldIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
    shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
    iconSize:[25,41], iconAnchor:[12,41], popupAnchor:[1,-34], shadowSize:[41,41]
  });

  // Project markers
  var projects = [
    {name:"Lakeview Estates", coords:[42.0405,-82.7362], description:"New luxury homes near the lake.", image:"https://via.placeholder.com/200x120?text=Lakeview+Image", link:"#"},
    {name:"Orchard Grove", coords:[42.0332,-82.7431], description:"Townhome development with green spaces.", image:"https://via.placeholder.com/200x120?text=Orchard+Image", link:"#"},
    {name:"Kingsville Heights", coords:[42.0389,-82.7305], description:"Custom homes with modern designs.", image:"https://via.placeholder.com/200x120?text=Heights+Image", link:"#"}
  ];

  var markers = [];
  projects.forEach(function(p){
    if(!p.coords || p.coords.length!==2) return;
    var marker = L.marker(p.coords,{icon:goldIcon}).addTo(map);
    var popup = `<div class="map-popup-card"><img src="${p.image}" alt="${p.name}"><h4>${p.name}</h4><p>${p.description}</p></div>`;
    marker.bindPopup(popup);
    marker.on('mouseover', function(){ this.openPopup(); });
    marker.on('mouseout', function(){ this.closePopup(); });
    marker.on('click', function(){ if(p.link && p.link!=="#") window.location.href=p.link; });
    markers.push(marker);
  });

  if(markers.length>0){ var group=L.featureGroup(markers); map.fitBounds(group.getBounds().pad(0.15)); }
});
