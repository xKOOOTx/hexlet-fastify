import fp from "fastify-plugin";
import flash from "@fastify/flash";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/secure-session";

export default  fp(async (app, options) => {
  await app.register(fastifyCookie);

  await app.register(fastifySession, {
    secret: "a secret with minimum length of 32 characters",
    cookie: {
        path: '/',
    },
  });

  await app.register(flash);
})