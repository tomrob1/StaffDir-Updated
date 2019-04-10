<template>
<div class="container-fluid">
     <!--Building Buttons -->
    <div class="topbuttons">
        <ul>
            <button class="buildingchoice" v-on:click="goToMap('AshtonMap')">Ashton</button>
            <button class="buildingchoice" v-on:click="goToMap('HoltMap')">George Holt</button>
        </ul>
    </div>    
    <div class="row custom-gutter"> 
        <div class="col-1"></div>
        <!--Floor Buttons -->
        <div class="col-1">
            <ul>
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/231_0.png','#image-map_0')">Ground Floor</button>
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/231_1.png','#image-map_1')">First Floor</button>
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/231_2.png','#image-map_2')">Second Floor</button>
            </ul>
        </div>
        <!--Map Section -->
        <div class="midcol">
            <img id="building" v-bind:src='image' useMap="#image-map_0"> <!--Default Map -->
            <map name="image-map_0">       
            </map>
            <!--First Floor -->
            <map name="image-map_1">    
                <area target="" alt="2311004" title="Lab 3" href="#" coords="207,8,557,156" shape="rect">    
                <area target="" alt="2311005" title="Lab 4" href="#" coords="787,38,559,157" shape="rect">    
                <area target="" alt="2311007" title="Lab 5" href="#" coords="787,372,682,191" shape="rect">    
                <area target="" alt="2311011" title="Lab 1" href="#" coords="631,371,789,537" shape="rect">    
                <area target="" alt="2311013" title="Toilet" href="#" coords="767,607,555,540" shape="rect">      
                <area target="" alt="2311015" title="Lab 2" href="#" coords="588,463,380,192" shape="rect">    
            </map>
            <!--Second Floor -->
            <map name="image-map_2">    
                <area target="" alt="" title="Office 1/3" href="#" coords="487,44,595,189" shape="rect">    
                <area target="" alt="" title="Office 2/3" href="#" coords="680,189,598,44" shape="rect">    
                <area target="" alt="" title="Office 3/3" href="#" coords="772,188,681,45" shape="rect">    
                <area target="" alt="2312016" title="GHOLT 223" href="#" coords="781,443,586,660" shape="rect">    
                <area target="" alt="2312017" title="Help Desk" href="#" coords="538,563,275,451" shape="rect">    
                <area target="" alt="2312023" title="201A" href="#" coords="10,338,136,412" shape="rect">    
                <area target="" alt="2312022" title="201B" href="#" coords="108,476,11,414" shape="rect">    
                <area target="" alt="2312021" title="201C" href="#" coords="109,557,10,477" shape="rect">    
                <area target="" alt="2312008" title="Common Room" href="#" coords="219,5,485,192" shape="rect">    
                <area target="" v-hammer:tap="onTap()" alt="2312004" title="Paddy/Andy Office" href="#" coords="10,230,134,335" shape="rect">
                <area target="" alt="2312006" title="Male WC" href="" coords="60,9,150,117" shape="rect">
                <area target="" alt="2312005" title="Disabled WC" href="" coords="60,113,151,189" shape="rect">
                <area target="" alt="2312007" title="Female WC" href="" coords="215,9,157,189" shape="rect">
            </map>
        </div>

        <!--Staff Card-->
        <div class="col-2">
            <div class="card bg-blue mb-3" style="max-width: 18rem;">
                <tr v-for="roomInfo in roomInfos">
                    <div class="card-header">{{roomInfo.FirstNames}} {{roomInfo.Surname}}</div>
                    <div class="card-body">
                        <h5 class="card-title">Room No: {{roomInfo.RoomNumber}}</h5>
                        <p class="card-text">Telephone No: 0{{roomInfo.TelephoneNumber}}</p>
                        <p class="card-text">{{roomInfo.Email}}</p>
                    </div>
                </tr>
            </div>       
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'

export default {
    data(){
        return{
            //Default Image
            image:'https://cgi.csc.liv.ac.uk/~tar/officephotos/231_0.png',
            roomInfos : []
        }
    },

    //Lifecycle hooks
    mounted:function(){
        var self = this // Link to DOM
        //When map area clicked, return alt attribute and make AXIOS request
        JQuery("area").click(function() {
            var alt = JQuery(this).attr("alt")
            console.log(alt)
            var url = 'https://www.csc.liv.ac.uk:5000/map?QRCodeID='+alt
            console.log(url)
            axios.get(url)
            .then(response => {
                console.log(response.data.data)
                self.roomInfos = response.data.data
            })
            .catch(errror => {
                console.log(error)
            })
        });        
    },

    //Methods
    methods:{
        changeImage:function(imgName,imgMap){
            var image = document.getElementById('building')
            image.src = imgName
            image.useMap = imgMap
        },      
        goToMap:function(map){
            this.$router.push(map)
        },
        onTap:function(){
            
        }
    }
}
</script>

<style>
.floorchoice{
    background-color: lightgreen;
    width: 100%;
    margin-top: 20px;
    border: none;
    font-size: 14px;
    color: #666;
    height: 50px;
    display: block;
}
.buildingchoice{
    background-color: lightblue;
    width: 10%;
    margin-top: 10px;
    border: none;
    font-size: 14px;
    color: #666;
    height: 50px;
}
#building, .midcol{
   width: 800px;
}
.endcol{
    width: 400px;

}
.custom-gutter > [class*='col-']{
    padding-left: 0px;
    padding-right: 0px;
}
ul{
    padding-left: 0px;
    padding-right: 0px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 450px;
  margin: auto;
  text-align: center;
  background-color: lightblue;
}
.card-header{
    background-color: lightgreen;
}
.viewroom{
    background-color: lightgreen;
    width: 100%;
    color: #666;
    border: none;
    font-size: 20px;
}
</style>
