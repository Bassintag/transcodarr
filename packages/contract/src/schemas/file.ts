import { z } from "zod";
import { withIdSchema } from "./common";

export const fileSchema = withIdSchema.extend({
  path: z.string(),
});
