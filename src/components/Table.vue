<template>
    <div v-show="loading" class="text-slate-800 w-full xl:w-2/3 mx-auto text-center">Loading ...</div>
    <div v-show="!loading" class="relative bg-slate-500 rounded-xl overflow-hidden mx-2 xl:mx-auto xl:w-2/3">
            <div class="shadow-sm overflow-hidden my-8">
                <table class="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr>
                            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Référence</th>
                            <th class="hidden sm:table-cell border-b border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left">Désignation</th>
                            <th class="hidden sm:table-cell border-b border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left">Quantité</th>
                            <th class="border-b border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left">Date de péremption</th>
                            <th class="border-b border-slate-600"></th>
                        </tr>
                    </thead>
                    <tbody class="bg-slate-800">
                        <tr v-for="reference in arrayToShow" :key="reference.id" class="hover:bg-slate-700" @click="openArticleModal = true; article = reference">
                            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ reference.ref }}</td>
                            <td class="hidden sm:table-cell border-b border-slate-700 p-4 text-slate-400">{{ reference.designation }}</td>
                            <td class="hidden sm:table-cell border-b border-slate-700 p-4 pr-8 text-slate-400">{{ reference.quantite }}</td>
                            <td class="border-b border-slate-700 p-4 pr-8 text-slate-400">{{ reference.date }}</td>
                            <td class="border-b border-slate-700 p-4 text-slate-400"><DeleteArticleModal :articleId="reference.ref"/></td>
                        </tr>
                    </tbody>
                </table>
                <div v-show="showError">Problème lors de la récupération des données</div>
            </div>
        <div v-if="references.length > 0" class="flex justify-center">
            <Pagination :nbPages="nbPages(references)" @changePage="(index) => arrayToShow = paginatedArray(references, index * 10, (index * 10) + 10)"/>
        </div>
    </div>
    <ArticleModal :open="openArticleModal" @changeOpenn="openArticleModal = false" :article="article"/>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { paginatedArray, nbPages } from '../assets/js/array'
import Pagination from '../components/Pagination.vue'
import DeleteArticleModal from './DeleteArticleModal.vue';
import ArticleModal from './ArticleModal.vue';
import { getArticles } from '../models/article';

let article = null;
let references = ref([]);
let loading = ref(true);
let showError = ref(false)
let openArticleModal = ref(false);
const arrayToShow = computed(() => {
  return paginatedArray(references.value, 0, 10)
});

onMounted(async () => {
    try {
        references.value = await getArticles();
        loading.value = false;
        showError.value = false
    } catch (error) {
        loading.value = false;
        showError.value = true;
    }
})

</script>