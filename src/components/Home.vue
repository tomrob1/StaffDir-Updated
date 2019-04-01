<template>
<div class="container">
  <br>
  <br>
  <div class="homebtn"><router-link to="/search" tag="button">Search Staff</router-link></div>
  <div class="homebtn"><router-link to="/ashtonmap" tag="button">Map</router-link></div>
  <br>
  <br>
</div>

</template>

<script>
export default {
}
</script>

<style>
.homebtn button{
  background-color: lightgreen;
  padding: 10px 35px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50%;
  border: none;
  font-size: 20px;
  color: #666;
}

/*Portrait Phone */
@media (max-width: 767.98px) {
  .homebtn button{
    font-size: 10px;
    width: 40%;
  }
}
</style>
