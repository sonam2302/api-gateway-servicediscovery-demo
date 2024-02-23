import express from "express";
import routes from "./routes/route.js";
import ConsulConfiguration from "./consul-config.js";
import "dotenv/config";
const app = express();
ConsulConfiguration(app);

app.use("/api", routes);
app.listen(process.env.HOST_PORT, () => {
  console.log(`Server running on port ${process.env.HOST_PORT}`);
});
