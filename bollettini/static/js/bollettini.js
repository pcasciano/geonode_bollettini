var leafletMap;
var geoLayer = 0;


$('.nav-stacked li a').on('click', function(e){      
    e.preventDefault();
    var lnk=$(this).attr('href');
    highlightMenu(lnk);
    loadGeoJSON(null,null,lnk);    
}); 

/**
 * Highlights a "Bollettini" menu element
 * @method highlightMenu
 * @param {} el menu href element
 * @return 
 */
var highlightMenu = function(el){
    $('.nav-stacked li').each(function(index){
        if ($(this).children('a').attr('href') === el)
        {
            $(this).addClass('active');
        }
        else
        {
            $(this).removeClass('active');
        }  
    }); 
};

/**
 * Loads a geojson data file in the map
 * @method loadGeoJSON
 * @param {} map Object that contains the leaflet map
 * @param {} options
 * @param {} url geojson data file url
 * @return 
 */
var loadGeoJSON  = function(map, options,url){

  
    
    if (typeof map === 'object' && map !== null)
        leafletMap = map;
    else
        {
            map = leafletMap;
            if (map.hasLayer(geoLayer))
                {
                    map.removeLayer(geoLayer);                    
                }           
        }
    
    
    if (typeof url === 'undefined')
       url ='oggi';
    var dataurl = '/'+url+'.geojson';
    
    $.getJSON(dataurl, function (data) {
        // Add GeoJSON layer
        geoLayer = L.geoJson(data,{
            /**
             * creates a css style for features
             * @method style
             * @param {} feature Object feature
             * @return 
             */
            style: function(feature){
                switch (feature.properties.pericolo){
                case '1': return {color: '#B3FF66'}; //green
                case '2': return {color: '#FFFF66'}; //yellow
                case '3': return {color: '#FFB366'}; //yellow-orange
                case '4': return {color: '#FF6666'}; //orange
                case '5': return {color: '#FF3333'}; //red
                }
            },
            /**
             * Binds a popup for each feature of the layer
             * @method onEachFeature
             * @param {} feature Object feature
             * @param {} layer Object layer
             * @return 
             */
            onEachFeature: function(feature, layer){
                if (feature.properties && feature.properties.nome){
                    layer.bindPopup(feature.properties.nome);
                    layer.on({
                        /**
                         * Shows a popup with icon on mouseover event
                         * @method mouseover
                         * @param {} e
                         * @return 
                         */
                        mouseover: function(e){
                            
                            var gradoDiPericolo=parseInt(feature.properties.pericolo);
                            var img= '';
                            if (gradoDiPericolo > 0)
                            {
                                img='<img width=60 height=60 src="/static/img/' + gradoDiPericolo + '.png" />';
                                
                                var note = '';
                                if (typeof feature.properties.note==='string' && feature.properties.note!==null)
                                    note =' Note: ' + feature.properties.note;
                                var popup = L.popup()
                                        .setLatLng(e.latlng)
                                        .setContent(img+' Trend:'+ feature.properties.trend + note)
                                        .openOn(map);
                            }
                        }                        
                    });
                }
               
            }
        });
        geoLayer.addTo(map);
    });
    
};
