<!-- Journal notification sound credits: https://freesound.org/people/flcellogrl/sounds/195284/ -->
<!-- 
  KEY:
  - 🟡 Funtional, ready for content
  - 🛑 Needs Emit logic
  - 🎧 Needs sound
  - 👁️ Content in, look over for editing
  - 🚧 Not functional, no content
  - 🤝 Dependency check
  - 👋 Edits needed
  - 🤖 QA setting, Change for build

  TO-DOs:
  ☑️ Write splash page intro
  ☑️ Write all Journal entries

  ⬛️ Implement content for Woods
      ⬛️ Unlocked woods
      ⬛️ Cabin intro
      ⬛️ Witch intro
      ⬛️ Witch quiz (x4 questions)
      ⬛️ End scene
  ⬛️ Finish Woods JS chain
  
  ⬛️ Fix mobile cpastone 
  ⬛️ add contact info to credits

  
  ☑️ Fix anchor divider illio
  ☑️ Revisie lake illustration
      ☑️ Footprints and bouy on Lake
  ☑️ Revisie town illustration
      ☑️ Newspaper on Town
  ☑️ Revisie woods illustration
  ☑️ Upload new illustrations
  ⬛️ Swap out MCAD hosted images

  ------------- completed -------------

    ☑️ Implement content for Town
      ☑️ Manor flr 2
      ☑️ Manor study
      ☑️ Manor study wall
      ☑️ Manor chest locked
      ☑️ Manor chest unlocked
      ☑️ letters (x2)
      ☑️ map (need a plot reason for this)
      ☑️ Graves
  ☑️ Finish Town JS chain
  

  ☑️ Revise Splash page
      ☑️ Main page 
      ☑️ Links
      ☑️ Disclaimer Page
      ☑️ Intro Page
      ☑️ Add button sound effects
      ☑️ Music
  ☑️ Add Credits Page
  ☑️ Implement content for remaining Lighthouse chain
  ☑️ Implement content for Lake
  ☑️ Migrate to W3 hosting


  JOURNAL TO-DOs:
  ⬛️ Add mute journal button
  ☑️ Journal entries from all areas (Add to new journal CSS)
  ☑️ Journal entry completed CSS
  ☑️ Make sure journal notifs only fire once (working example on sendSeenBoatTrigger)
  ☑️ Assign a dot location to each journal entry trigger (done for sendSeenBoatTrigger)

 
  LOWER PRIORITY TO-DOs:
  ☑️ Add graveyard interaction (div in module with flexbox and grave icons for each that pop open a v-if)
  ☑️ Adjust Lara interaction to Puzzle script
  ⬛️ Add new sounds
  ⬛️ New illustration for the gallery wall (I don't have time to add this but it would be cool)
  ☑️ Adjust illustrations
    ☑️ Golden color on Lighthouse

 
    REMINDERS:
      PROPS:
      - Something happens on child page ➡️ `$emit(got-milk)` 
      - Add that emit to 'router view' with a function name that fires when that thing happens on the other page 
        EX:
          @got-milk="sendMilkEmit"
      - if that info needs to go to another child page:
        -- Add new variable "sendMilk = false"
        -- Add that variable to the function in step 2, set to true
          EX:
            sendMilkEmit(){
              this.sendMilk = true
            }

        -- Add a new prop to component & send the variable to that prop
          EX:
          :have-milk = "`${sendMilk}`" 

        -- Add prop to child page 
          EX:
            haveMilk: Boolean

 -->

<script setup>
import { RouterLink, RouterView } from "vue-router"
import { useRoute } from 'vue-router'
import PuzzleScript from "@/components/PuzzleScript.vue"
import ContentModal from '@/components/ContentModal.vue'
import ContentModalX from '@/components/ContentModalX.vue'
</script>

<template>
      <div style="height: 100%; overflow: hidden;">
        
        <nav class="lighthouse--demo--container" :class="{ transparentObject : hideUI }">
        <div class="lighthouse--demo--logo">
          <RouterLink to="/"><img src="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/icon-compass.png" alt="compass icon"></RouterLink>
        </div>
        <div class="lighthouse--demo--right">
          <transition name="label" mode="out-in"><span v-if="newJournalNotif" class="lighthouse--demo--bold quote span-gold">New Journal entry</span></transition>
        </div>
        <div><!-- placeholder for flexbox don't remove--></div>
        </nav>

        <transition name="label" mode="out-in">
            <div class="journal--overlay" v-if="journalOn" style="backdrop-filter: blur(10px);"></div>
          </transition>
        
          <transition name="label" mode="out-in">
              <div class="journal--container" v-if="journalOn" :class="{ inactiveCursor: !cursorActive, activeCursor: cursorActive }">
                <div class="journal--wip" v-if="journalOn"> 
                  
                  <div class="journal--content" key="journal">
                    <div class="journal--headline">
                        <h2 class="module--headline type-primary">JournaL</h2>
                    </div>
                    <div class="module--line"></div>
                    <div class="journal--location-content" v-if="journalShowLocations">
                      <div class="journal--location--titles">
                        <div @click="journalLocationTrigger(journalTown)"
                            @mouseover="handleCursorHover(true)" 
                            @mouseleave="handleCursorHover(false)"
                            :class="{ activeLocation: journalTitleActiveTown, inactiveLocation: !journalTitleActiveTown }"
                            class="demo--body-bold quote span-gold journal--section--flexbox">
                            <div class="journal--notif--icon" v-if="journalNotifDotTown"></div>
                            <div>The Town</div>
                          </div>
                            
                        <div @click="journalLocationTrigger(journalLighthouse)"
                            @mouseover="handleCursorHover(true)" 
                            @mouseleave="handleCursorHover(false)"
                            :class="{ activeLocation: journalTitleActiveLighthouse, inactiveLocation: !journalTitleActiveLighthouse }"
                            class="demo--body-bold quote span-gold journal--section--flexbox">
                            <div class="journal--notif--icon" v-if="journalNotifDotLighthouse"></div>
                            <div>The Lighthouse</div>
                          </div>
                            
                        <div @click="journalLocationTrigger(journalLake)" 
                            @mouseover="handleCursorHover(true)" 
                            @mouseleave="handleCursorHover(false)"
                            :class="{ activeLocation: journalTitleActiveLake, inactiveLocation: !journalTitleActiveLake }"
                            class="demo--body-bold quote span-gold journal--section--flexbox">
                            <div class="journal--notif--icon" v-if="journalNotifDotLake"></div>
                            <div>The Lake</div>
                          </div>
                            
                        <div @click="journalLocationTrigger(journalWoods)" 
                            @mouseover="handleCursorHover(true)" 
                            @mouseleave="handleCursorHover(false)"
                            :class="{ activeLocation: journalTitleActiveWoods, inactiveLocation: !journalTitleActiveWoods }"  
                            class="demo--body-bold quote span-gold journal--section--flexbox">
                            <div class="journal--notif--icon" v-if="journalNotifDotWoods"></div>
                            <div>The Woods</div>
                          </div>
                      </div>

                      <!-- 🏘️ Town entries go here ⬇️ 🟡 -->
                      
                      <div class="journal--location--entries"
                            v-show="journalLocationTown"
                            key="TownKey">

                            <div class="journal--entry" v-if="journalEntryGraveyard" :class="{ strikethrough: journalEntryKeyItemChestKey }">
                              <p class="journal--entry--title">
                                The Graveyard
                              </p>
                              <p class="journal--entry--body" v-if="journalEntryKeyItemChestKey">
                                You used the dagger on Lucien's grave and discovered a key hidden within.
                              </p>
                              <p class="journal--entry--body">
                                You searched the graveyard and found Lucien Duguay's headstone. There was an interesting indent carved into the stone. 
                              </p>
                            </div>

                            <div class="journal--entry" v-if="sendVisitedStudy" :class="{ strikethrough: journalEntryUnlockedChest }">
                              <p class="journal--entry--title">
                                The Study
                              </p>
                              
                              <p class="journal--entry--body" v-if="journalEntryUnlockedChest">
                                You unlocked the chest and discovered a stash of old letters all addressed to a "Mr. Duguay". The letters mentioned marks in the woods you could follow to a "Ms. Falker's" house.
                              </p>
                              <p class="journal--entry--body" v-if="journalEntryLockedChest">
                                You discovered a locked chest behind a painting. Now you'll need to get it open.
                              </p>
                              <p class="journal--entry--body" v-if="sendVisitedStudy">
                                You found someone's old study. What could be hiding here? 
                              </p>
                            </div>
                            
                            <div class="journal--entry" v-if="sendVisitedBedroom" :class="{ strikethrough: journalEntryKeyItemDagger }">
                              <p class="journal--entry--title">
                                The Bedroom
                              </p>
                              
                              <p class="journal--entry--body" v-if="journalEntryKeyItemDagger" >
                                Lara <i>graciously</i> gave you the dagger in her chest upon your request.
                              </p>
                              <p class="journal--entry--body" v-if="journalEntryLaraPaintingHint">
                                You met Lara in the bedroom. She had little to say but a few mumbled lines about "the water".
                              </p>
                              <p class="journal--entry--body">
                                You unlocked the bedroom. You should try to find something useful inside. 
                              </p>
                            </div>
                            
                            <div class="journal--entry" v-if="sendVisitedDiningRoom" :class="{ strikethrough: journalEntryBedroomKey }">
                              <p class="journal--entry--title">
                                The Manor: First Floor
                              </p>
                              <p class="journal--entry--body" v-if="journalEntryBedroomKey">
                                Just as the memo said, you found a key in the greenhouse.
                              </p>
                              <p class="journal--entry--body">
                                You saw a memo from the housekeeper in the dining room about keys for the "Lady's chambers".
                              </p>
                            </div>

                            <div class="journal--entry" v-if="journalEntrySeenHarbormasterShed" :class="{ strikethrough: journalEntryBoatKey }">
                              <p class="journal--entry--title">
                                  The docks
                                </p>
                              <p class="journal--entry--body" v-if="journalEntryBoatKey">
                                  You opened the harbormaster shed and retrieved a key. You wonder what it goes to.
                                </p>
                              <p class="journal--entry--body">
                                  There was a locked harbormaster shed with a key on the wall. You should try to get inside. 
                                </p>
                              <p class="journal--entry--body" v-if="journalEntrySeenFishStatue">
                                  A statue on the docks depicted a cherished local fauna: The Night Salmon
                              </p>
                            </div>

                      </div>

                       <!-- 💡 Lighthouse entries go here ⬇️ 🟡 -->

                      <div class="journal--location--entries"
                            v-show="journalLocationLighthouse"
                            key="LighthouseKey">
                        
                        <div class="journal--entry" v-if="journalEntryLighthouse" :class="{ strikethrough: journalEntryKraver }">
                          <p class="journal--entry--title">
                              the lighthouse
                          </p>
                          <p class="journal--entry--body" v-if="journalEntrySpyglass">
                              Looking through a spyglass at the top of the headlight, you saw something in the middle of the lake that someone wants you to visit.
                          </p>
                          <p class="journal--entry--body" v-if="journalEntryKraver">
                              The top of the lighthouse was inhabited by a hungry entity that wanted to know if you'd seen "her". 
                          </p>
                          <p class="journal--entry--body" v-if="journalEntryLighthouse">
                              The lighthouse door looks like it could open, if you knew the code to the four-letter padlock. 
                          </p>
                        </div>


                        <div class="journal--entry" v-if="journalEntryKeepersHouse" :class="{ strikethrough: journalEntryNewspaper && journalEntryJournal && journalEntryKnife }">
                          <p class="journal--entry--title">
                              The keeper's house
                          </p>
                          <p class="journal--entry--body" v-if="journalEntryNewspaper">
                              You found an old newspaper discussing shipwrecks in the lake, apparently orchestrated by something called "Nina".
                          </p>
                          <p class="journal--entry--body" v-if="journalEntryJournal">
                              You found a journal penned by the lighthouse keeper's apprentice.
                          </p>
                          <p class="journal--entry--body" v-if="journalEntryKnife">
                              You found a knife inside the old keeper's house. Could be useful to have.
                          </p>
                        </div>

                      </div>

                      <!-- 🌊 Lake entries go here ⬇️ 🟡 -->

                      <div class="journal--location--entries"
                            v-show="journalLocationLake"
                            key="LakeKey">

                            <!-- Fish Entry 🐟 -->

                            <div class="journal--entry" v-if="journalEntryFish" :class="{ strikethrough: journalEntryHarbormasterKey }">
                          <p class="journal--entry--title">
                              Black Fish
                            </p>
                            <p class="journal--entry--body" v-if="journalEntryHarbormasterKey">
                                With the help of your knife, you retrieved a key from inside the fish. Now to discover what the key unlocks.
                              </p>
                          <p class="journal--entry--body">
                              Among a barrel of rotten fish, you noticed a glint inside one of their mouths. There seems to be something stuck inside its gullet.
                            </p>
                        </div>

                        <!-- Boat Entry 🛶 -->

                        <div class="journal--entry" v-if="journalEntrySeenBoat" :class="{ strikethrough: journalEntryWordsForLara }">
                          <p class="journal--entry--title">
                              Old Boat
                            </p>
                          <p class="journal--entry--body" v-if="journalEntryWordsForLara">
                            You got the motor running and piloted the boat to the middle of the lake and found something lurking below the surface.
                            </p>
                          <p class="journal--entry--body">
                              You found an old boat on the lake that looks like it could still run, but you need a key to start the motor.
                            </p>
                        </div>

                        <!-- Buoy Entry 🛟 -->

                        <div class="journal--entry" v-if="journalEntrySeenBouy" :class="{ strikethrough: journalEntryWordsForLara }">
                          <p class="journal--entry--title">
                              Lake structure
                            </p>
                          <p class="journal--entry--body" v-if="journalEntryWordsForLara">
                              The lake structure was a memorial for someone called the "Lady of the Lake"
                            </p>
                          <p class="journal--entry--body" v-if="journalEntrySpyglass">
                              After peering through the spyglass, you believe this is the structure you need to get to.
                            </p>
                          <p class="journal--entry--body">
                            There's something strange floating on the water, but you can't see what it is from the shoreline.
                          </p>
                        </div>
                      </div>

                      <!-- 🌳 Woods entries go here ⬇️ -->
                      
                      <div class="journal--location--entries"
                            v-show="journalLocationWoods"
                            key="WoodsKey">
                        <div class="journal--entry" v-if="journalEntrySeenWoods">
                          <p class="journal--entry--title">
                              Dark Paths
                            </p>
                          <p class="journal--entry--body" v-if="journalEntryUnlockedChest">
                              Thanks to the letter you saw in the Manor, you can now follow the trail of symbols carved into the trees.
                            </p>
                          <p class="journal--entry--body">
                              You found the entrance to the woods, but you should know where you're going before you wander into them.
                            </p>
                        </div>
                      </div>
                    </div>

                    <!-- Main Objective, appear after user goes through intro ⬇️ -->

                    <div class="module--line" v-if="journalShowLocations"></div>
                    <div class="journal--main-objective">
                      <div class="demo--body-bold quote span-gold">Main Objective</div>
                        <p class="journal--entry--body">
                          Search your surroundings and find your friend
                        </p>
                    </div>
                  </div>
                </div>
              </div>
          </transition>

            <!-- 
              
              🤝 Dependencies COMING IN from pages! 
            
            -->

        <router-view v-slot="{ Component }"
        @toggle-wind-sounds="receiveWindSounds"
        @toggle-wind-sounds-off="killWindSounds"
        @toggle-wood-sounds="receiveWoodSounds"
        @toggle-wood-sounds-off="killWoodSounds"
        @send-splash-music="recieveSplashMusic"
        @send-button-strong="buttonSoundStrong"
        @send-button-weak="buttonSoundWeak"
        @get-chain-sound="receiveChainSound"
        @get-unlocked-sound="receiveUnlockedSound"
        @visited-fish="fishEmit"
        @got-seen-boat="sendSeenBoatTrigger"
        @got-seen-bouy="sendSeenBouyTrigger"
        @got-harbormaster-key="sendHarbormasterKeyTrigger"
        @got-words-for-lara="sendWordsForLaraTrigger"
        @got-seen-harbormaster-shed="sendGotSeenHarbormasterShedTrigger"
        @got-boat-key="sendBoatKeyTrigger"
        @got-bedroom-key="sendBedroomKeyTrigger"
        @got-key-item-dagger="sendKeyItemDaggerTrigger"
        @got-lara-painting-hint="sendGotLaraPaintingHintTrigger"
        @got-seen-gallery="sendGotSeenGalleryTrigger"
        @got-seen-graveyard="sendGotSeenGraveyardTrigger"
        @got-key-item-chest-key="sendGotKeyItemChestKeyTrigger"
        @got-seen-locked-chest="sendGotSeenLockedChestTrigger"
        @got-seen-unlocked-chest="sendGotSeenUnlockedChestTrigger"
        @got-seen-lighthouse="sendGotSeenLighthouseTrigger"
        @got-seen-keepers-house="sendGotSeenKeepersHouseTrigger"
        @got-seen-journal="sendGotSeenJournalTrigger"
        @got-seen-newspaper="sendGotSeenNewspaperTrigger"
        @got-seen-kraver="sendGotSeenKraverTrigger"
        @got-seen-spyglass="sendGotSeenSpyglassTrigger"
        @got-key-item-knife="sendGotKeyItemKnifeTrigger"
        @visited-dining-room="sendVisitedDiningRoomTrigger"
        @visited-study="sendVisitedStudyTrigger"
        @visited-bedroom="sendVisitedBedroomTrigger"
        @got-seen-woods="sendGotSeenWoodsTrigger"
        @hide-ui-on-splash="hideUiTrigger"
        >
          <transition name="fade" mode="out-in">

            <!-- 
              
              🤝 Dependencies SENDING OUT to pages! 
            
            -->
            
            <component 
              :is="Component" 
              :have-words-for-lara = "sendWordsForLara" 
              :have-harbormaster-key = "sendHarbormasterKey" 
              :have-seen-boat = "sendSeenBoat" 
              :have-seen-bouy = "sendSeenBouy" 
              :have-seen-fish = "sendSeenFish" 
              :have-boat-key = "sendBoatKey" 
              :have-got-seen-harbormaster-shed = "sendGotSeenHarbormasterShed" 
              :have-got-seen-fish-statue = "sendGotSeenFishStatue" 
              :have-bedroom-key = "sendBedroomKey" 
              :have-key-item-dagger = "sendKeyItemDagger" 
              :have-got-lara-painting-hint = "sendGotLaraPaintingHint" 
              :have-got-seen-gallery = "sendGotSeenGallery" 
              :have-visited-dining-room = "sendVisitedDiningRoom" 
              :have-visited-study = "sendVisitedStudy" 
              :have-visited-bedroom = "sendVisitedBedroom" 
              :have-got-seen-graveyard = "sendGotSeenGraveyard" 
              :have-got-key-item-chest-key = "sendGotKeyItemChestKey" 
              :have-got-seen-locked-chest = "sendGotSeenLockedChest" 
              :have-got-seen-unlocked-chest = "sendGotSeenUnlockedChest" 
              :have-got-seen-lighthouse = "sendGotSeenLighthouse" 
              :have-got-seen-keepers-house = "sendGotSeenKeepersHouse" 
              :have-got-seen-journal = "sendGotSeenJournal" 
              :have-got-seen-newspaper = "sendGotSeenNewspaper" 
              :have-got-seen-kraver = "sendGotSeenKraver" 
              :have-got-seen-spyglass = "sendGotSeenSpyglass" 
              :have-got-key-item-knife = "sendGotKeyItemKnife" 
              :have-got-seen-woods = "sendGotSeenWoods" 
              :have-seen-spyglass = "`${testingString}`" 
              :have-key-item-knife = "`${testingString}`"
              :send-testing-route-refresh = "testingRouteRefreshData" 
              />
            
              <!-- 👋 Edit this ⬆️ -->
          </transition>

        </router-view>
        
        <div class="nav--button--container">
          <div class="journal--button" @click="toggleJournal()" :class="{ transparentObject : hideUI }">
            <img src="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/icon-journal.png">
          </div>
        </div>

        <div class="nav--button--container">
          <div class="audio--button" @click="audioToggle">
            <img v-show="soundOn" key="on" src="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/icon-sound-on.png" alt="sound on">
            <img v-show="soundOff" key="off" src="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/icon-sound-off.png" alt="sound off">
          </div>
        </div>
      
      </div>
</template>

<style>
@import "@/assets/main.css";
/* router transition styles */
.fade-enter-active,
.fade-leave-active {
  transition-duration: .75s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.checker-enter-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(1,-0.55,.67,.3);
}
.checker-leave-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.checker-enter-from,
.checker-leave-to {
  opacity: 0;
}

.story-enter-active,
.story-leave-active {
  transition-duration: .75s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.story-enter-from,
.story-leave-to {
  opacity: 0;
}

.label-enter-active,
.label-leave-active {
  transition-duration: .25s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.label-enter-from,
.label-leave-to {
  opacity: 0;
}
</style>

<script>
const lakeNoise = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/lake.wav');
lakeNoise.volume = .025;
lakeNoise.loop = true;

const introMusic = new Audio('https://dani-sundell.github.io/explore-nocta/assets/intro.mp3');
introMusic.volume = .25;
introMusic.loop = true;

const noctaMusic = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/anthem.mp3');
noctaMusic.volume = 1;
noctaMusic.loop = true;

const noctaWind = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/wind.wav');
noctaWind.volume = 0;
noctaWind.loop = true;

const noctaGhost = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/ghost.mp3');
noctaGhost.volume = .05;
noctaGhost.loop = false;

const noctaNotif = new Audio('https://dani-sundell.github.io/explore-nocta/assets/g2.mp3');
noctaNotif.volume = .35;
noctaNotif.loop = false;

const noctaNoteG = new Audio('https://dani-sundell.github.io/explore-nocta/assets/g0.mp3');
noctaNoteG.volume = .35;
noctaNoteG.loop = false;

const noctaNoteE = new Audio('https://dani-sundell.github.io/explore-nocta/assets/e0.mp3');
noctaNoteE.volume = .35;
noctaNoteE.loop = false;

const lighthouseWind = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/wind-whistle.mp3');
lighthouseWind.volume = .5;
lighthouseWind.loop = false;

const lighthouseWood = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/wood-creak.mp3');
lighthouseWood.volume = .2;
lighthouseWood.loop = false;

const lighthouseChain = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/chain.mp3');
lighthouseChain.volume = .75;
lighthouseChain.loop = false;

const lighthouseUnlocked = new Audio('https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/unlocked.mp3');
lighthouseUnlocked.volume = .75;
lighthouseUnlocked.loop = false;

export default {
  setup() {

  },
  data() {
    return {
      audio: false,
      soundOn: false,
      soundOff: true,
      playGhost: false,
      puzzleExists: false,
      cursorInactive: false,
      timeData: '',
      timeArray: '',
      timer: '',
      playWindSounds: false,
      playWoodSounds: false,
      playSplashMusic: false,
      playerObjective: null,
      journalOn: false,
      journalOff: true,
      hover: false,
      cursorActive: false,
      newJournalNotif: false,
      hideUI: false,
      // Journal entries

      journalEntryFish: false,
      journalEntryHarbormasterKey: false,
      journalEntryKnife: false, 
      journalEntryLighthouse: false, 
      journalEntrySeenHarbormasterShed: false, 
      journalEntryKeepersHouse: false, 
      journalEntryJournal: false, 
      journalEntryNewspaper: false, 
      journalEntrySpyglass: false,
      journalEntryKraver: false,
      journalEntryBoatKey: false,
      journalEntryBedroomKey: false,
      journalEntryKeyItemDagger: false,
      journalEntryWordsForLara: false,
      journalEntryLaraPaintingHint: false,
      journalEntrySeenGallery: false,
      journalEntryGraveyard: false,
      journalEntryKeyItemChestKey: false,
      journalEntryLockedChest: false,
      journalEntryUnlockedChest: false,
      journalEntrySeenBoat: false,
      journalEntrySeenBouy: false,
      journalEntrySeenWoods: false,

      testingString: 'Testing', /* 👋 Edit this */
      testingRouteRefreshData: false,
      
      /* 🤝 Dependencies prop for Lighthouse 💡 */
      
      sendGotSeenKraver: false,
      sendGotSeenSpyglass: false,
      sendGotSeenLighthouse: false,
      sendGotSeenKeepersHouse: false,
      sendGotSeenJournal: false,
      sendGotSeenNewspaper: false,
      sendGotKeyItemKnife: false,
      
      /* 🤝 Dependencies prop for Town 🏘️ */
      
      sendWordsForLara: false, /* 🤝 Prop for Town */
      sendVisitedDiningRoom: false,
      sendVisitedStudy: false,
      sendVisitedBedroom: false,
      sendGotSeenHarbormasterShed: false,
      sendGotSeenFishStatue: false,
      sendBedroomKey: false,
      sendKeyItemDagger: false,
      sendGotLaraPaintingHint: false,
      sendGotSeenGallery: false,
      sendGotSeenGraveyard: false,
      sendGotKeyItemChestKey: false,
      sendGotSeenLockedChest: false,
      sendGotSeenUnlockedChest: false,
      
      /* 🤝 Dependencies prop for Lake 🌊 */
      
      sendSeenBoat: false,
      sendSeenBouy: false,
      sendBoatKey: false, 
      sendHarbormasterKey: false, 
      sendSeenFish: false, 
      
      /* 🤝 Dependencies prop for Woods 🌳 */

      sendGotSeenWoods: false,

      /* Journal functionality */

      journalShowLocations: true,

      journalLocationLake: false,
      journalLocationLighthouse: false,
      journalLocationWoods: false,
      journalLocationTown: true,
      
      journalTitleActiveLake: false,
      journalTitleActiveLighthouse: false,
      journalTitleActiveTown: true,
      journalTitleActiveWoods: false,
      
      journalLake: 'lake',
      journalLighthouse: 'lighthouse',
      journalTown: 'town',
      journalWoods: 'woods',

      journalNotifDotLake: false,
      journalNotifDotLighthouse: false,
      journalNotifDotTown: false,
      journalNotifDotWoods: false,
      

    }
  },
  methods: {
    /* Wind sound intervals ⬇️ */
    receiveWindSounds() {
      this.playWindSounds = true
      this.toggleWindSounds() 
    },
    randRange(data) {
       this.timeData = data[Math.floor(data.length * Math.random())];
       return this.timeData;
    },
    toggleWindSounds() {
      if (this.playWindSounds == true && this.soundOn == true){
      this.timeArray = new Array(50000, 36000, 15000, 25000, 20000, 30000, 46000, 19000);

      setTimeout(() => lighthouseWind.play(), 3000);

      clearInterval(this.timer);
      this.timer = setInterval(this.toggleWindSounds, this.randRange(this.timeArray));
      } else {
        lighthouseWind.pause();
      }
    },
    killWindSounds(){
      this.playWindSounds = false
    },
    /* Wind sound intervals ⬆️ */


    /* Wood sound intervals ⬇️ */
    receiveWoodSounds() {
      this.playWoodSounds = true
      this.toggleWoodSounds() 
    },
    randRange(data) {
       this.timeData = data[Math.floor(data.length * Math.random())];
       return this.timeData;
    },
    toggleWoodSounds() {
      if (this.playWoodSounds == true && this.soundOn == true){
      this.timeArray = new Array(52000, 42000, 37000, 23000, 21000, 33000, 47000, 26000);

      setTimeout(() => lighthouseWood.play(), 3000);
      console.log('wood check')

      clearInterval(this.timer);
      this.timer = setInterval(this.toggleWoodSounds, this.randRange(this.timeArray));
      } else {
        lighthouseWood.pause();
        console.log('wood kill')
      }
    },
    killWoodSounds(){
      this.playWoodSounds = false
    },
    /* Wood sound intervals ⬆️ */

    /* Chain sound intervals ⬇️ */
    receiveChainSound() {
      if(this.soundOn == true){
      lighthouseChain.play()
      }
    },

    receiveUnlockedSound() {
      if(this.soundOn == true){
      lighthouseUnlocked.play()
      }
    },
    /* Chain sound intervals ⬆️ */

    /* splash music */
    recieveSplashMusic(){
      this.playSplashMusic = true
    },
    /* splash music */
    
    /* button sound */
    buttonSoundStrong() {
      if(this.soundOn == true){
        noctaNoteE.play()
      }
    },
    buttonSoundWeak() {
      if(this.soundOn == true){
        noctaNoteG.play()
      }
    },
    /* button sound */
    
    audioToggle() {
            if (!this.audio && this.playSplashMusic) {
            this.soundOn = true
            this.soundOff = false
            this.audio = true
            introMusic.play()
            } else if (!this.audio) {
            this.soundOn = true
            this.soundOff = false
            this.audio = true
            introMusic.pause()
            noctaWind.play()
            lakeNoise.play()
            noctaMusic.play()
            } else {
              this.soundOff = true
              this.soundOn = false
              this.audio = false
              noctaWind.pause()
              lakeNoise.pause()
              noctaMusic.pause()
              noctaNotif.pause()
              introMusic.pause()
            }
          },
    ghost() {
            if (this.audio === true) {
              console.log('ghost sound check');
              noctaGhost.play()
            } else {
              // console.log('no sound ghost');
              noctaGhost.pause()
            }
          },
    notifSound() {
            if (this.audio === true) {
              console.log('notif sound check');
              noctaNotif.play()
            } else {
              // console.log('no sound ghost');
              noctaNotif.pause()
            }
          },
    puzzleExistsCheck() {
      if (this.$route.name === "lighthouse") {
        this.puzzleExists = true
        console.log('puzzle check yes')
      } else {
        this.puzzleExists = false
        console.log('puzzle check no')
      }
    },

    /* Key Items / Key Events */

    /* Events From Lake 🌊 */

    sendWordsForLaraTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendWordsForLara == false) {
        this.sendWordsForLara = true
        this.journalEntryWordsForLara = true
        this.journalNotifDotLake = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendSeenBoatTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendSeenBoat == false) {
      this.sendSeenBoat = true
      this.journalEntrySeenBoat = true
      this.journalNotifDotLake = true
      this.journalNotifDelay()
      } else {
        return
      }
    },
    sendSeenBouyTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendSeenBouy == false) {
      this.sendSeenBouy = true
      this.journalEntrySeenBouy = true
      this.journalNotifDotLake = true
      this.journalNotifDelay()
      } else {
        return
      }
    },
    sendHarbormasterKeyTrigger() {
      if (this.sendHarbormasterKey == false) {
        this.sendHarbormasterKey = true
        this.journalEntryHarbormasterKey = true
        this.journalNotifDotLake = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    fishEmit() {
      if (this.sendSeenFish == false) {
        this.sendSeenFish = true
        this.journalEntryFish = true
        this.journalNotifDotLake = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    
    /* Events from Town 🏘️ */
    
    sendGotSeenHarbormasterShedTrigger() {
      if (this.sendGotSeenHarbormasterShed == false) {
        this.sendGotSeenHarbormasterShed = true
        this.journalEntrySeenHarbormasterShed = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },

    sendGotSeenFishStatueTrigger() {
      if (this.sendGotSeenFishStatue == false) {
        this.sendGotSeenFishStatue = true
        this.journalEntrySeenFishStatue = true
      } else {
        return
      }
    },

    sendBoatKeyTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendBoatKey == false) {
        this.sendBoatKey = true
        this.journalEntryBoatKey = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendBedroomKeyTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendBedroomKey == false) {
        this.sendBedroomKey = true
        this.journalEntryBedroomKey = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendKeyItemDaggerTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendKeyItemDagger == false) {
        this.sendKeyItemDagger = true
        this.journalEntryKeyItemDagger = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotLaraPaintingHintTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotLaraPaintingHint == false) {
        this.sendGotLaraPaintingHint = true
        this.journalEntryLaraPaintingHint = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotSeenGalleryTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenGallery == false) {
        this.sendGotSeenGallery = true
        this.journalEntrySeenGallery = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotSeenGraveyardTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenGraveyard == false) {
        this.sendGotSeenGraveyard = true
        this.journalEntryGraveyard = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotKeyItemChestKeyTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotKeyItemChestKey == false) {
        this.sendGotKeyItemChestKey = true
        this.journalEntryKeyItemChestKey = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotSeenLockedChestTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenLockedChest == false) {
        this.sendGotSeenLockedChest = true;
        this.journalEntryLockedChest = true;
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotSeenUnlockedChestTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenUnlockedChest == false) {
        this.sendGotSeenUnlockedChest = true
        this.journalEntryUnlockedChest = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendVisitedDiningRoomTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendVisitedDiningRoom == false) {
        this.sendVisitedDiningRoom = true
        this.journalNotifDotTown = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendVisitedStudyTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendVisitedStudy == false) {
        this.sendVisitedStudy = true
      } else {
        return
      }
    },
    sendVisitedBedroomTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendVisitedBedroom == false) {
        this.sendVisitedBedroom = true
      } else {
        return
      }
    },

    /* Events From Lighthouse 💡 */

    sendGotSeenLighthouseTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenLighthouse == false) {
        this.sendGotSeenLighthouse = true
        this.journalEntryLighthouse = true
        this.journalNotifDotLighthouse = true
        this.journalNotifDelay()
      } else {
        return
      }
    },
    sendGotSeenKeepersHouseTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenKeepersHouse == false) {
        this.sendGotSeenKeepersHouse = true
        this.journalNotifKeeperGroup()
      } else {
        return
      }
    },
    sendGotSeenJournalTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenJournal == false) {
        this.sendGotSeenJournal = true
        this.journalNotifKeeperGroup()
      } else {
        return
      }
    },
    sendGotSeenNewspaperTrigger() { /* 🤝 Dependency - sets this variable in App to true */
      if (this.sendGotSeenNewspaper == false) {
        this.sendGotSeenNewspaper = true
        this.journalNotifKeeperGroup()
      } else {
        return
      }
    },
    sendGotKeyItemKnifeTrigger() {
      if (this.sendGotKeyItemKnife == false) {
        this.sendGotKeyItemKnife = true
        this.journalNotifKeeperGroup()
      } else {
        return
      }
    },
    journalNotifKeeperGroup() {
      if (
        this.sendGotKeyItemKnife == true && 
        this.sendGotSeenNewspaper == true &&
        this.sendGotSeenJournal == true
        ) {
          this.journalEntryKeepersHouse = true
          this.journalEntryJournal = true  
          this.journalEntryNewspaper = true
          this.journalEntryKnife = true
          this.journalNotifDotLighthouse = true
          this.journalNotifDelay()
        } else {
          return
        }
      },
      sendGotSeenKraverTrigger() { /* 🤝 Dependency - sets this variable in App to true */
        if (this.sendGotSeenKraver == false) {
          this.sendGotSeenKraver = true
          this.journalNotifLighthouseGroup()
        } else {
          return
        }
      },
      sendGotSeenSpyglassTrigger() { /* 🤝 Dependency - sets this variable in App to true */
        if (this.sendGotSeenSpyglass == false) {
          this.sendGotSeenSpyglass = true
          this.journalNotifLighthouseGroup()
        } else {
          return
        }
      },
      journalNotifLighthouseGroup() {
        if (
          this.sendGotSeenKraver == true && 
          this.sendGotSeenSpyglass == true
          ) {
            this.journalEntryKraver = true
            this.journalEntrySpyglass = true  
            this.journalNotifDotLighthouse = true
            this.journalNotifDelay()
          } else {
            return
          }
        },

        /* Events From Woods 🌳 */

      sendGotSeenWoodsTrigger() { /* 🤝 Dependency - sets this variable in App to true */
        if (this.sendGotSeenWoods == false) {
          this.sendGotSeenWoods = true
          this.journalEntrySeenWoods = true
          this.journalNotifDotWoods = true
          this.journalNotifDelay()
        } else {
          return
        }
      },
        
    /* Journal Functionality */

    toggleJournal() {
      console.log(this.sendWordsForLara, 'lara???')
      if (this.journalOn == false && this.journalOff == true) {
        this.journalOn = true
        this.journalOff = false
      } else if (this.journalOn == !false && this.journalOff == !true) {
        this.journalOn = !true
        this.journalOff = !false
      }
    },
    journalNotifOn() {
      this.newJournalNotif = true;
      this.notifSound() /* 👋 CHANGE THIS SOUND!!! */
    },
    journalNotifOff() {
      this.newJournalNotif = false;
    },
    journalNotifDelay() {
      this.journalNotifOn()
      setTimeout(() => this.journalNotifOff(), 5000)
    },
    journalLocationTrigger(location) {
      if (location == this.journalLake) {
        this.journalLocationTriggerLake()
      } else if (location == this.journalLighthouse) {
        this.journalLocationTriggerLighthouse()
      } else if (location == this.journalTown) {
        this.journalLocationTriggerTown()
      } else if (location == this.journalWoods) {
        this.journalLocationTriggerWoods()
      }
    },
    journalLocationTriggerLake() {
      this.journalLocationWoods = false
      this.journalTitleActiveWoods = false
      this.journalLocationTown = false
      this.journalTitleActiveTown = false
      this.journalLocationLighthouse = false
      this.journalTitleActiveLighthouse = false
      this.journalLocationLake = true
      this.journalTitleActiveLake = true
      this.journalNotifDotLake = false
      console.log('lake')
    },
    journalLocationTriggerLighthouse() {
      this.journalLocationLake = false
      this.journalTitleActiveLake = false
      this.journalLocationWoods = false
      this.journalTitleActiveWoods = false
      this.journalLocationTown = false
      this.journalTitleActiveTown = false
      this.journalLocationLighthouse = true
      this.journalTitleActiveLighthouse = true
      this.journalNotifDotLighthouse = false
      console.log('lighthouse')
    },
    journalLocationTriggerTown() {
      this.journalLocationLake = false
      this.journalTitleActiveLake = false
      this.journalLocationWoods = false
      this.journalTitleActiveWoods = false
      this.journalLocationLighthouse = false
      this.journalTitleActiveLighthouse = false
      this.journalLocationTown = true
      this.journalTitleActiveTown = true
      this.journalNotifDotTown = false
      console.log('town')
    },
    journalLocationTriggerWoods() {
      this.journalLocationTown = false
      this.journalTitleActiveTown = false
      this.journalLocationLake = false
      this.journalTitleActiveLake = false
      this.journalLocationLighthouse = false
      this.journalTitleActiveLighthouse = false
      this.journalLocationWoods = true
      this.journalTitleActiveWoods = true
      this.journalNotifDotWoods = false
      console.log('woods')
    },
    handleCursorHover(s) {
        this.hover = s;
        this.cursorActive = s;
    },
    testingRouteReload() {
      if (this.testingRouteRefreshData == false) {
        this.testingRouteRefreshData = true
      } else if ( this.testingRouteRefreshData == true) {
        this.testingRouteRefreshData = false
      }
    },
    hideUiTrigger() {
      this.hideUI = true
    },
    routeWatcher() {
      // console.log('hello', this.$route.name)
      if (this.$route.name !== 'splash' && this.$route.name !== 'disclaimer' && this.$route.name !== 'credits' && this.$route.name !== 'intro') {
        this.playSplashMusic = false
        this.audioToggle()
        this.audioToggle()
        this.hideUI = false
      } else {
        return
      }
    }
  },
  watch:{
    $route (to, from){
      this.routeWatcher();
    }
} 
};

</script>