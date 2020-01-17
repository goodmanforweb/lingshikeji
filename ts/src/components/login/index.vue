<template>
<Page class="flex v" padding :float="$route.name == 'agreement'" :routerBack="$route.name == 'agreement' ? '/lg/registar' :'/index'">
    <div class="flex1 flex vc hcs" v-if="isMobile">
        <RLoginHTML />
    </div>
    <Layer notransition v-else >
        <RLoginHTML />
    </Layer>
</Page>
</template>
<script>
import Layer from '../widgets/layer';
import {mapGetters} from 'vuex';
import RLoginHTML from './rindex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
    components: {
        Layer,
        RLoginHTML
    }
}
</script>


