<template>
    <div>
      <MobileTraining v-if=" $mq  === 'mobile'"></MobileTraining>
      <TabletTraining v-if=" $mq  === 'tablet'"></TabletTraining>
      <DesktopTraining v-if=" $mq  === 'desktop'"></DesktopTraining>
    </div>
  </template>

<script>
  import MobileTraining from "../components/Training/MobileTraining";
  import DesktopTraining from "../components/Training/DesktopTraining";
  import TabletTraining from "../components/Training/TabletTraining";
  
  export default {
  components: {
    MobileTraining,
    TabletTraining,
    DesktopTraining,
  }
};
</script>
  

<style scoped >
  
</style>
  