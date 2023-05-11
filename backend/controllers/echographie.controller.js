const Eco = require('../models/echographie');

// Get all echographies
exports.listEco = (req, res, next) => {
  Eco.find({ patientId: req.params.patientId }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Save an Eco
exports.saveEco = async (req, res) => {
    try {
      // Check if the DICOM file has been sent in the request
      if (!req.file) {
        return res.status(400).json({
          ok: false,
          message: "Please select a DICOM file.",
        });
      }
      const echographie = await Eco.save({
    ...req.body,
    patientId: req.params.patientId,
    dicom: req.file.path,
      });
  
      res.status(201).json(echographie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// Update an Eco
exports.updateEco = async (req, res) => {
  if (req.body.title != null) {
    res.echographie.title = req.body.title;
  }
  if (req.body.description != null) {
    res.echographie.description = req.body.description;
  }
  if (req.body.content != null) {
    res.echographie.content = req.body.content;
  }
  if (req.file != null) {
    res.echographie.dicom = req.file.filename;
  }

  try {
    const updatedEco = await res.echographie.save();
    res.json(updatedEco);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an Eco
exports.deleteEco = async (req, res) => {
  try {
    await res.echographie.remove();
    res.json({ message: 'Eco deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one Eco
exports.getOneEco = async (req, res, next) => {
  let echographie;
  try {
    echographie = await Eco.findById(req.params.id);
    if (echographie == null) {
      return res.status(404).json({ message: 'Cannot find Eco' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.echographie = echographie;
  next();
};
