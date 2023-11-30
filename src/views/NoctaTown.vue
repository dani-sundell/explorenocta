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

        <!-- 🪦 Graveyard locked 👁️ -->

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
                <p>
                  Once you hop over the fence, your shoes crunch onto a patch of dry, overgrown weeds. 
                  The whole little cemetery is engulfed in patches of dead grass, the graves half-swallowed 
                  by hungry brown leaves. The graveyard is modest and unkempt with only a handful of headstones 
                  protruding out of the ground.  
                </p>
                <p v-if="gotKeyItemDagger">
                  Lara's gilded dagger weighs heavy in your pack, waiting anxiously to be placed back within its 
                  proper place. You wonder if Lucien's headstone could be it. 
                </p>
                <p>
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
                    <div class="headstone--dates">1739 - 1786</div>
                    <div class="headstone--epitaph">Bastard.</div>
                    <div class="headstone--body">This grave appears to have something brown smeared on top.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneTwo">
                    <div class="headstone--headline">Rosemary Collins</div>
                    <div class="headstone--dates">1729 - 1762</div>
                    <div class="headstone--epitaph">Loving mother, awful singer.</div>
                    <div class="headstone--body">The slab is sun-stained with the outline of a flower bouquet.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneThree">
                    <div class="headstone--headline">Lukas Karlsbern</div>
                    <div class="headstone--dates">1691 - 1736</div>
                    <div class="headstone--epitaph">May the hellfire burn hot.</div>
                    <div class="headstone--body">This headstone has been severely neglected — perhaps even vandalized, but the markings are incomprehensible.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFour">
                    <div class="headstone--headline">D——iel A——dins</div>
                    <div class="headstone--dates">1——8 - ——42</div>
                    <div class="headstone--epitaph">Lord g——nt ye peace</div>
                    <div class="headstone--body">You can barely read the script on this grave. It must be very old.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFive">
                    <div class="headstone--headline">Sarah Morgenstern</div>
                    <div class="headstone--dates">1766 - 1810</div>
                    <div class="headstone--epitaph">May he Lord Love thee as We Have</div>
                    <div class="headstone--body">Nothing is placed by this grave, but it's clear to you it was well cared for.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneSix">
                    <div class="headstone--headline">William Canin</div>
                    <div class="headstone--dates">1758 - 1789</div>
                    <div class="headstone--epitaph">Loyal Servant of God; In Death as in Life</div>
                    <div class="headstone--body">A gilded rosary has been draped on the stone corner of this headstone.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneSeven">
                    <div class="headstone--headline">Arabella Klein</div>
                    <div class="headstone--dates">1802 - 1802</div>
                    <div class="headstone--epitaph">Held in His arms; Cradled by heaven's clouds</div>
                    <div class="headstone--body">This stone seems to share several bundles of flowers with the one right beside it.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneEight">
                    <div class="headstone--headline">Genevieve Klein</div>
                    <div class="headstone--dates">1782 - 1802</div>
                    <div class="headstone--epitaph">A Loving Wife in Life; A Dear Mother in Death</div>
                    <div class="headstone--body">This stone seems to share several bundles of flowers with the one right beside it.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneNine">
                    <div class="headstone--headline">Lara Duguay</div>
                    <div class="headstone--dates">1783 - 1813</div>
                    <div class="headstone--epitaph">The Lake's Loveliest Lady</div>
                    <div class="headstone--body">A collection of faded pink water lilies decorates the stone base of this grave surrounded by soiled columns of heavily burned candles. </div>
                  </div>
                  <div class="headstone--type" v-if="headstoneTen">
                    <div class="headstone--headline">Mary Duguay</div>
                    <div class="headstone--dates">1737 - 1798</div>
                    <div class="headstone--epitaph">Beloved daughter of light</div>
                    <div class="headstone--body">This grave is not decorated with flowers but a folded quilt. Perhaps, it was once a vibrant pattern, but the sun and dirt has rendered the fabric a sepia-toned heap.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneEleven">
                    <div class="headstone--headline">Elizabeth Duguay</div>
                    <div class="headstone--dates">1643 - 1709</div>
                    <div class="headstone--epitaph">The Mother of Nocta</div>
                    <div class="headstone--body">A pair of white vases flanks this grave, holding crisp stalks of once-white lilies.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneTwelve">
                    <div class="headstone--headline">Lenore Duguay</div>
                    <div class="headstone--dates">1698 - 1704</div>
                    <div class="headstone--epitaph">The Lord's Little Light</div>
                    <div class="headstone--body">A small stuffed bear has been nestled at the base of this headstone.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneThirteen">
                    <div class="headstone--headline">Lucien Duguay I</div>
                    <div class="headstone--dates">1643 - 1709</div>
                    <div class="headstone--epitaph">The Father of Nocta</div>
                    <div class="headstone--body">Considering its age, this grave is in good shape. You notice a strange indent in the marble that could be the silhouette of a dagger.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFourteen">
                    <div class="headstone--headline">Lucien Duguay II</div>
                    <div class="headstone--dates">1698 - 1739</div>
                    <div class="headstone--epitaph">A light in the night; Too soon snuffed</div>
                    <div class="headstone--body">A patch of yellow lilies once grew around this grave, though all that remains is a pile of dead stalks.</div>
                  </div>
                  <div class="headstone--type" v-if="headstoneFifteen">
                    <div class="headstone--headline">Lucien Duguay III</div>
                    <div class="headstone--dates">1734 - 1776</div>
                    <div class="headstone--epitaph">Lover of God and Country</div>
                    <div class="headstone--body">An old version of the American flag stands planted in the soil near this grave.</div>
                  </div>
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1 v-if="gotKeyItemDagger && headstoneThirteen"><div @click="showChurchModuleUnlocked()" class="module--decision--type type--uppercase--small">Insert the dagger</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🪦 Graveyard unlocked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="churchModuleUnlocked"
            key="churchModuleUnlocked"
            title="Lucien's grave"
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
                  You kneel before the old granite, your eyes tracing the eroded details of the carved 
                  stone. You reach into your bag and grasp the still-bloody dagger Lara yanked from her 
                  own chest. You suppress a shudder at the memory. 
                </p>
                <p>
                  The brass sits cool in your palms for a moment before you carefully slot the object into 
                  the indentation in the grave. You hold your breath, unsure of what comes next.
                </p>
                <p>
                  A moment later, a mechanism seems to release. Your ears perk at the sound as you look 
                  around for the source. You find your answer on the left side of the stone, where a hidden 
                  compartment has been unveiled. Your fingers reach eagerly into the enclave and find the 
                  cool surface of an intricate golden key with a decorative 'L' engraved on it.
                </p>
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
                  The boats in the harbor are green with old lake slime, with tattered 
                  sails and faded planks. There’s a small building at the edge of the dock 
                  that says ‘Harbormaster’. On the other end of the dock, you spot what looks 
                  to be a brass statue of a large fish. 
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1>
                <div v-if="!haveWordsForLara" @click="showDocksShedLockedModule(true)" class="module--decision--type type--uppercase--small">Walk to the building</div>
              </template>

              <template #decision--2><div @click="showDocksFishStatueModule(true)" class="module--decision--type type--uppercase--small">Go to the statue</div></template>

              <template #decision--3><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>

          </ContentModal>
        </transition>

        <!-- ⛴️ 'Harbormaster' Locked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="docksShedLockedModule"
            key="docksShedLockedModule"
            title="Old Shack"
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
                  You wander up the creaking dock towards the old building as the lake waves lap 
                  rhythmically against the aged wood. The building is relatively small, clearly meant 
                  as more of an office than a residence. You noticed the door is decorated with an 
                  iron anchor as you reach down and try the handle. Unsurprisingly, the latch is locked
                  tight. 
                </p>
                <p>
                  You careen your head towards the foggy windows to see if you can spot anything useful. 
                  It's difficult to see inside the dimly lit building. You can make out a sign that says "NOTICE: 
                  ensure all night salmon catchers hold the necessary scarcity permits". You also see what appears to
                  be a board on the wall with several empty hooks. You imagine it must have been to hold the 
                  keys to the boats in the harbor. Nevertheless, it seems like all the slots are empty.  
                </p>
                <p>
                  You're about to walk off when you notice that actually there's a single key hanging on the 
                  board. You consider breaking through the windows to retrieve it, but you're too big to fit 
                  all the way through. You'll need to get the door open if you want that key, it seems.
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

        <!-- ⛴️ 'Harbormaster' Unlocked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="docksShedUnlockedModule"
            key="docksShedUnlockedModule"
            title="Old Shack"
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
                  The handle is cold and slimy with the same algae that covers the boats in the 
                  harbor, but it turns well enough when you turn the key in its lock. You frown 
                  as you enter and wipe the slime on your pants before you head for the key board 
                  hanging on the wall. With an energetic sigh, you snatch the key off the hook and 
                  pocket it. Now, you just need to find the boat it goes to. 
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1><div @click="showDocksModule()" class="module--decision--type type--uppercase--small">Back to the docks</div></template>

              <template #decision--2><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- ⛴️ Fish Plaque 👁️ -->

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
                  You approach the dark statue and behold the visage of a large fish. Its mouth hangs 
                  slightly agape as it bares a row of small teeth at you. Its been rendered in a pleasing 
                  curve as if in the act of swimming nimbly through clear waters. Peering down from the fish's
                  bronze figure, you see a short plaque sitting on the concrete base.  
                </p>
                <blockquote>
                  <i><b>Salmo noctem</b></i>
                  The Night Salmon is the rare, delicious, and valuable species of salmon known for its 
                  obsidian, opalescent scales. This fish species is only found in the waters of Lake Nocta 
                  and was discovered by Lucien Duguay I in 1689. Nocta's town motto “Cum cetera finiuntur, 
                  nox manet”, as penned by Duguay, was inspired by the Salmo noctem. 
                </blockquote>
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
                  Looming at the end of the ruins stands a dark manor enclosed by a iron fence. 
                  You imagine once the building was quite beautiful — the ornate stone cornices 
                  and porticos enveloped in a lush frame of meticulously pruned shrubs and florals. 
                  But like every structure you've discovered so far, the building is a ghost of it 
                  former self — half-swallowed by hungry vines and crumbling at the edges. The wind 
                  howls through the shattered windows and the heavy wood front doors swing eerily in 
                  the weight of the breeze. The hinges squeak as the doors sway at a crawled pace. The 
                  unsettling sound beckons you towards the threshold, chillingly welcoming you to enter.
                </p>
              </template>

              <template #decision--1><div @click="showMansionFoyerModule()" class="module--decision--type type--uppercase--small">enter the manor</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Foyer 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionFoyerModule"
            key="mansionFoyerModule"
            title="the manor"
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
                  The floorboards moan under your footsteps as you step onto a musty red carpet and 
                  behold the manor's large interior. The foyer opens out to a grand spiral staircase 
                  with a long hallway hiding behind. Light floods in from the dirty windows, casting 
                  spotlights onto the piles of broken glass on the floor and intricate spider webs hung 
                  from the ceiling. Something rustles to your left and you see what you assume is a rat 
                  scurry from under one piece of detritus to another.  
                </p>
                <p>
                  The manor is half-collapsed. It appears that a support beam was somehow knocked free and it's
                  left most of the building inaccessible. But the path to the stairs and to the hallway beyond 
                  them remains clear for you to explore.  
                </p>
              </template>

              <template #decision--1><div @click="showMansionFloorOneModule()" class="module--decision--type type--uppercase--small">Head to the hallway</div></template>

              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Go upstairs</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>
              
          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Floor 1 👁️ -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionFloorOneModule"
            key="mansionFloorOneModule"
            title="the manor"
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
                  The hallway is dark and difficult to navigate, but you follow the path towards a light at 
                  its end. When you arrive, you stand before a pair of doors. On your left stands a sturdy set 
                  of double wooden doors framed with a pair of white and blue vases that must have been quite beautiful 
                  before their delicate surfaces were chipped. On your right stands an iron door that provides a 
                  welcome stream of light through its winding filigree. It must lead back outside.
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

        <!-- 🏠 Mansion Dining Room 👁️ -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionDiningModule"
            key="mansionDiningModule"
            title="the manor"
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
                  The doors give way with some effort on your part, leaving you catching your breath as 
                  you step into what looks to be a dining room. A long mahogany table sits at the center 
                  of the tall room, illuminated by a row of towering arched windows that open out to the lake. 
                  This room is in notably better shape than the rest of the house and you wonder if you're 
                  the first soul to enter it in a long while. 
                </p>
                <p>
                  There's a matching sideboard to the right of the table that looks to have a note lying on it.
                  You pluck the sealed envelope out from under a tarnished silver pitcher and read the words 
                  scrawled delicately on the yellowed paper. 
                </p>
                <blockquote><i>
                  Please be advised that Mister Duguay has requested that all keys to the Lady's chambers be promptly delivered to him. 
                  No copies shall remain for staff usage. This includes the spare key in the greenhouse shed. 
                  <br />
                  Regards, 
                  <br />
                  Penelope Seville, Head Housekeeper</i>
                </blockquote>
              </template>

              <template #decision--1><div @click="showMansionGreenhouseModule()" class="module--decision--type type--uppercase--small">Go to the greenhouse</div></template>
              
              <template #decision--2><div @click="showMansionFloorOneModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Greenhouse 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionGreenhouseModule"
            key="mansionGreenhouseModule"
            title="the manor"
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
                  The iron door groans as you push it outward. The passage reveals 
                  a small greenhouse, enclosed entirely in an intricate lattice of 
                  curved glass panes. Sun seeps through the shattered glass, though 
                  the hungry vines that crawl up the wall of glass swallow some of the 
                  the light.
                </p>
                <p>
                  The plants have all but reclaimed the old greenhouse. The herb pots are 
                  overwhelmed with long, dry curls of old branches and leaves. The flower 
                  beds spill out over the edge of the central pedestal. All the foliage is 
                  long past dead and the remains crunch under your boots as you wander deeper 
                  into the structure. 
                </p>
                <p v-if="!visitedDiningRoom">
                  You wander between the aisles of dead plants for a few minutes, looking for 
                  anything that might be of use. It's difficult to get a good look through the 
                  overgrowth, but, ultimately, there doesn't seem to be much to find here if 
                  you don't know what you're looking for.
                </p>
                <p v-if="visitedDiningRoom">
                   You recall the note you found in the dining room and begin to search 
                   for the key that the housekeeper mentioned. Your eyes scan the greenhouse 
                   for any sign of the aforementioned shed. After a moment, you spot a small 
                   enclosure nestled in the northeast corner. The door is half-obscured by a 
                   thick layer of ivy, but once you brush away the branches the handle reveals 
                   itself. You give the tarnished brass a tug and the dull glint of a large 
                   iron key catches your eye. You seize it and drop it in your pack for future use. 
                </p>
              </template>

              <template #decision--1><div @click="showMansionGreenhouseModule()" class="module--decision--type type--uppercase--small">Go to the greenhouse</div></template>
              
              <template #decision--2><div @click="showMansionFloorOneModule()" class="module--decision--type type--uppercase--small">Back inside</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Floor 2 👁️ -->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionFloorTwoModule"
            key="mansionFloorTwoModule"
            title="the manor"
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
                  You waiver as you climb the red carpeted stairs, the boards shifting precariously 
                  under the weight of your steps. Your hand hovers cautiously over the carved rail
                  as you carefully place your feet on each dusty platform. Part of you is surprised 
                  when you successfully reach the top of the steps without falling through one of 
                  fragile boards.  
                </p>
                <p>
                  The second floor of the manor is in a state of utter disrepair. The stairs 
                  sit at the center of an expansive hall of doors and what looks to be another 
                  stairwell up to another floor. But the ceiling has caved in, leaving the east 
                  side of the second floor and the other set of stairs completely inaccessible. 
                </p>
                <p>
                  As you look to the west wing, you notice that the walls are covered in a sickly 
                  green floral wallpaper that peels into curled ribbons. The pattern crawls up the 
                  bare wooden walls like a horde of paper-thin creatures. They frame the only two 
                  doors you're able to access like a pack of looming gargoyles. They watch you  
                  from their posts along the doors' carved cornices, silently guarding each entrance 
                  as you walk down the hall. 
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

        <!-- 🏠 Mansion Study 👁️ -->

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

                <!-- normal response -->

                <p v-if="!gotSeenLockedChest && !gotSeenUnlockedChest">
                  Your hand grips the cold brass handle and you push the door inward. On the other side, you
                  find yourself standing in a large octagonal room lined with full bookshelves that stretch 
                  all the way to the ceiling. There must be hundreds of books sitting in those dusty shelves, and 
                  several more sit atop a large wooden desk arranged at the center of a trio of large arched windows 
                  at the far end of the study.  
                </p>
                <p v-if="!gotSeenLockedChest && !gotSeenUnlockedChest">
                  The wall to the left of the desk sports an impressive collection of artwork meticulously placed 
                  in a pleasing array above a long cold fireplace. It's difficult to know where to begin your search 
                  for clues, but something about the hearth piques your interest.
                </p>

                <!-- locked chest response -->
                
                <p v-if="gotSeenLockedChest && !gotSeenUnlockedChest">
                  The painting was concealing a small enclave nestled into the walls of the study, 
                  and — even more thrilling still — an ornate chest lies perfectly untouched in the 
                  wooden niche. 
                </p>

                <!-- open chest response -->

                <p v-if="gotSeenLockedChest && gotSeenUnlockedChest">
                  The open silver chest sits right where you left it in it's niche.
                </p>
              </template>

              <template #decision--1>
                <div v-if="!gotSeenLockedChest && !gotSeenUnlockedChest" @click="showMansionStudyWallModule()" class="module--decision--type type--uppercase--small">Inspect the gallery wall</div>
                <div v-if="gotSeenLockedChest && !gotSeenUnlockedChest && !gotKeyItemChestKey" @click="showMansionStudyChestModuleLocked()" class="module--decision--type type--uppercase--small">Go to the chest</div>
                <div @click="showMansionStudyChestModuleUnlocked()" v-if="gotKeyItemChestKey && gotSeenLockedChest && !gotSeenUnlockedChest" class="module--decision--type type--uppercase--small">Use the key</div>
                <div v-if="gotSeenLockedChest && gotSeenUnlockedChest" @click="showMansionStudyChestModuleUnlocked()" class="module--decision--type type--uppercase--small">Look inside the chest</div>
              </template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study Wall 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionStudyWallModule"
            key="mansionStudyWallModule"
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
                <p>
                  Approaching the wall of paintings, you study the collection silently. At the 
                  center sits a large landscape of a serene lakeshore. The grass gleams with a 
                  gentle touch of dew as the morning sun reflects on the water's soft wakes. 
                </p>
                <p>
                  Flanking the lake, a pair of shadow portraits face the waters. The silhouetted profiles 
                  of a man and woman look upon the central painting from their gilded oval frames with their 
                  dignified chins lifted slightly upright. 
                </p>
                <p>
                  On the lady's right hangs a depiction of a noble carrack sailing unabashed through a 
                  tempestuous sea. Its gleaming cream sails billow with gusts of wind as it presses onward 
                  through the swirling waves. The plate attached to the decorated frame reads <i>La Bête de Mer</i>.
                </p>
                <p>
                  To the left of the man, a portrait of an elderly man is rendered richly in oil. He rests upon a 
                  silver cane as he watches you with a pair of serious gray eyes. The man sports a simple yet 
                  refined black coat that falls to his knees, adorned with a shining set of embossed silver buttons. 
                  You spot a signet ring on his left hand as it grasps a long feathered quill. 
                </p>
                <p>
                  On the mantle below the paintings, a large stuffed fish is displayed. Its dark black scales have 
                  been polished to shine with a rainbow of shimmering colors in the daylight, but the flesh around the
                  animal's mouth has started to recede, making the the creature quite unpleasant to look at despite the 
                  taxidermist's best attempts. Beside the fish stands an empty wooden mount with a pair of gilded hooks 
                  sitting idly on the front. It must have held some kind of small, decorative item at some point. The plate
                  below the empty hooks reads <i>For Nocta's light</i>.
                </p>
              </template>

              <template #decision--1><div v-if="gotLaraPaintingHint" @click="showMansionStudyChestModuleLocked()" class="module--decision--type type--uppercase--small">Remove the lake painting</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study Hidden Chest Locked 👁️ -->
        
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
                  Your heart races as you grasp the dust-covered edges of the central painting. 
                  Translucent strands of abandoned spider webs flutter onto your face as you pull the frame 
                  toward you and place it on the ground. You brush the webs away and your apprehensive eyes fall
                  upon the space hidden behind the lake. In awe, you discover that the painting was concealing a
                  small enclave nestled into the walls of the study, and — even more thrilling still — an ornate 
                  chest lies perfectly untouched in the wooden niche. 
                </p>
                <p>
                  Your hands reach out excitedly towards the chest, but, as your fingertips press into the cool 
                  silver surface, your eyes find the darkness of an expectant keyhole. It sits diligently waiting for the 
                  properly shaped key wards before it will release the latch and allow itself to open. 
                </p>
              </template>

              <template #decision--1 v-if="gotKeyItemChestKey"><div @click="showMansionStudyChestModuleUnlocked()" class="module--decision--type type--uppercase--small">Use the key</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Study Hidden Chest Unlocked 👁️ -->
        
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
                  The tarnished hinges of the chest lid squeak as you finally open the chest. 
                  There's a moment of disappointment when the stash it reveals contains neither 
                  jewels nor gold — merely a small collection of letters. As the disappointment 
                  subsides however, you begin to wonder what the letters must contain to warrant 
                  such a secure hiding spot.
                </p>
                <div class="long--response--container"><div class="long--response" @click="chestContents(1)" @mouseover="handleCursorHover(true)" @mouseleave="handleCursorHover(false)">
                      offcial envelope
                </div></div>
                <blockquote v-if="chestContentsRichard">
                  <p>Esteemed Mr. Duguay,</p>
                  <p>I must express my admiration for your fervent dedication to the pursuit of justice in the case of Mr. Falker's transgressions. However, my conscience remains steadfast in its refusal to condemn a man to the gallows for a crime as trifling as petty theft.</p>
                  <p>Nevertheless, I am acutely cognizant of the profound significance that your grandfather's signet ring holds, both for your esteemed family lineage and for the sanctity of our cherished township. Therefore, I shall mete out a suitable sentence that befits the actions of Mr. Falker.</p>
                  <p>In my deliberations, it appears to me that the gentleman in question can embark upon a path of redemption through an enduring commitment to the service of Nocta. As fortune would have it, Mr. Kraver finds himself in want of a new apprentice at the headlight. You are certainly aware of Mr. Kraver's...disposition. Thus, I am confident that the position will prove appropriately severe, thereby assuaging your righteous thirst for justice in this matter.</p>
                  <p>I wish to convey my unreserved appreciation for your steadfast partnership in the governance of our revered township, and I eagerly anticipate your continued benevolence in supporting our noble system of justice.</p>
                  <p>With utmost regard,</p>
                  <p><i>Richard Klein, Chief Justice</i></p>
                </blockquote>
                <div class="long--response--container"><div class="long--response" @click="chestContents(2)" @mouseover="handleCursorHover(true)" @mouseleave="handleCursorHover(false)">
                      Small envelope
                </div></div>
                <blockquote v-if="chestContentsEarl">
                  <p>Dear Mr. Duguay,</p>
                  <p>I am writing to thank you for your gracious invitation to your home this month. I offer my formal compliments to Mrs. Duguay for her excellent hosting.</p>
                  <p>Additionally, I hoped to affirm my deep concern regarding the salmon population in our beloved lake. As you are well aware, our exports of Salmo Noctem are in high demand in the southern regions of the state — we have even seen a demand growing for the scales and meat of the fish in states as south as New York.</p>
                  <p>That, dear mayor, is the heart of issue. Our local fishermen have run rampant to keep up with the demand and the quantity of night salmon is dwindling at a rapid rate. We now stand perilously close to a threshold beyond which the fish population may never recover. The Nocta economy relies heavily upon the night salmon as our prime export and I fear for the fate of our town if the species were pushed to extinction. Furthermore, the diminishing food supply has engendered a heightened state of unruliness among the lake's...local fauna, and fishermen find themselves faced with great peril upon each expedition into the deep waters.</p>
                  <p>If you are unwilling to embrace more stringent fishing restrictions, I implore you once again to consider allocating funds for research on the night salmon's breeding habits. There is still much we need to learn before we can establish a viable fish farming enterprise, and we remain sorely lacking in the necessary infrastructure to support such an endeavor.</p>
                  <p>I am aware of your adamance to exercise control over the night salmon population and confine farming operations solely within our township. However, I beseech you to reconsider Mr. Jenkins' proposition to introduce a portion of the population to Chamberlain Lake to preserve the species' existence.</p>
                  <p>Thank you for your consideration.</p>
                  <p>Regards,</p>
                  <p><i>Earl Morgenstern, Harbormaster</i></p>
                </blockquote>
                <div class="long--response--container"><div class="long--response" @click="chestContents(3)" @mouseover="handleCursorHover(true)" @mouseleave="handleCursorHover(false)">
                      Hastily folded letter
                </div></div>
                <blockquote v-if="chestContentsAlvin">
                  <p>Dear Mr. Duguay,</p>
                  <p>I pen this letter to provide you with an update concerning your request for an investigation into the threatening missive you recently received from an anonymous source. My dedicated team of officers has diligently examined the letter, and it is with a sense of confidence that we have identified a suitable suspect. For your reference, I have enclosed the original letter herewith.</p>
                  <p>Our accumulated evidence strongly implicates Ms. Falker as the likely perpetrator behind this audacious threat. Beyond the explicit danger to your own life, we have reason to believe that Ms. Falker is involved in the detestable practice of witchcraft, as evidenced by the presence of a hex within the aforementioned correspondence.</p>
                  <p>Locating Ms. Falker's residence has proven challenging — surely protected by her fiendish pact. However, it is precisely this protection that may serve as the key to her capture. Ms. Falker has employed arcane symbols to ward the divine light of God from her dark acts, but it is these very wards that shall guide us unerringly to her doorstep. Rest assured, swift action is imminent, as I intend to lead a contingent of officers, accompanied by the Prior, to apprehend her within a matter of days.</p>
                  <p>I extend my appreciation for your patience as we diligently pursued this matter. I eagerly anticipate bringing the full force of justice to bear upon this malevolent hag.</p>
                  <p>Signed,</p>
                  <p><i>Sheriff Alvin Canin</i></p>
                </blockquote>
                <p>
                  You see one final item in the chest nestled below the letters. The dark leather-bound book appears to be a journal, with entries written religiously over the course of a year.</p>
                <p>
                  Most of the entries are rather dull — discussions of coffers and infrastructure, records of meetings and travel plans. You thumb through the pages to get to the end, curious about the last entires that were written.
                </p>
                <div class="long--response--container"><div class="long--response" @click="chestContents(4)" @mouseover="handleCursorHover(true)" @mouseleave="handleCursorHover(false)">
                      Worn Journal
                </div></div>
                <blockquote v-if="chestContentsLucien">
                  <p><i>Feb 4</i><br>
                  <p>Lara has descended into a state of absolute lunacy. Her vexing demeanor has persisted since October, but news of Falker's disappearance reached her through some wretched servant whom I promptly discharged.</p>
                  <p>Night after night, she prattles on about forsaking me, forsaking our quiet abode to recklessly flee to the city. I fail to fathom her unwavering determination to depart when I provide her with every conceivable necessity, every fleeting desire. Although she possesses a captivating countenance, her capricious temperament has all but eroded any fondness for her I may have previously held.</p></p>
                  <p><i>Feb 6</i><br>
                  <p>She is utterly inconsolable. She is ravaged by madness. The impudent wretch discovered my correspondence with Klein, despite my repeated admonitions to never disturb the painting of the lake.</p>
                  <p>Her flagrant disregard for my esteemed family name, for our cherished heritage, for the future of Nocta, has ignited a blazing fury within me. I can no longer abide her insolence. She must face retribution. She must be dealt with.</p></p>
                </blockquote>
              </template>

              <template #decision--1></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom 👁️ -->

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
            :renderChecker="true"
            >
              <template #body--content--1> 
                <p v-if="!gotBedroomKey">
                  You stand before a heavy wooden door with an ornate brass handle. Unlike most of the manor, 
                  this room seems almost completely undisturbed. The frame is lined with dusty old cobwebs, 
                  but the wooden barrier is almost reverently undamaged — unmarred by neither scratches 
                  nor rot. As you reach for the handle, it becomes evident why: this door is locked. You'll 
                  have to find the proper key to get in.  
                </p>
                <p v-if="gotBedroomKey">
                  You insert the key and the lock gives way with a distinct 'click'. The door hinges squeak 
                  violently as you turn the handle to enter. The disruptive sound leaves your jaw tense as you
                  instinctually peer over your shoulder. You can't see anything in the hall or in the bedroom 
                  for that matter, but somehow you feel watched by some unseen force.   
                </p>
                <p v-if="gotBedroomKey">
                  The bedroom is illuminated by a pair of dirty windows, framed with ornate cobalt drapes 
                  that have turned a cool gray from sun exposure and a thick layer of dust. The air in here 
                  feels thin and cold despite the apparent lack of ventilation. 
                </p>
                <p v-if="gotBedroomKey">
                  There doesn't seem to be much in this room. The furniture has all been covered with thin white 
                  sheets and the bed has been stripped bare. It seems like this room has been empty for a long 
                  time — even longer than the town itself. Yet, you can't help but feel like there's a secret 
                  to uncover here. What could it be?
                </p>
                <p v-if="gotBedroomKey && haveWordsForLara">
                  You recall the watery memorial you found and wonder if these chambers belonged to the same 'Lady'. 
                  Perhaps she holds the key to whatever secret hides here — whoever she might be. 
                </p>
              </template>

              <template #puzzleChecker v-if="gotBedroomKey">
                <PuzzleScript @someEvent="puzzleGuessCheckLara" v-if="!laraGuessCorrect"/>
                <div class="type--reaction type-secondary">{{ laraGuessResponse }}</div>
              </template>

              <template #decision--1 v-if="gotBedroomKey && laraGuessCorrect"><div @click="showMansionBedroomLaraIntroModule()" class="module--decision--type type--uppercase--small">Call out to Lara</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom Lara Unlocked 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomLaraIntroModule"
            key="mansionBedroomLaraIntroModule"
            title="The bedroom"
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
                <p v-if="!gotSeenGallery">
                  You blink and suddenly a figure appears in the sunlight stream bleeding in from 
                  the nearest window. You jump back towards the door in surprise, your wide eyes 
                  watching the woman closely. Lara, you presume, is dressed in a stained nightgown 
                  that falls just above her bare ankles. Her long black hair falls in touseled ringlets 
                  down her back as she stands very still — her chest not even heaving as she wheezes 
                  out labored breaths.   
                </p>
                <p v-if="!gotSeenGallery">
                  You offer the woman a timid greeting, and she begins to speak as she faces towards 
                  the window. Her voice — dry and soft — whispers a refrain as if entranced.
                  <div class="long--response--container">
                    <div class="long--response">
                      “Tranquil waters I do see, but still the fire burns beneath. Do not move 
                      the water, Lara. Don’t look behind the water, Lara. There is nothing to 
                      see.”
                    </div>
                  </div>
                  You try to ask her to explain this, but it almost seems like she can't hear you. 
                  The woman simply repeats the words over and over as if you weren't there at all.
                </p>

                <p v-if="gotSeenGallery">
                  You can hear Lara's voice from the hall, her rasped incantation still spilling 
                  slowly out of her tired mouth.
                  <div class="long--response--container">
                    <div class="short--response">
                      “Tranquil waters I do see, but still the fire burns beneath. Do not move 
                      the water, Lara. Don’t look behind the water, Lara. There is nothing to 
                      see.”
                    </div>
                  </div>
                </p>
                <p v-if="gotSeenGallery">  
                  When you enter the room this time, however, Lara is staring right at you. Your 
                  breath catches as your horrified eyes make contact with the uncanny black voids
                  in her skull. You find yourself unable to look away even as your feet pull you back 
                  towards the threshold. Yet, when your palms find the wood behind your back, you realize 
                  Lara has made no move to attack you.   
                </p>
                <p v-if="gotSeenGallery">  
                  In your momentary respite, your eyes wander away from hers to see that a dagger has been 
                  plunged into the woman's chest. A stream of red soils the white of her gown, yet the wound 
                  appears centuries old as her blood sits congealed at the hilt.       
                </p>
                <p v-if="gotSeenGallery && gotSeenGraveyard">  
                  You remember the strange grave you saw in the churchyard. Could the dagger in Lara's chest 
                  be the match for its indentation? 
                </p>
              </template>

              <!-- 👋 Going to change this to a puzzle checker to ask for dagger -->
              
              <template #decision--1 v-if="gotSeenGallery == true && gotSeenGraveyard == true"><div @click="showMansionBedroomLaraDaggerModule()" class="module--decision--type type--uppercase--small">Ask Lara for the dagger</div></template>
              
              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom Lara Unlocked & You need the dagger 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomLaraDaggerModule"
            key="mansionBedroomLaraDaggerModule"
            title="The bedroom"
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
                  You almost expect the specter to ignore your request, but this question provokes 
                  an alarming response. The woman wails violently, her hands writhing as she reaches 
                  for the gilded hilt. She screams as if the object had just been plunged in, and her 
                  agonized cries only deepen as the knife slides out of her decayed flesh. As she pulls 
                  the weapon free, she roars at you in a rage, sending the object clattering towards the 
                  ground at your feet. Finally, she speaks to you for the first time. 
                  <div class="type--reaction type-secondary">“pain...PAIN....—....take...TAKE....—....GO”</div> 
                  You wince as she twitches with notable anguish and you find yourself feeling equal parts 
                  sympathy and fear as you watch her. A moment later, you feel it safe enough to retrieve 
                  the item you so boldly asked her to relinquish. 
                  <div class="type--reaction type-secondary">“...thank you”</div> 
                  You softly say to the ghost, watching her closely as you gingerly reach down and collect 
                  the bloodied dagger off the floor. 
                </p>
              </template>

              <template #decision--1></template>

              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 🏠 Mansion Bedroom Lara Unlocked & You don't need to speak to her again 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="mansionBedroomDoneModule"
            key="mansionBedroomDoneModule"
            title="The bedroom"
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
                  You peek back into the bedroom and see the frail woman still twitching. 
                  She's mumbling something incoherent until she spots you. As her empty eyes 
                  fall upon you, she begins to wail once more. 
                  <div class="type--reaction type-secondary">“YOU—...go...LEAVE — ....needed....ELSEwhere — needed NEEDED”</div>
                </p>
              </template>

              <template #decision--1></template>

              <template #decision--2><div @click="showMansionFloorTwoModule()" class="module--decision--type type--uppercase--small">Back to the hall</div></template>
              
              <template #decision--3><div @click="hideModule()" class="module--decision--type type--uppercase--small">Leave</div></template>

          </ContentModal>
        </transition>

        <!-- 📰 Newspaper 👁️ -->

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
                  As you wander through the empty ruins, you see an old newspaper on the ground here, caught under the weight of a loose piece of wood. 
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
          <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/town.png"></image>
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
          <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/town.png"></image>
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
            <image width="5082" height="2250" xlink:href="https://dani-sundell.github.io/explore-nocta/imgs/town.png" opacity="0"></image>
            
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

            <rect x="1970" y="1750" fill="#aaff33" opacity="0" width="135" height="132" @mouseover="handleCursorHover(true)" 
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
      laraGuessCorrect: false,
      laraGuessResponse: '',
      laraAnswer: 'Lara',
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

      /* Chest contents */

      chestContentsRichard: false,
      chestContentsEarl: false,
      chestContentsAlvin: false,
      chestContentsLucien: false,

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
          this.checkHaveVisitedDiningRoom();
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

        /* Key item and event triggers */

        this.visitedGreenhouse = true;
        
        if (this.visitedDiningRoom === true) {
        this.$emit('got-bedroom-key');
        this.gotBedroomKey = true;
      }
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
          this.laraGuessResponse = ''
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
          this.secondFloorDoor = "The bedroom";
        } else {
          this.secondFloorDoor = "Wooden door";
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
        this.laraGuessResponse = '';
        this.headstoneOne = false;
        this.headstoneTwo = false;
        this.headstoneThree = false;
        this.headstoneFour = false;
        this.headstoneFive = false;
        this.headstoneSix = false;
        this.headstoneSeven = false;
        this.headstoneEight = false;
        this.headstoneNine = false;
        this.headstoneTen = false;
        this.headstoneEleven = false;
        this.headstoneTwelve = false;
        this.headstoneThirteen = false;
        this.headstoneFourteen = false;
        this.headstoneFifteen = false;
      },
        handleCursorHover(s) {
        this.hover = s;
        this.cursorActive = s;
        // console.log('hover check');
      },
      puzzleGuessCheckLara(event) {
        console.log(event.toLowerCase())
        if(event.toLowerCase()===this.laraAnswer.toLowerCase()) {
          this.laraGuessCorrect = true
          this.laraGuessResponse = 'yes! that\'s it.'
          // this.$emit('get-unlocked-sound');
        } else {
          this.laraGuessResponse = 'hmm, that\'s not right.'
          this.laraGuessCorrect = false
          // this.$emit('get-chain-sound');
        }
      },

      /* unlocked chest contents */
      
      chestContents(s) {
        if (s === 1 && this.chestContentsRichard === false) {
          this.chestContentsRichard = true
          this.chestContentsEarl = false
          this.chestContentsAlvin = false
          this.chestContentsLucien = false
        } else if (s === 2 && this.chestContentsEarl === false) {
          this.chestContentsEarl = true
          this.chestContentsRichard = false
          this.chestContentsAlvin = false
          this.chestContentsLucien = false
        } else if (s === 3 && this.chestContentsAlvin === false) {
          this.chestContentsAlvin = true
          this.chestContentsRichard = false
          this.chestContentsEarl = false
          this.chestContentsLucien = false
        } else if (s === 4 && this.chestContentsLucien === false) {
          this.chestContentsLucien = true
          this.chestContentsRichard = false
          this.chestContentsEarl = false
          this.chestContentsAlvin = false
        } else if (s === 1 && this.chestContentsRichard === true) { 
          this.chestContentsRichard = false
          console.log('toggle off!')
        } else if (s === 2 && this.chestContentsEarl === true) { 
          this.chestContentsEarl = false
        } else if (s === 3 && this.chestContentsAlvin === true) { 
          this.chestContentsAlvin = false
        } else if (s === 4 && this.chestContentsLucien === true) { 
          this.chestContentsLucien = false
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
          this.gotSeenGraveyard = true;
          this.$emit('got-seen-graveyard');
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