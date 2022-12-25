import createOne from "./createOne";
import deleteOne from "./deleteOne";
import updateOne from "./updateOne";
import getAll from "./getAll";
import getOne from "./getOne";

export default {
  "/subject": {
    ...getAll,
    ...createOne,
  },
  "/subject/{id}": {
    ...getOne,
    ...deleteOne,
    ...updateOne,
  },
};
