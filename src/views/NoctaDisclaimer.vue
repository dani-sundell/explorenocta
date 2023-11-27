<script setup>
import SplashPages from "@/components/SplashPages.vue";
</script>

<template>
<main class="reg" :class="{ inactiveCursor: !cursorActive, activeCursor: cursorActive }">
    <SplashPages
        key="viewGameDisclaimer"
        leftHeadline="before you"
        rightHeadline="BeGin"
        layout="center"
        :anchorDivider="false"
        bg="nina"
        buttonLayout="center"
        :buttonStrong="true"
        :buttonWeak="true"
        :paragraph="false"
      >
        <template #splash--subhead>
          <p class="splash--subhead--desc divider-n">
            Explore Nocta is designed to be played in a
            <span class="splash--subhead--bold">Single sitting</span> using a
            <span class="splash--subhead--bold">desktop browser</span>.
            Refreshing the page or closing the tab will result in lost progress.
            You will likely complete the story in 3 hours or less. For the best
            experience, please turn
            <span class="splash--subhead--bold">sound on</span>.
          </p>
        </template>
        <template #button--strong>
          <div class="splash--container--button type-secondary"
                @click="sendButtonStrongTrigger(), goToIntro()"
                @mouseover="handleCursorHover(true)"
                @mouseleave="handleCursorHover(false)">Proceed</div>
        </template>
        <template #button--weak>
          <div class="splash--container--button-dark type-secondary"
                @click="sendButtonWeakTrigger(), goToSplash()"
                @mouseover="handleCursorHover(true)"
                @mouseleave="handleCursorHover(false)">Back</div>
        </template>
      </SplashPages>
    </main>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
      cursorActive: false,
      viewSplashHome: true,
      viewGameDisclaimer: false,
      viewGameIntro: false,
      viewGameCredits: false,
    };
  },
  methods: {
    handleCursorHover(s) {
      this.hover = s;
      this.cursorActive = s;
    },
    hideAppUi() {
      this.$emit("hide-ui-on-splash");
    },
    sendSplashMusicTrigger() {
      this.$emit("send-splash-music");
    },
    sendButtonStrongTrigger() {
      this.$emit('send-button-strong');
    },
    sendButtonWeakTrigger() {
      this.$emit('send-button-weak');
    },
    goToSplash(){
      setTimeout(() => 
      this.$router.push({ name: 'splash' }), 
      1000)
    },
    goToDisclaimer(){
      setTimeout(() => 
      this.$router.push({ name: 'disclaimer' }), 
      1000)
    },
    goToCredits(){
      setTimeout(() => 
      this.$router.push({ name: 'credits' }), 
      1000)
    },
    goToIntro(){
      setTimeout(() => 
      this.$router.push({ name: 'intro' }), 
      1000)
    },
  },
  beforeMount() {
    this.hideAppUi();
    this.sendSplashMusicTrigger();
  },
};
</script>