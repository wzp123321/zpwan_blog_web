/* eslint-disable */
/**
    获取上传 Input 中的图片对象 File
    将图片转换成 base64 格式
    base64 编码的图片通过 Canvas 转换压缩，这里会用到的 Canvas 的 drawImage 以及 toDataURL 这两个 Api，一个调节图片的分辨率的，一个是调节图片压缩质量并且输出的，后续会有详细介绍
    转换后的图片生成对应的新图片，然后输出
 */
export const compressImage = (file: any) => {
    let newFile: any = null;
    let reader = new FileReader();
    reader.readAsDataURL(file.raw)

    return new Promise(resolve => {
        reader.onload = function (e: any) {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            const context: any = canvas.getContext('2d');
            let image = new Image();
            image.src = e.target.result;
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                let quality = 0.7; // 图片质量
                const width = image.width * quality;
                const height = image.height * quality;
                canvas.width = width;
                canvas.height = height;
                context.clearRect(0, 0, width, height);// 清空画布
                context.drawImage(image, 0, 0, width, height);
                // 转为base64
                const dataUrl = canvas.toDataURL(file.type, quality);
                newFile = dataURLtoFile(dataUrl)
                resolve(newFile)
            }
        }
    })
}

// base64转文档流
function dataURLtoFile(dataUrl: string) {
    const filename: string = `img${Date.now()}.png`;
    const arr: any = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}