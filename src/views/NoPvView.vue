<template>
    
    <div id="section-nopv" class="section-main">

        <div class="holder">

            <p>یکی از مشکلاتی که افراد متخصص هر حوزه با آن سر و کار دارند، انتظار های بی‌جای بقیه برای کمک به آن‌ها است، به‌طوری که این انتظارها به‌قدری بالا می‌روند که اگر شخصی بخواهد به تمامی انتظارات پاسخگو باشد، هیچ وقتی برای کار های خودش باقی نمی‌ماند</p>

            <section class="scenario scenario-wrong">

                <h2><i class="icon-x"></i>انتظارات بی‌جا</h2>

                <hr>

                <SpeechBubble author="آشنای اول" alignment="right">
                    <template #content>داداش تو کامپیوترت خوبه، این امتحان برنامه‌نویسی من رو میدی ؟ عروسیت جبران می‌کنم</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای دوم" alignment="right">
                    <template #content>حاجی حس می‌کنم دل دوست دخترم کاروان‌سراست، اینستاشو برام هک می‌کنی مچشو بگیرم ؟</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای سوم" alignment="right">
                    <template #content>سلام یه مشکل فوری دارم توی JS چطوری حل‌اش کنم ؟</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای چهارم" alignment="right">
                    <template #content>داداش می‌خوام برنامه‌نویسی شروع کنم چیکار کنم</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای پنجم" alignment="right">
                    <template #content>چطوری باید تاریخ و زمان شمسی رو توی PHP بگیرم ؟</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای ششم" alignment="right">
                    <template #content>ناموسا جواب بده لینوکس نصب کردم و سیستمم بالا نمیاد کارم لنگه</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای هفتم" alignment="right">
                    <template #content>می‌خوام این آموزش رو بخرم، یه نگاهی به سرفصل هاش بنداز ببین به دردم میخوره یا نه</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای هشتم" alignment="right">
                    <template #content>خیلی بیشعوری که جواب نمیدی، یه مشکل توی سایتم دارم و کارم گیره، اصلا فکر کردی کی هستی که جواب من رو نمیدی ؟</template>
                </SpeechBubble>

                <hr>

                <SpeechBubble author="آشنای نهم" alignment="right">
                    <template #content>یه ویس بده کامل توضیح بده که پایتون خوبه یا جاوا اسکریپت</template>
                </SpeechBubble>

            </section>

            <p>واقعیت ماجرا این هست که تقریبا همه دوست دارند که به بقیه کمک کنند و فرد مفیدی برای جامعه باشند، ولی مشکل اینجاست که هر روز بر روی زمین معادل ۲۴ ساعت هست و این زمان خیلی کمی هست به‌خصوص وقتی که نصف این زمان رو در خواب و خوراک بگذرونیم و از این ساعات باقی‌مانده، در ایده‌آل‌ترین حالت چند ساعت برای خودمون وقت داریم و اینجاست که خودمون بر اساس اولویت‌هایی که داریم، انتخاب می‌کنیم که زمانمون رو برای چه چیز هایی صرف کنیم</p>

            <p>این واقعیت امر هست که مشکلات شما صرفا برای خودتون اولویت بالایی دارند و برای بقیه احتمالا کم‌ترین اولویتی ندارند، در چنین شرایطی می‌توانید فردی حرفه‌ای به‌عنوان منتور یا مربی استخدام کنید تا به ازای دریافت هزینه شما رو راهنمایی کنه و همیشه در دسترس برای پاسخگویی باشه</p>

            <p>اگر کسی از دوستان یا آشناهای شما برنامه‌نویس هست، دلیل نمیشه که مجبور بشه به جای انجام بازی آنلاین مورد علاقه‌اش، بیاد و برای شما ویندوز نصب کنه یا اینستاگرام پارتنرتون رو هک کنه، چرا ؟ چون به‌نظر شما این‌کار واجب‌تر و ضروری‌تر از انجام یک بازی کامپیوتری آنلاین هست</p>

            <p>بهترین راهکار برای حل این مشکل، قطع وابستگی هست، سعی کنید در هیچ مبحثی به کسی وابستگی نداشته باشید و از راهنمایی منتورها و مربی های مجرب هر حوزه استفاده کنید که احتمالا با هزینه همراه هست، یا از دوره های آموزشی تجاری استفاده کنید که شامل پشتیبانی هستند و سطح انتظارات رایگان‌تون رو از بقیه همیشه پایین نگه‌دارید</p>

            <p style="text-align: center;user-select: none;opacity: 0.25;pointer-events: none;font-variation-settings: 'wght' 900;font-size: 1.125rem;">Craving is Suffering</p>

        </div>

    </div>

</template>

<script>
import SpeechBubble from '../components/SpeechBubble.vue'

export default {
    name: 'NoPvView',
    components: {
        SpeechBubble,
    },
    mounted() {
        
        window.scrollTo({top: 0, behavior: 'smooth'});

    }
}
</script>