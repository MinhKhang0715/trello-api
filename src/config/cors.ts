import { CorsOptions } from "cors";
import { WHITELIST_DOMAINS } from "../utilities/constants";

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    (WHITELIST_DOMAINS.indexOf(origin!) !== -1) ?
      callback(null, true) :
      callback(new Error(`${origin} Not allowed by CORS`));
  },
  optionsSuccessStatus: 200
};
