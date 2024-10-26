<template>
    <Navbar />
    <div class="flex flex-col items-center gap-y-2 md:pr-6 md:pl-6">
        <header
            class="w-full h-60 bg-elegantIndigo-primary text-elegantIndigo-neutral font-sora flex justify-center items-center flex-col gap-y-4 p-6 text-center">
            <h1 class="text-xl font-bold sm:text-3xl">Welcome To Food Mate </h1>
            <h2 class="text-sm">Enjoy Every Bite with the Best Recipes</h2>
        </header>
        <main id="main" class="w-full bg-third p-2 flex flex-col gap-y-2">
            <div
                class="flex gap-y-2 flex-col text-justify text-[12px] font-varela pl-4 pr-4 sm:p-8 box-border sm:text-sm">
                <p>
                   <strong> Welcome to Food Mate – Your Partner in Flavorful Creations!</strong>
                    At Food Mate, we believe that every meal can be a memorable experience, and we’re here to make
                    cooking enjoyable and effortless. From everyday staples to exciting new dishes, our recipes are
                    crafted to inspire and guide you in the kitchen. Whether you’re a seasoned cook or just starting
                    out, we’re your go-to resource for recipes that bring people together. Ready to make something
                    delicious? Dive in and let’s cook up a storm – because every meal is better with a Food Mate by your
                    side!
                </p>
            </div>
            <div class="flex flex-wrap gap-2 group justify-center  p-2 rounded-md">
                <div v-if="!isLoading"
                    class="w-40 h-24 rounded-xl overflow-hidden bg-center relative cursor-pointer shadow-md md:w-80 md:h-32"
                    @click="getDetailFood(category)" v-for="category in categories" :key="category.idCategory"
                    :style="`background-image: url(${category.strCategoryThumb})`">
                    <RouterLink :to="{ name: 'detail-food', params: { 'food': category.strCategory } }">
                        <div id="overlay"
                            class="w-full h-full absolute flex justify-center items-center transition-colors bg-elegantIndigo-secondary/20 group-hover:bg-black/50 hover:!bg-white/30 hover:backdrop-blur-[2px]">
                            <h1 class="text-white font-semibold font-sora text-sm">{{ category.strCategory }}</h1>
                        </div>
                    </RouterLink>
                </div>
                <div v-else>
                    <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-2xl text-black/50" />
                </div>
            </div>
        </main>
        <footer class=" bg-freshClean-primary h-full min-w-full text-center bg-richPlum-accent p-6">
            <h1 class="text-sm text-elegantIndigo-neutral font-sora font-bold">Enjoy Your Meals!</h1>
        </footer>
    </div>
</template>

<script setup>
import Navbar from '@/components/navigatin/navbar.vue';
import { onMounted, ref, watch } from 'vue';


const categories = ref([])
const detail = ref({})

const isLoading = ref(false)

const getAllCategories = async () => {
    isLoading.value = !isLoading.value
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json()
        categories.value = data.categories

    } catch (error) {
        console.log(error);

    } finally {
        isLoading.value = !isLoading.value
    }
}
const getDetailFood = (food) => {
    detail.value = food

}
onMounted(async () => {
    await getAllCategories()
})


</script>
