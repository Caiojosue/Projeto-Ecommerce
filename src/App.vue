<script setup>
import { ref } from 'vue'
import Navbar from './components/NavbarComponent.vue'
import Sidebarcomponent from './components/Sidebarcomponent.vue'

const isSidebarVisible = ref(false)

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value
}

function closeSidebar() {
  isSidebarVisible.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100 relative">
    
    <Navbar @toggle-sidebar="toggleSidebar" />

    <Sidebarcomponent v-show="isSidebarVisible" class="fixed z-50 inset-y-0 left-0 w-64 bg-white shadow-lg" />

    <transition name="fade">
      <div
        v-show="isSidebarVisible"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        @click="closeSidebar">
      </div>
    </transition>

    <main class="flex-grow p-4">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
