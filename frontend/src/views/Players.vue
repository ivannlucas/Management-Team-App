<template>
    <div>
      <MobilePlayers v-if=" $mq  === 'mobile'"></MobilePlayers>
      <TabletPlayers v-if=" $mq  === 'tablet'"></TabletPlayers>
      <DesktopPlayers v-if=" $mq  === 'desktop'"></DesktopPlayers>
    </div>
  </template>

<script>
  import MobilePlayers from "../components/Players/MobilePlayers";
  import DesktopPlayers from "../components/Players/DesktopPlayers";
  import TabletPlayers from "../components/Players/TabletPlayers";
  
  export default {
  components: {
    MobilePlayers,
    TabletPlayers,
    DesktopPlayers,
  }
};
</script>
  

<style scoped >
  
</style>