<template>
    <div>
      <MobileGenerateLink v-if=" $mq  === 'mobile'"></MobileGenerateLink>
      <TabletGenerateLink v-if=" $mq  === 'tablet'"></TabletGenerateLink>
      <DesktopGenerateLink v-if=" $mq  === 'desktop'"></DesktopGenerateLink>
    </div>
  </template>

<script>
  import MobileGenerateLink from "../components/GenerateLink/MobileGenerateLink";
  import DesktopGenerateLink from "../components/GenerateLink/DesktopGenerateLink";
  import TabletGenerateLink from "../components/GenerateLink/TabletGenerateLink";
  
  export default {
  components: {
    MobileGenerateLink,
    TabletGenerateLink,
    DesktopGenerateLink,
  }
};
</script>
  

<style scoped >
  
</style>