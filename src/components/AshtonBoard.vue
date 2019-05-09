<template>
    <div class="container-fluid">

        <div class="topbuttons">
            <ul>
                <button class="buildingchoice" v-on:click="goTo('AshtonBoard')">Ashton</button>
                <button class="buildingchoice" v-on:click="goTo('HoltBoard')">George Holt</button>
            </ul>
            <input type="text" v-model="searchQuery" placeholder="Filter">
        </div>
            <br>
            <div class="row">
                <div class="col-3">
                    <!--Ground Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">Ground Floor</th>
                        <tr>
                            <th>Name</th>
                            <th v-if="opened">Info</th>
                            <th>View Office</th>
                        </tr>
                        <!--Staff-->
                        <tr v-for="(staff) in filteredData(groundFloor)" v-bind:key="staff.Email">
                            <td v-on:click="opened = !opened">{{staff.FullName}} <br> Room Number: {{staff.RoomNumber}}</td>
                            <td v-on:click="opened = !opened" v-if="opened">{{staff.Email}}<br> {{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <!--Rooms-->
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in groundFloorRoom" v-bind:key="room.QRCode_ID">
                            <td>{{room.CommonName}} <br>Room Number: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-3">
                    <!--First Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">First Floor</th>
                        <tr>
                            <th>Name</th>
                            <th v-if="opened2">Info</th>
                            <th>View Office</th>
                        </tr>
                        <!--Staff-->
                        <tr v-for="(staff) in filteredData(firstFloor)" v-bind:key="staff.Email">
                            <td v-on:click="opened2 = !opened2" >{{staff.FullName}} <br> Room Number:{{staff.RoomNumber}}</td>
                            <td v-on:click="opened2 = !opened2" v-if="opened2">{{staff.Email}} <br> {{staff.TelephoneNumber}} </td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <!--Rooms-->
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in firstFloorRoom" v-bind:key="room.QRCode_ID">
                            <td>{{room.CommonName}} <br> Room Number: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-3">
                    <!--Second Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">Second Floor</th>
                        <tr>
                            <th>Name</th>
                            <th v-if="opened3">Info</th>
                            <th>View Office</th>
                        </tr>
                        <!--Staff-->
                        <tr v-for="(staff) in filteredData(secondFloor)" v-bind:key="staff.Email">
                            <td v-on:click="opened3 = !opened3">{{staff.FullName}} <br> Room Number:{{staff.RoomNumber}}</td>
                            <td v-on:click="opened3 = !opened3" v-if="opened3">{{staff.Email}} <br> {{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <!--Rooms-->
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in secondFloorRoom" v-bind:key="room.QRCode_ID">
                            <td>{{room.CommonName}} <br> Room Number: {{room.RoomNumber}} </td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-3">
                    <!--Third Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">Third Floor</th>
                        <tr>
                            <th>Name</th>
                            <th v-if="opened4">Info</th>
                            <th>View Office</th>
                        </tr>
                        <!--Staff-->
                        <tr v-for="(staff) in filteredData(thirdFloor)" v-bind:key="staff.Email">
                            <td v-on:click="opened4 = !opened4" >{{staff.FullName}} <br> Room Number: {{staff.RoomNumber}}</td>
                            <td v-on:click="opened4 = !opened4" v-if="opened4">{{staff.Email}} <br> {{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <!--Rooms-->
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in thirdFloorRoom" v-bind:key="room.QRCode_ID">
                            <td>{{room.CommonName}} <br> Room Number: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
            </div>
    <div class="LightBox"> 
        <LightBox :images="images" :showLightBox="false" ref="lightbox"></LightBox>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
//LightBox
import LightBox from 'vue-image-lightbox'
import { REPL_MODE_STRICT } from 'repl';
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
import $ from 'jquery'

export default {
    data(){
        return{
            staffInfo: [],
            roomInfo : [],
            searchQuery : '',

            //Toggle Columns
            opened : false,
            opened2 : false,
            opened3 : false,
            opened4 : false,

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
    methods:{
        viewOffice:function(result){
            //Take OfficeImageFileName of Row, change src then load img
            console.log(result)
            this.images[0].src = 'https://cgi.csc.liv.ac.uk/~tar/officephotos/'+result+'.png'
            this.$refs.lightbox.showImage(0)
        },
        goTo:function(path){
            this.$router.push(path)
        },
        loadBoard:function(){
            //Staff
            var url = "https://www.csc.liv.ac.uk:5000/board"
            axios.get(url)
            .then(response => {
                console.log(response.data.data)
                this.staffInfo = response.data.data
            })
            //Rooms
            var roomurl = "https://www.csc.liv.ac.uk:5000/boardtest"
            axios.get(roomurl)
            .then(response => {
                console.log(response.data.data)
                this.roomInfo = response.data.data
            })
        }     
    },

    mounted:function(){
        this.loadBoard()
    },

    computed: {
        //Filter Staff, take array according to floor as parameter
        filteredData:function() {
            var vm = this;
            return function filter(array) {
                return array.filter(array => {
                    for (var staff in array) {
                        if ((array.FullName.toLowerCase()).indexOf(vm.searchQuery) != -1) {
                            return true
                        }
                    }
                    return false
                })
            }
        },


        //filter STAFF
        groundFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == 'G' & staffInfo.Building_ID == '422'
            })
        },
        firstFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == '1' & staffInfo.Building_ID == '422'
            })
        },
        secondFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == '2' & staffInfo.Building_ID == '422'
            })
        },
        thirdFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == '3' & staffInfo.Building_ID == '422'
            })
        },

        //Filter ROOM
        groundFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === 'G' & roomInfo.Building_ID == '422'
            })
        },
        firstFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === '1' & roomInfo.Building_ID == '422'
            })
        },
        secondFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === '2' & roomInfo.Building_ID == '422'
            })
        },
        thirdFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === '3' & roomInfo.Building_ID == '422'
            })
        }           
    }
}
</script>

<style>
.buildingchoice{
    background-color: lightgreen;
    width: 10%;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    font-size: 14px;
    color: #666;
    height: 50px;
}

.viewoffice{
    background-color: lightgreen;
    border: none;
    width: 100%;
    display: block;
    margin: auto;
    border: none;
    font-size: 10px;
    color: #666;
    height: 35px;
    border: 1px solid grey;
}

#staff th.floorheader{
    text-align: center;
    background-color: lightgreen;
    color: #666;
}

#staff {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width:100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

#staff td, #staff th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 12px;
}

#staff th {
  background-color: lightblue;
  color: white;
}

/*Touch Screen TV */
@media (max-width: 1281px) {
  #staff tr td{
    font-size: 10px;
  }
}

</style>
