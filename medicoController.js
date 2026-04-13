const db = require("../config/db");

exports.create = (req, res) => {
  const { user_id, nome, especialidade } = req.body;

  db.run(
    "INSERT INTO medicos (user_id, nome, especialidade) VALUES (?,?,?)",
    [user_id, nome, especialidade],
    function (err) {
      if (err) return res.status(400).json(err);
      res.json({ message: "Médico criado" });
    }
  );
};

exports.getAll = (req, res) => {
  db.all("SELECT * FROM medicos", [], (err, rows) => {
    res.json(rows);
  });
};