<template>
    
    <div id="section-nohello" class="section-main">

        <div class="holder">

            <p>از جمله مشکلاتی که در مطرح کردن سوال‌ها در انجمن‌ها یا گروه‌ها یا شرکت‌ها وجود داره، حاشیه‌ها و مقدمه های بی‌موردی هست که نه‌تنها به فرآیند پاسخگویی کمکی نمی‌کنه، بلکه باعث اتلاف وقت پرسشگر و پاسخگو می‌شود</p>

            <section class="scenario scenario-wrong">

                <h2><i class="icon-x"></i>حاشیه و مقدمه‌چینی</h2>

                <hr>

                <SpeechBubble alignment="right">
                    <template #content>سلام</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>کسی هست ؟</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>یه مشکل فوری دارم</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>سلام دادما !</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>انصافا یکی جواب بده کارم گیره</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>سلام وقت‌بخیر، مشکل چی هست ؟ دقیق بفرمایید !</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>سلام داداش خوبی</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>مشکل من اینه که توی جاوا</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>بلد نیستم تایم فعلی رو بگیرم</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>به نظرت چرا کدم کار نمی‌کنه</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>لطفا کدتون رو قرار بدید !</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>باشه الان می‌فرستم</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>{ کد اشتباه }</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>باید اینطوری نوشته بشه<br>{کد صحیح}</template>
                </SpeechBubble>

            </section>

            <p>سلام دادن، احوال‌پرسی، صمیمی بودن اتفاقا خیلی خوب و محترمانه است، ولی به‌شرطی که باعث اتلاف وقت نشه و کل سلام و احوال‌پرسی و احترام به طرف مقابل در یک پیام می‌تونه خلاصه بشه تا باعث بهبود خوانایی بشه و وقت کم‌تری از هر دو طرف تلف بشه</p>

            <section class="scenario scenario-correct">

                <h2><i class="icon-check"></i>بدون حاشیه و مقدمه‌چینی</h2>

                <hr>
                
                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>سلام دوستان، من یه مشکلی توی جاوا دارم و بلد نیستم که چطوری زمان فعلی رو بگیرم، این کد پایین رو من نوشتم و ممنون میشم اصلاحش کنید<br>{ کد اشتباه }</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>سلام وقت‌بخیر، کدتون مشکل داره و باید اینطوری نوشته بشه<br>{کد صحیح}</template>
                </SpeechBubble>

            </section>

            <p>در نهایت، به‌عنوان یک توسعه‌دهنده به این موضوع فکر کنید که وقتی یک جستجویی انجام می‌دهید و به انجمن های مشابه StackOverFlow می‌رسید، اگر به جای پاسخ سرراست، با یک طومار سلام و احوال‌پرسی مواجه شوید چه حسی پیدا می‌کنید (:</p>

        </div>

    </div>

</template>

<script>
import SpeechBubble from '../components/SpeechBubble.vue'

export default {
    name: 'NoHelloView',
    components: {
        SpeechBubble,
    },
    mounted() {
        
        window.scrollTo({top: 0, behavior: 'smooth'});

    }
}
</script>