<!-- 

  ON THIS PAGE:
  - 🪦 'Church' or 'Graveyard'
  - ⛴️ 'Docks'
  - 🏠 'Mansion' or 'Manor'
  - 📰 'Newspaper'

  TO DO:
  - Emit journal entries
  - Pull in Lake checks
  - Find sound for gravestone movement 
  - Add code for grave sound

  KEY:
  - 🟡 Funtional, ready for content
  - 🛑 Needs Emit logic
  - 🎧 Needs sound
  - 👁️ Content in, look over for editing
  - 🚧 Not functional, no content
  - 🤝 Dependency check
  - 👋 Edits needed
  - 🤖 QA setting, Change for build

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

        <!-- 🪦 Church Unlocked 👁️ -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="churchModule"
            key="churchModule"
            title="the church"
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
                  The entrance to the town brings you to what once must have been 
                  a beautiful church. Looking upon the structure, you can still see 
                  remnants of intricate, vibrant stained glass in the the now hollow 
                  windows. The building's masonry is skillful, clearly withstanding 
                  the elements as persistent vines entwine themselves through crevices 
                  in the stone. The front doors of the church are boarded up, but there 
                  looks to be an old graveyard behind the fence at the back of the structure.
                </p>
              </template>

              <template #decision--1><div @click="showChurchModuleLocked(true)" class="module--decision--type type--uppercase--small">Hop the fence</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🪦 Graveyard locked 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="churchModuleLocked"
            key="churchModuleLocked"
            title="the graveyard"
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
                <p v-if="!gotKeyItemDagger">
                  Graveyard locked. Headstones. What's the best way to have the user interact with this? A mini point and click?
                  <div class="headstone--alignment">
                    <div class="headstone--grid" @mouseover="handleCursorHover(true)" @mouseleave="handleCursorHover(false)">
                      <div class="headstone--1" @click="headstoneClicked(1)"></div>
                      <div class="headstone--2" @click="headstoneClicked(2)"></div>
                      <div class="headstone--3" @click="headstoneClicked(3)"></div>
                      <div class="headstone--4" @click="headstoneClicked(4)"></div>
                      <div class="headstone--5" @click="headstoneClicked(5)"></div>
                      <div class="headstone--6" @click="headstoneClicked(6)"></div>
                      <div class="headstone--7" @click="headstoneClicked(7)"></div>
                      <div class="headstone--8" @click="headstoneClicked(8)"></div>
                      <div class="headstone--9" @click="headstoneClicked(9)"></div>
                      <div class="headstone--10" @click="headstoneClicked(10)"></div>
                      <div class="headstone--11" @click="headstoneClicked(11)"></div>
                      <div class="headstone--12" @click="headstoneClicked(12)"></div>
                      <div class="headstone--13" @click="headstoneClicked(13)"></div>
                      <div class="headstone--14" @click="headstoneClicked(14)"></div>
                      <div class="headstone--15" @click="headstoneClicked(15)"></div>
                    </div>
                  </div>
                  <div class="headstone--type" v-if="headstoneOne">
                    <div class="headstone--headline">John Carroll</div>
                    <div class="headstone--dates">1789 - 1846</div>
                    <div class="headstone--epitaph">Bastard.</div>
                    <div class="headstone--body">This grave is barely readable and appears to have something brown smeared on top.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneTwo">
                    <div class="headstone--headline">Rosemary Collins</div>
                    <div class="headstone--dates">1829 - 1862</div>
                    <div class="headstone--epitaph">Loving mother, awful singer.</div>
                    <div class="headstone--body">The slab is sun-stained with the outline of a flower bouquette.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneThree">
                    <div class="headstone--headline">Lukas Karlsbern</div>
                    <div class="headstone--dates">1791 - 1836</div>
                    <div class="headstone--epitaph">May the hellfire burn hot.</div>
                    <div class="headstone--body">3 body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFour">
                    <div class="headstone--headline">D——iel A——dins</div>
                    <div class="headstone--dates">1——8 - ——42</div>
                    <div class="headstone--epitaph">Lord g——nt ye peace</div>
                    <div class="headstone--body">You can barely read the script on this grave. It must be very old.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFive">
                    <div class="headstone--headline">5 check</div>
                    <div class="headstone--dates">5 check</div>
                    <div class="headstone--epitaph">5 check</div>
                    <div class="headstone--body">5 body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneSix">
                    <div class="headstone--headline">6 check</div>
                    <div class="headstone--dates">6 check</div>
                    <div class="headstone--epitaph">6 check</div>
                    <div class="headstone--body">one body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneSeven">
                    <div class="headstone--headline">7 check</div>
                    <div class="headstone--dates">7 check</div>
                    <div class="headstone--epitaph">7 check</div>
                    <div class="headstone--body">two body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneEight">
                    <div class="headstone--headline">8 check</div>
                    <div class="headstone--dates">8 check</div>
                    <div class="headstone--epitaph">8 check</div>
                    <div class="headstone--body">3 body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneNine">
                    <div class="headstone--headline">9 check</div>
                    <div class="headstone--dates">9 check</div>
                    <div class="headstone--epitaph">9 check</div>
                    <div class="headstone--body">4 body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneTen">
                    <div class="headstone--headline">10 check</div>
                    <div class="headstone--dates">10 check</div>
                    <div class="headstone--epitaph">10 check</div>
                    <div class="headstone--body">5 body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneEleven">
                    <div class="headstone--headline">11 check</div>
                    <div class="headstone--dates">11 check</div>
                    <div class="headstone--epitaph">11 check</div>
                    <div class="headstone--body">one body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneTwelve">
                    <div class="headstone--headline">12 check</div>
                    <div class="headstone--dates">12 check</div>
                    <div class="headstone--epitaph">12 check</div>
                    <div class="headstone--body">two body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneThirteen">
                    <div class="headstone--headline">Lucien Duguay</div>
                    <div class="headstone--dates">1643 - 1784</div>
                    <div class="headstone--epitaph">The father of Nocta</div>
                    <div class="headstone--body">Considering its age, this grave is in good shape. You notice a strange indent in the marble that could be the shilloutte of a dagger.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFourteen">
                    <div class="headstone--headline">14 check</div>
                    <div class="headstone--dates">14 check</div>
                    <div class="headstone--epitaph">14 check</div>
                    <div class="headstone--body">4 body.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFifteen">
                    <div class="headstone--headline">15 check</div>
                    <div class="headstone--dates">15 check</div>
                    <div class="headstone--dates">15 check</div>
                    <div class="headstone--body">5 body.</div>
                  </div>
                  <p v-if="gotKeyItemDagger">
                  You have the dagger.
                </p>
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #puzzleChecker>
                <PuzzleScript @someEvent="puzzleGuessCheck" v-if="!lighthouseGuessCorrect"/>
                <div class="type--reaction type-secondary">{{ lighthouseGuessResponse }}</div>
              </template>

              <template #decision--1 v-if="gotKeyItemDagger && headstoneThirteen"><div @click="showChurchModuleUnlocked()" class="module--decision--type type--uppercase--small">Insert the dagger</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🪦 Graveyard unlocked 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="churchModuleUnlocked"
            key="churchModuleUnlocked"
            title="strange grave"
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
                  You place the dagger from lara's chest into the strange grave. The grave reveals an ornate key. 
                </p>
              </template>
              
              <template #puzzleChecker>
                <PuzzleScript @someEvent="puzzleGuessCheck" v-if="!lighthouseGuessCorrect"/>
                <div class="type--reaction type-secondary">{{ lighthouseGuessResponse }}</div>
              </template>

              <template #decision--1><div class="module--decision--type type--uppercase--small"><RouterLink to="/thankyou">climb the stairs</RouterLink></div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>
          
        <!-- ⛴️ Docks Unlocked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="docksModule"
            key="docksModule"
            title="The docks"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg=" https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The boats in the harbor are green with old lake slime, with tattered sails and faded planks. There’s a small building at the edge of the dock that says ‘Harbormaster’.
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1>
                <div v-if="!haveWordsForLara" @click="showDocksShedLockedModule(true)" class="module--decision--type type--uppercase--small">Inspect the building</div>
              </template>

              <template #decision--2><div @click="showDocksFishStatueModule(true)" class="module--decision--type type--uppercase--small">Check out the statue</div></template>

              <template #decision--3><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>

          </ContentModal>
        </transition>

        <!-- ⛴️ 'Harbormaster' Locked 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="docksShedLockedModule"
            key="docksShedLockedModule"
            title="Harbormaster Shack - Locked"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg=" https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  Locked Harbormaster
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1>
                <div v-if="haveHarbormasterKey" @click="showDocksShedUnlockedModule()" class="module--decision--type type--uppercase--small">Enter the building</div>
              </template>

              <template #decision--2><div @click="showDocksModule()" class="module--decision--type type--uppercase--small">Back to the docks</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>
              
          </ContentModal>
        </transition>

        <!-- ⛴️ 'Harbormaster' Unlocked 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="docksShedUnlockedModule"
            key="docksShedUnlockedModule"
            title="Harbormaster Shack - Unlocked"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg=" https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  Unlocked Harbormaster
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1><div @click="showDocksModule()" class="module--decision--type type--uppercase--small">Back to the docks</div></template>

              <template #decision--2><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- ⛴️ Fish Plaque 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="docksFishStatueModule"
            key="docksFishStatueModule"
            title="Fish Statue"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg=" https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  Fish Statue
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1><div @click="showDocksModule()" class="module--decision--type type--uppercase--small">Back to the docks</div></template>

              <template #decision--2><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Unlocked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionModule"
            key="mansionModule"
            title="the manor"
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
                  Looming at the end of the ruins stands a dark manor enclosed by a iron fence. You imagine once the building was quite beautiful — the ornate stone cornices and porticos enveloped in a lush frame of meticulously pruned shrubs and florals. But like every structure you've discovered so far, the building is a ghost of it former self — half-swallowed by hungry vines and crumbling at the edges. The wind howls through the shattered windows and the heavy wood front doors swing eerily in the weight of the breeze. The hinges squeak as the doors sway at a crawled pace. The unsettling sound beckons you towards the threshold, chillingly welcoming you to enter.
                </p>
              </template>

              <template #decision--1><div @click="showMansionFoyerModule()" class="module--decision--type type--uppercase--small">enter the manor</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Foyer 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionFoyerModule"
            key="mansionFoyerModule"
            title="Foyer"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The Manor's Foyer 
                </p>
              </template>

              <template #decision--1><div @click="showMansionFloorOneModule()" class="module--decision--type type--uppercase--small">Explore first floor</div></template>

              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Go upstairs</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>
              
          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Floor 1 🟡 -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionFloorOneModule"
            key="mansionFloorOneModule"
            title="Floor one"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The first floor.
                </p>
              </template>

              <template #decision--1>
                <div v-if="!visitedDiningRoom" @click="showMansionDiningModule()" class="module--decision--type type--uppercase--small">Open the double doors</div>
                <div v-if="visitedDiningRoom" @click="showMansionDiningModule()" class="module--decision--type type--uppercase--small">Explore the dining room</div>
              </template>

              <template #decision--2>
                <div v-if="!visitedGreenhouse" @click="showMansionGreenhouseModule()" class="module--decision--type type--uppercase--small">Open the iron door</div>
                <div v-if="visitedGreenhouse" @click="showMansionGreenhouseModule()" class="module--decision--type type--uppercase--small">Go to the greenhouse</div>
              </template>
              
              <template #decision--3><div @click="showMansionFoyerModule()" class="module--decision--type type--uppercase--small">Back to the foyer</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Dining Room 🟡 -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionDiningModule"
            key="mansionDiningModule"
            title="Dining room"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The dining room.
                </p>
              </template>

              <template #decision--1><div @click="showMansionGreenhouseModule()" class="module--decision--type type--uppercase--small">Go to the greenhouse</div></template>
              
              <template #decision--2><div @click="showMansionFloorOneModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Greenhouse 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionGreenhouseModule"
            key="mansionGreenhouseModule"
            title="Greenhouse"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The greenhouse
                </p>
              </template>

              <template #decision--1><div @click="showMansionGreenhouseModule()" class="module--decision--type type--uppercase--small">Go to the greenhouse</div></template>
              
              <template #decision--2><div @click="showMansionFloorOneModule()" class="module--decision--type type--uppercase--small">Back inside</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Floor 2 🟡 -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionFloorTwoModule"
            key="mansionFloorTwoModule"
            title="Floor Two"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  The top of the stairs.
                </p>
              </template>

              <template #decision--1>
                <div v-if="!visitedBedroom && !gotBedroomKey && !gotKeyItemDagger && !gotLaraPaintingHint" @click="showMansionBedroomModule()" class="module--decision--type type--uppercase--small">Try the first door</div>
                <div v-if="!visitedBedroom && gotBedroomKey && !gotKeyItemDagger && !gotLaraPaintingHint" @click="showMansionBedroomModule()" class="module--decision--type type--uppercase--small">Try the first door</div>
                <div v-if="visitedBedroom && !gotBedroomKey && !gotKeyItemDagger && !gotLaraPaintingHint" @click="showMansionBedroomModule()" class="module--decision--type type--uppercase--small">Try the first door</div>
                <div v-if="visitedBedroom && gotBedroomKey && !gotLaraPaintingHint && !gotKeyItemDagger" @click="showMansionBedroomModule()" class="module--decision--type type--uppercase--small">Go to the bedroom</div>
                <div v-if="gotLaraPaintingHint && !gotKeyItemDagger" @click="showMansionBedroomLaraIntroModule()" class="module--decision--type type--uppercase--small">Go to the bedroom</div>
                <div v-if="gotLaraPaintingHint && gotKeyItemDagger" @click="showMansionBedroomDoneModule()" class="module--decision--type type--uppercase--small">Go to the bedroom</div>
              </template>
              
              <template #decision--2>
                <div v-if="!visitedStudy" @click="showMansionStudyModule()" class="module--decision--type type--uppercase--small">Try the second door</div>
                <div v-if="visitedStudy" @click="showMansionStudyModule()" class="module--decision--type type--uppercase--small">Go to the study</div>
              </template>
              
              <template #decision--3><div @click="showMansionFoyerModule()" class="module--decision--type type--uppercase--small">Back downstairs</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionStudyModule"
            key="mansionStudyModule"
            title="the study"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p v-if="!gotSeenLockedChest && !haveSeenUnlockedChes">
                  the study with a gallery wall and a desk etc.
                </p>
                <p v-if="gotSeenLockedChest && !gotSeenUnlockedChest">
                  There's a hole in the wall with the locked chest you found.
                </p>
                <p v-if="gotSeenLockedChest && gotSeenUnlockedChest">
                  The open chest lies in the enclave.
                </p>
              </template>

              <template #decision--1>
                <div v-if="!gotSeenLockedChest && !gotSeenUnlockedChest" @click="showMansionStudyWallModule()" class="module--decision--type type--uppercase--small">Inspect the gallery wall</div>
                <div v-if="gotSeenLockedChest && !gotSeenUnlockedChest" @click="showMansionStudyChestModuleLocked()" class="module--decision--type type--uppercase--small">Go to the chest</div>
                <div v-if="gotSeenLockedChest && gotSeenUnlockedChest" @click="showMansionStudyChestModuleUnlocked()" class="module--decision--type type--uppercase--small">Look inside the chest</div>
              </template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study Wall 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionStudyWallModule"
            key="mansionStudyWallModule"
            title="Gallery Wall"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  Dagger holder and paintings.
                </p>
              </template>

              <template #decision--1><div v-if="gotLaraPaintingHint" @click="showMansionStudyChestModuleLocked()" class="module--decision--type type--uppercase--small">Remove the painting</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study Hidden Chest Locked 🟡 -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionStudyChestModuleLocked"
            key="mansionStudyChestModuleLocked"
            title="Hidden Chest"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  Just a locked chest
                </p>
              </template>

              <template #decision--1 v-if="gotKeyItemChestKey"><div @click="showMansionStudyChestModuleUnlocked()" class="module--decision--type type--uppercase--small">Use the key</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study Hidden Chest Unlocked 🟡 -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionStudyChestModuleUnlocked"
            key="mansionStudyChestModuleUnlocked"
            title="Hidden Chest"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  Map & Letters
                </p>
              </template>

              <template #decision--1></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomModule"
            key="mansionBedroomModule"
            :title="`${secondFloorDoor}`"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p v-if="!gotBedroomKey">
                  The door is locked
                </p>
                <p v-if="gotBedroomKey">
                  Empty bedroom
                </p>
              </template>

              <template #decision--1 v-if="gotBedroomKey && haveWordsForLara"><div @click="showMansionBedroomLaraIntroModule()" class="module--decision--type type--uppercase--small">Say the words you found</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom Lara Unlocked 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomLaraIntroModule"
            key="mansionBedroomLaraIntroModule"
            title="Hello Lara"
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
                <p v-if="!gotLaraPaintingHint">
                  You see a strange woman suddenly.
                  <div class="type--reaction type-secondary">“Tranquil waters I do see, but still the fire burns beneath. Do not move the water, Lara. Don’t look behind the water, Lara. There is nothing to see.”</div>
                </p>
                <p v-if="gotLaraPaintingHint">
                  Lara is still mumbling about something.
                </p>
              </template>

              <!-- 👋 Going to change this to a puzzle checker to ask for dagger -->
              
              <template #decision--1 v-if="gotSeenGallery == true && gotSeenGraveyard == true"><div @click="showMansionBedroomLaraDaggerModule()" class="module--decision--type type--uppercase--small">Ask Lara for the dagger in her chest</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom Lara Unlocked & You need the dagger 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomLaraDaggerModule"
            key="mansionBedroomLaraDaggerModule"
            title="Lara's Dagger"
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
                <p>Lara yanks the dagger out of her chest and throws it at you in a rage.
                  <span class="type--reaction type-secondary">“pain...PAIN....—....take...TAKE....—....GO”</span>
                </p>
              </template>

              <template #decision--1></template>

              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom Lara Unlocked & You don't need to speak to her again 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomDoneModule"
            key="mansionBedroomDoneModule"
            title="the lady's chambers"
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
                  Lara wails at you.
                  <span class="type--reaction type-secondary">“go...LEAVE — ....needed....ELSEwhere — needed NEEDED”</span>
                </p>
              </template>

              <template #decision--1></template>

              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 📰 Newspaper 🟡 -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="newspaperModule"
            key="newspaperModule"
            title="Faded newspaper"
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
                  There's an old newspaper on the ground here, caught under the weight of a loose piece of wood. 
                </p>
                <p>
                  <blockquote>
                    The Nocta township skillfully weathered a recent snowstorm, thanks to Mayor Duguay's diligent preparations. As surrounding areas suffered, Nocta's proactive measures proved vital. The mayor stockpiled supplies, reinforced infrastructure, and coordinated with emergency services. Prompt road clearance ensured functionality and unity prevailed. Grateful for Mayor Duguay's leadership, Nocta stands resilient, ready to assist neighbors and rebuild. Their preparedness exemplifies unwavering spirit in the face of adversity.
                  </blockquote>
                </p>
              </template>

              <template #decision--1 v-if="lighthouseGuessCorrect"><div @click="showDocksModule(true)" class="module--decision--type type--uppercase--small">enter the lighthouse</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>             

        </div>
      </div> 
    </transition>

    <div class="no-overflow--container">
      <div class="lighthouse--container">
      <!-- For testing Props -->   
      
        <!-- <div class="headline--container">
          <h1 class="headline--type" v-if="sendTestingRouteRefresh">
          <span class="type-primary">hello</span>
          </h1>
        </div>  -->
     
        
        <transition name="label" mode="out-in">
        <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="100%" 
        viewBox="0 0 5082 2250" 
        v-show="lighthouseNoFade" 
        key="lighthouseNoFade">
          <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/town.png"></image>
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
          <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/town.png"></image>
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
            <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/lighthouse-fade.jpg" opacity="0"></image>
            
            <!-- church -->

            <rect x="3390" y="300" fill="#aaff33" opacity="0" width="1470" height="1440" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showChurchModule"> 
            </rect>

            <!-- mansion -->

            <rect x="2190" y="820" fill="#aaff33" opacity="0" width="680" height="470"
            @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showMansionModule"> 
            </rect>

            <!-- docks -->

            <rect x="0" y="1140" fill="#aaff33" opacity="0" width="1820" height="420" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showDocksModule"> 
            </rect>

            <!-- newspaper -->

            <rect x="1970" y="1850" fill="#aaff33" opacity="0" width="170" height="152" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showNewspaperModule"> 
            </rect>             

        </svg>

      </div>
    </div>
  </main>
