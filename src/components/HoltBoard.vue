<template>
    <div class="container-fluid">

        <div class="topbuttons">
            <ul>
                <button class="buildingchoice" v-on:click="goTo('AshtonBoard')">Ashton</button>
                <button class="buildingchoice" v-on:click="goTo('HoltBoard')">George Holt</button>
            </ul>
        </div>
            <div class="row">
                <div class="col-4">
                    <!--Ground Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">Ground Floor</th>
                        <tr>
                            <th>Name</th>
                            <th>View Office</th>
                        </tr>
                        <tr v-for="(staff) in groundFloor" v-bind:key="staff.Email">
                            <td>{{staff.FirstNames}} {{staff.Surname}}</td>
                            <td>Room: {{staff.RoomNumber}} <br> {{staff.Email}} <br> {{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in groundFloorRoom" v-bind:key="room.QRCode_ID">
                            <td>{{room.CommonName}} <br> Room: {{room.RoomNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-4">
                    <!--First Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">First Floor</th>
                        <tr>
                            <th>Name</th>
                            <th>View Office</th>
                        </tr>
                        <tr v-for="(staff) in firstFloor" v-bind:key="staff.Email">
                            <td v-on:click="opened3 = !opened3">{{staff.FirstNames}} {{staff.Surname}}</td>
                            <td v-on:click="opened3 = !opened3" v-if="opened2">Room: {{staff.RoomNumber}} <br> {{staff.Email}} <br> {{staff.TelephoneNumber}} </td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in firstFloorRoom" v-bind:key="room.QRCode_ID">
                            <td>{{room.CommonName}} <br> Room Number: {{room.RoomNumber}} </td>
                            <td><button class="viewoffice" v-on:click="viewOffice(room.QRCode_ID)">View</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-4">
                    <!--Second Floor -->
                    <table id="staff">
                        <th class="floorheader" colspan="3">Second Floor</th>
                        <tr>
                            <th>Name</th>
                            <th v-if="opened3">Info</th>
                            <th>View Office</th>
                        </tr>
                        <tr v-for="(staff) in secondFloor" v-bind:key="staff.Email">
                            <td v-on:click="opened3 = !opened3">{{staff.FirstNames}} {{staff.Surname}} <br> Room Number: {{staff.RoomNumber}}</td>
                            <td v-on:click="opened3 = !opened3" v-if="opened3">{{staff.Email}} <br> {{staff.TelephoneNumber}}</td>
                            <td><button class="viewoffice" v-on:click="viewOffice(staff.QRCode_ID)">View Office</button></td>
                        </tr>
                        <th colspan="2">Rooms</th>
                        <tr v-for="(room) in secondFloorRoom" v-bind:key="room.QRCode_ID">
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
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    data(){
        return{
            staffInfo: [],
            roomInfo: [],

            //Toggle Columns
            opened : false,
            opened2 : false,
            opened3 : false,

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

</style>
