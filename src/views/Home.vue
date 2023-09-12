<template>
    <h1 class="text-center text-3xl my-5">VueStock</h1>
    <div class="xl:w-2/3 text-right mr-2  xl:mx-auto mb-5">
        <button @click="openQrCode = true" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-2">
            Scanner QR Code
        </button>
        <qrcode-capture @detect="onDetect"/>
    </div>
    <Table />
    <div v-if="openQrCode" class="qrcode">
        <qrcode-stream @detect="onDetect" :track="paintOutline"></qrcode-stream>
        <button type="button" class="closeQrCode text-3xl" @click="openQrCode = false">X</button>
    </div>
</template>

<script setup>
import Table from '../components/Table.vue'
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
import { updateArticle, getArticle } from '../models/article';
import { ref } from 'vue';

let openQrCode = ref(false);

function onDetect(detectedCodes) {
    console.log(detectedCodes[0].rawValue);
    const regexKey = /"(.*?)"/;
    const regexData = /{(.*?)}/;
    const key = regexKey.exec(detectedCodes[0].rawValue);
    const data = regexData.exec(detectedCodes[0].rawValue);
    updateArticle(key[1], data[1]);
}
function paintOutline(detectedCodes, ctx) {
    openQrCode.value = false;
    console.log(detectedCodes);
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