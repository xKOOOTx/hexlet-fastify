import fp from "fastify-plugin";
import session from "@fastify/session";
import fastifyCookie from "@fastify/cookie";

export default fp(async (app, options) => {
  await app.register(fastifyCookie);
  await app.register(session, {
    secret: "a secret with minimum length of 32 characters",
    cookie: { secure: false },
  });
});