</template>

<script>


export default {
  props: {
    haveWordsForLara: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveBedroomKey: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveBoatKey: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveKeyItemDagger: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotLaraPaintingHint: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenGallery: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveVisitedDiningRoom: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveVisitedStudy: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveVisitedBedroom: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenGraveyard: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotKeyItemChestKey: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenLockedChest: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenUnlockedChest: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveHarbormasterKey: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenHarbormasterShed: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenFishStatue: { 
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
      
      // church modules
      churchModule: false,
      churchModuleLocked: false,
      churchModuleUnlocked: false,
      // mansion modules
      mansionModule: false,
      mansionFoyerModule: false,
      mansionFloorOneModule: false,
      mansionDiningModule: false,
      mansionGreenhouseModule: false,
      mansionFloorTwoModule: false,
      mansionStudyModule: false,
      mansionStudyWallModule: false,
      mansionStudyChestModuleLocked: false,
      mansionStudyChestModuleUnlocked: false,
      mansionBedroomModule: false,
      mansionBedroomLaraIntroModule: false,
      mansionBedroomLaraDaggerModule: false,
      mansionBedroomDoneModule: false,
      // docks module
      docksModule: false,
      docksShedLockedModule: false,
      docksShedUnlockedModule: false,
      docksFishStatueModule: false,
      // plaque module
      newspaperModule: false,
      woodchopModule: false,
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

      /* Key items */
      gotSeenHarbormasterShed: false, /* ✅ Emitted to PROPS */ 
      gotSeenFishStatue: false, /* ✅ Emitted to PROPS */ 
      gotBoatKey: false, /* ✅ Emitted to journal & PROPS & routed to Lake */ 
      gotBedroomKey: false, /* ✅ Emitted to journal & PROPS */ 
      gotKeyItemDagger: false, /* ✅ Emitted to journal & PROPS */ 
      gotLaraPaintingHint: false, /* ✅ Emitted to journal & PROPS */ 
      gotSeenGallery: false, /* ✅ Emitted to PROPS */ 
      gotSeenGraveyard: false, /* ✅ Emitted to journal & PROPS */
      gotKeyItemChestKey: false, /* ✅ Emitted to journal & PROPS */
      gotSeenLockedChest: false, /* ✅ Emitted to journal & PROPS */
      gotSeenUnlockedChest: false, /* ✅ Emitted to journal & PROPS */

      /* Visited places */

      visitedDiningRoom: false, /* ✅ Emitted to PROPS */
      visitedGreenhouse: false, /* ✅ Emitted to PROPS (connected to bedroom key) */
      visitedStudy: false, /* ✅ Emitted to PROPS */
      visitedBedroom: false, /* ✅ Emitted to PROPS */

      /* environment changes sigh */

      secondFloorDoor: '',
      checkedHaveWordsForLara: '', /* 🤝 Dependency final step for v-if */
      checkedSendTestingRouteRefresh: '', /* 🤝 Dependency final step for v-if */

      /* headstones */
      headstoneOne: false,
      headstoneTwo: false,
      headstoneThree: false,
      headstoneFour: false,
      headstoneFive: false,
      headstoneSix: false,
      headstoneSeven: false,
      headstoneEight: false,
      headstoneNine: false,
      headstoneTen: false,
      headstoneEleven: false,
      headstoneTwelve: false,
      headstoneThirteen: false,
      headstoneFourteen: false,
      headstoneFifteen: false,
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
    
    /* 🤝 INCOMING Dependencies check */
      
    checkSendTestingRouteRefresh(){
        console.log(this.sendTestingRouteRefresh)
        if( this.sendTestingRouteRefresh == true) {
          this.checkedSendTestingRouteRefresh = true
        } else {
          this.checkedSendTestingRouteRefresh = false
        }
      },
    checkHaveWordsForLara(){
        // console.log(this.haveWordsForLara, 'words check?')
        if( this.haveWordsForLara == true) {
          this.checkedHaveWordsForLara = true
        } else {
          this.checkedHaveWordsForLara = false
        }
      },
    checkHaveBedroomKey(){
        if(this.haveBedroomKey == true) {
          this.gotBedroomKey = true
          this.visitedGreenhouse = true
        }
      },
    checkHaveGotSeenHarbormasterShed(){
        if(this.haveGotSeenHarbormasterShed == true) {
          this.gotSeenHarbormasterShed = true
        }
      },
    checkHaveGotSeenFishStatue(){
        if(this.haveGotSeenFishStatue == true) {
          this.gotSeenFishStatue = true
        }
      },
    checkHaveBoatKey(){
        if(this.haveBoatKey == true) {
          this.gotBoatKey = true
        }
      },
    checkHaveKeyItemDagger(){
        if(this.haveKeyItemDagger == true) {
          this.gotKeyItemDagger = true
        }
      },
    checkHaveGotLaraPaintingHint(){
        if(this.haveGotLaraPaintingHint == true) {
          this.gotLaraPaintingHint = true
        }
        // console.log(this.gotLaraPaintingHint, 'painting hint?', this.haveGotLaraPaintingHint)
      },
    checkHaveGotSeenGallery(){
        if(this.haveGotSeenGallery == true) {
          this.gotSeenGallery = true
        }
        // console.log(this.gotSeenGallery, 'painting hint?', this.haveGotSeenGallery)
      },
    checkHaveVisitedDiningRoom(){
        if(this.haveVisitedDiningRoom == true) {
          this.visitedDiningRoom = true;
        }
        // console.log(this.visitedDiningRoom, 'dining room', this.visitedDiningRoom)
      },
    checkHaveVisitedStudy(){
        if(this.haveVisitedStudy == true) {
          this.visitedStudy = true;
        }
        // console.log(this.visitedDiningRoom, 'dining room', this.visitedDiningRoom)
      },
    checkHaveVisitedBedroom(){
        if(this.haveVisitedBedroom == true) {
          this.visitedBedroom = true;
        }
        // console.log(this.visitedDiningRoom, 'dining room', this.visitedDiningRoom)
      },
    checkHaveGotSeenGraveyard(){
        if(this.haveGotSeenGraveyard == true) {
          this.gotSeenGraveyard = true;
        }
        // console.log(this.gotSeenGraveyard, 'graveyard', this.haveGotSeenGraveyard)
      },
    checkHaveGotKeyItemChestKey(){
        if(this.haveGotKeyItemChestKey == true) {
          this.gotKeyItemChestKey = true;
        }
        // console.log(this.gotKeyItemChestKey, 'Chest key?', this.haveGotKeyItemChestKey)
      },
    checkHaveGotSeenLockedChest(){
        if(this.haveGotSeenLockedChest == true) {
          this.gotSeenLockedChest = true;
        }
        // console.log(this.gotSeenLockedChest, 'Chest Locked?', this.haveGotSeenLockedChest)
      },
    checkHaveGotSeenUnlockedChest(){
        if(this.haveGotSeenUnlockedChest == true) {
          this.gotSeenUnlockedChest = true;
        }
        // console.log(this.gotSeenUnlockedChest, 'Chest Unlocked?', this.haveGotSeenUnlockedChest)
      },

      changeObjective(){
        if(this.playerCheckedLighthouse == true) {
          this.playerObjective = 'Open the lighthouse'
        } else {
          this.playerObjective = 'Explore your surroundings'
        }
      },
      showDocksModule() {
        this.checkHaveGotSeenHarbormasterShed();
        this.checkHaveGotSeenFishStatue();
        if (this.docksShedLockedModule == true || 
        this.docksShedUnlockedModule == true ||
        this.docksFishStatueModule == true
        ) {
          this.moduleOn = false;
          this.docksModule = false;
          this.docksShedLockedModule = false;
          this.docksShedUnlockedModule = false;
          this.docksFishStatueModule = false;
          setTimeout(() => {
            this.moduleOn = true;
            this.docksModule = true;
            console.log('timeout check')
          }, "250");
        } else {
          this.docksModule = true;
          this.docksShedLockedModule = false;
          this.docksShedUnlockedModule = false;
          this.docksFishStatueModule = false;
          this.moduleOn = true;
        }
      },
      showDocksShedLockedModule() {
        this.docksModule = false;
        this.docksShedLockedModule = true;
        this.docksShedUnlockedModule = false;
        this.docksFishStatueModule = false;
        this.moduleOn = true;
        this.gotSeenHarbormasterShed = true
        this.$emit('got-seen-harbormaster-shed');
      },
      showDocksShedUnlockedModule() {
        /* Key item and event triggers */
        this.checkHaveBoatKey();
        this.gotBoatKey = true;
        this.$emit('got-boat-key');
        
        /* functional necesscities */

        this.docksModule = false;
        this.docksShedLockedModule = false;
        this.docksShedUnlockedModule = true;
        this.docksFishStatueModule = false;
        this.moduleOn = true;
      },
      showDocksFishStatueModule() {
        this.docksModule = false;
        this.docksShedLockedModule = false;
        this.docksShedUnlockedModule = false;
        this.docksFishStatueModule = true;
        this.moduleOn = true;
        this.$emit('got-seen-fish-statue');
      },
      showNewspaperModule() {
        this.newspaperModule = true;
        this.moduleOn = true;
      },
      showWoodchopModule() {
        this.woodchopModule = true;
        this.moduleOn = true;
      },

      /* 🪦 Show Church / Graveyard fucntions */

      showChurchModuleLocked() {
        /* Key item and event triggers */

        this.checkHaveGotSeenGraveyard();
        this.gotSeenGraveyard = true;
        this.$emit('got-seen-graveyard');
        
        /* functional necesscities */

        this.churchModuleLocked = true;
        this.churchModule = false;
        this.moduleOn = true;
      },
      showChurchModuleUnlocked() {
        /* Key item and event triggers */
        
        this.gotKeyItemChestKey = true;
        this.$emit('got-key-item-chest-key')
        
        /* functional necesscities */

        this.churchModuleUnlocked = true;
        this.churchModuleLocked = false;
        this.moduleOn = true;
      },
      showChurchModule() {
        this.churchModule = true;
        this.moduleOn = true;
      },

      /* 🏠 Show Mansion fucntions */

      showMansionModule() {
        this.checkHaveGotLaraPaintingHint();
        this.checkHaveKeyItemDagger();
        this.checkHaveBedroomKey();
        this.checkHaveGotSeenGallery();
        this.checkHaveVisitedDiningRoom();
        this.checkHaveVisitedStudy();
        this.checkHaveVisitedBedroom();
        this.checkHaveGotSeenLockedChest();
        this.checkHaveGotSeenUnlockedChest();
        this.moduleOn = true;
        this.mansionModule = true;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionFoyerModule() {
        if (this.mansionFloorOneModule == true || 
        this.mansionFloorTwoModule == true
        ) {
          this.moduleOn = false;
          this.mansionFoyerModule = false;
          this.mansionFloorOneModule = false;
          this.mansionFloorTwoModule = false;
          setTimeout(() => {
            this.moduleOn = true;
            this.mansionFoyerModule = true;
            console.log('timeout check')
          }, "250");
        } else {
          this.moduleOn = true;
          this.mansionModule = false;
          this.mansionFoyerModule = true;
          this.mansionFloorOneModule = false;
          this.mansionDiningModule = false;
          this.mansionGreenhouseModule = false;
          this.mansionFloorTwoModule = false;
          this.mansionStudyModule = false;
          this.mansionStudyWallModule = false;
          this.mansionStudyChestModuleLocked = false;
          this.mansionStudyChestModuleUnlocked = false;
          this.mansionBedroomModule = false;
          this.mansionBedroomLaraIntroModule = false;
          this.mansionBedroomLaraDaggerModule = false;
          this.mansionBedroomDoneModule = false;
        }
      },
      showMansionFloorOneModule() {
        if (this.mansionDiningModule == true || 
        this.mansionGreenhouseModule == true
        ) {
          this.moduleOn = false;
          this.mansionFloorOneModule = false;
          this.mansionDiningModule = false;
          this.mansionGreenhouseModule = false;
          setTimeout(() => {
            this.moduleOn = true;
            this.mansionFloorOneModule = true;
            console.log('timeout check')
          }, "250");
        } else {
          this.moduleOn = true;
          this.mansionModule = false;
          this.mansionFoyerModule = false;
          this.mansionFloorOneModule = true;
          this.mansionDiningModule = false;
          this.mansionGreenhouseModule = false;
          this.mansionFloorTwoModule = false;
          this.mansionStudyModule = false;
          this.mansionStudyWallModule = false;
          this.mansionStudyChestModuleLocked = false;
          this.mansionStudyChestModuleUnlocked = false;
          this.mansionBedroomModule = false;
          this.mansionBedroomLaraIntroModule = false;
          this.mansionBedroomLaraDaggerModule = false;
          this.mansionBedroomDoneModule = false;
        }
      },
      showMansionDiningModule() {
        /* Key item and event triggers */
        
        this.visitedDiningRoom = true;
        this.$emit('visited-dining-room');
        
        /* functional necesscities */

        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = true;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionGreenhouseModule() {
        /* Key item and event triggers */
        
        this.visitedGreenhouse = true;
        this.gotBedroomKey = true;
        this.$emit('got-bedroom-key');
        
        /* functional necesscities */
        
        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = true;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionFloorTwoModule() {
        if (
          this.mansionStudyModule == true || 
          this.mansionStudyWallModule == true || 
          this.mansionStudyChestModuleLocked == true ||
          this.mansionStudyChestModuleUnlocked == true ||
          this.mansionBedroomModule == true ||
          this.mansionBedroomLaraIntroModule == true ||
          this.mansionBedroomLaraDaggerModule == true ||
          this.mansionBedroomDoneModule == true
        ) {
          this.moduleOn = false;
          this.mansionFloorTwoModule = false;
          this.mansionStudyModule = false;
          this.mansionStudyWallModule = false;
          this.mansionStudyChestModuleLocked = false;
          this.mansionStudyChestModuleUnlocked = false;
          this.mansionBedroomModule = false;
          this.mansionBedroomLaraIntroModule = false;
          this.mansionBedroomLaraDaggerModule = false;
          this.mansionBedroomDoneModule = false;
          setTimeout(() => {
            this.moduleOn = true;
            this.mansionFloorTwoModule = true;
            console.log('timeout check')
          }, "250");
        } else {
          this.moduleOn = true;
          this.mansionModule = false;
          this.mansionFoyerModule = false;
          this.mansionFloorOneModule = false;
          this.mansionDiningModule = false;
          this.mansionGreenhouseModule = false;
          this.mansionFloorTwoModule = true;
          this.mansionStudyModule = false;
          this.mansionStudyWallModule = false;
          this.mansionStudyChestModuleLocked = false;
          this.mansionStudyChestModuleUnlocked = false;
          this.mansionBedroomModule = false;
          this.mansionBedroomLaraIntroModule = false;
          this.mansionBedroomLaraDaggerModule = false;
          this.mansionBedroomDoneModule = false;
        }
      },
      showMansionStudyModule() {
        /* Key item and event triggers */
        
        this.visitedStudy = true;
        this.$emit('visited-study');
        
        /* functional necesscities */

        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = true;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionStudyWallModule() {
        /* Key item and event triggers */

        
        this.gotSeenGallery = true;
        this.$emit('got-seen-gallery');
        
        /* functional necesscities */

        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = true;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionStudyChestModuleLocked() {
        /* Key item and event triggers */
        
        this.gotSeenLockedChest = true;
        this.$emit('got-seen-locked-chest')
        
        /* functional necesscities */

        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = true;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionStudyChestModuleUnlocked() {
        /* Key item and event triggers */
        
        this.gotSeenUnlockedChest = true;
        this.$emit('got-seen-unlocked-chest')
        
        /* functional necesscities */
        
        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = true;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionBedroomModule() {
        /* Key item and event triggers */
        
        this.visitedBedroom = true;
        this.$emit('visited-bedroom');
        this.checkHaveWordsForLara();
        
        /* functional necesscities */

        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = true;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;

        if(this.visitedBedroom == true && this.gotBedroomKey == true) {
          this.secondFloorDoor = "Bedroom";
        } else {
          this.secondFloorDoor = "Ornate door";
        }
      },
      showMansionBedroomLaraIntroModule() {
        /* Key item and event triggers */
        
        this.gotLaraPaintingHint = true;
        this.$emit('got-lara-painting-hint')
        
        /* functional necesscities */

        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = true;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
      showMansionBedroomLaraDaggerModule() {
        
        /* Key item and event triggers */
        
        this.gotKeyItemDagger = true;
        this.$emit('got-key-item-dagger')
        
        /* functional necesscities */
        
        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = true;
        this.mansionBedroomDoneModule = false;
      },
      showMansionBedroomDoneModule() {
        this.moduleOn = true;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = true;
      },
      hideModule() {
        this.moduleOn = false;
        this.newspaperModule = false;
        this.churchModule = false;
        this.churchModuleLocked = false;
        this.churchModuleUnlocked = false;
        this.docksModule = false;
        this.docksShedLockedModule = false;
        this.docksShedUnlockedModule = false;
        this.docksFishStatueModule = false;
        this.mansionModule = false;
        this.mansionFoyerModule = false;
        this.mansionFloorOneModule = false;
        this.mansionDiningModule = false;
        this.mansionGreenhouseModule = false;
        this.mansionFloorTwoModule = false;
        this.mansionStudyModule = false;
        this.mansionStudyWallModule = false;
        this.mansionStudyChestModuleLocked = false;
        this.mansionStudyChestModuleUnlocked = false;
        this.mansionBedroomModule = false;
        this.mansionBedroomLaraIntroModule = false;
        this.mansionBedroomLaraDaggerModule = false;
        this.mansionBedroomDoneModule = false;
      },
        handleCursorHover(s) {
        this.hover = s;
        this.cursorActive = s;
        // console.log('hover check');
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

      /* headstones */

      headstoneClicked(s) {
        this.headstoneOne = false
        this.headstoneTwo = false
        this.headstoneThree = false
        this.headstoneFour = false
        this.headstoneFive = false
        this.headstoneSix = false
        this.headstoneSeven = false
        this.headstoneEight = false
        this.headstoneNine = false
        this.headstoneTen = false
        this.headstoneEleven = false
        this.headstoneTwelve = false
        this.headstoneThirteen = false
        this.headstoneFourteen = false
        this.headstoneFifteen = false
        if (s === 1) {
          this.headstoneOne = true
        } else if (s === 2) {
          this.headstoneTwo = true
        } else if (s === 3) {
          this.headstoneThree = true
        } else if (s === 4) {
          this.headstoneFour = true
        } else if (s === 5) {
          this.headstoneFive = true
        } else if (s === 6) {
          this.headstoneSix = true
        } else if (s === 7) {
          this.headstoneSeven = true
        } else if (s === 8) {
          this.headstoneEight = true
        } else if (s === 9) {
          this.headstoneNine = true
        } else if (s === 10) {
          this.headstoneTen = true
        } else if (s === 11) {
          this.headstoneEleven = true
        } else if (s === 12) {
          this.headstoneTwelve = true
        } else if (s === 13) {
          this.headstoneThirteen = true
        } else if (s === 14) {
          this.headstoneFourteen = true
        } else if (s === 15) {
          this.headstoneFifteen = true
        }
      }

    },
    beforeMount(){
    /* this.activate(); // fade for ghost img */
    this.checkHaveGotKeyItemChestKey(); 
  }
};
</script>