<template>
    <div class="agreement" v-html="agreecontent"></div>
</template>

<script>
    export default {
        data: function() {
            return {
                agreecontent: ''
            }
        },
        created() {
            let lang = this.$i18n.locale;
            this.getAgreeCont(lang);
        },
        methods: {
            getAgreeCont(lang) {
                // require.ensure([`../i18n/agreement${lang}.js`], (require) => {
                    
                    
                // }, 'cjoy').then(res => {
                //     this.agreecontent = res.default; 
                // }).catch(err => {
                //     this.$msg.info(this.$t("ms.getagreementconterror"));
                // })
                import(`../i18n/agreement${lang}.js`).then(res => {
                    this.agreecontent = res.default; 
                }).catch(err => {
                    this.$msg.info(this.$t("ms.getagreementconterror"));
                })
            }
        },
        watch: {
            "$i18n.locale": function(lang) {
                this.getAgreeCont(lang);
            },
        }
    }
</script>


<style>
    .agreement {
        margin: 0 auto;
        width: 80%;
        max-width: 900px;
    }
</style>
