<template>
    <div>
      <MobileRegisterPlayers v-if=" $mq  === 'mobile'"></MobileRegisterPlayers>
      <TabletRegisterPlayers v-if=" $mq  === 'tablet'"></TabletRegisterPlayers>
      <DesktopRegisterPlayers v-if=" $mq  === 'desktop'"></DesktopRegisterPlayers>
    </div>
  </template>

<script>
  import MobileRegisterPlayers from "../components/RegisterPlayers/MobileRegisterPlayers";
  import DesktopRegisterPlayers from "../components/RegisterPlayers/DesktopRegisterPlayers";
  import TabletRegisterPlayers from "../components/RegisterPlayers/TabletRegisterPlayers";
  
  export default {
  components: {
    MobileRegisterPlayers,
    TabletRegisterPlayers,
    DesktopRegisterPlayers,
  }
};
</script>
  

<style scoped >
  
</style>
  