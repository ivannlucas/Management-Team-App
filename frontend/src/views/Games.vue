<template>
    <div>
      <MobileGames v-if=" $mq  === 'mobile'"></MobileGames>
      <TabletGames v-if=" $mq  === 'tablet'"></TabletGames>
      <DesktopGames v-if=" $mq  === 'desktop'"></DesktopGames>
    </div>
  </template>

<script>
  import MobileGames from "../components/Games/MobileGames";
  import DesktopGames from "../components/Games/DesktopGames";
  import TabletGames from "../components/Games/TabletGames";
  
  export default {
  components: {
    MobileGames,
    TabletGames,
    DesktopGames,
  }
};
</script>
  

<style scoped >
  
</style>
  