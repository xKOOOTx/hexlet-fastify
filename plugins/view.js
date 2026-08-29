import fp from "fastify-plugin";
import view from "@fastify/view";
import { Eta } from "eta";
import formbody from '@fastify/formbody';


export default fp(async (app, options) => {
  const eta = new Eta();

  await app.register(view, { 
    engine: { eta },
    root: 'views',
    layout: 'layouts/mainpage'
  });

  await app.register(formbody);
});