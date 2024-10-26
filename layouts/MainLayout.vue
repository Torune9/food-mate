<template>
    <Navbar/>
    <BreadCrumbs/>
    <header>
        <slot name="header"/>
    </header>
    <main>
       <slot name="main"/>
    </main>
</template>
<script setup>

import BreadCrumbs from '@/components/navigatin/breadCrumbs.vue';
import Navbar from '@/components/navigatin/navbar.vue';

</script>
