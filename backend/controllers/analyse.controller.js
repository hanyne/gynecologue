const Analyse = require("../models/analyse");
// ajout de analyse
exports.saveAnalyse = (req, res) => {
    const analyse= new Analyse({
    analyseName:req.body.analyseName,
    });
    console.log(analyse);
  
    analyse.save((err, newAnalyse) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          err,
        });
      }
      res.status(201).json({
        ok: true,
        analyse: newAnalyse,
      });
    });
  };
 // ajout de analyse
exports.saveAnalyseOrd = (req, res) => {
  const analyse= new Analyse({
  analyseName:req.body.analyseName,
  });
  console.log(analyse);

  analyse.save((err, newAnalyse) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    }
    res.status(201).json({
      ok: true,
      analyse: newAnalyse,
    });
  });
};

//select all
exports.listAnalyse = (req, res) => {
    Analyse.find({})
        .then((lists) => {
            res.status(200).send(lists);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
};
//Update 
exports.updateAnalyse = (req, res) => {
    Analyse.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then((analyse) => {
            res.status(200).send("updated success")
        })
        .catch((error) => { console.log(error) });
};
//Delete
exports.deleteAnalyse = (req, res) => {
    Analyse.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).send('le nom de analyse est  supprimé !'))
      .catch(error => res.status(400).json({ error }));
};
//Delete ALL 
exports.deleteAllAnalyse = (req, res) => {
    Analyse.deleteMany({})
  .then(() => res.status(200).send('le nom de analyse est supprimé !'))
      .catch(error => res.status(400).json({ error }));
};
  //select par ID
   exports.analyseID = (req, res) => {
   Analyse.findOne({ _id: req.params.id})
      .then(analyse=> res.status(200).json(analyse))
      .catch(error => res.status(404).json({ error }));
  };
  //get par ID (Find a single data)
  exports.getAnalyseID = (req, res) => {
     Analyse.findById({ _id: req.params.id })
        .then((analyse) => {
            res.status(200).send(analyse)
        })
        .catch((error) => { console.log(error) });
      }
        // Get All analyse
       //Filter by drugName
exports.getAnalyse = (req, res) => {
  const analyseName = req.params.analyseName;
  Analyse.find({ analyseName: { $regex: new RegExp(analyseName, "i") } })
      .then((analyses) => {
          res.status(200).send(analyses);
      })
      .catch((error) => {
          console.log(error);
          res.status(500);
      });
};


      