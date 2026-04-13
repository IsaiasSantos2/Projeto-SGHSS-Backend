const db = require("../config/db");

exports.create = (req, res) => {
  const { user_id, nome, cpf, data_nascimento } = req.body;

  db.run(
    "INSERT INTO pacientes (user_id, nome, cpf, data_nascimento) VALUES (?,?,?,?)",
    [user_id, nome, cpf, data_nascimento],
    function (err) {
      if (err) return res.status(400).json(err);
      res.json({ message: "Paciente criado" });
    }
  );
};

exports.getAll = (req, res) => {
  db.all("SELECT * FROM pacientes", [], (err, rows) => {
    res.json(rows);
  });
};