<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <div v-if="loading" class="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="lg:w-1/2">
            <div class="bg-gray-200 aspect-square rounded-2xl mb-4"></div>
            <div class="flex gap-2">
              <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          <div class="lg:w-1/2 space-y-4">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center py-20">
        <div class="bg-red-50 rounded-2xl p-8 inline-block">
          <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-600 text-lg font-semibold">{{ error }}</p>
        </div>
      </div>
      
      <div v-else class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-1/2 p-8">
            <div class="sticky top-8">
              <div class="aspect-square mb-6 rounded-2xl overflow-hidden bg-gray-100">
                <img v-if="product.thumbnail" :src="selectedImage || product.thumbnail" :alt="product.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              
              <div class="flex gap-3 overflow-x-auto pb-2">
                <img :src="product.thumbnail" :alt="product.title"
                  @click="selectedImage = product.thumbnail"
                  :class="['w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200',
                    selectedImage === product.thumbnail || !selectedImage ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-300']" />
                <img v-for="(image, index) in product.images?.slice(0, 4)" :key="index" :src="image"
                  @click="selectedImage = image"
                  :class="['w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200',
                    selectedImage === image ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-300']" />
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 p-8 lg:p-12">
            <nav class="flex mb-6" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <RouterLink to="/" class="text-sm font-medium text-gray-500 hover:text-purple-600">Início</RouterLink>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <RouterLink to="/produtos" class="text-sm font-medium text-gray-500 hover:text-purple-600">Produtos</RouterLink>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-400">{{ product.title }}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div class="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
              {{ product.category }}
            </div>

            <h1 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">{{ product.title }}</h1>

            <div class="flex items-center mb-6">
              <span class="text-gray-600 font-medium">({{ product.rating || 0 }}) • {{ product.reviews?.length || 0 }} avaliações</span>
            </div>

            <div class="mb-8">
              <div class="flex items-baseline space-x-3">
                <span class="text-4xl font-bold text-green-600">${{ product.price }}</span>
                <span v-if="product.discountPercentage" class="text-lg text-red-500 font-semibold">
                  {{ Math.round(product.discountPercentage) }}% OFF
                </span>
              </div>
              <p class="text-gray-600 mt-2">Frete grátis para todo o Brasil</p>
            </div>

            <div class="mb-8">
              <div :class="['inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold',
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                <svg v-if="product.stock > 0" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                {{ product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Produto esgotado' }}
              </div>
            </div>


            

            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <button class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Comprar Agora
              </button>
              <button class="flex-1 border-2 border-purple-600 text-purple-600 py-4 px-8 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200">
                Adicionar ao Carrinho
              </button>
            </div>

            <div class="mb-8">
              <h2 class="text-xl font-bold mb-4 text-gray-800">Descrição do Produto</h2>
              <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="bg-gray-50 p-4 rounded-xl">
                <h3 class="font-semibold text-gray-800 mb-2">Marca</h3>
                <p class="text-gray-600">{{ product.brand || 'Não informado' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl">
                <h3 class="font-semibold text-gray-800 mb-2">Tamanho</h3>
                <p class="text-gray-600">{{ product.size || 'Não informado' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref({})
const loading = ref(true)
const selectedImage = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${route.params.id}`)
    product.value = response.data
  } catch (err) {
    error.value = 'O Produto não foi encontrado'
  } finally {
    loading.value = false
  }
})
</script>
