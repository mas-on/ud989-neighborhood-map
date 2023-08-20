<template>
    <div class="info-container">
        <div class="info-header">
            <h4 v-if="selectedMarker">{{ selectedMarker.name }}: information</h4>
            <h4 v-else>{{ noSelectedMarkerMsg }}</h4>            
        </div>
        <div class="info-content" v-if="wikiFirstParagraph">
            <div v-html="wikiFirstParagraph"></div>
            <br/>
            <a :href="getWikiPageLink(wikipediaInfo.title, wikipediaInfo.pagelanguage)" target="_blank">Read more on Wikipedia</a>
        </div>
        <div v-else>
            <div v-if="selectedMarker">{{ loadingWikiMsg }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                noSelectedMarkerMsg: "Please select a marker to see its description", 
                loadingWikiMsg: "Loading Wikipedia information...",               
                wikipediaInfo: null,
                wikiFirstParagraph: null            
            }
        },
        computed: {  
            filteredMarkersData() {
                return this.$store.state.filteredMarkers;        
            },  
            selectedMarkerId() {
                return this.$store.state.selectedMarkerId;
            },
            selectedMarker() {
                return this.filteredMarkersData.find(marker => marker.id === this.selectedMarkerId);
            }
        },
       
        methods: {
            async fetchWikipediaInfo(marker) {
                if (marker) {
                    try {
                        const snippetInfo = await this.getWikipediaShort(marker);
                        if (snippetInfo) {
                            const pageInfo = await this.getPageInformation(marker.wiki.lang, snippetInfo.pageid);
                            this.wikipediaInfo = pageInfo;  
                            this.wikiFirstParagraph = await this.getFirstParagraph(pageInfo.extract, pageInfo.pagelanguage);                         
                        }
                    } catch (error) {
                        console.error('Error fetching data from Wikipedia:', error);
                    }
                }
            },
            async getWikipediaShort(marker) {
                const searchTerm = marker.wiki.title;
                const lang = marker.wiki.lang;
                const apiUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${encodeURIComponent(searchTerm)}`;
            
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.query && data.query.search && data.query.search.length > 0) {
                    const firstResult = data.query.search[0];
                    console.log('Search result:', firstResult);
                    return firstResult;
                } else {
                    console.log('No search results found.');
                }                    
            },
            async getPageInformation(lang, pageid) {
                const apiUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&pageids=${pageid}&prop=info|extracts`;
                
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.query && data.query.pages) {
                    const page = data.query.pages[pageid];
                    console.log('Page information:', page);
                    return page;
                } else {
                    console.log('Page not found.');
                }                
            },
            async getFirstParagraph(extract, lang) {                
                const tempElement = document.createElement('div');
                tempElement.innerHTML = extract;                
                const firstParagraph = Array.from(tempElement.querySelectorAll('p')).find(p => p.textContent.trim() !== '');
                if (firstParagraph && lang !== "en") {
                    console.log("first paragraph:", firstParagraph);
                    const translation = await this.translateToEn(lang, firstParagraph.innerText);
                    return '<p>' + translation + '</p>';
                }

                return firstParagraph ? firstParagraph.innerHTML : '';
            },
            getWikiPageLink(title, lang) {
                return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`;
            }, 
            async translateToEn(lang, text) {    
                console.log('text', text);            
                const res = await fetch("https://translate.terraprint.co/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        q: text,
                        source: lang,
                        target: "en",
                        format: "text",
                        api_key: ""
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const translateResult = await res.json();                
                return translateResult.translatedText;
            }           
        },
        watch: {
            filteredMarkersData(markers) {
                if (!markers.some(marker => marker.id === this.selectedMarkerId)) {
                    this.wikipediaInfo = null;
                    this.wikiFirstParagraph = null;
                }
                    
            },
            selectedMarkerId() {
                this.wikipediaInfo = null; 
                this.wikiFirstParagraph = null;               
                this.fetchWikipediaInfo(this.selectedMarker);
            }
        }
    }
</script>

<style scoped>
    .info-container {        
        background-color: #fff;
        border-left: 1px solid #ccc;
        padding: 20px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

        .info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        background-color: #2c3e50;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    .info-content {
        margin-top: 10px;
    }
</style>
