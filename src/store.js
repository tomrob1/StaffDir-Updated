import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    //Data
    state:{
        results:[]
    },
    getters:{
        getResult: state => {
            return state.results
        }
    },
    mutations:{
        //Take API Result, add to array
        updateResult({results},result){
            results.push(result)
        },
        //Empty Array, called when user leaves page
        clearResult({results}) {
            results.length = 0
        }
    }
}) 