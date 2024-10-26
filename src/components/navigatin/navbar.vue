<template>
    <nav class="w-full h-16 flex justify-between pl-4 pr-4 items-center text-sm font-sora">
        <h1 class="w-full text-lg font-bold text-elegantIndigo-primary">Food Mate</h1>
        <div class=" w-60 flex justify-end relative">
            <button
                class="sm:hidden p-2 rounded-md w-12 h-12 text-white font-semibold text-xs transition-colors duration-200  flex flex-col gap-1"
                @click="toggleMenu">
                <div v-for="i in 3" :class="['w-full h-[6px] bg-elegantIndigo-secondary', burgerClass]">
                </div>
            </button>
            <Transition name="navbar-menu" >
                <div v-if="isMenu" class=" w-full absolute top-[50px] sm:static">
                    <ul
                        class="flex flex-col w-full text-center text-white text-[12px] font-semibold bg-black/30 backdrop-blur-sm  rounded-sm  sm:flex-row sm:text-elegantIndigo-primary sm:static sm:bg-transparent  sm:rounded-none sm:gap-x-2 overflow-hidden sm:text-sm">
                        <RouterLink :to="{ name: 'home' }">
                            <li
                                class="p-2 sm:rounded-sm cursor-pointer  sm:hover:bg-elegantIndigo-secondary/80 sm:hover:text-white transition-colors duration-200 hover hover:bg-black/50">
                                Home</li>
                        </RouterLink>
                    </ul>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount,computed } from 'vue';

const isMenu = ref(false);

const toggleMenu = () => {
    isMenu.value = !isMenu.value;
};

const burgerClass = computed(() => {
    return isMenu.value ? 
        `first:rotate-45 first:translate-y-2.5 even:hidden last:-rotate-45 transition-transform duration-200` :
        `first:rotate-0 first:translate-y-0 even:block last:rotate-0 transition-transform duration-200`;
});


const handleResize = () => {
    isMenu.value = window.innerWidth > 640;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});


</script>

<style scoped>
/* we will explain what these classes do next! */
.navbar-menu-enter-active {
    transition: transform 0.2s ease;
}

.navbar-menu-enter-from {
    transform: translateY(-10px);
}

.navbar-menu-enter-to {
    transform: translateX(0);
}
</style>