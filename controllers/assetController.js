const db = require('../models');

const getAllAssets = async (req, res) => {
  try {
    const { type, make, model } = req.query;
    let whereClause = {};
    
    if (type) {
      whereClause.typeId = type;
    }
    if (make) {
      whereClause.make = make;
    }
    if (model) {
      whereClause.model = model;
    }

    const assets = await db.Asset.findAll({ where: whereClause });
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createAsset = async (req, res) => {
  try {
    const { make, model, typeId } = req.body; 
    const asset = await db.Asset.create({ make, model, typeId });
    res.status(201).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, typeId } = req.body;
    const asset = await db.Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    await asset.update({ make, model, typeId });
    res.json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await db.Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    await asset.destroy();
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAssetsInStock = async (req, res) => {
  try {
    const assetsInStock = await db.Asset.findAll({ where: { status: 'stock' } });
    res.json(assetsInStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const issueAsset = async (req, res) => {
  const { assetSerialNumber, employeeId } = req.body; 
  try {
    await db.Asset.update({ status: 'non-stock' }, { where: { serialNumber: assetSerialNumber } }); 

    await db.AssetHistory.create({
      assetSerialNumber, 
      employeeId,
      issuedDate: new Date()
    });

    res.json({ message: 'Asset issued successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const returnAsset = async (req, res) => {
  const { assetSerialNumber, returnReason } = req.body; 
  try {
    const asset = await db.Asset.findOne({ where: { serialNumber: assetSerialNumber } });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    await asset.update({ status: 'stock' }); 

    await db.AssetHistory.update(
      { returnDate: new Date(), returnReason },
      { where: { assetSerialNumber, returnDate: null } } 
    );

    res.json({ message: 'Asset returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const scrapAsset = async (req, res) => {
  const { assetSerialNumber, returnReason ,employeeId} = req.body; 
  try {
    const asset = await db.Asset.findOne({ where: { serialNumber: assetSerialNumber } });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    await asset.update({ status: 'scrapped' }); 

    await db.AssetHistory.create({
      assetSerialNumber,
      employeeId,
      returnDate: new Date(),
      returnReason,
      status: 'scrapped'
    });

    res.json({ message: 'Asset scrapped successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAssetHistory = async (req, res) => {
  const { assetSerialNumber } = req.params;
  try {
    const assetHistory = await db.AssetHistory.findAll({ 
      where: { assetSerialNumber },
      include: [{ model: db.Employee, as: 'employee', attributes: ['id', 'name'] }]
    }); 
    res.json(assetHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAssetCategories= async (req, res) => {
  try {
    const assetCategories = await db.AssetCategory.findAll();
    res.json(assetCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createAssetCategories= async (req, res) => {
  try {
    const { name } = req.body;
    const assetCategory = await db.AssetCategory.create({ name });
    res.status(201).json(assetCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};





module.exports = {
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset,

  getAssetsInStock,
  issueAsset,
  returnAsset,
  scrapAsset,
  getAssetHistory,
  getAssetCategories,
  createAssetCategories
};
