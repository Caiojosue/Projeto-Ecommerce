<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 capitalize">
                    {{ categoryTitle }}
                </h1>
                <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
            </div>
            
            <nav class="flex mb-8" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <RouterLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-purple-600">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Início
                        </RouterLink>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ categoryTitle }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <ProductGridComponent :category="$route.params.category" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductGridComponent from '../components/ProductGridComponent.vue'

const route = useRoute()

const formatTitle = (category) => {
  if (!category) return 'Todos os Produtos'
  return category
}

const categoryTitle = computed(() => formatTitle(route.params.category))
</script>