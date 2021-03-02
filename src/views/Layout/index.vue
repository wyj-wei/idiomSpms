<template>
  <div class="layout">
    <layoutHeader />
    <container>
      <sidebar slot="left"></sidebar>
      <router-view slot="content"></router-view>
    </container>
  </div>
</template>

<script lang="ts">
import layoutHeader from "./layoutHeader.vue";
import container from "./container.vue";
import sidebar from "./sidebar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { layoutHeader, container, sidebar }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>
 