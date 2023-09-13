<template>
    <h1 class="text-center text-3xl my-5">VueStock</h1>
    <div class="w-full xl:w-2/3 xl:mx-auto mx-2 flex flex-col md:flex-row justify-around mb-2 gap-2">
        <div class="">
            <button @click="openQrCode = true" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2 mb-2">
                Scanner QR Code
            </button>
            <qrcode-capture @detect="onDetect"/>
        </div>
        <div class="">
            <button @click="generateQrCode = true" class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-2">
                Generer QR Code
            </button>
        </div>
    </div>
    <Table />
    <div v-if="openQrCode" class="qrcode">
        <qrcode-stream @detect="onDetect" :track="paintOutline"></qrcode-stream>
        <button type="button" class="closeQrCode text-3xl" @click="openQrCode = false">X</button>
    </div>
    <div >
        <qrcode-vue value="value" level="M" render-as="canvas" id="qrcode"/>
    </div>
    <a :href="dataURL" target="_blank" download="qrcode.png">Télécharger</a>
    <div v-if="generateQrCode">
        <AddArticleModal :open="generateQrCode" @close="generateQrCode = false"/>
    </div>
</template>

<script setup>
import Table from '../components/Table.vue'
import AddArticleModal from '../components/AddArticleModal.vue'
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
import { updateArticle } from '../models/article';
import { ref, onMounted } from 'vue';
import {useToast} from 'vue-toast-notification';
import QrcodeVue from 'qrcode.vue'

const $toast = useToast();
let openQrCode = ref(false);  
let generateQrCode = ref(false); 
let dataURL = ref(null);
onMounted(() => {
    dataURL.value = document.getElementById('qrcode').toDataURL("image/png");
})


async function onDetect(detectedCodes) {
    // openQrCode.value = false;
    // const regexKey = /"(.*?)"/;
    // const regexData = /{(.*?)}/;
    // const key = regexKey.exec(detectedCodes[0].rawValue);
    // const data = regexData.exec(detectedCodes[0].rawValue);
    // try {
    //     await updateArticle(key[1], data[1]);
    //     let instance = $toast.success('Article ajouté/modifié');
    // } catch (error) {
    //     let instance = $toast.error(error);
    // }
    console.log(detectedCodes);
}
function paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    }

</script>

<style>
.qrcode {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.closeQrCode {
    position: absolute;
    top: 10px;
    right: 20px;
}
</style>