<template>
  <div class="max-w-screen-xl mx-auto px-4 py-10">

    <div v-if="loading" class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <div v-for="n in 20" :key="n" class="rounded-xl bg-gray-100 p-4 animate-pulse">
        <div class="aspect-square bg-purple-100 rounded-lg mb-4"></div>
        <div class="h-4 bg-purple-100 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-purple-100 rounded w-1/2"></div>
      </div>
    </div>

    <div v-else-if="error" class="text-center text-red-600 p-8 bg-red-100 rounded-xl shadow-md">
      <h2 class="text-lg font-semibold mb-2">Erro</h2>
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <router-link
          v-for="product in currentProducts"
          :key="product.id"
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
          class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
          
          <div class="relative aspect-square overflow-hidden">
            <img :src="product.thumbnail" :alt="product.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <span
              v-if="product.discountPercentage"
              class="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              -{{ Math.round(product.discountPercentage) }}%
            </span>
          </div>

          <div class="p-4 space-y-2">
            <h3 class="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-purple-600">
              {{ product.title }}
            </h3>

            <div class="flex items-center justify-between">
              <span class="text-green-600 font-bold text-lg">${{ product.price.toFixed(2) }}</span>
              <span :class="[
                'text-xs font-medium px-2 py-1 rounded-full',
                product.stock > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700']">
                {{ product.stock > 0 ? `${product.stock} disponíveis` : 'Esgotado' }}
              </span>
            </div>

            <p class="text-[11px] uppercase text-purple-500 tracking-wide font-semibold">
              {{ product.category }}
            </p>
          </div>
        </router-link>
      </div>

      <div class="mt-12 flex justify-center items-center gap-6">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-white text-gray-700 px-5 py-2 rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition disabled:opacity-40 disabled:cursor-not-allowed">
           Anterior
        </button>

        <div class="text-sm font-medium text-purple-700">
          Página {{ currentPage }} de {{ totalPages }}
        </div>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="bg-white text-gray-700 px-5 py-2 rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition disabled:opacity-40 disabled:cursor-not-allowed">
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  category: {
    type: String,
    default: ''
  }
})

const products = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = 20

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage)
)

const currentProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.value.slice(start, end)
})

const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const baseUrl = 'https://dummyjson.com/products'
    const url = props.category
      ? `${baseUrl}/category/${props.category}`
      : `${baseUrl}?limit=300`

    const res = await fetch(url)

    if (!res.ok) throw new Error('Não possivel carregar o produto')

    const data = await res.json()
    products.value = data.products
    currentPage.value = 1

  } catch (err) {
    console.error(err)
    error.value = 'Erro ao carregar os produtos'
    products.value = []

  } finally {
    loading.value = false
  }
}

watch(() => props.category, fetchProducts)
onMounted(fetchProducts)

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    scrollToTop()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    scrollToTop()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>