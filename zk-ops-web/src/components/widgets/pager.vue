<template>
    <div class="kj-pager flex sb">
        <span class="kj-la" @click="$emit('change', 'prev')"></span>
        <span class="kj-ra" @click="$emit('change', 'next')"></span>
    </div>
</template>
