<template>
  <div class="app-container">
    <h1>Vynohradar: useful places</h1>      
    <div class="content-container">
     
      <div class="markers-list-container">
        <div class="search-container">
          <SearchInput></SearchInput>
        </div>
        <MarkersList></MarkersList>
      </div>
      <div class="map-container">
        <Map></Map>
      </div> 
      <div class="marker-info-container">
        <MarkerInfo></MarkerInfo>
      </div>    
    </div>
  </div> 
</template>

<script>
import Map from './components/Map.vue'
import SearchInput from './components/SearchInput.vue';
import MarkersList from './components/MarkersList.vue';
import MarkerInfo from './components/MarkerInfo.vue';

export default {
  name: 'App',
  components: {
    Map,
    SearchInput,
    MarkersList,
    MarkerInfo
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 98vh;
}

.search-container {
  padding: 10px;  
  
}

.content-container {
  flex: 1;
  display: flex; 
}

.map-container {
  flex: 1;  
}

.markers-list-container {
  width: 300px;
  background-color: #f0f0f0;  
}

.marker-info-container {
  width: 300px;
}
</style>
