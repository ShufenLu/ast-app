<template> 
    <div>
        
        <section>
            <grid :cols="cols" :rows="rows"></grid>    
        </section> 
        <transition name="fade">
            <ConfirmModal v-if="showModal" :message="msg" @close="toggleConfirm" @confirm="removeConfirm"></ConfirmModal>
        </transition>
        <transition name="fade">
            <AlertModal v-if="showAlert" :message="msg" @close="toggleAlert"></AlertModal>
        </transition>
   </div>
</template>

<script>
import Grid from 'gridjs-vue'
import * as fb from "../firebase";
import ConfirmModal from '@/components/ConfirmModal';
import AlertModal from "@/components/AlertModal";
export default {
  
  components: {
    Grid,   
    ConfirmModal,
    AlertModal
  },
  data() {
    return {
      cols: ['ID', 'Name', 'Close Approach', 
              {
                name: 'Favorite',
                formatter: (cell, row) => {
                  return this.$gridjs.h('button', {
                    className: 'removebutton',
                    onClick: () => this.removeFavorite(row.cells[0].data)
                  }, 'Remove');
                }
              }, 
            ],
      rows: [],     
      showModal: false,
      msg: '',
      currentRemoveId: null,
      showAlert: false,
    }
  },  
  methods:{
    toggleConfirm(){
        this.showModal = !this.showModal;
    },
    toggleAlert(msg) {
      this.showAlert = !this.showAlert;
      this.msg = msg;    

    },
    removeFavorite(id){     
       
        this.msg=`Did you really remove ${id} from favorite?`;
        this.currentRemoveId = id;
        this.toggleConfirm();
    },
    async removeConfirm(){
      if(this.currentRemoveId === null){
          return;
      }
      this.rows=this.rows.filter((value) => value[0] != this.currentRemoveId);
      this.toggleConfirm();
      const favoriteDocs = await fb.favoritesCollection.where('userId', '==', fb.auth.currentUser.uid)
                                                   .where('asteroidID', '==', this.currentRemoveId)
                                                   .where('isDeleted', '==', 0).get()
      favoriteDocs.forEach(doc => {
        fb.favoritesCollection.doc(doc.id).update({
          isDeleted: 1
        })
      })  

      this.toggleAlert("Remove Favorite Success");
      this.currentRemoveId = null;
    },
  },
  async mounted(){      
    
    const snapshot = await fb.favoritesCollection.where('userId', '==', fb.auth.currentUser.uid).where('isDeleted', '==', 0).get();
    this.rows=[];
    if (snapshot.empty) {    
      return;
    }  

    snapshot.forEach(doc => {       
       this.rows.push([doc.data().asteroidID, doc.data().asteroidName, doc.data().asteroidApproach, null])
    });

  }
  

}
</script>