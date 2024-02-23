import Consul from "consul";
import "dotenv/config";
function ConsulConfiguration(app) {
  const consul = new Consul();
  consul.agent.service.register({
    name: "ProductService",
    address: process.env.HOST_NAME,
    port: parseInt(process.env.HOST_PORT),
    check: {
      http: `http://${process.env.HOST_NAME}:${process.env.HOST_PORT}/health`,
      interval: "10s",
      timeout: "5s",
    },
  });

  //Discovering the service by name of the service
  app.get("/health", async (req, res) => {
    let result = await consul.catalog.service
      .nodes("ProductService")
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error occured while discovering service");
        return;
      });
    const serviceNode = result[0];
    const serviceUrl = `http://${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
    res.send(`Service discovered at: ${serviceUrl}`);
  });
}

export default ConsulConfiguration;
