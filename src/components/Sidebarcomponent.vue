<template>
  <div
    class="fixed top-0 left-0 w-64 h-full bg-white text-black shadow-lg flex flex-col">
    <div
      class="p-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white flex justify-center">
      <h1 class="text-xl font-bold">Ecommerce vue</h1>
    </div>

    <nav class="p-4 space-y-3 flex-1 overflow-auto">
      <RouterLink
        to="/produtos"
        class="block py-2 px-4 rounded hover:bg-sky-400/10 transition-colors">Produtos</RouterLink>

      <div>
        <button
          @click="sidebar = !sidebar"
          class="flex items-center w-full py-2 px-4 rounded hover:bg-sky-400/10 transition-colors"
          type="button">
          <span>Categorias</span>
          <svg
            :class="{ 'rotate-90': sidebar }"
            class="w-4 h-4 ml-auto transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div
          v-if="sidebar"
          class="ml-4 mt-2 space-y-1 border-l-2 border-sky-400/30 max-h-96 overflow-y-auto">
          <div v-if="loading" class="py-2 px-4 text-gray-500">
            Carregando categorias...
          </div>
          <div v-else-if="error" class="py-2 px-4 text-red-600">
            Erro ao carregar categorias.
          </div>

          <RouterLink
            v-else
            v-for="category in categories"
            :key="category.name || category"
            :to="`/produtos/${category.name || category}`"
            class="block py-2 px-4 text-sm rounded hover:bg-sky-400/10 transition-colors border-l-2 border-transparent hover:border-sky-400">
            {{ formatCategoryName(category) }}
          </RouterLink>

          <div
            v-if="!loading && !error && categories.length === 0"
            class="py-2 px-4 text-gray-500">
            Nenhuma categoria encontrada.
          </div>
        </div>
      </div>

      <RouterLink
        to="/contato"
        class="block py-2 px-4 rounded hover:bg-sky-400/10 transition-colors">Contato</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const sidebar = ref(false);
const categories = ref([]);
const loading = ref(false);
const error = ref(false);

const fetchCategories = async () => {
  loading.value = true;
  error.value = false;
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) throw new Error("Erro na resposta da API");
    const data = await response.json();
    console.log("Dados da API:", data);

    categories.value = data.map((categoria) => {
      if (typeof categoria === "string") {
        return {
          name: categoria
        };
      } else if (typeof categoria === "object" && categoria !== null) {
        return {
          name: categoria.name || ""
        };
      } else {
        return {
          name: "",
        };
      }
    });
  } catch (err) {
    console.error("Erro ao carregar categorias:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});

const formatCategoryName = (category) => {
  if (!category) return "";
  if (typeof category === "string") {
    return category
  }
  if (typeof category === "object" && category.name) {
    return category.name;
  }
  return "";
};
</script>
