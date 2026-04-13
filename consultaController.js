const db = require("../config/db");

exports.create = (req, res) => {
  const { paciente_id, medico_id, data } = req.body;

  db.get(
    "SELECT * FROM consultas WHERE medico_id=? AND data=?",
    [medico_id, data],
    (err, conflito) => {
      if (conflito)
        return res.status(400).json({ error: "Horário ocupado" });

      db.run(
        "INSERT INTO consultas (paciente_id, medico_id, data, status) VALUES (?,?,?,?)",
        [paciente_id, medico_id, data, "AGENDADA"],
        function (err) {
          if (err) return res.status(400).json(err);
          res.json({ message: "Consulta criada" });
        }
      );
    }
  );
};

exports.getAll = (req, res) => {
  db.all("SELECT * FROM consultas", [], (err, rows) => {
    res.json(rows);
  });
};