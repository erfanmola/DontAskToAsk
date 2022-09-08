<template>

    <div>

        <section class="section-footer holder">

            <hr>
            
            <header>
                <i class="icon-life-buoy"></i>
                <h2>صفحات مرتبط</h2>
            </header>

            <ul>
                <li v-for="(item, key) in RelatedPages" :key="key" :style="'background:' + item.meta.gradient"><router-link :to="item.path">{{ item.meta.title }}</router-link></li>
            </ul>

        </section>

        <section class="section-footer holder">

            <hr>
            
            <header>
                <i class="icon-figma"></i>
                <h2>سایر پروژه‌ها</h2>
            </header>

            <ul v-if="DevelopixProjectsList === null" id="shimmer-developix-projects-list">
                <li class="shimmer" v-for="i in 6"></li>
            </ul>

            <ul v-else>
                <li v-for="(item, key) in DevelopixActiveProjectsList" :key="key" :style="'background: linear-gradient(215deg, ' + item.colors[1] + ' 0%, ' + item.colors[0] + ' 100%);'"><a rel="noopener" target="_blank" :href="item.link">{{ item.title }}</a></li>
            </ul>

            <hr>

        </section>

        <footer id="footer" v-once>
            
            <div class="holder">

                <a href="https://github.com/erfanmola/DontAskToAsk" target="_blank" rel="noopener" title="Github">مشارکت در توسعه پروژه</a>

                <a href="https://Developix.ir" target="_blank" title="Developix" rel="noopener"><i class="icon-DP"></i></a>

            </div>

        </footer>

    </div>

</template>

<style lang="scss" scoped>

    section {
        user-select: none;

        > header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 12px 0;

            > i {
                font-size: 1.5rem;
                padding-left: 8px;
            }

            > h2 {
                font-size: 1.325rem;
            }
        }

        > ul {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 32px;
            padding: 12px 0;

            li {
                display: block;
                border-radius: 24px;
                transition: opacity .15s;

                > a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 64px 0;
                    color: white;
                    font-size: 1.25rem;
                    font-variation-settings: "wght" 600;
                }

                &:hover {
                    opacity: 0.75;
                }
            }
        }

    }

    footer {
        padding: 12px 0 24px;

        div {
            display: grid;
            grid-template-columns: 1fr 1fr;

            a {
                transition: opacity .15s;

                &:hover {
                    opacity: 0.75;
                }
            }

            a:first-of-type {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            a:last-of-type {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                > i {
                    font-size: 1.5rem;
                }
            }
        }

    }

    #shimmer-developix-projects-list {
        li {
            height: 168px;
        }
    }

</style>

<script>
export default {
    name: "FooterSection",
    computed: {

        RelatedPages: function() {

            return this.$router.options.routes.filter((item) => {

                return ("component" in item) && (this.$route.name !== item.name);

            });

        },

        DevelopixActiveProjectsList: function() {

            return Object.fromEntries(Object.entries(this.DevelopixProjectsList).filter((item) => {

                return item[1].status && item[0] !== this.DevelopixProjectsContext;

            }));

        },

    },
    data() {

        return {
            DevelopixProjectsList: null,
            DevelopixProjectsContext: 'dontasktoask',
        }

    },
    methods: {

        async FetchDevelopixProjectsList() {

            let request = await fetch("https://developix-ir.github.io/Developix/DevelopixProjects.json");

            try {

                let result = await request.json();

                return result;

            }catch(Exception) {

                return null;

            }

        }

    },
    async mounted() {
        
        this.DevelopixProjectsList = await this.FetchDevelopixProjectsList();

    },
}
</script>
