import { eventIterator, oc } from "@orpc/contract";
import z from "zod";
import {
  clientEventSchema,
  clientSchema,
  createClientSchema,
  idParamsSchema,
} from "../schemas";

const list = oc
  .route({ path: "/", method: "GET" })
  .output(z.array(clientSchema));

const create = oc
  .route({ path: "/", method: "POST" })
  .input(createClientSchema)
  .output(clientSchema);

const getEvents = oc
  .route({ path: "/{id}/events", method: "GET" })
  .input(idParamsSchema)
  .output(eventIterator(clientEventSchema));

export const clientContract = oc
  .prefix("/clients")
  .router({ list, create, getEvents });
