<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { componentGroups } from './configs/componentGroups'
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 flex flex-col bg-white border-r border-gray-200 shadow-sm flex-shrink-0 z-10 transition-transform duration-300 md:translate-x-0">
        <div class="h-16 flex items-center justify-center border-b border-gray-100 min-h-[4rem] px-4">
             <RouterLink to="/" class="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity !no-underline">
                <span class="text-blue-600">Dedsi</span> Vue UI
            </RouterLink>
        </div>
        
        <div class="flex-1 overflow-y-auto overflow-x-hidden p-4 dedsi-scrollbar">
             <nav class="space-y-8">
                 <div v-for="group in componentGroups" :key="group.title">
                     <h3 class="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                        {{ group.title.split('(')[0] }}
                        <span class="ml-auto text-[10px] bg-gray-100 text-gray-400 py-0.5 px-1.5 rounded-md font-mono">{{ group.items.length }}</span>
                     </h3>
                     <ul class="space-y-0.5">
                         <li v-for="item in group.items" :key="item.path">
                             <RouterLink 
                                :to="item.path" 
                                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden !no-underline"
                                active-class="bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100"
                                :class="['text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
                             >
                                <span class="relative z-10 truncate">{{ item.title.replace('Dedsi ', '') }}</span>
                                <div class="absolute w-1 h-1 bg-blue-500 rounded-full right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity" :class="{ 'opacity-100': $route.path === item.path }"></div>
                             </RouterLink>
                         </li>
                     </ul>
                 </div>
             </nav>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div class="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
            <div class="max-w-6xl mx-auto w-full pb-20">
                 <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
    </main>
  </div>
</template>

<style scoped>
.dedsi-scrollbar::-webkit-scrollbar {
    width: 5px;
}
.dedsi-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.dedsi-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
}
.dedsi-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: #e5e7eb;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>