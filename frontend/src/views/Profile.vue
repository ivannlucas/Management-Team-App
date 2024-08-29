<template>
    <div>
      <MobileProfile v-if=" $mq  === 'mobile'"></MobileProfile>
      <TabletProfile v-if=" $mq  === 'tablet'"></TabletProfile>
      <DesktopProfile v-if=" $mq  === 'desktop'"></DesktopProfile>
    </div>
  </template>

<script>
  import MobileProfile from "../components/Profile/MobileProfile";
  import DesktopProfile from "../components/Profile/DesktopProfile";
  import TabletProfile from "../components/Profile/TabletProfile";
  
  export default {
  components: {
    MobileProfile,
    TabletProfile,
    DesktopProfile,
  }
};
</script>
  

<style scoped >
  
</style>
  