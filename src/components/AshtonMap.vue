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
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/422_0.png','#image-map_0')">Ground Floor</button>
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/422_1.png','#image-map_1')">First Floor</button>
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/422_2.png','#image-map_2')">Second Floor</button>
                <button class="floorchoice" v-on:click="changeImage('https://cgi.csc.liv.ac.uk/~tar/officephotos/422_3.png','#image-map_3')">Third Floor</button>
            </ul>
        </div> 
        <!--Map Section -->
        <div class="midcol">
            <img id="building" v-bind:src='image' useMap="#image-map_0"> <!--Default Map -->
            <map name="image-map_0">
                <!--G Floor -->
                <area target="" alt="4227022" title="Office" href="#" coords="222,107,364,246" shape="rect">    
                <area target="" alt="4227013" title="smART Lab" href="#" coords="308,300,458,444" shape="rect">    
                <area target="" alt="4227020" title="Office" href="#" coords="82,120,220,247" shape="rect">    
                <area target="" alt="4227019" title="Office" href="#" coords="21,294,82,420" shape="rect">    
                <area target="" alt="4227018" title="Office" href="#" coords="88,332,171,444" shape="rect">    
                <area target="" alt="4227016" title="Office" href="#" coords="177,292,230,421" shape="rect">    
                <area target="" alt="4227015" title="Office" href="#" coords="233,328,305,444" shape="rect">    
                <area target="" alt="4227010" title="Student Office" href="#" coords="500,291,587,450" shape="rect">
                <area target="" alt="4227023" title="Office" href="#" coords="424,195,359,78" shape="rect">
            </map>
            <map name="image-map_1">  
                <!--1st Floor -->  
                <area target="" alt="4221003" title="Office" href="#" coords="619,40,677,160" shape="rect">    
                <area target="" alt="4221005" title="Office" href="#" coords="745,45,680,162" shape="rect">    
                <area target="" alt="4221007" title="Office" href="#" coords="741,230,792,308" shape="rect">    
                <area target="" alt="4221008" title="ALT" href="#" coords="500,198,738,325" shape="rect">    
                <area target="" alt="4221010" title="Office" href="#" coords="376,202,499,328" shape="rect">    
                <area target="" alt="4221011" title="Office" href="#" coords="310,230,372,324" shape="rect">    
                <area target="" alt="4221012" title="Office" href="#" coords="260,199,308,311" shape="rect">    
                <area target="" alt="4221014" title="Office" href="#" coords="183,235,258,331" shape="rect">    
                <area target="" alt="4221015" title="Office" href="#" coords="135,200,181,313" shape="rect">    
                <area target="" alt="4221021" title="Office" href="#" coords="304,160,186,50" shape="rect">    
                <area target="" alt="4221022" title="Office" href="#" coords="306,42,357,131" shape="rect">    
                <area target="" alt="4221023" title="Office" href="#" coords="423,40,360,161" shape="rect">    
                <area target="" alt="4221024" title="Office" href="#" coords="426,27,470,113" shape="rect">
            </map>
            <map name="image-map_2">  
                <!--2nd Floor -->  
                <area target="" alt="4222024" title="Office" href="#" coords="180,162,62,54" shape="rect">    
                <area target="" alt="4222025" title="Office" href="#" coords="238,132,183,40" shape="rect">    
                <area target="" alt="4222026" title="Office" href="#" coords="304,162,239,41" shape="rect">    
                <area target="" alt="4222027" title="Office" href="#" coords="351,114,307,22" shape="rect">    
                <area target="" alt="4222003" title="Office" href="#" coords="559,162,500,41" shape="rect">    
                <area target="" alt="4222005" title="Office" href="#" coords="626,161,564,40" shape="rect">    
                <area target="" alt="4222007" title="Office" href="#" coords="794,312,745,229" shape="rect">    
                <area target="" alt="4222011" title="Female WC" href="#" coords="624,200,669,264" shape="rect">    
                <area target="" alt="4222010" title="Male WC" href="#" coords="671,247,744,309" shape="rect">    
                <area target="" alt="4222012" title="Meeting Room" href="#" coords="544,200,620,323" shape="rect">    
                <area target="" alt="4222014" title="Office" href="#" coords="437,203,543,332" shape="rect">    
                <area target="" alt="4222016" title="Office" href="#" coords="380,237,434,332" shape="rect">    
                <area target="" alt="4222017" title="Office" href="#" coords="254,202,378,332" shape="rect">    
                <area target="" alt="4222018" title="Office" href="#" coords="184,232,251,325" shape="rect">    
                <area target="" alt="4222019" title="Office" href="#" coords="183,312,137,201" shape="rect">    
                <area target="" alt="4222021" title="Office" href="#" coords="58,235,137,311" shape="rect">    
                <area target="" alt="4222022" title="Office" href="#" coords="14,201,57,312" shape="rect">
            </map>
            <map name="image-map_3">    
                <!--3rd Floor -->
                <area target="" alt="4223004" title="Office" href="#" coords="635,55,707,108" shape="rect">    
                <area target="" alt="4223005" title="Office" href="#" coords="789,53,704,134" shape="rect">    
                <area target="" alt="4223006" title="Office" href="#" coords="673,134,790,190" shape="rect">    
                <area target="" alt="4223007" title="Office" href="#" coords="792,246,671,192" shape="rect">    
                <area target="" alt="4223008" title="Office" href="#" coords="791,314,672,249" shape="rect">    
                <area target="" alt="4223009" title="Office" href="#" coords="790,404,633,314" shape="rect">    
                <area target="" alt="4223010" title="Office" href="#" coords="489,250,632,407" shape="rect">    
                <area target="" alt="4223011" title="Office" href="#" coords="406,252,484,408" shape="rect">    
                <area target="" alt="4223012" title="Office" href="#" coords="329,291,402,405" shape="rect">    
                <area target="" alt="4223013" title="Office" href="#" coords="243,290,325,404" shape="rect">    
                <area target="" alt="4223014" title="Office" href="#" coords="151,249,242,390" shape="rect">    
                <area target="" alt="4223015" title="Office" href="#" coords="90,251,146,388" shape="rect">    
                <area target="" alt="4223018" title="Office" href="#" coords="170,202,94,94" shape="rect">    
                <area target="" alt="4223019" title="Office" href="#" coords="239,201,172,94" shape="rect">    
                <area target="" alt="4223020" title="Office" href="#" coords="316,201,242,52" shape="rect">    
                <area target="" alt="4223021" title="Office" href="#" coords="393,202,318,52" shape="rect">    
                <area target="" alt="4223022" title="Office" href="#" coords="451,142,396,30" shape="rect">
            </map>
        </div>

        <!--Staff Card -->
        <div class="col-2">
            <div class="card bg-blue mb-3" style="max-width: 18rem;">
                <tr v-for="roomInfo in roomInfos">
                    <div class="card-header">{{roomInfo.FirstNames}} {{roomInfo.Surname}}</div>
                    <div class="card-body">
                        <h5 class="card-title">Room No: {{roomInfo.RoomNumber}}</h5>
                        <p class="card-text">Telephone No:0{{roomInfo.TelephoneNumber}}</p>
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
            image:'https://cgi.csc.liv.ac.uk/~tar/officephotos/422_0.png',
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
            var url = 'https://csc.liv.ac.uk:5000/map?QRCodeID='+alt
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

/*Landscape Phone */
@media only screen and (max-width: 767.98px) {
    .floorchoice{
        background-color: lightgreen;
        width: 100%;
        margin-top: 1px;
        border: none;
        font-size: 6px;
        color: #666;
        height: 20px;
    }
    .buildingchoice{
        background-color: pink;
        width:10%;
        margin-top: 5px;
        border: none;
        font-size: 6px;
        color: #666;
        height: 20px;
    }
    #building, .midcol{
        width: 400px;
    }
}
</style>
