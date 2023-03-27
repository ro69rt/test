<template>
  <div class="row">
    <vTimer v-for="n in items" :key="n" />
    <div class="timer">
      <span @click="add">+</span>
    </div>
  </div>
</template>

<script>
import vTimer from "@/components/vTimer";

export default {
  name: "App",
  components: {
    vTimer,
  },
  data() {
    return {
      items: [0],
    };
  },
  methods: {
    add() {
      this.items.push(1);
    },
  },
};
</script>

<style src="@/assets/styles/main.scss" lang="scss"></style>
