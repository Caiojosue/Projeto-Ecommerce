<template>
  <nav class="bg-white/95 backdrop-blur-md border-b border-purple-100 p-4 shadow-lg sticky top-0 z-30">
    <div class="container mx-auto flex justify-between items-center">
      <button @click="$emit('toggle-sidebar')"
        class="text-gray-700 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex-1 mx-4">
        <div class="max-w-xl mx-auto relative">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar produtos..." 
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200
                     text-gray-800 placeholder-gray-500
                     focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:bg-white
                     transition-all duration-200"/>
          </div>

          <div 
            v-if="searchQuery && searchResults.length > 0"
            class="absolute w-full mt-2 py-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
            <div 
              v-for="product in searchResults" 
              :key="product.id"
              class="px-4 py-3 hover:bg-purple-50 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0 transition-colors" 
              @click="navigateToProduct(product)">
              <div class="font-medium">{{ product.title }}</div>
              <div class="text-sm text-gray-500">${{ product.price }}</div>
            </div>
          </div>
        </div>
      </div>

      <RouterLink to="/" class="flex items-center space-x-2 group">
        <div class="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent 
                   font-bold text-xl group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-200">
          E-Commerce Vue
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()

const searchQuery = ref('')
const products = ref([])
const isLoading = ref(false)
const searchTimeout = ref(null)

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  
  return products.value
    .filter(product => {
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query)
      const bTitleMatch = b.title.toLowerCase().includes(query)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      return b.rating - a.rating
    })
    .slice(0, 5)
})

const fetchProducts = async () => {
  isLoading.value = true
  
  try {
    const response = await fetch('https://dummyjson.com/products?limit=300')
    const data = await response.json()
    
    if (!data.products) throw new Error('Dados não encontrados')
    
    products.value = data.products
    console.log(`Carregados ${data.products.length} produtos`)
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  } finally {
    isLoading.value = false
  }
}

const navigateToProduct = (product) => {
  router.push(`/produtos/item/${product.id}`)
  searchQuery.value = ''
}

watch(searchQuery, () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)

  searchTimeout.value = setTimeout(() => {
    isLoading.value = false
  }, 300)
})

onMounted(() => {
  fetchProducts()
})
</script>
