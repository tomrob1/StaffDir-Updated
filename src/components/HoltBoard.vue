<template>
    <div class="container-fluid">

        <div class="topbuttons">
            <ul>
                <button class="buildingchoice" v-on:click="goTo('AshtonBoard')">Ashton</button>
                <button class="buildingchoice" v-on:click="goTo('HoltBoard')">George Holt</button>
            </ul>
        </div>
            <div class="row">
                <div class="col-3">
                    <p>Ground Floor</p>
                    <table id="staff">
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>View Office</th>
                        </tr>
                        <tr v-for="(staff) in groundFloor">
                            <td>{{staff.FirstNames}} {{staff.Surname}}</td>
                            <td>Room: {{staff.RoomNumber}} <br> {{staff.Email}} <br> 0{{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <tr v-for="(room) in groundFloorRoom">
                            <td>{{room.CommonName}}</td>
                            <td>Room: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-3">
                    <p>First Floor</p>
                    <table id="staff">
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Office</th>
                        </tr>
                        <tr v-for="(staff) in firstFloor">
                            <td>{{staff.FirstNames}} {{staff.Surname}}</td>
                            <td>Room: {{staff.RoomNumber}} <br> {{staff.Email}} <br> 0{{staff.TelephoneNumber}} </td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <tr v-for="(room) in firstFloorRoom">
                            <td>{{room.CommonName}}</td>
                            <td>Room: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-3">
                    <p>Second Floor</p>
                    <table id="staff">
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Office</th>
                        </tr>
                        <tr v-for="(staff) in secondFloor">
                            <td>{{staff.FirstNames}} {{staff.Surname}}</td>
                            <td>Room: {{staff.RoomNumber}} <br> {{staff.Email}} <br> 0{{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <tr v-for="(room) in secondFloorRoom">
                            <td>{{room.CommonName}}</td>
                            <td>Room: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-3"></div>
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
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    data(){
        return{
            staffInfo: [],
            roomInfo: [],
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
        }   
    },

    mounted:function(){
        //Staff
        var url = "https://10.50.8.1:5000/board"
        axios.get(url)
        .then(response => {
            console.log(response.data.data)
            this.staffInfo = response.data.data
        })
        //Rooms
        var roomurl = "https://10.50.8.1:5000/boardtest"
        axios.get(roomurl)
        .then(response => {
            console.log(response.data.data)
            this.roomInfo = response.data.data
        })
    },

    computed: {
        //filter staff according to room number
        groundFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) === 'G' & staffInfo.Building_ID == '231'
            })
        },
        firstFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == '1' & staffInfo.Building_ID == '231'
            })
        },
        secondFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == '2' & staffInfo.Building_ID == '231'
            })
        },
        thirdFloor() {
            return this.staffInfo.filter(staffInfo => {
                return staffInfo.RoomNumber.charAt(0) == '3' & staffInfo.Building_ID == '231'
            })
        },

        //Filter ROOM
        groundFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === 'G' & roomInfo.Building_ID == '231'
            })
        },
        firstFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === '1' & roomInfo.Building_ID == '231'
            })
        },
        secondFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === '2' & roomInfo.Building_ID == '231'
            })
        },
        thirdFloorRoom() {
            return this.roomInfo.filter(roomInfo => {
                return roomInfo.RoomNumber.charAt(0) === '3' & roomInfo.Building_ID == '231'
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
    border: none;
    font-size: 10px;
    color: #666;
    height: 35px;
    border: 1px solid grey;
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
  text-align: left;
  background-color: lightblue;
  color: white;
}
</style>
