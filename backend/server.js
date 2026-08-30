import sequelize from "./config/db.js";
import app from "./app.js";
import db from "./models/index.js"; 


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Db connected & synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error("Sync Error:", err);
  });