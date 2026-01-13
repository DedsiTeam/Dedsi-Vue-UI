<template>
    <div class="max-w-7xl mx-auto">
        <div class="mb-10">
            <h1 class="font-extrabold text-gray-900 tracking-tight">Dedsi Vue UI</h1>
            <h2 class="font-extrabold text-gray-900 tracking-tight">Component Overview</h2>
            <p class="text-gray-500 mt-2 text-lg">Explore our collection of {{ totalComponents }} specialized components.</p>
        </div>

        <div v-for="group in componentGroups" :key="group.title" class="mb-12">
            <div class="flex items-center mb-6 border-b border-gray-100">
                <h3 class="text-xl font-bold text-gray-800">{{ group.title }}</h3>
                <span class="ml-3 px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{{ group.items.length }}</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div
                    v-for="comp in group.items"
                    :key="comp.path"
                    class="group relative bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                    @click="$router.push(comp.path)"
                >
                    <div>
                        <div class="flex items-start justify-between mb-1">
                            <h4 class="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate pr-2" :title="comp.title">{{ comp.title }}</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <code class="text-[10px] uppercase tracking-wider font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded mb-3 inline-block group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">{{ comp.name }}</code>
                        
                        <p class="text-gray-500 text-xs leading-relaxed line-clamp-2 group-hover:text-gray-600">
                            {{ comp.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { componentGroups } from '../../configs/componentGroups';

const totalComponents = computed(() => {
    return componentGroups.reduce((acc, group) => acc + group.items.length, 0);
});
</script>
