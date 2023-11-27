<script setup>
import SplashPages from "@/components/SplashPages.vue";
</script>

<template>
    <main class="reg" :class="{ inactiveCursor: !cursorActive, activeCursor: cursorActive }">

        <SplashPages
        key="viewGameIntro"
        leftHeadline="you wake up"
        rightHeadline="ALone"
        layout="justify"
        :anchorDivider="false"
        bg=""
        buttonLayout="center"
        :buttonStrong="false"
        :buttonWeak="true"
        :paragraph="true"
      >
        <template #splash--subhead>
          <p>
            but you weren’t
          </p>
          <p>
            when you fell asleep.
          </p>
        </template>

        <template #splash--paragraph>
          <p>
            The Nocta lighthouse was built in 1851. Maine’s light stations played
            important roles in the growth and development of the state’s maritime
            transportation network. Located at strategic offshore coastal and
            river sites, they are the most technologically and architecturally
            significant elements in an extensive system of navigational aids.
          </p>
          
          <p>
            Constructed in response to specific local needs, and later as part of
            a coast-wide pattern, they continue to show the historic growth
            patterns in coastal communities. In the early 19th century, the
            explosion of traffic in Maine’s coastal waters required improved aids
            to navigation. In addition to the heavy volume of merchant traffic,
            steam passenger vessels.
          </p>

          <p>
            Constructed in response to specific local needs, and later as part of
            a coast-wide pattern, they continue to show the historic growth patterns
            in coastal communities. In the early 19th century, the explosion of traffic
            in Maine’s coastal waters required improved aids to navigation.
          </p>
          
          <p>
            In addition to the heavy volume of merchant traffic, steam passenger
            vessels. Constructed in response to specific local needs, and later as
            part of a coast-wide pattern, they continue to show the historic growth
            patterns in coastal communities. In the early 19th century, the explosion
            of traffic in Maine’s coastal waters required improved aids to navigation.
            In addition to the heavy volume of merchant traffic, steam passenger
            vessels.
          </p>
        </template>
        <template #button--weak>
          <div class="splash--container--button-dark type-secondary"
                @click="sendButtonStrongTrigger(), goToVista()"
                @mouseover="handleCursorHover(true)"
                @mouseleave="handleCursorHover(false)">continue</div>
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
    goToVista(){
      setTimeout(() => 
      this.$router.push({ name: 'noctavista' }), 
      2000)
    },
  },
  beforeMount() {
    this.hideAppUi();
    this.sendSplashMusicTrigger();
  },
};
</script>