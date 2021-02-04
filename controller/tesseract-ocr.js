const {createWorker} = require('tesseract.js')

const worker = createWorker({
    langPath: '..',
    gzip:false,
    logger: m => console.log(m)
})

const readImage = async (imagePath = null) => {
    await worker.load();
    await worker.loadLanguage('courier');
    await worker.initialize('courier');
    const { data } = await worker.recognize(imagePath);
    console.log("Recognised text--->",data.text);
    await worker.terminate();
    return data.lines;
}

module.exports = {
    readImage
}