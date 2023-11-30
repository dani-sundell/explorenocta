<!-- 

  ON THIS PAGE:`
  - 🛶 'boat'
  - 🐟 'fish'
  - 🛟 'buoy'
  - 🦶 'footprints'

  TO DO:
  - Emit journal entries
  - Pull in Town checks
  - Emit 'haveKeyItemKnife' from Lighthouse

  KEY:
  - 🟡 Funtional, ready for content
  - 🛑 Needs Emit logic
  - 🎧 Needs sound
  - 👁️ Content in, look over for editing
  - 🚧 Not functional, no content

 -->

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

        <!-- 🛶 Boat Locked 👁️ -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="boatModule"
            key="boatModule"
            title="old boat"
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
                <p v-if="!gotWordsForLara">
                  Near the shore, a small boat rocks in the shallows. It looks 
                  far less decrepit than much of the rest of the area. It might 
                  even be able to run, but in order to start the motor it looks 
                  like you'll need a key.
                </p>
                <p v-if="gotWordsForLara">
                  The working boat lies right where you left it, rocking steadily 
                  in the shallows of the lake. You're anything but eager to become 
                  further acquainted with the dark shape that chased you back to 
                  shore not long ago, so you leave the boat alone for now.
                </p>
              </template>

              <template #decision--1 v-if="checkedHaveBoatKey && !gotWordsForLara"><div @click="showBoatModuleUsedKey()" class="module--decision--type type--uppercase--small">Insert the boat key</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🛶 Boat Unlocked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="boatModuleUsedKey"
            key="boatModuleUsedKey"
            title="old boat"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  You're almost surprised when the boat hums to life with a sputter 
                  of dusty algae and exhaust. The motor turns with the ache of age, 
                  but otherwise seems to function well-enough to carry you out into 
                  the dark waters of the empty lake.
                </p>
                <p v-if="!haveGotSeenSpyglass">
                  You consider taking the boat out to that mysterious object floating 
                  in the center, but as your eyes drink in the blackened surface a chill 
                  crawls over your skin. Who knows what's waiting for you out in the middle 
                  of the strange lake? Maybe you ought to find a way to get a better look 
                  before you venture out into its depths.
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1 v-if="haveGotSeenSpyglass"><div @click="showBoatModuleOnLake()" class="module--decision--type type--uppercase--small">take the boat out to the lake</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🛶 Boat On Lake 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="boatModuleOnLake"
            key="boatModuleOnLake"
            title="On the lake"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The boat purrs as the lake laps under its alluminum shell. 
                  A thin fog begins to swirl over the obsidian surface as you 
                  venture into unknowingly deep waters. 
                </p>
                <p>
                  You reach the lone buoy rocking along with the lake waves. 
                  But there's something strange about this buoy. You realize 
                  it's not a nautical device but a monolith — a memorial for 
                  someone. There's a perfectly oxidized brass plaque mounted 
                  to the steel floatation, but the words are obscured by a bed 
                  of slimy green algae.
                </p>
              </template>

              <template #decision--1><div @click="showBoatModuleReadBuoy()" class="module--decision--type type--uppercase--small">wipe the algae away</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🛶 Boat Read Plaque 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="boatModuleReadBuoy"
            key="boatModuleReadBuoy"
            title="On the lake"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  You pull the boat into the floating structure and wipe away 
                  the algae from the greenish plaque. Your lips twist with a frown
                  of digust as you wipe the slime from your skin and attempt to read 
                  the plaque. The aged bronze reads: 
                </p>
                <div class="long--response--container">
                    <div class="long--response">
                      "In loving rememberence of the Lake's Lady. May your eyes find 
                      the shore even in the endless night. May you answer when I call."
                    </div>
                  </div>
                <p>
                  Your brows crease as you read the plaque, attempting to unravel what it 
                  means and why you were seemingly instructed to find it. For a moment, you're 
                  lost in your own mind, letting the gentle sway of the rythmic lake carry your 
                  train of thought along a winding path of inquiry. You realize that there's 
                  something almost relaxing about the quiet waters, and you begin to understand 
                  why this 'Lady' — whoever she may be — must have had a fondness for the lake. For a 
                  strange instant, you feel the most at ease since you woke up this morning.
                </p>
                <p>
                  Your comfort siezes with a screeching halt as your vessel is violently rocked 
                  by a shove from below. Your heartbeat begins to pulse with rapid panic as you exclaim
                  an explitive to the empty lake. Your hands shake as you reach back for the motor. You 
                  make a freenzied attempt to rev the motor as you catch a glimpse of a shimmering dark
                  object bobbing up to the surface mere meters away, and — what's worse — the object is moving 
                  distinctly in your direction. 
                </p>
              </template>

              <template #decision--1></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">Pilot the boat to the shore</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>
          
        <!-- Module child: footprints -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="footprintsModule"
            key="footprintsModule"
            title="footprints"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg=" https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                There's a trail of footprints in the sand here, you notice. 
                Peering longer at the prints, you can see the shoes are simple 
                soles, with only a short heel and no distinctive markings. These 
                don't look anything like the hiking boots your friend was wearing. 
                Who could they belong to? The trail wanders into the nearby woods.
              </template>

              <template #decision--1></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🛟 Buoy 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="buoyModule"
            key="buoyModule"
            title="lake structure"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p v-if="!haveGotSeenSpyglass">
                  There is a lone strcuture rocking in the distance. There's something 
                  strange about it that catches your eye, but you can't quite make 
                  it out. You'll need to get a closer look to see exactly what it is.
                </p>
                <p v-if="haveGotSeenSpyglass">
                  That's the structure you saw in spyglass from the top of the lighthouse. 
                  For some reason, someone wants you to venture out to it.
                </p>
              </template>

              <template #decision--1><div @click="showbuoyModuleUnlocked(true)" class="module--decision--type type--uppercase--small">inspect inside the house</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🐟 fish 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="fishModule"
            key="fishModule"
            title="Barrel of rotten fish"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p v-if="!haveHarbormasterKey">
                  There's a few barrels scattered about the shoreline — by the putrid 
                  smell wafting out of them, you gather they were used by fishermen. One 
                  of the buckets is still full of slimy, rancid black fish. Their scales 
                  shimmer with moisture and even dead you can admire the way their obsidian 
                  skin glows with technicolor iridescence that must be even more vibrant when 
                  they're living. Besides the sour smell, there isn't much of note about the
                  barrel of fish. Just when you're about to move on, however, you notice something
                  lodged in one of the fish's mouths.
                </p>
                <p v-if="haveHarbormasterKey">
                  These smelly fish are still here. Doesn't seem like there's much else 
                  of interest here now that you've found the key.
                </p>
              </template>

              <template #decision--1 v-if="!haveHarbormasterKey"><div @click="showFishModuleLocked()" class="module--decision--type type--uppercase--small">Reach inside its mouth</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>    
        
        <!-- 🐟 fish locked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="fishModuleLocked"
            key="fishModuleLocked"
            title="Barrel of rotten fish"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  With a grimace, you take hold of the slimy creature and wedge your finger into 
                  its slack mouth. The fish threatens to slip from your grip as you try to seize 
                  the item for a few minutes without success. You only manage to push it deeper 
                  into the fish's gullet, however. It seems you'll need something else to get 
                  the object out.
                </p>
                <p v-if="haveGotKeyItemKnife">
                  You remember that you picked up a knife at the lighthouse. Maybe that could be of use.
                </p>
              </template>

              <template #decision--1 v-if="haveGotKeyItemKnife"><div @click="showFishModuleUsedKnife()" class="module--decision--type type--uppercase--small">Use the knife</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>  

        <!-- 🐟 fish used knife 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="fishModuleUsedKnife"
            key="fishModuleUsedKnife"
            title="Barrel of rotten fish"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  You hold your breath as you swipe the knife through the fish's 
                  soft belly, its rancid guts oozing onto your hand in cold, congealed 
                  clumps of sickly gray viscera. You wince, and a gag tickles your throat 
                  as you feel something cold and heavy fall out of the fish into your palm. 
                  It seems a key was shoved into the fish's soft gullet. The creature's sharp, 
                  putrid smell wafts mercilessly into your nostrils, and you quickly toss 
                  the carcass into the sand and rush to the respite of the water to wash 
                  your find clean of the decay. 
                </p>
              </template>

              <template #decision--1></template>

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
        viewBox="0 0 5082 2250" 
        v-show="lighthouseNoFade" 
        key="lighthouseNoFade">
          <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/lake.png"></image>
        </svg>
        </transition>

        <transition name="story" mode="out-in">
        <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="100%" 
        viewBox="0 0 5082 2250" 
        v-show="lighthouseFade" 
        key="lighthouseFade">
          <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/lake.png"></image>
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
            <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/lake.png" opacity="0"></image>
            
            <!-- boat -->

            <rect x="2980" y="1710" fill="#eeff44" opacity="0" width="1470" height="470" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showBoatModule"> 
            </rect>

            <!-- buoy -->

            <rect x="3870" y="1130" fill="#eeff44" opacity="0" width="170" height="170"
            @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showBuoyModule"> 
            </rect>

            <!-- footprints -->

            <rect x="1300" y="1760" fill="#eeff44" opacity="0" width="220" height="220" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showFootprintsModule"> 
            </rect>

            <!-- fish -->

            <rect x="2005" y="1400" fill="#eeff44" opacity="0" width="450" height="365" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showFishModule"> 
            </rect>        

        </svg>

      </div>
    </div>
  </main>
</template>

<script>


export default {
  props: {
    haveGotKeyItemKnife: { 
          type: Boolean
    },  /* 🤝 Dependency prop from App */
    haveGotSeenSpyglass: { 
      type: Boolean
    },  /* 🤝 Dependency prop from App */
    haveBoatKey: { 
      type: Boolean
    },  /* 🤝 Dependency prop from App */
    haveHarbormasterKey: { 
      type: Boolean
    },  /* 🤝 Dependency prop from App */
    haveSeenBoat: { 
      type: Boolean
    },  /* 🤝 Dependency prop from App */
    haveSeenBouy: { 
      type: Boolean
    },  /* 🤝 Dependency prop from App */
    haveSeenFish: { 
      type: Boolean
    },  /* 🤝 Dependency prop from App */
  },
  components: {
    PuzzleScript
  },
  data() {
    return {
      // hover colors
      houseHover: false,
      headlightHover: false,
      noticeHover: false,
      // ghost fade 
      lighthouseFade: false,
      lighthouseNoFade: true,

      /* Modules */
      
      // 🛶 boat modules
      boatModule: false,
      boatModuleUsedKey: false,
      boatModuleOnLake: false,
      boatModuleReadBuoy: false,
      
      // 🛟 buoy module
      buoyModule: false,
      
      // 🦶 footprints module
      footprintsModule: false,
      
      // 🐟 fish module
      fishModule: false,
      fishModuleLocked: false,
      fishModuleUsedKnife: false,

      // hover control
      hover: false,
      cursorActive: false,
      moduleOn: false,

      /* Key items */
    
      gotHarbormasterKey: false, /* ✅ Emitted to journal & Props */
      gotWordsForLara: false, /* ✅ Emitted to journal & routed to the Town */
      gotSeenBoat: false, /* ✅ Emitted to journal & Props */
      gotSeenBouy: false, /* ✅ Emitted to journal & Props */
      gotSeenFish: false, /* ✅ Emitted to journal & Props */

      /* 🤝 INCOMING dependencies checks */

      checkedHaveBoatKey: false, /* 🤝 Dependency final step for v-if */

    }
  },
    computed: {
      message() {
        if (this.$route.meta.slogan === "yes") {
          console.log('yes slogan');
          return this.hover === true ? "WHEN ALL ELSE ENDS, THE NIGHT REMAINS" : "Cum cetera finiuntur, nox manet";
        } else {
          console.log('no slogan');
          return this.item.locationName;
        }
      },
    },
  methods: {
      showFootprintsModule() {
        this.footprintsModule = true;
        this.moduleOn = true;
      },
      showFishModule() {
        this.fishModule = true;
        this.fishModuleLocked = false;
        this.fishModuleUsedKnife = false;
        this.moduleOn = true;
        this.checkHaveHarbormasterKey();
      },
      showFishModuleLocked() {
        this.fishModule = false;
        this.fishModuleLocked = true;
        this.fishModuleUsedKnife = false;
        this.moduleOn = true;
        this.gotSeenFish = true;
        this.$emit('visited-fish');
      },
      showFishModuleUsedKnife() {
        this.fishModule = false;
        this.fishModuleLocked = false;
        this.fishModuleUsedKnife = true;
        this.gotHarbormasterKey = true;
        this.$emit('got-harbormaster-key');
        this.moduleOn = true;
      },
      showBoatModule() {
        this.boatModule = true;
        this.moduleOn = true;
        this.checkHaveBoatKey();
        this.gotSeenBoat = true;
        this.$emit('got-seen-boat');
      },
      showBoatModuleUsedKey() {
        this.boatModule = false;
        this.boatModuleUsedKey = true;
        this.moduleOn = true;
      },
      showBoatModuleOnLake() {
        this.boatModule = false;
        this.boatModuleUsedKey = false;
        this.boatModuleOnLake = true;
        this.moduleOn = true;
      },
      showBoatModuleReadBuoy() {
        this.boatModule = false;
        this.boatModuleUsedKey = false;
        this.boatModuleOnLake = false;
        this.boatModuleReadBuoy = true;
        this.gotWordsForLara = true; 
        this.$emit('got-words-for-lara'); /* Sends info to App that words were got */
        this.moduleOn = true;
      },
      showBuoyModule() {
        this.buoyModule = true;
        this.moduleOn = true;
        this.gotSeenBouy = true;
        this.$emit('got-seen-bouy');
      },
      hideModule() {
        this.boatModule = false;
        this.boatModuleUsedKey = false;
        this.boatModuleOnLake = false;
        this.boatModuleReadBuoy = false;
        this.footprintsModule = false;
        this.buoyModule = false;
        this.fishModule = false;
        this.fishModuleLocked = false;
        this.fishModuleUsedKnife = false;
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

      /* 🤝 INCOMING Dependencies check */
    
      checkHaveBoatKey(){
        console.log(this.haveBoatKey, 'have boat key?')
        if(this.haveBoatKey == true) {
          this.checkedHaveBoatKey = true
        } else {
          this.checkedHaveBoatKey = false
        }
        console.log(this.checkedHaveBoatKey, 'checked boat key?')
      },
      checkHaveHarbormasterKey(){
        // console.log(this.gotHarbormasterKey, 'Internal check')
        // console.log(this.haveHarbormasterKey, 'External check')
        if(this.haveHarbormasterKey == true) {
          this.gotHarbormasterKey = true
        }
      },
      checkHaveSeenBoat(){
        if(this.haveSeenBoat == true) {
          this.gotSeenBoat = true
        }
      },
      checkHaveSeenBouy(){
        if(this.haveSeenBouy == true) {
          this.gotSeenBouy = true
        }
      },
      checkHaveSeenFish(){
        if(this.haveSeenFish == true) {
          this.gotSeenFish = true
        }
      },
    },
    beforeMount(){
    this.checkHaveSeenBoat(); 
    this.checkHaveSeenBouy(); 
    this.checkHaveSeenFish(); 
  }
};
</script>