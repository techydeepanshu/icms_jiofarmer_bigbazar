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
    const { data } = await worker.recognize(
      "/home/alekh/Workspace/Tech/Scan_20201203 (6).jpg"
    );
    console.log("Recognised text--->",data);
    await worker.terminate();
    return data.lines;
}

module.exports = {
    readImage
}