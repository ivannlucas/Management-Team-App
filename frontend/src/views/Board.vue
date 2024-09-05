<template>
    <div>
      <MobileBoard v-if=" $mq  === 'mobile'"></MobileBoard>
      <TabletBoard v-if=" $mq  === 'tablet'"></TabletBoard>
      <DesktopBoard v-if=" $mq  === 'desktop'"></DesktopBoard>
    </div>
  </template>

<script>
  import MobileBoard from "../components/Board/MobileBoard";
  import DesktopBoard from "../components/Board/DesktopBoard";
  import TabletBoard from "../components/Board/TabletBoard";
  
  export default {
  components: {
    MobileBoard,
    TabletBoard,
    DesktopBoard,
  }
};
</script>
  

<style scoped >
  
</style>
  