<template>
    <div>
      <MobileCalendar v-if=" $mq  === 'mobile'"></MobileCalendar>
      <TabletCalendar v-if=" $mq  === 'tablet'"></TabletCalendar>
      <DesktopCalendar v-if=" $mq  === 'desktop'"></DesktopCalendar>
    </div>
  </template>

<script>
  import MobileCalendar from "../components/Calendar/MobileCalendar";
  import DesktopCalendar from "../components/Calendar/DesktopCalendar";
  import TabletCalendar from "../components/Calendar/TabletCalendar";
  
  export default {
  components: {
    MobileCalendar,
    TabletCalendar,
    DesktopCalendar,
  }
};
</script>
  

<style scoped >
  
</style>
  