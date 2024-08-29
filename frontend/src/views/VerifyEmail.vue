<template>
    <div>
      <MobileVerifyEmail v-if=" $mq  === 'mobile'"></MobileVerifyEmail>
      <TabletVerifyEmail v-if=" $mq  === 'tablet'"></TabletVerifyEmail>
      <DesktopVerifyEmail v-if=" $mq  === 'desktop'"></DesktopVerifyEmail>
    </div>
  </template>

<script>
  import MobileVerifyEmail from "../components/VerifyEmail/MobileVerifyEmail";
  import DesktopVerifyEmail from "../components/VerifyEmail/DesktopVerifyEmail";
  import TabletVerifyEmail from "../components/VerifyEmail/TabletVerifyEmail";
  
  export default {
  components: {
    MobileVerifyEmail,
    TabletVerifyEmail,
    DesktopVerifyEmail,
  }
};
</script>
  

<style scoped >
  
</style>
  