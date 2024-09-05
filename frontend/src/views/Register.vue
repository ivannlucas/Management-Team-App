<template>
    <div>
      <MobileRegister v-if=" $mq  === 'mobile'"></MobileRegister>
      <TabletRegister v-if=" $mq  === 'tablet'"></TabletRegister>
      <DesktopRegister v-if=" $mq  === 'desktop'"></DesktopRegister>
    </div>
  </template>

<script>
  import MobileRegister from "../components/Register/MobileRegister";
  import DesktopRegister from "../components/Register/DesktopRegister";
  import TabletRegister from "../components/Register/TabletRegister";
  
  export default {
  components: {
    MobileRegister,
    TabletRegister,
    DesktopRegister,
  }
};
</script>
  

<style scoped >
  
</style>
  