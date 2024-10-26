<template>
    <nav class="flex bg-richPlum-accent p-2 mb-1" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
                <RouterLink :to="{ name: 'home' }"
                    class="inline-flex items-center text-[12px] font-medium text-gray-700 dark:hover:text-white">
                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                </RouterLink>
            </li>
            <li v-for="(param, i) in query" :key="i">
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                    <p class="ms-1 text-[12px] font-medium text-gray-700 hover:text-white">
                        <RouterLink :to="{
                            name : 'detail-food',
                            params : {
                                food : category
                            }
                        }"  v-if="param == 'detail'">
                            {{ param }}
                        </RouterLink>

                        <p v-else>
                            {{ param }}
                        </p>
                    </p>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { inject, watch} from 'vue';


const query = inject("query")


const category = inject("category")

</script>