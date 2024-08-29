<template>
    <div>
      <MobileChangePassword v-if=" $mq  === 'mobile'"></MobileChangePassword>
      <TabletChangePassword v-if=" $mq  === 'tablet'"></TabletChangePassword>
      <DesktopChangePassword v-if=" $mq  === 'desktop'"></DesktopChangePassword>
    </div>
  </template>

<script>
  import MobileChangePassword from "../components/ChangePassword/MobileChangePassword";
  import DesktopChangePassword from "../components/ChangePassword/DesktopChangePassword";
  import TabletChangePassword from "../components/ChangePassword/TabletChangePassword";
  
  export default {
  components: {
    MobileChangePassword,
    TabletChangePassword,
    DesktopChangePassword,
  }
};
</script>
  

<style scoped >
  
</style>
  