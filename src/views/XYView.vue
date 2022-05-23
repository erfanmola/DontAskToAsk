<template>
    
    <div id="section-xy" class="section-main">

        <div class="holder">

            <p>مسئله فلان و بهمان بیانگر پرسیدن سوال درمورد راه‌حل پیشنهادی خودتون برای مسئله، به جای پرسیدن درمورد خود مسئله هست، که این مورد معمولا به اتلاف وقت و در نهایت عدم دریافت پاسخ مطلوب منتهی می‌شود و نه پرسشگر پاسخ درست و حسابی می‌گیرد و نه پاسخگو می‌تواند پاسخ صحیح ارائه کند</p>

            <section class="scenario scenario-wrong">

                <h2><i class="icon-x"></i>سناریو فلان و بهمان</h2>

                <hr>

                <SpeechBubble alignment="right">
                    <template #content>می‌خواهد کار X را انجام دهد</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>نمی‌داند که چگونه کار X را باید انجام داد، ولی فکر می‌کند که اگر کار Y را انجام دهد، به نتیجه X می‌رسد</template>
                </SpeechBubble>

                <SpeechBubble alignment="right">
                    <template #content>حتی نحوه انجام کار Y را هم بلد نیست</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>درمورد نحوه انجام کار Y سوال می‌پرسد</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>بعد از ساعت‌ها کلنجار رفتن و توضیحات اضافی و اتلاف وقت، متوجه می‌شود که پرسشگر می‌خواسته کار X را انجام دهد ولی درمورد Y سوال پرسیده چون فکر می‌کرده که راه‌حل مشکلش Y باشد در حالی که اینطور نمی‌باشد و راه‌حل مشکل X کاملا متفاوت است</template>
                </SpeechBubble>

            </section>

            <p>برای کاهش احتمال وقوع مسئله فلان و بهمان، همیشه سعی کنید سوالتون رو دقیق‌تر شرح بدید و یک تصویر گسترده‌تری از سوالتون رو ارائه کنید تا با توجه به کاری که می‌خواهید انجام بدید، بهترین و بهینه‌ترین روش برای شما پیشنهاد داده بشه، همچنین راه‌حل هایی که خودتون امتحان کردید و نتیجه هایی که گرفتید رو هم در سوالتون ذکر کنید تا پاسخگو متوجه راه هایی که رفتید بشه<br><br>در نهایت، درمورد کاری که می‌خواهید انجام دهید سوال کنید و اصلا و ابدا درمورد روش های پیشنهادی خودتون برای انجام اون کار سوال نکنید</p>

            <section class="scenario scenario-wrong">

                <h2><i class="icon-x"></i>سناریو پسوند فایل</h2>

                <hr>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>چطور می‌تونم سه حرف آخر اسم یک فایل رو نمایش بدم ؟</template>
                </SpeechBubble>

                <SpeechBubble alignment="left">
                    <template #content>echo ${foo: -3}</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>چرا سه حرف آخر ؟ دقیقا می‌خواهید چه کاری انجام دهید ؟ فرمت فایل رو می‌خواهید نمایش بدید ؟</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>بله، فرمت فایل رو لازم دارم</template>
                </SpeechBubble>

                <SpeechBubble alignment="left">
                    <template #content>هیچ تضمینی وجود نداره که فرمت هر فایلی سه حرفی باشه ! گرفتن سه حرف آخر به‌عنوان فرمت فایل یک حرکت اشتباه هست، می‌تونید از کد زیر برای گرفتن فرمت فایل استفاده کنید</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>echo ${foo##*.}</template>
                </SpeechBubble>

            </section>

            <section class="scenario scenario-correct">

                <h2><i class="icon-check"></i>سناریو پسوند فایل</h2>

                <hr>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>چطور می‌تونم فرمت یک فایل رو نمایش بدم ؟</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>echo ${foo##*.}</template>
                </SpeechBubble>

            </section>
            
            <hr>

            <section class="scenario scenario-wrong">

                <h2><i class="icon-x"></i>سناریو مشکل Nmap</h2>

                <hr>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>دستور 'nmap -O -A 127.0.0.1' یک‌سری خروجی تولید می‌کنه که اولشون با OS شروع میشه، چطوری می‌تونم عوضش کنم ؟</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>توی سورس‌کد nmap دنبال کد های مربوط به اون قسمت بگردید و کد رو جایگزین کنید و خودتون برنامه شخصی‌سازی شده nmap تون رو کامپایل کنید و استفاده کنید</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>آهان، ولی خب من بلد نیستم سورس برنامه nmap رو بخونم، چه برسه به اینکه تغییرش بدم و کامپایلش کنم !</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>خب چاره‌ای ندارید، راستی، به چه دلیلی می‌خواهید اینکار رو بکنید اصلا ؟</template>
                </SpeechBubble>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>چون نمی‌خوام اطلاعات سیستم‌عاملم رو نشون بده</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>خب گزینه OS Scanning رو غیرفعال کنید !</template>
                </SpeechBubble>

            </section>

            <section class="scenario scenario-correct">

                <h2><i class="icon-check"></i>سناریو مشکل Nmap</h2>

                <hr>

                <SpeechBubble author="پرسشگر" alignment="right">
                    <template #content>چطور می‌تونم کاری کنم که nmap اطلاعات سیستم‌عاملم رو نشون نده ؟</template>
                </SpeechBubble>

                <SpeechBubble author="پاسخگو" alignment="left">
                    <template #content>گزینه OS Scanning رو غیرفعال کنید</template>
                </SpeechBubble>

            </section>

        </div>

    </div>

</template>

<script>
import SpeechBubble from '../components/SpeechBubble.vue'

export default {
    name: 'XYView',
    components: {
        SpeechBubble,
    },
    mounted() {
        
        window.scrollTo({top: 0, behavior: 'smooth'});

    }
}
</script>