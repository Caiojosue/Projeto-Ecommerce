<script setup>
import ProductCardComponent from '../components/ProductCardComponent.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="relative h-[500px] bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent"></div>
      
      <div class="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div class="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      
      <div class="relative h-full flex items-center justify-center text-center text-white px-6">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bem-vindo ao
            <span class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Ecommerce vue
            </span>
          </h1>
          <p class="text-xl md:text-2xl font-light mb-8 opacity-90">
            Descubra produtos incríveis com ofertas que vão te surpreender
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/produtos" 
              class="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Explorar Produtos
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white py-16">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-3xl font-bold text-purple-600">1000+</div>
            <div class="text-gray-600">Produtos</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-pink-600">50k+</div>
            <div class="text-gray-600">Clientes</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-orange-600">99%</div>
            <div class="text-gray-600">Satisfação</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-green-600">24/7</div>
            <div class="text-gray-600">Suporte</div>
          </div>
        </div>
      </div>
    </div>

    <main class="flex-1 bg-gray-50 py-16">
      <div class="container mx-auto px-6 space-y-16">
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <ProductCardComponent 
            title="Produtos com Ofertas Imperdíveis" 
            apiUrl="https://dummyjson.com/products?limit=300&skip=10&sort=price"
            :showDiscount="true"/>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p class="text-gray-600">Receba seus produtos em até 24h na sua casa</p>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Compra Segura</h3>
            <p class="text-gray-600">Seus dados protegidos com criptografia avançada</p>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Suporte 24 Horas Por Dia</h3>
            <p class="text-gray-600">Estamos sempre aqui para te ajudar</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
