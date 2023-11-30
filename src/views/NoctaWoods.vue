
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
                  The woods are dense and deep, trees as far as your eye can see into the darkness. 
                  Sunlight seems to be sucked in at the tree tops, the rays dying before they can 
                  penetrate the moist forest floor. Strange sounds emit from within the grove that 
                  send a shiver over your skin. You don't have a reason to enter these woods and 
                  you're not eager to.
                </p>
              </template>

              <template #decision--1><div @click="showPathModuleLocked(true)" class="module--decision--type type--uppercase--small">inspect the other side</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>

          <ContentModal
            v-if="PathUnlockedModule"
            key="PathUnlockedModule"
            title="the dark woods"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p v-if="!haveGotSeenUnlockedChest">
                  You notice a strange symbol carved into the bark of one of the trees near the forest's edge. 
                  It's certainly and ominous mark, but you're not sure what to make of it.
                </p>
                <p v-if="haveGotSeenUnlockedChest">
                  This symbol carved into the tree must be what the Sheriff mentioned in his letter to Lucien. 
                  Following these markings should lead right to Ms. Falker's home.
                </p>
              </template>

              <template #decision--1><div @click="showPathCabinModule(true)" v-if="haveGotSeenUnlockedChest" class="module--decision--type type--uppercase--small">Follow the trail</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>

          <ContentModal
            v-if="PathCabinModule"
            key="PathCabinModule"
            title="the dark woods"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The darkness closes in around you as you begin your journey through the trees. Your skin
                  perspires, your nervous energy fleeing through your pores. Cool moisture percolates between 
                  your flesh and your clothing, tickling the hairs on the surface with each step you take 
                  towards the woods' opressive depths. 
                </p>
                <p>
                  Your eyes are sternly set at the tree trucks as you fight off the urge to look behind you, 
                  to turn and run, to give up this tireless search. Yet, something in you pushes your feet ever 
                  forward; something in you is sure that real answers lie close ahead.  
                </p>
                <p>
                  You realize you've begun to walk faster with a desperate eagerness to reach your final destination. 
                  It feels like you've walked miles over the course of days by the time you finally see a light shimmering 
                  between the thick cloud of forest branches. 
                </p>
                <p>
                  You see the light bleeding through the windows of a small cabin, drowning in a sea of hungry moss and vines. 
                  Yet, you find no comfort in this light. For the numerous collection of lit candles signifies something too 
                  terrifying to ignore: something is in the cabin and they're waiting for you. You know this by the sight of 
                  your friend's crimson sweatshirt — dangling by a single nail plunged through the tip of the hood into the cabin's 
                  front door. 
                </p>
              </template>

              <template #decision--1><div @click="showCabinIntroModule(true)" class="module--decision--type type--uppercase--small">Enter the Cabin</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
          
          
          <ContentModal
            v-if="CabinIntroModule"
            key="CabinIntroModule"
            title="the cabin"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  You second guess your decision to enter the moment your hand presses into the rough logs of the door. 
                  The wood groans against the push, its cry echoing off the wall of trees encircling the small home. 
                </p>
                <p>
                  You hold your breath as you enter, your body buzzing with a deep craving to turn back, to escape, 
                  to leave whatever lies beyond the door alone. But your feet pull you forward through the threshold into 
                  the candle-lit cabin. 
                </p>
                <p>
                  Your eyes scan over the cluttered woodland interior. The walls are lined with moss-covered shelves, littered 
                  with oddly shaped bottles and vials covered in a layer of dirt and grime. Tall candle stalks are glued to an 
                  array of handmade furnature, anchored to the wood by viscous ropes of yellowed wax. An earthen smell fills your 
                  nostirls, notes of peat and subtle florals — then the sharp, nauseating ironwine scent of blood.   
                </p>
                <p>
                  A gag thickens your thorat as your wide eyes find the source of the smell. A wooden rocking chair sits before a blazing 
                  hearth. A figure reaches a wrinkled hand out to grasp a steaming cup of tea on a rickety side table. Beyond the figure, 
                  laid on the floor in front of the fire like a corpse in a casket, is the still, bloodied body of Rachel. 
                </p>
                <p>
                  Your knees falter as a cry leaves your throat. You stumble back manically towards the door, but your palms discover the 
                  rough surface suddenly shut behind you. Your chest heaves as you spin back towards the exit, your hands clawing for a 
                  handle that doesn't exist. You're trapped.
                </p>
                <div class="long--response--container">
                    <div class="type--quotations type-secondary">
                      "At last you've arrived."
                    </div>
                </div>
                <p>
                  The rasped voice fills your ears like water closing over your head, threating to leave you drowing below the surface. You look 
                  for a way to escape, a source of protection. In your panic you can hardly find anything that will suit your needs, save for the 
                  knife in your pack that still reeks lightly of fish entrails. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "Your friend did not suffer. You, too, may not still."
                </p>
                <p>
                  You turn back towards the voice, knife clentched between white knuckles, and watch the figure stand from the rocking chair. The 
                  figure, you realize, is nothing more than a haggered old woman. Her long, wrinkled face is framed by an unruly gray frizz. If you 
                  had seen her under different circumstances, she might have seemed disheleved, but perfectly harmless. Despite her appearance, you 
                  remain on gaurd, the pool of Rachel's blood glinting red by the firelight into your periphial. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "What did you do?...Why?"
                </p>
                <p>
                  You ask the woman with your knife held out to her in warning. You're half surprised the words leave your lips, stil reeling from a 
                  wave of panic.
                </p>
                <p class="type-secondary type--quotations--small">
                  "Rachel sought her inheritance. I have given it to her."
                </p>
                <p>
                  For some reason, you consider this. Your mind weaves together all the pieces you've uncovered since you awoke this morning. You recall 
                  the letter you found in Rachel's pack. Was this woman the one that asked her to come here.
                </p>
                <p class="type-secondary type--quotations--small">
                  "I see your mind spinning, child. I have waited long for this day and I will wait no more." 
                </p>
                <p>
                  Your eyes lock with the cold, dark gaze of the old woman in acknowledgement. You keep quiet as she contiues. 
                </p>
                <p class="type-secondary type--quotations--small">
                      "Now, I will speak. You will listen." 
                </p>
              </template>

              <template #decision--1><div @click="showCabinExplainerModule(true)" class="module--decision--type type--uppercase--small">Agree to listen</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>

          <ContentModal
            v-if="CabinExplainerModule"
            key="CabinExplainerModule"
            title="the cabin"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The old woman begins to speak, pacing in front of the fire as she holds out her gaunt hands to the warm fire.
                </p>
                <p class="type-secondary type--quotations--small">
                  "This land has been my home for centuries. Rachel's ancestors, too, lived here once — though they did not belong. 
                  In her lineage lives a rot that was thrust upon all who lived here. And now, Nocta is but a heap of decay and putrescence."
                </p>
                <p>
                  The woman turns back to you, her eyes cold and bitter as her lips move within a severe sneer of hatred. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "It cannot be amended. But it can be avenged. Justice can be served. And you will help me."
                </p>
                <p>
                  Your eyes grow wide as she says this, the knife shifting as your grip tigethens around its hilt. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "The price I have paid to live to see my vengence wrought is silence. I cannot speak the truth to you."
                </p>
                <p>
                  The woman points a waivering finger at you, the yellowed-nail as sharp and long as a talon. You swallow hard, an anxious twist gnawing mercilessly at your stomach. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "But, if you speak the truth before Rachel's corpse, you will live. And I will be free."
                </p>
                <p>
                  Her finger falls away, but — far worse — she begins to approach you, and your feet began drifting backwards until your back is square against the wall.  
                </p>
                <p class="type-secondary type--quotations--small">
                  "If you do not, I shall lead another down the path you followed and they will tell it true in your stead."
                </p>
                <p>
                  Your head spins as the woman's sharp scent fills your lungs. You realize it was she who led you both here, who had been instructing you to find all the pieces 
                  lying around the town. Every cell in your body is screaming not to trust the old woman's word, but what choice do you have?  
                </p>
              </template>

              <template #decision--1><div @click="showCabinLakeModule(true)" class="module--decision--type type--uppercase--small">Nod in agreement</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
          
          
          <ContentModal
            v-if="CabinLakeModule"
            key="CabinLakeModule"
            title="the cabin"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The woman bares her teeth in a sinister grimance you think was meant to be a smile, but it brings no comfort, rendering your skin shivering with terror.
                </p>
                <p class="type-secondary type--quotations--small">
                  "Good. Now, tell me of the Lake. What is its truth?"
                </p>
                <p>
                  The woman turns back to you, her eyes cold and bitter as her lips move within a severe sneer of hatred. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "It cannot be amended. But it can be avenged. Justice can be served. And you will help me."
                </p>
                <p>
                  Your eyes grow wide as she says this, the knife shifting as your grip tigethens around its hilt. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "The price I have paid to live to see my vengence wrought is silence. I cannot speak the truth to you."
                </p>
                <p>
                  The woman points a waivering finger at you, the yellowed-nail as sharp and long as a talon. You swallow hard, an anxious twist gnawing mercilessly at your stomach. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "But, if you speak the truth before Rachel's corpse, you will live. And I will be free."
                </p>
                <p>
                  Her finger falls away, but — far worse — she begins to approach you, and your feet began drifting backwards until your back is square against the wall.  
                </p>
                <p class="type-secondary type--quotations--small">
                  "If you do not, I shall lead another down the path you followed and they will tell it true in your stead."
                </p>
                <p>
                  Your head spins as the woman's sharp scent fills your lungs. You realize it was she who led you both here, who had been instructing you to find all the pieces 
                  lying around the town. Every cell in your body is screaming not to trust the old woman's word, but what choice do you have?  
                </p>
              </template>

              <template #decision--1><div @click="showCabinIntroModule(true)" class="module--decision--type type--uppercase--small">Nod in agreement</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>

 
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
          <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/woods.png"></image>
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
            <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/woods.png" opacity="0"></image>
            
            <!-- path -->

            <rect x="2700" y="0" fill="#ff33aa" opacity="0" width="800" height="2040" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showPathModule" v-if="!haveGotSeenUnlockedChest"> 
            </rect>      
            
            <rect x="4015" y="1200" fill="#ff33aa" opacity="0" width="200" height="200" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showPathModuleUnlocked"> 
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
    haveGotSeenUnlockedChest: { 
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
      PathUnlockedModule: false,
      PathCabinModule: false,
      CabinIntroModule: false,
      CabinLakeModule: false,

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
      showPathModuleUnlocked() {
        this.PathUnlockedModule = true;
        this.PathModule = false;
        this.moduleOn = true;
      },      
      showPathCabinModule() {
        this.PathCabinModule = true;
        this.CabinIntroModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showCabinIntroModule() {
        this.CabinIntroModule = true;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showCabinExplainerModule() {
        this.CabinExplainerModule = true;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showCabinLakeModule() {
        this.CabinLakeModule = true;
        this.CabinExplainerModule = false;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      hideModule() { 
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = false;
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