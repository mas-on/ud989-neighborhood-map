<template>
  <div>
    <input type="text" v-model="searchQuery" @input="handleInput" placeholder="Search markers">
  </div>
</template>
  
<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    created() {        
      this.filterMarkers(this.searchQuery);  
  },
    methods: {
        ...mapActions(['filterMarkers']),
        handleInput() {
            this.filterMarkers(this.searchQuery);
        }      
    }
  };  
</script>
  