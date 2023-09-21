<script setup>
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'

</script>

<template>
  <PopoverRoot>
    <PopoverTrigger
      class="rounded-full w-[20px] h-[20px] inline-flex items-center justify-center bg-slate-300 text-xs"
      aria-label="Update dimensions"
    >
      ?
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        :side-offset="5"
        class="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col gap-2.5">
          <p class="text-[15px] mb-2.5">
            Selectionner une date pour filter les références ayant une date de péremption strictement inférieur à la date séléctionnée.
          </p>
        </div>
        <PopoverClose
          class="rounded-full h-[15px] w-[15px] inline-flex items-center justify-center absolute top-[5px] right-[5px]"
          aria-label="Close"
        >
          x
        </PopoverClose>
        <PopoverArrow class="fill-white" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>