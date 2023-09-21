<template>
    <div v-show="loading" class="text-slate-800 w-full xl:w-2/3 mx-auto text-center">Loading ...</div>
    <div v-show="!loading" class="w-full xl:w-2/3 mx-auto h-[40px] flex gap-2 mb-5 items-center">
        <input v-model="searchRef" id="searchRef" type="search" placeholder="Chercher une référence" class="w-[180px] ml-2 border rounded-xl border-gray-400 text-center text-sm pl-4 md:pl-0 md:text-base md:w-[300px] h-full">
        <input v-model="datePeremption" type="date" id="date" class="border rounded-xl border-gray-400 text-center h-full md:px-2 text-sm md:text-base"/>
        <PopoverDate/>
        <img @click="clearFilter()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZklEQVR4nO2WX0/aUBjG+RASYCBU24JFiWVMK+FPswYQAflnYOLmdxsXy74QQwyws9mjHc4JyoreneUlqzNQoQyuNp/kuTnv87w/TmgJJtOz/lsNjkvh++OD6t27EjNrFzrQhR2zQd/mIupRvj84KpDBUV65f5PnjHbvK0V2UMlj6KqVgnp3WJAMFW9LmXC/nFV/lrNEc7+cxb3S/tSbQwayI10Vdk4HF1PV/kGajPq2mJoIhxlknui+nwru7SeYXm4X3+SSZNRwDvNFdHTVze1S1+kY6mbiRMfKVSr28J3fpGNsNxPH+tmYbBiqqbsrUj/2JHS9J5ExJ6UhHKDXyddYN7Mnyb2EOPMbMVQnITLf41F8FRfJqOF80gy6pnmkiCJ1KYXQpRQmRtyRQnJH3JkPqkkRBaoTCaJONEgm+VskuDioJkUQqIvQFlJC20TfW3JnZ8FQkCzw7Pl2AJ8LAaJnLLxULgS/4V84w1A5wGP5FU8mOrCpIP+C4DLPs1/5DXzG+4ghb/oU5F+fD37m9TJow4u/+Lxk1HA+aQbdv4K2OI5tcx78mfOQMa955CZ8KI+HanNupJdpr7kVtM7OdvMWt8q23TRuuxkyblpu0vTDbQDeYmmkl22xjIJYg/AmTTPN1RXcpFfImIfnf6DzdMbUcDmrpy4nGXXD5cRNh+PJBTCDjG7XufxhOnjZFm447GrDYSeaT+wvcG0CVBNkIPu4C7tOHY7oVPBwgc0Wrlut/brVSuoWi1wzmw0/oScWC/XJakW/u2rNYjH210dTzWwO18zmj7NAH3WZ2tJSFXbM2n3Wv6Nfdgt/J7Z+Z4MAAAAASUVORK5CYII=" class="w-fit h-fit">
    </div>
    
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
                            <td class="border-b border-slate-700 p-4 pr-8 text-slate-400">{{ new Date(parseInt(reference.date, 10)).getDate() + '/' + (new Date(parseInt(reference.date, 10)).getMonth() + 1) + '/' + new Date(parseInt(reference.date, 10)).getFullYear() }}</td>
                            <td class="border-b border-slate-700 p-4 text-slate-400"><DeleteArticleModal :articleId="reference.id"/></td>
                        </tr>
                    </tbody>
                </table>
                <div v-show="showError">Problème lors de la récupération des données</div>
            </div>
        <div v-if="references.length > 0" class="flex justify-center">
            <Pagination :nbPages="nbpages" @changePage="(index) => indexPage = index"/>
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
import PopoverDate from './PopoverDate.vue';
import { getArticles } from '../models/article';

let article = null;
let references = ref([]);
let filteredArray = ref([]);
let loading = ref(true);
let showError = ref(false)
let openArticleModal = ref(false);
let indexPage = ref(0)
const nbpages = ref(1)
const searchRef = ref();
const datePeremption = ref()

const arrayToShow = computed(() => {
    filteredArray.value = references.value;
    if (datePeremption.value) {
        searchRef.value = ''
        const date = new Date(datePeremption.value).getTime();
        filteredArray.value = references.value.filter(element => {
            if (element.date < date) {
                return element;
            }
        })
    }
    if (searchRef.value){
        datePeremption.value = ''
        filteredArray.value = references.value.filter(element => {
            if (element.ref.toLowerCase().includes(searchRef.value.toLowerCase())) {
                return element;
            }
        })
    }
    nbpages.value = nbPages(filteredArray.value);
    return paginatedArray(filteredArray.value, indexPage.value * 10, (indexPage.value * 10) + 10);
});

function clearFilter(){
    searchRef.value = ''
    datePeremption.value = ''
}

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

<style>
#searchRef {
    background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 5px center;
}
</style>