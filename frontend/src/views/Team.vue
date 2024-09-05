<template>
    <div>
      <MobileTeam v-if=" $mq  === 'mobile'"></MobileTeam>
      <TabletTeam v-if=" $mq  === 'tablet'"></TabletTeam>
      <DesktopTeam v-if=" $mq  === 'desktop'"></DesktopTeam>
    </div>
  </template>

<script>
  import MobileTeam from "../components/Team/MobileTeam";
  import DesktopTeam from "../components/Team/DesktopTeam";
  import TabletTeam from "../components/Team/TabletTeam";
  
  export default {
  components: {
    MobileTeam,
    TabletTeam,
    DesktopTeam,
  }
};
</script>
  

<style scoped >
  
</style>
  