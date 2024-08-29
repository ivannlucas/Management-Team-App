<template>
    <div class="chat-container">
      <MobileChat v-if=" $mq  === 'mobile'"></MobileChat>
      <TabletChat v-if=" $mq  === 'tablet'"></TabletChat>
      <DesktopChat v-if=" $mq  === 'desktop'"></DesktopChat>
    </div>
  </template>

<script>
  import MobileChat from "../components/Chat/MobileChat";
  import DesktopChat from "../components/Chat/DesktopChat";
  import TabletChat from "../components/Chat/TabletChat";
  
  export default {
  components: {
    MobileChat,
    TabletChat,
    DesktopChat,
  }
};
</script>
  

<style scoped >
.chat-container{
  height: 100%;

}
  
</style>
  