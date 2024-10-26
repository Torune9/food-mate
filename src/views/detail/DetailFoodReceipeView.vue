<template>
    <MainLayout>
        <template #header>
            <h1 class="p-2 text-xl font-sora font-bold md:pr-24 md:pl-24">{{ routes.query.name }}
            </h1>
            <hr>
        </template>

        <template #main>
            <div class="flex flex-col p-2 gap-y-3 md:pr-24 md:pl-24" v-for="(m, i) in meal">
                <div class="w-full h-44 border overflow-hidden rounded-md sm:h-72 md:h-96">
                    <img :src="m.strMealThumb" alt="food-image" class="w-full h-full object-center object-cover">
                </div>
                <div>
                    <p class="text-[12px] flex flex-row gap-x-2 font-bold font-sora items-center">
                        Tags : 
                        <span v-if='(!m.starTags && !m.strTags?.includes(",")) || (m.starTags && m.strTags.includes(",") )' class="bg-softLavender-primary text-white font-varela p-1 box-border rounded-sm text-[10px] font-medium">
                            {{ m.strTags ?? `don't have tags` }}
                        </span>
                        <span v-else v-for="tag in m.strTags.split(',')" class=" bg-softLavender-primary text-white font-varela p-1 box-border rounded-sm text-[10px] font-medium">{{ tag }}</span>
                    </p>
                </div>
                <hr>
                <article>
                    <h1 class="font-sora font-bold text-sm">Instruction</h1>
                    <p class="text-[12px] text-justify p-4 bg-slate-50 rounded-sm font-varela md:text-sm">{{ m.strInstructions }}</p>
                </article>
                <hr>
                <div>
                    <h1 class="font-sora font-bold text-sm mb-1">Ingredients</h1>
                    <div class="flex flex-wrap gap-3 text-sm justify-center item">

                        <p v-for="(ingr,i) in ingredients" class="w-36 p-1 box-border bg-richPlum-accent rounded relative hover:scale-90 transition-transform duration-200 flex justify-center items-center text-center h-10">
                        {{ `${ingr.strIngridient} - ${ingr.measure}` }}
                        <span class=" absolute -top-2 -right-2 bg-black rounded-full h-6 w-6 text-white font-sora flex justify-center items-center text-[12px]">
                            {{ i+1 }}
                        </span> 
                    </p>
                    </div>
                </div>
                <hr>
            </div>
        </template>
    </MainLayout>
</template>


<script setup>
import { onMounted, ref, computed, provide, watch } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '../../../layouts/MainLayout.vue';


const routes = useRoute()

const meal = ref([])
const ingredients = ref([])

const getDetaiMeal = async () => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${routes.params.id}`)

        const data = await response.json()

        meal.value = data.meals
        ingredients.value = Object.keys(meal.value[0]).filter((key) => {
            return key.startsWith("strIngredient") && meal.value[0][key]
        })
            .map((key, i) => {


                return {
                    strIngridient: meal.value[0][key],
                    measure: meal.value[0][`strMeasure${key.slice(-1)}`]
                }
            })

        console.log(ingredients.value);


        console.log(meal.value[0]);

    } catch (error) {
        console.log(error);

    }
}


const urlParams = ref([])


const query = computed(() => {
    const path = routes.path

    const partUrl = path.split('/')

    const necesarryUrl = partUrl.slice(2, 4)

    const name = routes.query.name

    return urlParams.value = [...necesarryUrl, name]

})


onMounted(async () => {
    await getDetaiMeal()
})

provide("query", query)

provide("category", routes.params.food)


</script>