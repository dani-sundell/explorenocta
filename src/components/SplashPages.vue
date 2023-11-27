<script setup>

</script>

<template>
    
    <!-- justified layout  -->

        <div class="splash--container--justify" 
            :class="{ 'splash--bg--nina': bg === 'nina', 'splash--bg--fish': bg === 'fish' }"
            v-if="layout === 'justify'">
            <div class="splash--headline--container--justify">
                <h1 class="splash--headline--type">
                    <div class="type-secondary">{{ leftHeadline }}</div>
                    <div class="type-primary">{{ rightHeadline }}</div>
                </h1>
                <div class="splash--img" v-if="anchorDivider">
                    <img src="https://dani-sundell.github.io/explore-nocta/imgs/anchor-divider.png">
                </div>

            </div>
            <div class="splash--content--container">
                <div class="splash--subhead--container">
                    <slot name="splash--subhead"></slot>
                </div>
                <div class="splash--paragraph--container" v-if="paragraph">
                    <div class="module--body type-body">
                        <slot name="splash--paragraph"></slot>
                    </div>
                    <div :class="{ 'splash--button-stack--center': buttonLayout === 'center', 'splash--button-stack--right': buttonLayout === 'right' }">  
                            <slot name="button--strong" v-if="buttonStrong"></slot>
                            <slot name="button--weak" v-if="buttonWeak"></slot>
                    </div>
                </div>
            </div>

        </div>
    
    
    <!-- centered layout -->

    <div class="splash--container" 
        :class="{ 'splash--bg--nina': bg==='nina' , 'splash--bg--fish': bg==='fish' }"
        v-if="layout === 'center'">
        <div class="splash--headline--container">
            <h1 class="splash--headline--type">
                <div class="type-secondary">{{ leftHeadline }}</div>
                <div class="type-primary">{{ rightHeadline }}</div>
            </h1>
            <div class="splash--img" v-if="anchorDivider">
              <img src="https://dani-sundell.github.io/explore-nocta/imgs/anchor-divider.png">
            </div>
            <div class="splash--subhead--container">
                <slot name="splash--subhead"></slot>
            </div>
            <slot name="splash--paragraph"></slot>

        </div>
        <div :class="{ 'splash--button-stack--center': buttonLayout === 'center' , 'splash--button-stack--right': buttonLayout === 'right' }">  
            <slot name="button--strong" v-if="buttonStrong"></slot>
            <slot name="button--weak" v-if="buttonWeak"></slot>

      </div>
    </div>

</template>

<script>
export default {
    data: () => ({
    dialog: false,
    puzzleAnswerInput: ''
    }),
    props: {
        leftHeadline: String,
        rightHeadline: String,
        layout: String,
        anchorDivider: Boolean,
        bg: String,
        buttonLayout: String,
        buttonStrong: Boolean,
        buttonWeak: Boolean,
        paragraph: Boolean,
    },
    methods: {
        showModule() {
        this.dialog = true;
        },
        puzzleWasAnswered() {
            this.puzzleAnswerInput = true;
        }
    }
}
</script>
