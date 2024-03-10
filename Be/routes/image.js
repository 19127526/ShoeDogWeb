const express = require('express');
const multer = require("multer");
const router = express.Router();


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, './public/image/temp');
    },
    filename: function (req, file, cb) {
       if(file?.mimetype=='image/jpeg'){
           cb(null, file.originalname+".jpg");
       }
       else if(file?.mimetype=='image/png'){
           cb(null, file.originalname+".png");
       }
       else if(file?.mimetype=='image/webp'){
         cb(null, file.originalname+".webp");
       }
       else{
         cb(null, file.originalname);
       }

    }
});
const upload = multer({storage: storage});
//ver1
router.get('/image/:catID/:proID/:imgID', (req, res) => {
  const catID = req.params.catID;
  const proID = req.params.proID;
  const imgID = req.params.imgID;
  const path = `./public/image/${catID}/${proID}/${imgID}`;
  if (path){
    return res.sendFile(path, {root: './'});
  }else{
    return res.status(404).send({success: false, message: "Image not found"})
  }
})

module.exports = router;
