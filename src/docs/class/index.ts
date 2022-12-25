import createOne from "./createOne";
import deleteOne from "./deletOne";
import updateOne from "./updateOne";
import getAll from "./getAll";
import getOne from "./getOne";

export default {
  "/class": {
    ...getAll,
    ...createOne,
  },
  "/class/{id}": {
    ...getOne,
    ...deleteOne,
    ...updateOne,
  },
};
