<template>
  <div :class="`${prefix}-my-image`">
    <h4>左取色图，右效果图</h4>
    <canvas :width="width" :height="height"></canvas>
    <canvas :width="width" :height="height"></canvas>
    <p>取色色值：<input type="color" id="color" /></p>
    <p>
      容差范围：<input
        type="number"
        id="tolerance"
        min="0"
        max="255"
        step="1"
        value="0"
        size="4"
      />
    </p>
    <p>
      <input type="file" id="file" @change="fileChange" />
    </p>
    <p><my-button id="button">执行去色</my-button></p>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Mixins } from "vue-property-decorator";
import GlobalMixin from "@/components/mixins/global.mixin";
import fav from "./riziyan-favicon.png";
@Component({
  name: `my-image`
})
export default class MyImage extends Mixins(GlobalMixin) {
  mounted() {
    this.putFile(fav);
  }
  width = 165;
  height = 165;
  putFile(url: string) {
    // 后面重新写入
    const eleColor = document.getElementById("color") as HTMLInputElement;
    const canvas = document.querySelectorAll("canvas")[0] as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    // 结果canvas
    const canvasResult = document.querySelectorAll("canvas")[1];
    const contextResult = canvasResult.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    // 图片数据
    let imgData!: ImageData, imgDataResult!: ImageData;
    // 尺寸数据
    const w = 165,
      h = 165;
    // canvas上绘制图片
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0);
      contextResult.drawImage(img, 0, 0);
      // 获取像素信息数据
      imgData = context.getImageData(0, 0, w, h);
      imgDataResult = contextResult.getImageData(0, 0, w, h);
    };
    img.src = url;

    // 取色
    let rgbaPicker!: Uint8ClampedArray;
    canvas.addEventListener("click", event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      rgbaPicker = context.getImageData(x, y, 1, 1).data;
      // color输入框变化
      let strHex = "#";
      for (let i = 0; i < rgbaPicker.length - 1; i++) {
        let hex = rgbaPicker[i].toString(16);
        if (hex.length < 2) {
          hex = "0" + hex;
        }
        strHex += hex;
      }
      eleColor.value = strHex;
    });
    const eleTolerance = document.getElementById(
      "tolerance"
    ) as HTMLInputElement;
    const eleButton = document.getElementById("button") as HTMLButtonElement;

    if (eleButton && eleTolerance) {
      eleButton.onclick = () => {
        // 像素点色值
        const rgba = rgbaPicker;
        // 容差大小
        const tolerance = eleTolerance.value;
        // 基于原始图片数据处理
        for (let index = 0; index < imgData.data.length; index += 4) {
          const r = imgData.data[index];
          const g = imgData.data[index + 1];
          const b = imgData.data[index + 2];

          if (
            Math.sqrt(
              (r - rgba[0]) * (r - rgba[0]) +
                (g - rgba[1]) * (g - rgba[1]) +
                (b - rgba[2]) * (b - rgba[2])
            ) <= parseInt(tolerance, 10)
          ) {
            imgDataResult.data[index] = 0;
            imgDataResult.data[index + 1] = 0;
            imgDataResult.data[index + 2] = 0;
            imgDataResult.data[index + 3] = 0;
          } else {
            imgDataResult.data[index] = r;
            imgDataResult.data[index + 1] = g;
            imgDataResult.data[index + 2] = b;
            imgDataResult.data[index + 3] = imgData.data[index + 3];
          }
        }
        // put数据
        contextResult.putImageData(imgDataResult, 0, 0);
      };
    }
  }
  fileChange(e: any) {
    // 压缩图片需要的一些元素和对象
    const reader = new FileReader();
    const img = new Image() as HTMLImageElement;

    // 选择的文件对象
    const file = e.target.files[0];
    if (file.type.indexOf("image") == 0) {
      reader.readAsDataURL(file);
    } else {
      alert("not image");
      return;
    }

    // 缩放图片需要的canvas
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    // base64地址图片加载完毕后
    img.onload = () => {
      // 图片原始尺寸
      const originWidth = this.width;
      const originHeight = this.height;
      // 最大尺寸限制
      const maxWidth = this.width,
        maxHeight = this.height;
      // 目标尺寸
      let targetWidth = originWidth,
        targetHeight = originHeight;
      // 图片尺寸超过165x165的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }

      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      const url = canvas.toDataURL(file.type || "image/png");
      this.putFile(url);
      // canvas转为blob并上传
      // canvas.toBlob(function (blob) {
      //     // // 图片ajax上传
      //     // const xhr = new XMLHttpRequest();
      //     // // 文件上传成功
      //     // xhr.onreadystatechange = function() {
      //     //     if (xhr.status == 200) {
      //     //         // xhr.responseText就是返回的数据
      //     //     }
      //     // };
      //     // // 开始上传
      //     // xhr.open("POST", 'upload.php', true);
      //     // xhr.send(blob);
      // }, file.type || 'image/png');
    };

    // 文件base64化，以便获知图片原始尺寸
    reader.onload = (q: any) => {
      img.src = q.target.result as string;
    };
  }
  getObjectURL(file: File) {
    let url = null;
    if (window.createObjectURL !== undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
      // mozilla(firefox)兼容火狐
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }
}
</script>

<style lang="scss">
@import "myImage.scss";
</style>
