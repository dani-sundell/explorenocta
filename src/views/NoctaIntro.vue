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
            When your stir in your sleeping bag, all appears as it should be. You wake by the growing 
            light of the dawn, bleeding through the red nylon of your tent as the new sun's rays spill 
            through the envelope of trees around your campsite. The forest sings with an expected morning 
            melody of chittering squirrels, chirping birds, and wind-rustled branches. You feel well-rested 
            and satisfied.
          </p>
          <p>
            As you begin to unfurl yourself from your warm cocoon, however, the first sign of trouble dawns on 
            you. You and Rachel have done a number of these trips throughout the northeast since you first met 
            a few years ago, but she'd always been the first to rise, desperate for a hot cup of espresso from 
            her beloved moka pot right at the first light of dawn. As you dress for a day of hiking among the 
            picturesque Maine wilderness, you notice the distinct lack of metal clinks and boiling water that 
            you've become so accustomed to hearing. But, for now, you don't think much of it.
          </p>
          <p>
            A few minutes later, you emerge from your tent and reach for the boots caked in yesterday's mud left 
            at the entrance. Your eyes scan the quiet campsite with your brows furrowed above. Confusion washes 
            over you as you notice the cold fit pit, the open flap of her tent, the deathly silence — save for 
            the sounds of the forest.
          </p>
          <p>
            Perhaps she just wandered off for a moment, you think as you pull the laces tight on your boots. 
            You go about your business for a few minutes as you silently hope Rachel will turn up.
          </p>
          <p>
            A minute quickly becomes ten, and soon twenty minutes have passed without any sign of her and you've 
            officially become concerned. You wander around the vicinity of your campsite calling her name, but 
            no reply comes.
          </p>
          <p>
            Beginning to fear the worst, you turn to more desperate measures. You head to her opened tent and 
            begin to search through her belongings. She's left almost everything behind. The only things you 
            see missing are the items she wore around your campfire last night: a red sweatshirt, black trousers, 
            and her hiking boots. You eye her pack, brushing off a pang of guilt as you reach towards it and begin 
            to rifle through. Just as you begin to feel like there's nothing to discover, you spot an envelope folded 
            and stuffed into one of the outer pockets.
          </p>
          <p>
            As you open it up, it becomes clear that the first page of the letter is missing, but you read on anyway in 
            search of some kind of clue.
          </p>
          <blockquote>
            <p>
              You're unlikely to find Nocta on any modern map, but follow the interstate north until 
              you reach the bridge above Collins Creek. From there, head westward for five miles on 
              foot. I'll meet you at the top of the overlook.
            </p>
            <p>
              Please note the presence of a witness will be required to complete the paperwork.
            </p>
            <p>
              Regards,<br />
              Callahan Stowe, J.D.
            </p>
          </blockquote>
          <p>
            Your mind begins to swirl with a flurry of unanswerable questions. What kind of paperwork was 
            the attorney referring to? What kind of town can only be reached on foot? Why didn't Rachel 
            tell you the purpose of this camping trip?
          </p>
          <p>
            It alarms you that the letter mentions needing a witness and Rachel seemingly wandered off 
            to the location without you. A feeling is sinking in the pit of your stomach, building as you 
            wrestle with what to do next. But — given the remoteness of your campsite and your lack of any 
            other clues — it becomes clear that heading to the aforementioned "Nocta" is the only viable 
            option you have if you want to find Rachel.
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