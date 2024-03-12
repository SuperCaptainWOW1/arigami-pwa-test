<template lang="pug">
.content
  router-view
</template>

<script>
</script>

<style lang="sass">
#app
  display: flex
  flex-direction: column
  min-height: 99.9vh
  overflow-x: hidden
.header
  background-color: $headerBG
  position: fixed
  width: 100%
  z-index: 100
  padding: 5*$u 0
  @media screen and (max-width: $mobileWidth)
    padding: 3*$u 0
.footer
  margin-top: auto
  background-color: $headerBG
  padding: 5*$u 0
.content
  margin-top: 20*$u
  padding-bottom: 100px
  @media screen and (max-width: $mobileWidth)
    margin-top: 15*$u
</style>
