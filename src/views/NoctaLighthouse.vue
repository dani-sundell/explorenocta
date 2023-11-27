<!-- 

  ON THIS PAGE:
  - 💡 'lighthouse'
  - 🏚️ 'keeper's house'
  - 🔎 'spyglass'
  - 🔪 'knife'

  TO DO:
  - Dialouge if user has seen fish then knife
  - Emit journal entries 
    - Knife
    - Spyglass

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

        <!-- 💡 Lighthouse 👁️-->
        
        <transition name="label" mode="out-in">
          <ContentModal
            v-if="headlightModule"
            key="headlightModule"
            title="the lighthouse"
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
                <p v-if="!gotSeenKraver">
                  Trekking up a rocky slope leads you to the site of a lighthouse 
                  in decay. Withered vines crawl up the crumbling exterior mired 
                  by what appears to be years of neglect and disrepair. Despite 
                  its obvious state of abandonment, you notice a faint set of 
                  footprints rounding the ruinous foundation.
                </p>
                <p v-if="gotSeenKraver">
                  As you approach the looming lighthouse, your stomach lurches,
                  remembering the horror you ran from that lies trapped behind 
                  the latched dock. You're not even sure why you returned when 
                  the weak padlock is the only thing standing between you and 
                  that...creature. Best continue the search elsewhere. 
                </p>
              </template>

              <template #decision--1 v-if="!gotSeenKraver">
                <div @click="showHeadlightModuleLocked(true)" class="module--decision--type type--uppercase--small">
                  inspect the other side
                </div></template>

              <template #decision--2>
                <div @click="hideModule" class="module--decision--type type--uppercase--small">
                  leave
                </div>
              </template>
              
              <template #decision--3>
                <div class="module--decision--type type--uppercase--small">
                  give up
                </div>
              </template>

          </ContentModal>
        </transition>

        <!-- 💡 Lighthouse Locked 👁️-->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="headlightModuleLocked"
            key="headlightModuleLocked"
            title="the lighthouse"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="false"
            :renderChecker="true"
            >
              <template #body--content--1> 
                <p>
                  The backside of the old lighthouse is in even worse shape, you notice 
                  as you carefully wind around to the other side of the structure. The 
                  north side of the headlight sits precariously close to the edge of a 
                  sharp cliff, dropping several dozen feet below into the dark waters 
                  of the desolate lake.
                </p>
                <p>
                  A rusty door sits closed parallel to the cliff’s edge, leaving you 
                  mere yards away from the precipice. The oxidized threshold has clearly 
                  been disturbed recently, made evident to you by small flakes of sickly 
                  orange trembling in the breeze amongst sparse tufts of yellowed grass 
                  near the doorway. Yet, a heavy chain looped through the handle seals 
                  the entrance with a padlock and you don’t know the combination.
                </p>
                <p>
                  You can’t help but fear your friend is locked inside. Maybe the combination
                  is around here somewhere.
                </p>
              </template>

              <template #body--content--2>
              </template>

              <template #puzzleChecker>
                <PuzzleScript @someEvent="puzzleGuessCheck" v-if="!lighthouseGuessCorrect"/>
                <div class="type--reaction type-secondary">{{ lighthouseGuessResponse }}</div>
              </template>

              <template #decision--1 v-if="lighthouseGuessCorrect"><div @click="showHeadlightModuleUnlocked(true)" class="module--decision--type type--uppercase--small">enter the lighthouse</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 💡 Lighthouse Unlocked 👁️-->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="headlightModuleUnlocked"
            key="headlightModuleUnlocked"
            title="the lighthouse"
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
                  The chain falls away and you lean into the door to shove 
                  the heavy steel free from the frame. The door scrapes against 
                  the concrete as you push your weight against it. Light floods 
                  the dark, circular room and your head slowly tilts up to marvel 
                  at the steep set of winding metal stairs.
                </p>
              </template>

              <template #decision--1><div @click="showHeadlightModuleUpstairs" class="module--decision--type type--uppercase--small">climb the stairs</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>
        
        <!-- 💡 Lighthouse Upstairs 👁️-->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="headlightModuleUpstairs"
            key="headlightModuleUpstairs"
            title="the lighthouse"
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
                  You call your friend’s name up into the darkness, your timid voice echoing 
                  back hollow in your ears. There’s no reply, but you can see a light at the 
                  top of the spiral stairs that beckons you up.
                </p>
                <p>
                  Your shoes clank against the metal steps as you climb your way to the top 
                  of the structure. When you finally reach the end of the stairs, a vast vista 
                  sits before you through the cloudy panes of glass enclosing the massive central 
                  bulb. A strange smell flows through your nose — something bitter and sharp you 
                  can’t quite place. Stricken with unease, you survey the area with urgency so you 
                  can quickly retreat to the ground. You spot a small table to the left, and you 
                  veer around the light to reach it. 
                </p>
                <p>
                  The table follows the curve of the lighthouse windows, holding a collection of 
                  dusty ephemera: a flaking leather flask, a faded sheet of nautical coordinates, 
                  and a simple brass spyglass, propped up on a trio of rusty legs. On the page of 
                  nautical coordinates the words 
                </p>
                  <div class="type--reaction type-secondary">“Do you see her?”</div>
                <p>
                  are scrawled in an erratic heavy hand.
                </p>
              </template>

              <template #decision--1><div @click="showHeadlightModuleSpyglass" class="module--decision--type type--uppercase--small">Look through the spyglass</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 💡 Lighthouse Spyglass 👁️-->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="headlightModuleSpyglass"
            key="headlightModuleSpyglass"
            title="the lighthouse"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>
                  It’s impossible to move the device from its pedestal; its 
                  mechanism is rusted and stiff. You lean down and peer through 
                  the glass, and a strange monolith comes into view. It appears 
                  to be a nautical structure floating in the dark, swaying waters. 
                  You’d hardly think much of it, but you feel your stomach lurch 
                  as you read the unmistakable words painted onto a red flag hanging 
                  from the top of the stone:
                  <div class="type--reaction type-secondary">“Come.”</div> 
                </p>
              </template>

              <template #decision--1><div @click="showHeadlightModuleKraver" class="module--decision--type type--uppercase--small">Back away from the spyglass</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 💡 Lighthouse Kraver 👁️-->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="headlightModuleKraver"
            key="headlightModuleKraver"
            title="the lighthouse"
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
                  When you pull away from the spyglass, you notice something 
                  moving in your peripheral on the right. Your breath hitches 
                  as you spin towards the movement, and outstretch your hands 
                  defensively. You come face-to-face with a horrific site: a 
                  rotting skeleton propped up against the wall. The remains are 
                  well-decomposed, but the thick scent you noticed before was 
                  certainly the stench of this unruly corpse. The bones are hardly 
                  intact, with the limbs distinctly missing from the skeleton’s 
                  torso and scattered on the ground around it. Scraps of gray, 
                  tattered flesh hang off the yellowed bones of the corpse’s ribcage, 
                  but the bones on the ground are alarmingly clean. Your eyes look 
                  upon the sight wide with horror as you realize there appear to be 
                  bite marks in the limb bones — as if hungrily gnawed clean.
                </p>
                <p>
                  You stand frozen in fear for too long, and the source of the movement you saw makes its presence known. A frail, burly man crawls on all fours as he rounds the light, his black, hollow eyes peering up at you from under a tattered sou’wester. Your feet pull you back into the table as he opens his mouth at you — his collection of sharp, splintered teeth barred and threatening.
                </p>
                <p>
                  “Did...” he wheezes.
                </p>
                  <div class="type--reaction type-secondary">“Did you see...her?"</div> 
                <p>
                  The ghoul cackles like a clap of crackled thunder as he inches closer and closer to you.
                </p>
              </template>

              <template #decision--1><div @click="hideModule" class="module--decision--type type--uppercase--small">do something</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">run</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>


        
          
        <!-- 🗒️ Notice 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="noticeModule"
            key="noticeModule"
            title="Notice"
            :renderBigImg="true"
            :renderInlineImg="false"
            :renderHeadline="false"
            bigImg=" https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                You find an old notice on the ground. Maybe you shouldn't be here?
              </template>

              <template #body--content--2>
              </template>

              <template #decision--1 v-if="lighthouseGuessCorrect"><div @click="showNoticeModule(true)" class="module--decision--type type--uppercase--small">enter the lighthouse</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏚️ Keeper's House 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="windowModule"
            key="windowModule"
            title="the keeper's house"
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
                  The lighthouse neighbors a small, lonely keeper’s house. The exterior is faded and brittle as the dehydrated planks splinter and crack along the path of the wood grain. The breeze whistles through the shattered panes of cloudy glass. Your skin prickles from the chill when you notice something hanging between the shards of broken glass. 
                </p>
                <p>
                  Taking a closer look, you pluck what appears to be the thick jersey cotton of a red garment. Though clearly ripped away from the rest of the fabric, it’s apparent this item hasn’t been here long. Wasn’t your friend wearing a red hoodie when you last saw them?
                </p>
              </template>

              <template #decision--1><div @click="showWindowModuleInterior(true)" class="module--decision--type type--uppercase--small">inspect inside the house</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏚️ Keeper's House Interior 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="windowModuleInterior"
            key="windowModuleInterior"
            title="the keeper's house"
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
                  There’s a knot in your stomach as you find the door on the west side of the building in even worse condition. The door is latched into the frame, yet the surface is littered with splintering gashes and scrapes. Some of the larger wounds have been patched over with haphazardly-placed planks of scrap wood nailed into the original structure. You can feel your will to continue the search for your friend slipping the longer you observe its unsettling  condition, so with a deep, wavering breath your hand finds the icy iron handle and turns.
                </p>
                <p>
                  The cabin is cold and dark as you slowly enter. The wood groans with each step, threatening to shatter under your weight. Light helpfully pours in from the opened windows, and you can see the outline of most of the objects in the room. 
                </p>
                  <div class="type--reaction type-secondary">“...h-hello?”</div>
                <p>
                  you call out, but only the whistling wind replies. 
                </p>
                <p>
                  The interior matches the exterior, you find, as your eyes scan across a sea of broken bottles, mangled furniture, and dark smears. Taking in the ghastly scene, the air in the structure feels suddenly thick and difficult to inhale. A sense of urgency overcomes you as you search among the detritus for a meaningful clue that will help you locate your friend.
                </p>
              </template>

              <template #decision--1><div @click="showWindowModuleNewspaper(true)" class="module--decision--type type--uppercase--small">Check out the table</div></template>

              <template #decision--2><div @click="showWindowModuleJournal(true)" class="module--decision--type type--uppercase--small">Look by the cots</div></template>
              
              <template #decision--3><div @click="showWindowModuleKnife(true)" class="module--decision--type type--uppercase--small">Inspect the floor</div></template>

          </ContentModal>
        </transition>

        <!-- 🏚️ Keeper's House Newspaper 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="windowModuleNewspaper"
            key="windowModuleNewspaper"
            title="the keeper's house"
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
                <p>There’s a table in the center of the room surrounded by a pair of broken, overturned chairs. There isn’t much of note nearby, but you do find an interior page of the Northman’s Herald sitting beneath an empty bottle. Most of the articles are mundane reports of county-ongoings, but one brief catches your eye.</p>
                <blockquote>
                <p>In the enigmatic lakeside town of Nocta, ME, fear grips the fishing community as reports emerge of mysterious disappearances on the lake. Fishermen speak of violent boat-rocking encounters, near misses, and haunting growls. Local authorities urge caution, posting warning signs about the unknown disturbance tormenting the local fisheries. The lake's secrets remain shrouded in mystery, but locals have given a name to what they believe is a powerful creature hunting lake-goers: Nina.</p>
                </blockquote>
              </template>

              <template #decision--1><div @click="showWindowModuleInterior(true)" class="module--decision--type type--uppercase--small">look around more</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏚️ Keeper's House Journal 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="windowModuleJournal"
            key="windowModuleJournal"
            title="the keeper's house"
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
                <p>There’s a pair of cots at the far end of the room that seem somehow slept in, despite the inhospitable nature of the cabin. Each is neighbored by a small stool — a makeshift beside table it appears. On one of the stools sits a small well-worn, leather journal with several entries. You skim over most of the contents, which detail presumably the lighthouse keeper’s stay here.</p>
                <blockquote>
                  <p><i>Oct 12</i><br>
                  The judge delivered my sentence this morning — I am to apprentice with Kraver to become the next lighthouse keeper. Not a life I would have chosen, though it is a fate kinder than execution, I suppose.</p>
                  <p><i>Nov 4</i><br>
                  Kraver is a disagreeable man. It is not an easy feat living alone with him in this suffocating cabin. Nightly, I long to see Lara. I often imagine I can see her as I look upon the town across the lake from the top of headlight.</p>
                  <p><i>Jan 4</i><br>
                  A storm hit two days ago. It's the worst we've seen in years. Power is out, radio towers are down, and we're trapped. It’s just me am Kraver stationed at the headlight. We thought help would come, but it hasn't. We're on our own.</p>
                  <p><i>Jan 8</i><br>
                  The days blend together as we wait for rescue. Supplies are dwindling, and we're growing desperate. Kraver isn't himself anymore. He paces around the dying fire, muttering and shaking his head. I can see the madness creeping into his eyes. He's become paranoid, thinking I'll kill him for food. He sleeps with an axe by his side now. I don't know how much longer we can hold on.</p>
                  <p><i>Jan 14</i><br>
                  No sign of rescue. The isolation is driving us to the brink. No more food. I can't wait here to starve or freeze to death. I’m taking Kraver’s axe and heading west for the highway. If this is my last day on earth, I thought of you until the end, Lara.</p>
                  </blockquote>
                  <p>The journal ends here.</p>
              </template>

              <template #decision--1><div @click="showWindowModuleInterior(true)" class="module--decision--type type--uppercase--small">look around more</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🏚️ Keeper's House Knife 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="windowModuleKnife"
            key="windowModuleKnife"
            title="the keeper's house"
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
                <p>Among the scattered shards of fragmented ceramic plates and amber glass, you see a small carving knife on the floor. The hilt is stained with the same dark smudges that cover other surfaces in the room, but you can’t help but feel having it would be useful.</p> 
                <p>Gingerly, you pick up the knife and take it with you.</p>
              </template>

              <template #decision--1><div @click="showWindowModuleInterior(true)" class="module--decision--type type--uppercase--small">look around more</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>

        <!-- 🎖️ Plaque 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="plaqueModule"
            key="plaqueModule"
            title="The Nocta Headlight"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                <p>There’s an inconspicuous stone monolith to the right of the lighthouse that houses a small plaque. It must have been brass once, you think, but now the embossed letters appear as dark and grainy as crude iron.</p><blockquote>
                <p>The Nocta headlight was built in 1865 as a beacon to welcome visitors by land and sea to the town. Funded by the Duguay family, the lighthouse became a symbol of the town and helped dramatically reduce the number of shipwrecks that occurred frequently in the 16th century.</p>
                </blockquote>
              </template>

              <template #decision--1 v-if="lighthouseGuessCorrect"><div @click="showNoticeModule(true)" class="module--decision--type type--uppercase--small">enter the lighthouse</div></template>

              <template #decision--2><div @click="hideModule" class="module--decision--type type--uppercase--small">leave</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">give up</div></template>

          </ContentModal>
        </transition>        

        <!-- 🪵 Woodstack 👁️ -->

        <transition name="label" mode="out-in">
          <ContentModal
            v-if="woodchopModule"
            key="woodchopModule"
            title="Wood pile"
            :renderBigImg="true"
            :renderInlineImg="false"
            :renderHeadline="false"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/wood.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="false"
            :renderDecision2="false"
            :renderDecision3="false"
            :renderChecker="false"
            >
              <template #body--content--1> 
                There’s a stack of wood here that seems to be recently chopped, but the axe is nowhere to be found. 
              </template>

              <template #decision--1 v-if="lighthouseGuessCorrect"><div @click="showNoticeModule(true)" class="module--decision--type type--uppercase--small">enter the lighthouse</div></template>

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
          <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/lighthouse-no-fade.jpg"></image>
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
          <image width="5082" height="2250" xlink:href="https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/lighthouse-fade.jpg"></image>
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
            
            <!-- headlight -->

            <rect x="2590" y="0" fill="#fff" opacity="0" width="530" height="2040" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showHeadlightModule"> 
            </rect>

            <!-- house -->

            <rect x="1650" y="1370" fill="#fff" opacity="0" width="940" height="770"
            @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showWindowModule"> 
            </rect>

            <!-- notice -->

            <rect x="2990" y="2040" fill="#fff" opacity="0" width="120" height="120" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showNoticeModule"> 
            </rect>

            <!-- plaque -->

            <rect x="3520" y="1850" fill="#fff" opacity="0" width="170" height="252" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showPlaqueModule"> 
            </rect>

            <!-- woodcut -->

            <rect x="1205" y="2020" fill="#fff" opacity="0" width="345" height="166" @mouseover="handleCursorHover(true)" 
            @mouseleave="handleCursorHover(false)"
            @click="showWoodchopModule"> 
            </rect>                        

        </svg>

      </div>
    </div>
  </main>
