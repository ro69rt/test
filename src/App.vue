<template>
  <div class="row">
    <vTimer @deleteTimer="deleteTimer(index)" v-for="n in items" :key="n" />
    <div class="timer">
      <span class="add-icon" @click="add">+</span>
    </div>
  </div>
  <span @click="remove">-</span>
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
    deleteTimer(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>

<style src="@/assets/styles/main.scss" lang="scss"></style>
