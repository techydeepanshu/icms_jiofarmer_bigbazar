const {createWorker} = require('tesseract.js')

const worker = createWorker({
    langPath: '..',
    gzip:false,
    logger: m => console.log(m)
})

const readImage = (imagePath) => {
    await worker.load();
    await worker.loadLanguage('courier');
    await worker.initialize('courier');
    const {data} = await worker.recognize(imagePath);
    console.log("Recognised text--->",data);
    await worker.terminate();
}

module.exports = {
    readImage
}