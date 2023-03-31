<template>
  <div class="timer">
    <div :class="{ active: isStartDisabled }" class="timer-block">
      <span
        v-if="hourVisible"
        :class="{ active: isStartDisabled }"
        class="timer-block__count"
        >{{ hour }}:</span
      >
      <span
        v-if="minuteVisible"
        :class="{ active: isStartDisabled }"
        class="timer-block__count"
        >{{ minute }}:</span
      >
      <span :class="{ active: isStartDisabled }" class="timer-block__count">{{
        second
      }}</span>
    </div>

    <div class="timer-btns">
      <svg
        :class="{ active: isStartDisabled }"
        class="timer-btn"
        @click="timerStart"
        v-if="!isStartDisabled"
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 20V0L17 10L0 20Z" fill="#9E9E9E" />
      </svg>

      <svg
        :class="{ active: isStartDisabled }"
        class="timer-btn"
        v-if="!isPauseDisabled"
        @click="timerPause"
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="7" width="3" height="20" fill="#9E9E9E" />
        <rect width="3" height="20" fill="#9E9E9E" />
      </svg>

      <svg
        :class="{ active: isStartDisabled }"
        class="timer-btn timer-btn__stop"
        :disabled="isResetDisabled"
        @click="timerStop"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" fill="#9E9E9E" />
      </svg>
    </div>
	<span class="delete-icon" @click="deleteTimer">X</span>
  </div>
</template>

<script>
export default {
  name: "vTimer",
  data() {
    return {
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      startDisabled: true,
      hourVisible: false,
      minuteVisible: false,
      isPauseDisabled: true,
      isStartDisabled: false,
      isResetDisabled: true,
      paused: false,
      stoped: false,
      interval: 0,
    };
  },
  computed: {
    intervalCount: function () {
      return 0;
    },
  },
  methods: {
    timerStart() {
      this.interval = setInterval(this.startTimer, 10);
      this.isStartDisabled = true;
      this.isPauseDisabled = false;
      this.isResetDisabled = false;
    },
    timerPause() {
      clearInterval(this.interval);
      this.interval = clearInterval(this.interval);
      this.isStartDisabled = false;
      this.isPauseDisabled = true;
      this.isResetDisabled = false;
    },
    timerStop() {
      this.isStartDisabled = false;
      this.isPauseDisabled = true;
      this.isResetDisabled = false;
      clearInterval(this.interval);
      this.clearFields();
    },
    startTimer() {
      this.millisecond++;
      //milliseconds
      if (this.millisecond < 9) {
        this.millisecond = "0" + this.millisecond;
      }
      if (this.millisecond > 9) {
        this.millisecond == this.millisecond;
      }
      if (this.millisecond > 99) {
        this.second ++;
        if (this.second < 10) {
          this.second = "0" + this.second;
        } else {
          this.second == this.second;
        }
        this.millisecond = 0;
        this.millisecond = "0" + this.millisecond;
      }

      // seconds
     
      if (this.second > 59) {
        this.minute++;
        this.second = 0;
        this.minuteVisible = true;

        // minutes
        if (this.minute < 10) {
          this.minute = "0" + this.minute;
        } else {
          this.minute == this.minute;
        }
        if (this.minute > 59) {
          this.hour++;
          if (this.hour < 9) {
            this.hour = "0" + this.hour;
          } else {
            this.hour == this.hour;
          }
          this.minute = 0;
          this.hourVisible = true;
        }
      }
    },

    clearFields() {
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      this.millisecond = 0;
      this.hour = "00";
      this.minute = "00";
      this.second = "00";
      this.millisecond = "00";
    },
	deleteTimer() {
      this.$emit("deleteTimer");
    },
  },
};
</script>
