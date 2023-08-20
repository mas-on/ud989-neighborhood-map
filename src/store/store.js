import { createStore } from 'vuex';

const store = createStore({
  state: {
    markers: [
        {
          id: 1,
          location: 
          { 
            lat: 50.511256,
            lng: 30.402081
          },
          name: 'Blue lake',
          wiki: {
            title: 'Синє озеро (Виноградар)',
            lang: 'uk'
          } 
        },
        {
          id: 2,
          location:
          { 
            lat: 50.5091186,
            lng: 30.4147732
          },
          name: 'PrivatBank',
          wiki: {
            title: 'PrivatBank',
            lang: 'en'
          }
        },
        {
          id: 3,
          location:
          { 
            lat: 50.507246,
            lng: 30.417297
          },
          name: 'Nova Poshta post office',
          wiki: {
            title: 'Nova Poshta',
            lang: 'en'
          }
        }
      ],
    filteredMarkers: [],
    selectedMarkerId: null
  },
  mutations: {
    setFilteredMarkers(state, markers) {
      state.filteredMarkers = markers;
    },
    setSelectedMarker(state, marker) {
      state.selectedMarkerId = marker.id;      
    }
  },
  actions: {
    filterMarkers({ commit, state }, searchQuery) {
      let filteredMarkers;
      if (searchQuery.trim() === '') {
        filteredMarkers = [...state.markers];
      } else {
        filteredMarkers = state.markers.filter(marker => {
            return marker.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }
        commit('setFilteredMarkers', filteredMarkers);        
      },
      selectMarker({ commit }, marker) {
        commit('setSelectedMarker', marker);
      }
  },
});

export default store;