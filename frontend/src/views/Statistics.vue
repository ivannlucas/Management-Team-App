<template>
    <div>
      <MobileStatistics v-if=" $mq  === 'mobile'"></MobileStatistics>
      <TabletStatistics v-if=" $mq  === 'tablet'"></TabletStatistics>
      <DesktopStatistics v-if=" $mq  === 'desktop'"></DesktopStatistics>
    </div>
  </template>

<script>
  import MobileStatistics from "../components/Statistics/MobileStatistics";
  import DesktopStatistics from "../components/Statistics/DesktopStatistics";
  import TabletStatistics from "../components/Statistics/TabletStatistics";
  
  export default {
  components: {
    MobileStatistics,
    TabletStatistics,
    DesktopStatistics,
  }
};
</script>
  

<style scoped >
  
</style>
  