<template>
    <div>
      <MobileHome v-if=" $mq  === 'mobile'"></MobileHome>
      <TabletHome v-if=" $mq  === 'tablet'"></TabletHome>
      <DesktopHome v-if=" $mq  === 'desktop'"></DesktopHome>
    </div>
  </template>

<script>
  import MobileHome from "../components/Home/MobileHome";
  import DesktopHome from "../components/Home/DesktopHome";
  import TabletHome from "../components/Home/TabletHome";
  
  export default {
  components: {
    MobileHome,
    TabletHome,
    DesktopHome,
  }
};
</script>
  

<style scoped >
  
</style>
  