</template>

<script>


export default {
  props: {
    haveGotSeenKraver: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenSpyglass: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotKeyItemKnife: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenLighthouse: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenJournal: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenNewspaper: { 
          type: Boolean
        },  /* 🤝 Dependency prop from App */
    haveGotSeenKeepersHouse: { 
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
      
      // headline modules
      headlightModule: false,
      headlightModuleLocked: false,
      headlightModuleUnlocked: false,
      headlightModuleUpstairs: false,
      headlightModuleSpyglass: false,
      headlightModuleKraver: false,
      // window modules
      windowModule: false,
      windowModuleInterior: false,
      windowModuleNewspaper: false,
      windowModuleJournal: false,
      windowModuleKnife: false,
      // notice module
      noticeModule: false,
      // plaque module
      plaqueModule: false,
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
      
      gotSeenSpyglass: false, /* ✅ Emitted to journal & PROPS */ 
      gotSeenKraver: false, /* ✅ Emitted to journal & PROPS */ 
      gotSeenLighthouse: false, /* ✅ Emitted to journal & PROPS */ 
      gotSeenKeepersHouse: false, /* ✅ Emitted to journal & PROPS */ 
      gotSeenJournal: false, /* ✅ Emitted to journal & PROPS */ 
      gotSeenNewspaper: false, /* ✅ Emitted to journal & PROPS */ 
      gotKeyItemKnife: false, /* ✅ Emitted to journal & PROPS */ 
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
/*       activate() {
        var that = this;
        setTimeout(function() { 
          that.lighthouseFade = true;
          }, 2000);
      }, */
      changeObjective(){
        if(this.playerCheckedLighthouse == true) {
          this.playerObjective = 'Open the lighthouse'
        } else {
          this.playerObjective = 'Explore your surroundings'
        }
      },
      showNoticeModule() {
        this.noticeModule = true;
        this.moduleOn = true;
      },
      showPlaqueModule() {
        this.plaqueModule = true;
        this.moduleOn = true;
      },
      showWoodchopModule() {
        this.woodchopModule = true;
        this.moduleOn = true;
      },
      showHeadlightModuleLocked() {
        this.headlightModule = false;
        this.headlightModuleLocked = true;
        this.headlightModuleUnlocked = false;
        this.headlightModuleUpstairs = false;
        this.headlightModuleSpyglass = false;
        this.headlightModuleKraver = false;
        this.moduleOn = true;
        this.$emit('got-seen-lighthouse')
      },
      showHeadlightModuleUnlocked() {
        this.headlightModule = false;
        this.headlightModuleLocked = false;
        this.headlightModuleUnlocked = true;
        this.headlightModuleUpstairs = false;
        this.headlightModuleSpyglass = false;
        this.headlightModuleKraver = false;
        this.moduleOn = true;
      },
      showHeadlightModuleUpstairs() {
        this.headlightModule = false;
        this.headlightModuleLocked = false;
        this.headlightModuleUnlocked = false;
        this.headlightModuleUpstairs = true;
        this.headlightModuleSpyglass = false;
        this.headlightModuleKraver = false;
        this.moduleOn = true;
      },
      showHeadlightModuleSpyglass() {
        this.headlightModule = false;
        this.headlightModuleLocked = false;
        this.headlightModuleUnlocked = false;
        this.headlightModuleUpstairs = false;
        this.headlightModuleSpyglass = true;
        this.headlightModuleKraver = false;
        this.gotSeenSpyglass = true;
        this.$emit('got-seen-spyglass');
        this.moduleOn = true;
      },
      showHeadlightModuleKraver() {
        this.headlightModule = false;
        this.headlightModuleLocked = false;
        this.headlightModuleUnlocked = false;
        this.headlightModuleUpstairs = false;
        this.headlightModuleSpyglass = false;
        this.headlightModuleKraver = true;
        this.gotSeenKraver = true;
        this.$emit('got-seen-kraver');
        this.moduleOn = true;
      },
      showHeadlightModule() {
        this.headlightModule = true;
        this.headlightModuleLocked = false;
        this.headlightModuleUnlocked = false;
        this.headlightModuleUpstairs = false;
        this.headlightModuleSpyglass = false;
        this.headlightModuleKraver = false;
        this.moduleOn = true;
        this.checkHaveGotSeenKraver();
        this.checkHaveGotSeenSpyglass();
      },
      showWindowModule() {
        this.windowModule = true;
        this.windowModuleNewspaper = false;
        this.windowModuleJournal = false;
        this.windowModuleKnife = false;
        this.moduleOn = true;
        this.gotSeenKeepersHouse = true;
        this.$emit('toggle-wind-sounds');
        this.$emit('got-seen-keepers-house');
        this.checkHaveGotKeyItemKnife();
        this.checkHaveGotSeenJournal();
        this.checkHaveGotSeenNewspaper();
      },
      showWindowModuleInterior() {
        if (this.windowModule == true) {
          this.$emit('toggle-wood-sounds');
          this.windowModuleInterior = true;
          this.windowModule = false;
        } if (this.windowModuleNewspaper == true || this.windowModuleJournal == true || this.windowModuleKnife == true) {
          this.moduleOn = false;
          this.windowModuleInterior = false;
          this.windowModule = false;
          this.windowModuleNewspaper = false;
          this.windowModuleJournal = false;
          this.windowModuleKnife = false;
          setTimeout(() => {
            this.moduleOn = true;
            this.windowModuleInterior = true;
            console.log('timeout check')
          }, "250");
        }
      },
      showWindowModuleNewspaper() {
        this.windowModuleNewspaper = true;
        this.windowModuleInterior = false;
        this.moduleOn = true;
        this.gotSeenNewspaper = true;
        this.$emit('got-seen-newspaper')
      },
      showWindowModuleJournal() {
        this.windowModuleJournal = true;
        this.windowModuleInterior = false;
        this.moduleOn = true;
        this.gotSeenJournal = true;
        this.$emit('got-seen-journal')
      },
      showWindowModuleKnife() {
        this.windowModuleKnife = true;
        this.windowModuleInterior = false;
        this.moduleOn = true;
        this.gotKeyItemKnife = true;
        this.$emit('got-key-item-knife')
      },
      hideModule() {
        this.headlightModule = false;
        this.headlightModuleLocked = false;
        this.headlightModuleUnlocked = false;
        this.headlightModuleUpstairs = false;
        this.headlightModuleSpyglass = false;
        this.headlightModuleKraver = false;
        this.windowModule = false;
        this.windowModuleInterior = false;
        this.windowModuleNewspaper = false;
        this.windowModuleJournal = false;
        this.windowModuleKnife = false;
        this.noticeModule = false;
        this.plaqueModule = false;
        this.woodchopModule = false;
        this.moduleOn = false;
        this.lighthouseGuessResponse = ''
        this.$emit('toggle-wind-sounds-off');
        this.$emit('toggle-wood-sounds-off');
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
      checkHaveGotSeenLighthouse(){
        if(this.haveGotSeenLighthouse == true) {
          this.gotSeenLighthouse = true
        }
      },
      checkHaveGotSeenLighthouse(){
        if(this.haveGotSeenKeepersHouse == true) {
          this.gotSeenKeepersHouse = true
        }
      },
      checkHaveGotSeenJournal(){
        if(this.haveGotSeenJournal == true) {
          this.gotSeenJournal = true
        }
      },
      checkHaveGotSeenNewspaper(){
        if(this.haveGotSeenNewspaper == true) {
          this.gotSeenNewspaper = true
        }
      },
      checkHaveGotSeenKraver(){
        if(this.haveGotSeenKraver == true) {
          this.gotSeenKraver = true
        }
      },
      checkHaveGotSeenSpyglass(){
        if(this.haveGotSeenSpyglass == true) {
          this.gotSeenSpyglass = true
        }
      },
      checkHaveGotKeyItemKnife(){
        if(this.haveGotKeyItemKnife == true) {
          this.gotKeyItemKnife = true
        }
      },
    },
  beforeMount(){
    this.checkHaveGotSeenLighthouse()
  }
};
</script>