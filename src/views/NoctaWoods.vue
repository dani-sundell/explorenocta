
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
                  Rachel's crimson sweatshirt — dangling by a single nail plunged through the tip of the hood into the cabin's 
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
                  Your eyes grow wide as she says this, the knife shifting as your grip tightens around its hilt. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "The price I have paid to live to see my vengeance wrought is silence. I cannot speak the truth to you."
                </p>
                <p>
                  The woman points a wavering finger at you, the yellowed-nail as sharp and long as a talon. You swallow hard, an anxious twist gnawing mercilessly at your stomach. 
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
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1 v-if="!GameOver"> 
                <p>
                  The woman bares her teeth in a sinister grimace you think was meant to be a smile, but it brings no comfort, rendering your skin shivering with terror.
                </p>
                <p class="type-secondary type--quotations--small">
                  "Good. Now, tell me of the Lake. What is its truth?"
                </p>
                <p style="text-align: center;" v-if="CabinWrongAnswer">
                  <div class="span-red type--wrong--answer type-secondary">Wrong.</div>
                  Try again. Err once more and death will befall you.
                </p>
              </template>

              <template #body--content--2 v-if="GameOver">
                <p>
                </p>
                <p class="span-red type-secondary type--reaction">
                  You are dead.
                </p>
              </template>

              <template #decision--1><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">It's full of smelly fish</div></template>

              <template #decision--2><div @click="playerQuizGuessLake(2)" class="module--decision--type type--uppercase--small">A beast lurks in the waters</div></template>
              
              <template #decision--3><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">It's the town's most important commodity</div></template>

          </ContentModal>
          
          <ContentModal
            v-if="CabinTownModule"
            key="CabinTownModule"
            title="the cabin"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1 v-if="!GameOver"> 
                <p>
                  The woman seems satisfied with your answer, but she cares to elaborate. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "You have seen her then? Poor creature."
                </p>
                <p>
                  She turns towards the firelight for a moment, her eyes swimming with a mist — you can't say if it's due to her advanced age or some kind of emotion brewing.   
                </p>
                <p class="type-secondary type--quotations--small">
                  "What else would she feast on but men, when it was men who emptied the night salmon in hordes? Now the lake is but a shell, a casket where the sweet beast will slowly rot."
                </p>
                <p>
                  Her head shakes, the gray frizz rattling as she wheezes out a labored sigh.   
                </p>
                <p class="type-secondary type--quotations--small">
                  "Now for the Town. What do you know?"
                </p>

                <p style="text-align: center;" v-if="CabinWrongAnswer">
                  <div class="span-red type--wrong--answer type-secondary">Wrong.</div>
                  Try again. Err once more and death will befall you.
                </p>
              </template>

              <template #body--content--2 v-if="GameOver">
                <p>
                </p>
                <p class="span-red type-secondary type--reaction">
                  You are dead.
                </p>
              </template>

              <template #decision--1><div @click="playerQuizGuessLake(2)" class="module--decision--type type--uppercase--small">Lara was murdered by Lucien's hand</div></template>

              <template #decision--2><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">Generations of Duguays governed it</div></template>
              
              <template #decision--3><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">Lara was murdered by the housekeeper's hand</div></template>

          </ContentModal>

          <ContentModal
            v-if="CabinLighthouseModule"
            key="CabinLighthouseModule"
            title="the cabin"
            :renderBigImg="false"
            :renderInlineImg="false"
            :renderHeadline="true"
            bigImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/danger.jpg"
            inlineImg="https://dsundell.studio.mcad.edu/design-studio/nocta/https://dsundell.studio.mcad.edu/design-studio/nocta/imgs/notice.jpg"
            :renderDecision1="true"
            :renderDecision2="true"
            :renderDecision3="true"
            :renderChecker="false"
            >
              <template #body--content--1 v-if="!GameOver"> 
                <p>
                  The crone studies you silently, her hands knotted behind her back as her face reflects a severe stillness, almost reverent in its fealty. A moment later, she nods. 
                </p>
                <p class="type-secondary type--quotations--small">
                  "Yes, you've met the daughter of the lake. Pulled the dagger from her innocent heart. Would that I had done it myself if not for my arcane restriction."
                </p>
                <p>
                  You sense a personal touch to her tone here that she lacked when speaking of the lake's beast. The old woman had a fondness for Lara, though you cannot say who 
                  the daughter of the lake might have been to her.   
                </p>
                <p class="type-secondary type--quotations--small">
                  "She was destroyed by the jealousy of a savage man and his vile heart. Her only crime was a refusal to love a patriarch as cruel as he, 
                  and it cost her everything. Perhaps, her soul will now know peace with his grandfather's blade finally pulled free from her ribs."
                </p>
                <p>
                  A longing touches her voice. You wonder if the crone is the jealous one now — thirsty for the peace that she speaks of. Her eyes 
                  flicker back towards you as she addresses you once more. You have another question to answer.
                </p>

                <p class="type-secondary type--quotations--small">
                  "Now speak on these woods. What is their truth?"
                </p>

                <p style="text-align: center;" v-if="CabinWrongAnswer">
                  <div class="span-red type--wrong--answer type-secondary">Wrong.</div>
                  Try again. Err once more and death will befall you.
                </p>
              </template>

              <template #body--content--2 v-if="GameOver">
                <p>
                </p>
                <p class="span-red type-secondary type--reaction">
                  You are dead.
                </p>
              </template>

              <template #decision--1><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">A snowstorm killed the keepers</div></template>

              <template #decision--2><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">Kraver was consumed by a monster that lives in the light</div></template>
              
              <template #decision--3><div @click="playerQuizGuessLake(2)" class="module--decision--type type--uppercase--small">Falker was consumed by a monster that lives in the light</div></template>

          </ContentModal>

          <ContentModal
            v-if="CabinWoodsModule"
            key="CabinWoodsModule"
            title="the cabin"
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
              <template #body--content--1 v-if="!GameOver"> 
                <p>
                  The old woman regards you with a look of what could be...hope. You're doing well. You may soon see the light of a new day. 
                  But it quickly melts away with a bitter curse cried from her lips. She exclaims so loudly and violently that you find yourself 
                  flinching at the sound, silently wondering if you have made a grave error with your answer.
                </p>

                <p>
                  A moment later, however, it becomes clear that the woman curses not at you, but at the cruel fate that befell the keeper’s apprentice.
                </p>

                <p class="type-secondary type--quotations--small">
                  "Oh, my son. My poor son."
                </p>

                <p>
                  Her voices quivers with fury. In her rasped delivery, the ache for this injustice feels ancient, like an exhumed tomb finally seeing the light of day.
                </p>

                <p class="type-secondary type--quotations--small">
                  "That terrible ghoul that ate my son."
                </p>
                
                <p>
                  She nearly spits the words out at you, her hatred billowing out of her lips against the wavering of her tired lungs. She takes a moment to catch her breath, and,  
                  in the seconds of respite, it seems to damper her anger. 
                </p>
                
                <p class="type-secondary type--quotations--small">
                  "Yet, do not blame that crazed man — he was lost long before that terrible winter — his mind 
                  rendered pulp by the elusive phantom of Nina. Year after year he watched her from above, dragging the wreckage of innumerable ships to the 
                  abyss with none to tell, none to see. It would make anyone go mad. It was Lucien that sentenced my boy to die, trapped in isolation with that 
                  starving creature and his violent axe."
                </p>
                
                <p>
                  The woman turns away from you to ask her final question, her voice ringing quieter in your ears as the fire dances over the folds of her freckled skin.  
                </p>

                <p class="type-secondary type--quotations--small">
                  "Now speak on these woods. What is their truth?"
                </p>

                <p style="text-align: center;" v-if="CabinWrongAnswer">
                  <div class="span-red type--wrong--answer type-secondary">Wrong.</div>
                  Try again. Err once more and death will befall you.
                </p>
              </template>

              <template #body--content--2 v-if="GameOver">
                <p>
                </p>
                <p class="span-red type-secondary type--reaction">
                  You are dead.
                </p>
              </template>

              <template #decision--1><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">It's full of smelly fish</div></template>

              <template #decision--2><div @click="playerQuizGuessLake(2)" class="module--decision--type type--uppercase--small">A old hag was chased down by the Sheriff here</div></template>
              
              <template #decision--3><div @click="playerQuizGuessLake(1)" class="module--decision--type type--uppercase--small">It's the town's most important commodity</div></template>

          </ContentModal>
          
          <ContentModal
            v-if="CabinWinningModule"
            key="CabinWinningModule"
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
              <template #body--content--1 v-if="!GameOver"> 
                <p>
                  The fire roars to life, as if stoked by a bundle of fresh, new wood. Yet, neither of you have touched the flames. They blaze excitedly all on their own, 
                  seemingly in response to your answer. The woman's face is unreadable. You hold your breath as she approaches you on her feeble legs.
                </p>

                <p class="type-secondary type--quotations--small">
                  "There is no hag of these woods. Not any longer."
                </p>

                <p>
                  She reaches out to you and takes your hand, her grip as weak and light as the brush of a branch in the breeze. 
                  You hold back a wince, watching the old crone with a wary frown.
                </p>

                <p class="type-secondary type--quotations--small">
                  "Let the death of your friend be not in vain. Remember what you know. Remember us. Remember Nocta."
                </p>

                <p>
                  Your gaze softens as you realize the woman is letting you leave. You have won her game and your life is your prize. 
                </p>

                <p class="type-secondary type--quotations--small">
                  "Go now, child. It is finally my time to rest."
                </p>

              </template>

              <template #decision--1><div @click="doneWithGame()" class="module--decision--type type--uppercase--small">Leave & don't look back</div></template>

              <template #decision--2><div class="module--decision--type type--uppercase--small">null</div></template>
              
              <template #decision--3><div class="module--decision--type type--uppercase--small">null</div></template>

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
      CabinLighthouseModule: false,
      CabinTownModule: false,
      CabinWoodsModule: false,
      CabinWinningModule: false,

      // cabin answers
      CabinWrongAnswer: false,

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
      DeathCount: 0,
      GameOver: false,

    }
  },
  methods: {

    //quiz

    playerQuizGuessLake(s) {
      console.log(this.DeathCount)
      if (s === 1 && this.DeathCount < 1) {
        this.CabinWrongAnswer = true;
        this.DeathCount++;
        setTimeout(() => this.CabinWrongAnswer = false, 3500);
      } else if (s === 2) {
        this.quizLogicShowModule();
        this.CabinWrongAnswer = false;
      } else if (s === 1 && this.DeathCount >= 1) {
        this.GameOver = true;
        setTimeout(() => 
          this.gameOverTrigger(), 
          4000)
      }
    },

    quizLogicShowModule() {
      if (this.CabinLakeModule === true) {
        this.showCabinTownModule();
      } else if (this.CabinLighthouseModule === true) {
        this.showCabinWoodsModule();
        // console.log(this.CabinTownModule,'hello')
      } else if (this.CabinTownModule === true) {
        this.showCabinLighthouseModule();
      } else if (this.CabinWoodsModule === true) {
        this.showCabinWinningModule();
      }
    },


    //modules
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
      showCabinLighthouseModule() {
        this.CabinLighthouseModule = true;
        this.CabinTownModule = false;
        this.CabinWinningModule = false;
        this.CabinWoodsModule = false;
        this.CabinLakeModule = false;
        this.CabinExplainerModule = false;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showCabinTownModule() {
        this.CabinTownModule = true;
        this.CabinWinningModule = false;
        this.CabinWoodsModule = false;
        this.CabinLighthouseModule = false;
        this.CabinLakeModule = false;
        this.CabinExplainerModule = false;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showCabinWoodsModule() {
        this.CabinTownModule = false;
        this.CabinWinningModule = false;
        this.CabinWoodsModule = true;
        this.CabinLighthouseModule = false;
        this.CabinLakeModule = false;
        this.CabinExplainerModule = false;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      showCabinWinningModule() {
        this.$emit('player-has-won')
        this.CabinTownModule = false;
        this.CabinWinningModule = true;
        this.CabinWoodsModule = false;
        this.CabinLighthouseModule = false;
        this.CabinLakeModule = false;
        this.CabinExplainerModule = false;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = true;
      },
      hideModule() { 
        this.CabinTownModule = false;
        this.CabinWinningModule = false;
        this.CabinWoodsModule = false;
        this.CabinLighthouseModule = false;
        this.CabinLakeModule = false;
        this.CabinExplainerModule = false;
        this.CabinIntroModule = false;
        this.PathCabinModule = false;
        this.PathUnlockedModule = false;
        this.PathModule = false;
        this.moduleOn = false;
        this.DeathCount = 0;
        this.GameOver = false;
      },
      gameOverTrigger() {
        this.hideModule()
        this.$router.push({ name: 'woods' })
      },
      doneWithGame() {
        this.$router.push({ name: 'credits' })
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