const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { email, password, role } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password, role) VALUES (?,?,?)",
    [email, hash, role],
    function (err) {
        if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "Email já cadastrado" });
        }
        return res.status(400).json(err);
        }
      if (err) return res.status(400).json(err);
      res.json({ message: "Usuário criado" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email=?", [email], (err, user) => {
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token });
  });
};