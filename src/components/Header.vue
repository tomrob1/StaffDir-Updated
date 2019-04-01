<template>
    <div class="logotitle">
        <img src="../assets/unilogo.png">

        <div class="topnav">
            <router-link to="/" tag="a">Home</router-link>
            <router-link to="/search" tag="a">Search</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.logotitle{
    background: azure;
    width: 100%;
}
.logotitle img{
    width: 30%;
}
.topnav{
    background-color: lightblue;
    overflow: hidden;
    height: 30px;
}
.topnav a{
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
}
.topnav a:hover{
    background-color: white;
    color: black;
}
</style>
