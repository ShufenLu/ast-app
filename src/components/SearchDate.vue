<template> 
    <div class="datepicker">        
        <datepicker :format="customFormatter" placeholder="Start Date" v-model="startDate" ></datepicker>
        <datepicker :format="customFormatter" placeholder="End Date" :disabledDates="disabledDates" v-model="endDate" ></datepicker>      
   </div>
</template>
<script>

import Datepicker from 'vuejs-datepicker';
import moment from "moment";
export default {  
  components: {    
    Datepicker,   
  },
  data(){
      return{
          format:"yyyy-MM-dd",
          startDate: null,
          endDate: null,
          disabledDates: {
            to: null, // Disable all dates up to specific date
            from: null
          },
      }
  },
  methods: {
    customFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    sendDateToParent(){        
        this.$emit("dateSelected", moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD'));
    }

  },
  watch: {
      startDate: function(val){
        this.disabledDates.to = val;
        var date = new Date(val);
        date.setDate(date.getDate() + 7);            
        this.disabledDates.from = date; 
        if(this.startDate > this.endDate){
            this.endDate = null;
        }   
        this.sendDateToParent();      
      },
      endDate: function(){
        this.sendDateToParent();
      }
  },

}
</script>