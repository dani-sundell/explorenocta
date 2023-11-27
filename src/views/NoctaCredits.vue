<script setup>
import SplashPages from "@/components/SplashPages.vue";
</script>

<template>
    <main class="reg" :class="{ inactiveCursor: !cursorActive, activeCursor: cursorActive }">
        <SplashPages
        key="viewGameCredits"
        leftHeadline="the"
        rightHeadline="credits"
        layout="center"
        :anchorDivider="true"
        bg="fish"
        buttonLayout="center"
        :buttonStrong="false"
        :buttonWeak="true"
        :paragraph="false"
      >
        <template #splash--subhead>
          <p class="splash--subhead--desc divider-y">
            <span class="splash--subhead--bold">Story, Design, Illustration, & Development</span>
            created by Dani Sundell for the Master’s in Graphic & Web Design
            2023 Capstone at Minneapolis College of Art & Design.
          </p>
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
    sendButtonWeakTrigger() {
      this.$emit('send-button-weak');
    },
    goToSplash(){
      setTimeout(() => 
      this.$router.push({ name: 'splash' }), 
      1000)
    },
  },
  beforeMount() {
    this.hideAppUi();
    this.sendSplashMusicTrigger();
  },
};
</script>