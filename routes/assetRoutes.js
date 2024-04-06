
const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const {validateCreateAsset,validateIssueAsset,returnAssetValidation,scrapAssetValidation,getAssetHistoryValidation} = require('../utills/validation');

router.get('/', assetController.getAllAssets);
router.post('/',validateCreateAsset, assetController.createAsset);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);

router.get('/stocks', assetController.getAssetsInStock);
router.post('/issue',validateIssueAsset, assetController.issueAsset);
router.post('/return',returnAssetValidation,assetController.returnAsset);
router.post('/scrap',scrapAssetValidation, assetController.scrapAsset);
router.get('/history/:assetSerialNumber',getAssetHistoryValidation, assetController.getAssetHistory);
router.get('/asset-categories',assetController.getAssetCategories);
router.post('/asset-categories',assetController.createAssetCategories);

module.exports = router;
