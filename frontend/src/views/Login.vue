<template>
    <div>
      <MobileLogin v-if=" $mq  === 'mobile'"></MobileLogin>
      <TabletLogin v-if=" $mq  === 'tablet'"></TabletLogin>
      <DesktopLogin v-if=" $mq  === 'desktop'"></DesktopLogin>
    </div>
  </template>

<script>
  import MobileLogin from "../components/Login/MobileLogin";
  import DesktopLogin from "../components/Login/DesktopLogin";
  import TabletLogin from "../components/Login/TabletLogin";
  
  export default {
  components: {
    MobileLogin,
    TabletLogin,
    DesktopLogin,
  }
};
</script>
  

<style scoped >
  
</style>
  