<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import DeleteArticleModal from './DeleteArticleModal.vue';

const props = defineProps(['open', 'article']);
const emit = defineEmits(['changeOpenn'])

</script>

<template>
  <DialogRoot v-model:open="props.open" @update:open="$emit('changeOpenn')">
    <!-- <DialogTrigger
      class="text-grass11 font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
    >
      Edit profile
    </DialogTrigger> -->
    <DialogPortal>
      <DialogOverlay class="dialog-overlay" />
      <DialogContent
        class="dialog-content"
      >
        <!-- <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          Edit profile
        </DialogTitle>
        <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
        <fieldset class="mb-[15px] flex items-center gap-5" disabled>
          <label class="text-grass11 w-[90px] text-right text-[15px]" for="ref"> Référence </label>
          <input
            id="ref"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            :defaultValue="props.article.ref"
          >
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5" disabled>
          <label class="text-grass11 w-[90px] text-right text-[15px]" for="designation"> Désignation </label>
          <input
            id="designation"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            :defaultValue="props.article.designation"
          >
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5" disabled>
          <label class="text-grass11 w-[90px] text-right text-[15px]" for="quantite"> Quantité </label>
          <input
            id="quantite"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            :defaultValue="props.article.quantite"
          >
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5" disabled>
          <label class="text-grass11 w-[90px] text-right text-[15px]" for="date"> Date de péremption </label>
          <input
            id="date"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            :defaultValue="new Date(parseInt(props.article.date, 10)).getDate() + '/' + (new Date(parseInt(props.article.date, 10)).getMonth() + 1) + '/' + new Date(parseInt(props.article.date, 10)).getFullYear()"
          >
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Retour
            </button>
          </DialogClose>
          <!-- <DialogClose as-child> -->
            <button
              class="text-white inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px] ml-2"
            >
              <DeleteArticleModal @close-article-modal="$emit('changeOpenn')" :articleId="props.article.id"/>
            </button>
          <!-- </DialogClose> -->
        </div>
        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[4px] right-[4px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          X
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.dialog-overlay {
  @apply bg-black fixed inset-0 z-20;
}

.dialog-content {
  @apply fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-20;
}
</style>