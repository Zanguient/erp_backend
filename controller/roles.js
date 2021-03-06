var mongoose = require("mongoose");
var Role = mongoose.model("Role");

exports.index = (req, res, next) => {
  Role.find().exec((err, docs) => {
    if (err) return next(err);
    else res.send(docs);
  });
};

exports.add = (req, res, next) => {
  const data = req.body;
  let role = new Role(data);
  role.permission = [];
  if (role.name && role.slug) {
    role.save(function(err) {
      if (err)
        return res.json({ success: false, message: "An error occured!" });
      // saved!
      return res.json({ success: true, message: "New Role Created!" });
    });
  } else {
    return res.json({ success: false, message: "An error occured!" });
  }
};

exports.delete = (req, res, next) => {
  Role.deleteOne({ _id: req.body.id }, function(err) {
    if (err) return handleError(err);
    res.send(true);
  });
};

exports.get_permission = (req, res, next) => {
  Role.find({ _id: req.params.id }).exec((err, doc) => {
    if (err) return next(err);
    res.send(doc);
  });
};
exports.save_permission = (req, res, next) => {
  Role.updateOne({ _id: req.params.id }, req.body.payload, (err, result) => {
    if (err) return next(err);
    res.send(result);
  });
};
exports.resolve_permission = (req, res, next) => {
  Role.find({ slug: req.body.role }).exec((err, path) => {
    if (err) return next(err);
    res.send(path);
  });
};
