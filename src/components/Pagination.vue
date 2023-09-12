<template>
    <nav aria-label="Page navigation">
        <ul id="pagination" class="flex items-center -space-x-px h-8 text-sm">
            <li>
                <button @click="nextPrevious(-1)" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                </button>
            </li>
            <li v-for="(item, index) in nbPages" :key="index">
                <button @click="changeActive($event.target.innerText)" class="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white pagination">{{ index + 1 }}</button>
            </li>
            <li>
                <button @click="nextPrevious(9999)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Next</span>
                <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps(['nbPages']);
const emit = defineEmits(['changePage'])
let activePage = 1;

onMounted(() => {
    document.querySelector('#pagination li:nth-child(2) button').classList.add('active');
})
function nextPrevious(page){
    if(page == -1 && activePage > 1) {
        activePage--;
    }
    if(page == 9999 && activePage < props.nbPages) {
        activePage++;
    }
    changeActive(activePage);
}
function changeActive(page){
    activePage = page;
    const pagination = document.getElementsByClassName('pagination');
    for (let i = 0; i < pagination.length; i++) {
        if(pagination[i].classList.contains('active')){
            pagination[i].classList.toggle("active");
        }
        if(pagination[i].innerText == activePage){
            pagination[i].classList.add("active");
        }
    }
    emit('changePage', activePage - 1);
    // event.target.classList.add('active');
}
</script>

<style scoped>
.active {
    z-index: 10;
    border-color: rgb(55 65 81);
    background-color: rgb(55 65 81);
    color: white;
}
</style>