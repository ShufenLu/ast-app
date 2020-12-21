<template> 
    <div>
        <div class="searchform">      
            <SearchDate @dateSelected="dateSelected"/>
            <div class="searchbuttons">
                <button @click="searchByDate" class="button">Go</button>                
                <button @click="toggleModal" class="button" >Advanced Search</button>         
            </div>
        </div> 
        <section>
            <grid :cols="cols" :rows="rows"></grid>    
        </section> 
        <transition name="fade">
            <SearchModal v-if="showModal" @close="searchByID"></SearchModal>
        </transition>
        <transition name="fade">
            <AlertModal v-if="showAlert" :message="msg" @close="toggleAlert"></AlertModal>
        </transition>
   </div>
</template>

<script>
import Grid from 'gridjs-vue'
import SearchDate from '@/components/SearchDate';
import SearchModal from '@/components/SearchModal';
import axios from 'axios';
import neoAPIKey from '../neoAPI';
import AlertModal from "@/components/AlertModal";
import * as fb from "../firebase";

export default {
  
  components: {
    Grid,
    SearchDate,
    SearchModal,
    AlertModal
  },
  data() {
    return {
      cols: ['ID', 'Name', 'Close Approach', 
              {
                name: 'Favorite',
                formatter: (cell, row) => {
                  return this.$gridjs.h('button', {
                    className: 'savebutton',
                    onClick: (e) => this.savetoFavorite(e, row.cells[0].data, row.cells[1].data, row.cells[2].data)
                  }, 'Save');
                }
              }, 
            ],
      rows: [],
      showModal: false,
      showAlert: false,
      startDate: null,
      endDate: null,
      msg: '',
    }
  },
  methods:{
    async savetoFavorite(e, id, name, close_approach){
      // hide save button
      e.target.hidden=true;      
      
      // create in firebase
      await fb.favoritesCollection.add({
        createdOn: new Date(),
        asteroidID: id,
        asteroidName: name,
        asteroidApproach: close_approach,
        userId: fb.auth.currentUser.uid,    
        isDeleted: 0    
      })
      
      this.toggleAlert("Save Favorite Success");
    },
    toggleModal(){
      this.showModal = !this.showModal;
    },
    searchByID(asteroidID) {
      this.toggleModal();
      
      if(asteroidID !== undefined){
        let neoAPI = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${neoAPIKey.neoAPIkey}`;
        
        axios
          .get(neoAPI)
          .then(response => {                
            this.rows=[];
            var value = response.data;
            var close_approach = value.close_approach_data;
            
            var close_date = '';
            if(close_approach.length > 0){
              
              close_date=close_approach[0].close_approach_date;
              
            }
            
            this.rows.push([value.id, value.name, close_date, null])
          }).catch(e => {
          if (e.response.status === 404) {
            this.toggleAlert("Can't Find Asteroid");
          }
        });
      }     

    },
    toggleAlert(msg) {
      this.showAlert = !this.showAlert;
      this.msg = msg;    

    },
    dateSelected(startDate, endDate){
      
      this.startDate = startDate;
      if(endDate === "Invalid date"){
          this.endDate = this.startDate;
      }else{
          this.endDate = endDate;
      }
      
    },
    searchByDate(){
        if(this.startDate === null || this.endDate === null){
            this.toggleAlert("Start Date or End Date must be specified");
        }else{            
            let feedAPI=`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.startDate}&end_date=${this.endDate}&detailed=false&api_key=${neoAPIKey.neoAPIkey}`
            console.log(feedAPI);
            axios
            .get(feedAPI)
            .then(response => {                
                this.rows=[];
                for (var key in response.data.near_earth_objects) {                  
                  var value = response.data.near_earth_objects[key];
                  value.forEach((item) => {
                    if(this.rows.length> 10){
                        return;
                    }
                    this.rows.push([item.id, item.name, key, null])
                    
                  });  
                }
                
            });
        }
    }    
  },
  mounted(){      
      let broswerAPI = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${neoAPIKey.neoAPIkey}`;
      axios
      .get(broswerAPI)
      .then(response => {
         this.rows=[]
         response.data.near_earth_objects.forEach((value, index) =>{
             if(index> 10){
                return;
             }else{
                var close_approach = value.close_approach_data;
                var close_date = '';
                if(close_approach.length > 0){
                  close_date=close_approach[0].close_approach_date;
                }
                this.rows.push([value.id, value.name, close_date, null])
             }
         });
      });
  }
  

}
</script>