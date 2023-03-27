<template>
  <div class="timer">
    <div :class="{ active: isStartDisabled }" class="timer-block">
      <span v-if="hoursVisible" :class="{ active: isStartDisabled }" class="timer-block__count">{{
        currentTimeHours
      }}</span>
      <span v-if="minutesVisible" :class="{ active: isStartDisabled }" class="timer-block__count"
        >{{ this.min }}:</span
      >
      <span :class="{ active: isStartDisabled }" class="timer-block__count">{{
        currentTimeSecs
      }}</span>
    </div>

    <div class="timer-btns">
      <svg
        :class="{ active: isStartDisabled }"
        class="timer-btn"
        @click="runCountdown"
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
        @click="pauseCountdown"
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
        @click="resetCountdown"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" fill="#9E9E9E" />
      </svg>
    </div>
  </div>
</template>

<script>
import { MyTimer } from "@/lib/timer";

export default {
  name: "vTimer",
  data() {
    return {
      min: this.minutes,
      secs: this.seconds,
      hour: this.hours,
      timerId: 0,
      running: false,
      paused: false,
      stopped: true,
      mute: this.muted,
      minutesVisible: false,
      hoursVisible: false,
      startVisible: true,
    };
  },

  props: {
    minutes: {
      type: Number,
      validator: function (value) {
        return value >= 0 && value <= 59;
      },
      default: 0,
    },
    seconds: {
      type: Number,
      validator: function (value) {
        return value >= 0 && value <= 59;
      },
      default: 0,
    },
    hours: {
      type: Number,
      validator: function (value) {
        return value >= 0;
      },
      default: 0,
    },

    muted: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    currentTimeSecs() {
      if (this.currentTimeSecs >= 59) {
        this.minutesVisible = true;
        this.currentTimeSecs === 0;
      }
    },
    currentTimeMinutes() {
      if (this.currentTimeMinutes >= 59) {
        this.hoursVisible = true;
      }
    },
  },

  computed: {
    currentTimeSecs: function () {
      return this.currentTimeSecsFunc();
    },
    currentTimeMinutes: function () {
      return this.currentTimeMinutesFunc();
    },
    currentTimeHours: function () {
      let hours = this.hour < 10 ? "0" + this.hour : this.hour;
      return `${hours}:`;
    },

    isStartDisabled: function () {
      return this.running;
    },
    isPauseDisabled: function () {
      return this.stopped || this.paused;
    },
    isResetDisabled: function () {
      return false;
    },
  },

  methods: {
    currentTimeSecsFunc() {
      let seconds = this.secs < 10 ? "0" + this.secs : this.secs;
      return `${seconds}`;
    },
    currentTimeMinutesFunc: function () {
      let minutes = this.min < 10 ? "0" + this.min : this.min;
      return `${minutes}:`;
    },

    run: function () {
      this.running = true;
      this.paused = false;
      this.stopped = false;
    },

    pause: function () {
      this.running = false;
      this.paused = true;
      this.stopped = false;
    },

    stop: function () {
      this.running = false;
      this.paused = false;
      this.stopped = true;
    },

    runCountdown: function () {
      if (this.stopped === true) {
        if (this.min >= 59) {
          this.min === 0;
          this.minutes === 0;
        }
        this.min = this.minutes;
        this.secs = this.seconds;
        this.hour = this.hours;
        this.startVisible = false;
      }

      this.timerId = MyTimer.startCountdown(
        this.min,
        this.secs,
        this.hour,
        this.updateComponentTime
      );
      this.run();
    },

    updateComponentTime: function (seconds) {
      let time = MyTimer.remainingTime(seconds);
      this.min = Number(time.mm);
      this.secs = Number(time.ss);
      this.hour = Number(time.hh);
      if (time.running === false) {
        this.stop();
      }
    },

    pauseCountdown: function () {
      MyTimer.pauseCountdown(this.timerId);
      this.startVisible = true;
      this.pause();
    },

    resetCountdown: function () {
      MyTimer.stopCountdown(this.timerId);
      this.min = this.minutes;
      this.secs = this.seconds;
      this.hour = this.hours;
      this.startVisible = true;
      this.stop();
    },
  },
};
</script>
