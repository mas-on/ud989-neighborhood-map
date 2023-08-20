<template>
  <div ref="mapContainer" style="height: 500px;"></div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapActions } from 'vuex';
import defaultMarkerIconPath from '@/img/marker_default.png';
import selectedMarkerIconPath from '@/img/marker_selected.png';

export default {
  name: 'NeighborhoodMap',
  data() {
    return {
      map: null,
      apiKey: process.env.VUE_APP_GOOGLEMAPS_API_KEY,      
      vynohradar: { lat: 50.5098367, lng: 30.4031965 },
      zoom: 14,
      gMarkers: []
    }
  },
  computed: {    
    allMarkersData() {
      return this.$store.state.markers;
    },
    filteredMarkersData() {
      return this.$store.state.filteredMarkers;
    },
    selectedMarkerId() {
        return this.$store.state.selectedMarkerId;
      }
  },
   mounted() {
    console.log("mounted");
    const loader = new Loader({
      apiKey: this.apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      this.initMap();
    });    
  },
  methods: {
    ...mapActions(['selectMarker']),
    initMap() {
      this.map = new window.google.maps.Map(this.$refs.mapContainer, {
          center: this.vynohradar,        
          zoom: this.zoom
        });
      
        this.filteredMarkersData.forEach(marker =>{
        const gMarker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(marker.location.lat, marker.location.lng),
            title: marker.name,
            map: this.map,
            icon: {
              url: defaultMarkerIconPath,
              scaledSize: new window.google.maps.Size(21, 30)
            },            
          }); 

          gMarker.addListener('click', () => {            
            this.selectMarker(marker);            
          }); 

        this.gMarkers.push(gMarker);
      })      
    },

    renderMarkers(markersToShow) {  
      this.gMarkers.forEach(gMarker => {                 
        const showMarker = markersToShow.some(m => m.name === gMarker.title);
        gMarker.setVisible(showMarker);        
      });     
    },
    showSelectedMarker(id) {
      this.gMarkers.forEach(gMarker => { 
        const marker = this.allMarkersData.find(m => m.name === gMarker.title);
        if (marker.id === id)
          gMarker.setIcon({
            url: selectedMarkerIconPath,
            scaledSize: new window.google.maps.Size(35, 50)
          });
        else
          gMarker.setIcon({
              url: defaultMarkerIconPath,
              scaledSize: new window.google.maps.Size(21, 30)
            });
      });
    }
  }, 
  watch: {
    filteredMarkersData(markers) {
      this.renderMarkers(markers);
    },
    selectedMarkerId(id) {      
      this.showSelectedMarker(id);
    }
  }
}
</script>

*