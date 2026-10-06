import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";

await connectDB();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
