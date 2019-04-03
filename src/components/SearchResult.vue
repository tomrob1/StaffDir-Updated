<template>
<div class="container">
    <br>
    
        <table id="staff">
            <tr>
                <th>Name</th>
                <th>Contact Details</th>
                <th>Job Title</th>
                <th>Department</th>
                <th></th>
            </tr>
            <tr v-for="(result) in results[0]">
                <td>{{result.FirstNames}} {{result.Surname}}</td>
                <td>Email: {{result.Email}}<br>
                Telephone: 0{{result.TelephoneNumber}}<br>
                Room: {{result.RoomNumber}}</td>
                <td>{{result.JobName}}</td>
                <td>{{result.Department}}</td>
                <td id="buttoncol"> 
                    <button class="viewoffice" v-on:click="viewOffice(result.QRCode_ID)">View Office</button>
                </td>                
            </tr>
        </table>
    <br>
     <div class="LightBox"> 
        <LightBox :images="images" :showLightBox="false" ref="lightbox"></LightBox>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import store from '../store'
//LightBox
import LightBox from 'vue-image-lightbox'
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
//VueX
import {mapState, mapMutations} from 'vuex'

export default {
    data(){
        return{
            empty: false,
            images:
            [
                {
                    src: 'null'
                }
            ]                     
        }
    },
    components:{
        LightBox
    },
    beforeDestroy: function(){
        this.clearResult()
    },
    mounted:function(){

    },
    computed:{
        //Array of search results
        ...mapState(['results'])
    },
    methods:{
        //Get method to then be used in beforeDestroy
        ...mapMutations(['clearResult']),

        viewOffice:function(result){
            //Take OfficeImageFileName of Row, change src then load img
            console.log(result)
            this.images[0].src = 'https://cgi.csc.liv.ac.uk/~tar/officephotos/'+result+'.png'
            this.$refs.lightbox.showImage(0)
        },
    }  
}
</script>

<style>
#staff {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width:90%;
  margin-left: auto;
  margin-right: auto;
}

#staff td, #staff th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#staff tr:nth-child(even){background-color: #f2f2f2;}
#staff tr:hover {background-color: #ddd;}

#staff th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: lightblue;
  color: white;
}
.viewoffice{
    background-color: lightgreen;
    width: 100%;
    border: none;
    font-size: 10px;
    color: #666;
    height: 35px;
    border: 1px solid grey;
}


/*Portrait Phone */
@media (max-width: 767.98px) {
  #staff{
    width: 70%;
    font-size: 9px;
  }
  button.viewoffice{
      width: 100%;
      font-size: 8px;
      margin: auto;
  }
  #staff th {
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: left;
    background-color: lightblue;
    color: white;
    }
    #staff td, #staff th {
    border: 1px solid #ddd;
    padding: 6px;
    text-align: left;
    }  
}
</style>
