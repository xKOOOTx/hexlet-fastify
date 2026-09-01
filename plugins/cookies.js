import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";

export default fp(async (app, options) => {
  await app.register(fastifyCookie);

  app.get("/cookies", (req, res) => {
    console.log(req.cookies);
    res.send();
  });
});