<template>
    <div>
      <MobileGamesStatistics v-if=" $mq  === 'mobile'"></MobileGamesStatistics>
      <TabletGamesStatistics v-if=" $mq  === 'tablet'"></TabletGamesStatistics>
      <DesktopGamesStatistics v-if=" $mq  === 'desktop'"></DesktopGamesStatistics>
    </div>
  </template>

<script>
  import MobileGamesStatistics from "../components/GamesStatistics/MobileGamesStatistics.vue";
  import DesktopGamesStatistics from "../components/GamesStatistics/DesktopGamesStatistics";
  import TabletGamesStatistics from "../components/GamesStatistics/TabletGamesStatistics";
  
  export default {
  components: {
    MobileGamesStatistics,
    TabletGamesStatistics,
    DesktopGamesStatistics,
  }
};
</script>
  

<style scoped >
  
</style>
  