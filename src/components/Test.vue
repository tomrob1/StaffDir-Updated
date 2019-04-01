<template>

<div class="LightBox">
    <button v-on:click="openGallery(0)">View</button>
    <div class="LightBoxShow">  
        <LightBox :images="images" :showLightBox="false" ref="lightbox"></LightBox>    
    </div>
</div>

</template>

<script>
import LightBox from 'vue-image-lightbox'
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    data(){
        return{
            images:
            [
                {
                    src: 'https://cgi.csc.liv.ac.uk/~nachi/images/231/231_2001_0000.png'
                }
            ]
        }
    },

    components:{
        LightBox
    },

    methods:{
        openGallery:function(index){
            this.$refs.lightbox.showImage(index)
        }
    }

}
</script>

<style>

</style>

