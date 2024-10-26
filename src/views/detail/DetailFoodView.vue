<template>
  <MainLayout>
    <template #header>
      <h1 class="font-varela text-lg p-2 bg-elegantIndigo-primary text-elegantIndigo-neutral">
        Detail Foods -
        <span class="bg-black/50 p-1 rounded-md inline-block w-24 text-center">
          {{ routes.params.food }}
        </span>
      </h1>
    </template>
    <template #main>

      <div class="p-1 md:pr-32 md:pl-32 sm:pr-9 sm:pl-7 m-2">
        <div
          class="p-2 flex flex-row items-center gap-x-1 font-varela border rounded-md hover:border-elegantIndigo-secondary">
          <label for="src" class=" text-elegantIndigo-secondary">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </label>
          <input type="text" name="search" id="src" placeholder="search meal..."
            class="outline-none text-[12px] font-sora w-full" v-model="meal">
        </div>
      </div>

      <div class="flex flex-wrap gap-y-1 font-sora p-2 sm:gap-x-2 justify-center items-center">
        <div v-if="!isLoading"
          class=" w-full h-28 flex flex-row gap-x-2 odd:bg-slate-50 rounded-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-90 sm:w-[45%] md:w-[30%]  group"
          v-for="(food, index) in detailFood" :key="food.idMeal">
          <div class="h-full w-40 relative">
            <img :src="food.strMealThumb" alt="food-image" class="object-cover h-full w-full">
            <div
              class="absolute bottom-0 left-0 h-full w-full text-center bg-black/50 text-sm text-white p-1 -translate-x-44 group-hover:translate-x-0 transition-transform duration-300 flex justify-center items-center"
              @click="forwardToReceipePage(food)">
              <h1>Receipe</h1>
            </div>
          </div>
          <div class="h-28 w-full flex flex-col justify-evenly text-sm">
            <div class="flex flex-row justify-between">
              <h1 class="font-semibold w-full ">{{ food.strMeal }}</h1>
              <h2 v-if="food.strCategory ?? food.category"
                class="text-[10px] bg-red-500 p-1 text-white w-20 rounded-tl-xl text-center h-fit">
                {{ food.strCategory ?? food.category }}
              </h2>
            </div>
            <div class="text-[12px]">
              <div class="flex flex-row gap-x-2">
                <span>Rate :</span>
                <div v-for="(rate, i) in food.rates" :key="i">
                  <label :for="'rate-' + food.idMeal + '-' + i" class="cursor-pointer text-red-700">
                    <font-awesome-icon :icon="!rate ? 'fa-regular fa-star' : 'fa-solid fa-star'" />
                  </label>
                  <input class="hidden" type="checkbox" :id="'rate-' + food.idMeal + '-' + i" :value="rate"
                    v-model="food.rates[i]" @change="handleCheckboxChange(food, i)">
                </div>
              </div>
              <h2 v-if="food.strTags" class=" flex flex-wrap gap-x-1 text-[10px] items-center">Tags :
                <span v-for="(tag, i) in food.strTags.split(',')" :key="i"
                  class="p-1 box-border bg-slate-100 rounded-sm text-[10px]">
                  {{ tag }}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div v-else>
          <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-2xl text-black/50" />
        </div>
      </div>
      

    </template>
  </MainLayout>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from '../../../layouts/MainLayout.vue';

const routes = useRoute()
const router = useRouter()

const detailFood = ref([])

const meal = ref('')

const isLoading = ref(false)

const getDetailFoodApi = async () => {
  isLoading.value = !isLoading.value
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${routes.params.food}`)
    const data = await response.json()

    // Tambahkan properti `rates` untuk setiap makanan
    detailFood.value = data.meals.map(meal => ({
      ...meal,
      rates: Array(5).fill(false), // Array untuk 5 checkbox, default false (tidak dicentang)
      category: routes.params.food
    }));

    console.log(detailFood.value);

  } catch (error) {
    console.log(error);
  }
  finally{
    isLoading.value = !isLoading.value
  }
}

const handleCheckboxChange = (food, index) => {
  const currentRate = food.rates[index]
  food.rates.forEach((val, i) => {
    if (i < index) {
      food.rates[i] = true
    } else {
      food.rates[i] = false
    }
    food.rates[index] = currentRate
  })
}

const urlParams = ref([])

const query = computed(() => {
  const path = routes.path

  const partUrl = path.split('/')

  const necesarryUrl = partUrl.slice(2, 4)

  return urlParams.value = [...necesarryUrl]

})

const getMealByName = async () => {
  isLoading.value = !isLoading.value
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.value}`)

    const data = await response.json()

    console.log(data);

    detailFood.value = data.meals.map(meal => ({
      ...meal,
      rates: Array(5).fill(false)
    }));

  } catch (error) {
    console.log(error);
  }
  finally{
    isLoading.value = !isLoading.value
  }
}

const forwardToReceipePage = (food) => {

  router.push({
    name: 'food-receipe',
    params: {
      id: food.idMeal,
      food: food.strCategory
    },
    query: {
      name: food.strMeal
    }
  })

}



onMounted(async () => {
  await getDetailFoodApi()
})

watch(() => meal.value, async () => !meal.value ? await getDetailFoodApi() : await getMealByName())

provide("query", query)

</script>
