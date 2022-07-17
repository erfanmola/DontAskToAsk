<template>
    
    <div id="section-home" class="section-main">

        <div class="holder">

            <p>
            گاهی‌اوقات پاسخ دادن به سؤالاتی که کدی همراه‌شون نیست خیلی سخت هست.
            ما نمی‌دونیم کد شما چه فرایندی رو طی کرده تا به مشکلی که الان دارید رسیده.
            ممکنه به خطای داخلی برنامه مربوط باشه، ممکنه از سرویس خاصی نشأت گرفته باشه، ممکنه حتی مشکل سینتکس داشته باشه! نمیشه به‌طور قطعی جواب داد. تمام پاسخ‌ها با حدس و گمان مواجه‌اند تا زمانی که کُدتون رو بذارید!
            حتی اگر کسی با حدس و گمان پاسخ بده، و حتی اگه از قضا جوابش درست هم باشه، اون پاسخ صرفاً برای شما درست هست و کسانی که در آینده اون سوال و جواب رو می‌خونند و می‌بینند، ممکنه هیچی ازش متوجه ‌نشوند !
            <br/>
            پس این رو درنظر داشته باشید که برای کمک‌گرفتن از بقیه، اول از همه شما باید به پاسخ‌دهنده کمک کنید تا مشکل رو دقیق‌تر درک کنه.
            </p>

 

            <section class="scenario scenario-wrong">

                <h2><i class="icon-x"></i>همونطور که اشاره کردیم، وقت‌تون رو برای گفتن یا خوندنِ این جملات تلف نکنید</h2>

                <hr>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>آقا من یه کد نوشتم واسه سایتم که ایمیل بفرسته ولی کار نمی‌کنه</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>خب چرا کار نمی‌کنه؟</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>نمی‌دونم ارور فلان میده</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>خب ارور چیه؟</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>{ارور}</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>خط 12 کُدت چی نوشتی؟</template>
                </SpeechBubble>

               <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>{کد باگ‌دار}</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>{کد درست}</template>
                </SpeechBubble>

            </section>

            <p>در این حالت حتی افرادی که ممکنه پاسخ رو هم بدونند، جوابی به سؤال‌تون نمیدن چون جواب شما وابسته به کُدتون هست</p>

            <section class="scenario scenario-correct">

                <h2><i class="icon-check"></i>درصورتی که ‌می‌توانید اینجوری بنویسید‌</h2>

                <hr>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>آقا من یه کد نوشتم که ایمیل بفرسته از سایتم، ولی به این ارور {ارور} برمی‌خورم. این هم ‌کد من هست {کد باگ‌دار}</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>مشکل شما فلان‌چیز هست و این هم راه‌حل {کد درست}</template>
                </SpeechBubble>

            </section>

            <p>پس همیشه سعی کنید در انتهای سؤالی که نوشتید کُدتون رو اضافه کنید و فراموش نکنید حتما با فرمت Monospace این‌کار رو انجام بدید</p>

            <section class="scenario scenario-correct">
                <SpeechBubble author="درست" alignment="left">
                    <template #content><span class="monospace"> I'm a Good Code </span></template>
                </SpeechBubble>


                <SpeechBubble author="غلط" alignment="left">
                    <template #content>I'm a Bad Code</template>
                </SpeechBubble>

        </section>

            <p>کد، زیادیش هم خوب نیست! بعضاً می‌بینید که در متن سؤال، کلی کدِ آشفته و درهم و برهم وجود داره و اصل سؤال به موضوعی کوچیک اشاره داره که به این حجم از کد اصلا نیازی نیست! در نظر داشته باشید که کدِ زیادی، سؤال و مشکل رو شخصی و مرتبط با خودتون می‌کنه. و برای جامعه پرسش و پاسخی که توش این موضوع رو مطرح کردید، به‌هیچ‌عنوان جالب نیست.</p>
        </div>

    </div>

</template>

<script>
import SpeechBubble from '../components/SpeechBubble.vue'

export default {
    name: 'NoCodeView',
    components: {
        SpeechBubble,
    },
    mounted() {
        
        window.scrollTo({top: 0, behavior: 'smooth'});

    }
}
</script>
