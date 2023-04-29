const Ord = require("../models/ordonnace");

// Add Ordonnance
exports.saveOrd = (req, res) => { 
    const Ord = new Ordonnance({
        dateOrd: Date.now(),
        userName: req.body.userName,
        nomP:req.body.nomP,
        prenomP:req.body.prenomP,
        drugName: req.body.drugName,
        dosage: req.body.dosage
    });
    
    Ord.save()
        .then(() => res.status(201).json({message: "Ordonnance created successfully."}))
        .catch(error => res.status(400).json({error}));}
// Get All ordonnance
exports.getOrd = (req, res) => {
  Ord.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
}
// Get single ordonnance 
exports.ordID = (req, res) => {
    Ord.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}

// Update ordonnance 
exports.updOrd = (req, res, next) => {
    Ord.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        //console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
}

// Delete ordonnance 
exports.deleteOrd = (req, res, next) => {
    Ord.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
}