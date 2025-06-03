<template>
  <div class="relative">
    <h2 class="text-3xl font-bold text-gray-800 text-center mb-12">{{ title }}</h2>

    <div class="relative overflow-x-auto">
      <div v-if="loading" class="flex gap-6 pb-4">
        <div v-for="n in 8" :key="n" class="flex-shrink-0 w-72 animate-pulse">
          <div class="bg-gray-200 aspect-square rounded-2xl"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>

      <div v-else class="flex gap-6 pb-4">
        <router-link
          v-for="product in displayedProducts"
          :key="product.id"
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
          class="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 block group"
        >
          <div class="aspect-square relative overflow-hidden">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div
              v-if="showDiscount && product.discountPercentage"
              class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
            >
              -{{ Math.round(product.discountPercentage) }}%
            </div>
          </div>
          <div class="p-6">
            <div class="text-sm text-purple-600 font-medium mb-2 uppercase tracking-wide">
              {{ product.category }}
            </div>
            <h3
              class="font-bold text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors"
            >
              {{ product.title }}
            </h3>
            <div class="flex items-center justify-between">
              <p class="text-2xl font-bold text-green-600">${{ product.price }}</p>
              <div class="flex text-yellow-400"></div>
            </div>
          </div>
        </router-link>
      </div>

      <button
        @click="goPrev"
        class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white z-10 transition-all duration-200 hover:scale-110"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        @click="goNext"
        class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white z-10 transition-all duration-200 hover:scale-110"
        :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    apiUrl: String,
    showDiscount: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      products: [],
      loading: false,
      currentPage: 0,
      itemsPerPage: 6
    }
  },

  computed: {
    displayedProducts() {
      const start = this.currentPage * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.products.slice(start, end)
    },

    canGoNext() {
      return (this.currentPage + 1) * this.itemsPerPage < this.products.length
    },

    canGoPrev() {
      return this.currentPage > 0
    }
  },

  methods: {
    goNext() {
      if (this.canGoNext) {
        this.currentPage++
      }
    },

    goPrev() {
      if (this.canGoPrev) {
        this.currentPage--
      }
    },

    async fetchProducts() {
      this.loading = true

      try {
        const response = await fetch(this.apiUrl)
        const data = await response.json()

        this.products = data.products || []
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        this.loading = false
      }
    }
  },

  mounted() {
    this.fetchProducts()
  }
}
</script>
