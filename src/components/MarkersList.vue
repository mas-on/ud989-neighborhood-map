<template>
    <div>
      <ul>
        <li v-for="marker in filteredMarkersData"
            :key="marker.id" 
            :class="{ 'selected': marker.id === selectedMarkerId }"
            @click="selectItem(marker)"
            class="list-item">
          {{ marker.name }}          
        </li>
      </ul>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    computed: {
      filteredMarkersData() {
        return this.$store.state.filteredMarkers;        
      },
      selectedMarkerId() {
        return this.$store.state.selectedMarkerId;
      }
    },
    methods: {        
        ...mapActions(['selectMarker']),
        selectItem(marker) {
            this.selectMarker(marker);            
        }
    }
  };
</script>
<style>
  .selected {
    background-color: #ffffff;  
}
.list-item {
    cursor: pointer;
  }
</style>