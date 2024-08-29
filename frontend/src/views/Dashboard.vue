<template>
    <div>
      <MobileDashboard v-if=" $mq  === 'mobile'"></MobileDashboard>
      <TabletDashboard v-if=" $mq  === 'tablet'"></TabletDashboard>
      <DesktopDashboard v-if=" $mq  === 'desktop'"></DesktopDashboard>
    </div>
  </template>

<script>
  import MobileDashboard from "../components/Dashboard/MobileDashboard";
  import DesktopDashboard from "../components/Dashboard/DesktopDashboard";
  import TabletDashboard from "../components/Dashboard/TabletDashboard";
  
  export default {
  components: {
    MobileDashboard,
    TabletDashboard,
    DesktopDashboard,
  }
};
</script>
  

<style scoped >
  
</style>
  