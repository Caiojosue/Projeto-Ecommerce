<template>
  <footer class="bg-white border-t border-gray-200 py-12 mt-auto">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent 
                       text-2xl font-bold">
              E-Commerce Vue
            </h2>
          </div>
          <p class="text-gray-600 max-w-md">
            Sua loja online favorita com os melhores produtos e ofertas incríveis
            Compre com segurança e receba em casa
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-gray-800 mb-4">Links Rápidos</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="text-gray-600 hover:text-purple-600 transition-colors">Início</RouterLink></li>
            <li><RouterLink to="/produtos" class="text-gray-600 hover:text-purple-600 transition-colors">Produtos</RouterLink></li>
            <li><a href="/contato" class="text-gray-600 hover:text-purple-600 transition-colors">Contato</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-8 pt-8 text-center">
        <p class="text-gray-600 text-sm">
          © 2024 EcommerceVue. Todos os direitos reservados
        </p>
      </div>
    </div>
  </footer>
</template>