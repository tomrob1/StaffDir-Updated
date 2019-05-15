<template>
<div class="container">
    <div class="searchbar">
      <br>
      <fieldset>
        <legend>Search Staff</legend>
        <input type="text" id ="inputtext" placeholder="Search by Name" v-model="input" autofocus/><button id="searchbutton" v-on:click="search()">search</button>
      </fieldset>
    </div>

  <div class="keyboard">
    <keyboard 
      v-model="input"
      @search="search"
      :layouts="[
      '1234567890{delete:backspace}|qwertyuiop{clear:clear}|asdfghjkl|{shift:goto:1}zxcvbnm|{space:space}{search:search}',
      '!@#$%^&*(){delete:backspace}|QWERTYUIOP{clear:clear}|ASDFGHJKL|{shift:goto:0}ZXCVBNM|{space:space}{search:search}'
      ]">
    </keyboard>
  </div>
  <br>
</div>
</template>

<script>
//Imports
import keyboard from 'vue-keyboard'
import axios from 'axios'
import store from '../store'
//JQuery
import JQuery from 'jquery'
//VueX
import {mapGetters, mapMutations} from 'vuex'

export default{
  //Components
  components:{
    keyboard
  },
  
  //Data
  data(){
    return {
      input: '',
      staffs: [],
      errors: ''
    }
  },

  //Lifecycle hooks
  mounted:function(){
    //When Enter key pressed, search
    JQuery("#inputtext").keyup(function(event){
      if (event.keyCode == 13) {
        JQuery("#searchbutton").click();
      }
    })
  },

  //Methods
  methods:{
    //Make AXIOS request based off user input
    search(keyboard){        
        console.log(this.input)
        var url = 'https://www.csc.liv.ac.uk:5000/namesearch?FullName='+this.input            
        axios.get(url)
         .then(response => {
             this.staffs = response.data.data
             console.log(this.staffs)
             //check if array is empty - if empty show toast
             if (!Array.isArray(this.staffs) || !this.staffs.length){
               console.log('ARRAY EMPTY')
               this.$toasted.show('No Results',{
                 position: 'bottom-center',
                 type: 'error'
               }).goAway(1000)
             } else {
               //Otherwise, continue to results page
              this.$store.commit('updateResult',this.staffs)
              this.$router.push("SearchResult")
             }
         })
         .catch(error => {
             console.log(error)
         })              
    }
  }
}
</script>

<style>
input{
  width: 80%;
  margin: auto;
}
fieldset{
  width: 75%;
  margin: auto;
}
button.vue-keyboard-key.action{
  background-color:lightblue;
}
button.vue-keyboard-key.action[data-text="search"]{
  background-color:lightgreen;
  min-width: 100px;
}
#searchbutton {
    margin-left: -70px;
    height: 30px;
    width: 69px;
    background:lightgreen;
    color: grey;
    border: 0;
}
/*Portrait Phone */
@media (max-width: 767.98px) {
  .keyboard{
    display: none;
  }
}


</style>
