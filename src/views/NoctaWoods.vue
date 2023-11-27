
<script setup>
import ContentModal from '../components/ContentModal.vue'
import ContentModalX from '../components/ContentModalX.vue'
import PuzzleScript from '../components/PuzzleScript.vue'
</script>

<template>
  <main class="reg" :class="{ inactiveCursor: !cursorActive, activeCursor: cursorActive }">

  <!-- Module background overlay -->

  <transition name="label" mode="out-in">
    <div class="module--overlay" v-if="moduleOn"></div>
  </transition>

  <!-- Module parent -->

  <transition name="label" mode="out-in">
    <div class="module--container" v-if="moduleOn">
      <div class="module--wip" v-if="moduleOn"> 
        <ContentModalX @click="hideModule" @mouseover="handleCursorHover(true)" @mouseleave="handleCursorHover(false)"/>

        <!-- Module child: headlight -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="PathModule"
            key="PathModule"
            title="the dark woods"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The woods are dense and deep, trees as far as your eye can see into the darkness. Sunlight seems to be sucked in at the tree tops, the rays dying before they can penetrate the moist forest floor. Strange sounds emit from within the grove that send a shiver over your skin. You don't have a reason to enter these woods and you're not eager to.
                </p>
              </template>

              <template #decision--1><div @click="showPathModuleLocked(true)" class="module--decision--type type--uppercase--small">inspect the other side</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>
 
        </div>
      </div> 
    </transition>

    <div class="no-overflow--container">
      <div class="lighthouse--container">
        
        <transition name="label" mode="out-in">
        <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="100%" 
        viewBox="0 0 5082 2250">
          <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/woods.png"></image>
        </svg>
        </transition>

        <!-- hover hotspot overlay + links -->

        <svg
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="100%" 
        viewBox="0 0 5082 2250" 
        opacity="1">
            <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/woods.png" opacity="0"></image>
            
            <!-- path -->

            <rect x="2700" y="0" fill="#ff33aa" opacity="0" width="800" height="2040" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showPathModule"> 
            </rect>                  

        </svg>

      </div>
    </div>
  </main>
</template>

<script>


export default {
  props: {
    haveGotSeenWoods: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
  },
  components: {
    PuzzleScript
  },
  data() {
    return {
      /* Modules */
      
      // headline modules
      PathModule: false,
      PathModuleLocked: false,
      PathModuleUnlocked: false,

      // hover control
      hover: false,
      cursorActive: false,
      moduleOn: false,

      // Puzzle key
      lighthouseGuessCorrect: false,
      lighthouseGuessResponse: '',
      lighthouseAnswer: 'Nina',
      playerCheckedLighthouse: false,
      playerObjective: '',

      // Key events & key items
      gotSeenWoods: false,

    }
  },
  methods: {
      showPathModule() {
        this.PathModule = true;
        this.moduleOn = true;
        this.gotSeenWoods = true;
        this.$emit('got-seen-woods');
      },
      showPathModuleLocked() {
        this.PathModuleLocked = true;
        this.playerCheckedLighthouse = true;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showPathModuleUnlocked() {
        this.PathModuleUnlocked = true;
        this.PathModuleLocked = false;
        this.moduleOn = true;
      },
      hideModule() {
        this.PathModule = false;
        this.PathModuleLocked = false;
        this.PathModuleUnlocked = false;
        this.moduleOn = false;
        this.lighthouseGuessResponse = ''
        this.$emit('toggle-wind-sounds-off');
        this.$emit('toggle-wood-sounds-off');
      },
        handleCursorHover(s) {
        this.hover = s;
        this.cursorActive = s;
        console.log('hover check');
      },
      puzzleGuessCheck(event) {
        console.log(event.toLowerCase())
        if(event.toLowerCase()===this.lighthouseAnswer.toLowerCase()) {
          this.lighthouseGuessCorrect = true
          this.lighthouseGuessResponse = 'The lock clicks open.'
          this.$emit('get-unlocked-sound');
        } else {
          this.lighthouseGuessResponse = 'Nothing happens.'
          this.lighthouseGuessCorrect = false
          this.$emit('get-chain-sound');
        }
      },
      checkHaveGotSeenWoods(){
        if(this.haveGotSeenWoods == true) {
          this.gotSeenWoods = true;
        }
      },
    },
  beforeMount(){
    this.checkHaveGotSeenWoods();
  }
};
</script>