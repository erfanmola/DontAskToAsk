<template>
    <article :class="['speech-bubble', alignment]">
        <div>
            <p><slot name="content"></slot></p>
            <span v-if="author !== null">{{ author }}</span>
        </div>
        <div></div>
    </article>
</template>

<style lang="scss" scoped>

    article {
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 8px 0;

        &.right {

            div:first-of-type p {
                direction: rtl;
                background-color: var(--bubble-right);
                color: var(--bubble-right-color);

                &::before {
                    position: absolute;
                    content: '';
                    width: 24px;
                    height: 24px;
                    right: 0;
                    bottom: 0;
                    border-right: 20px solid var(--bubble-right);
                    border-top-right-radius: 100px;
                    border-bottom-left-radius: 100px;
                }

            }
        }

        &.left {
            direction: ltr;

            div:first-of-type p {
                background-color: var(--bubble-left);
                color: var(--bubble-left-color);

                &::before {
                    position: absolute;
                    content: '';
                    width: 24px;
                    height: 24px;
                    left: 0;
                    bottom: 0;
                    border-left: 20px solid var(--bubble-left);
                    border-top-left-radius: 100px;
                    border-bottom-right-radius: 100px;
                }

            }

        }

        > div:first-of-type {
            
            > p {
                display: inline-block;
                padding: 16px 24px;
                font-size: 1rem;
                border-radius: 24px;
                position: relative;
                text-align: justify;
                direction: rtl;
            }

            > span {
                display: block;
                font-size: 1rem;
                font-variation-settings: "wght" 700;
                opacity: 0.925;
                padding: 12px 0 0;
                user-select: none;
            }

        }
    }

</style>

<script>
export default {
    name: "SpeechBubble",
    props: {
        author: {
            type: String,
            default: null,
        },
        alignment: {
            type: String,
            default: "right",
        },
    }
}
</script>