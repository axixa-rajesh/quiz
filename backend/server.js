import app from "./app.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";

const PORT = 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running successfully!`);
        console.log(`URL: http://localhost:${PORT}`);
    });
});