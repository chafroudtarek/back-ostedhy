import getAll from "./getAll";
import createOne from "./createOne";
import getOne from "./getOne";
import updateOne from "./updateOne";
import deleteOne from "./deleteOne";

export default {
  "/governement": {
    ...getAll,
    ...createOne,
  },
  "/governement/{id}": {
    ...getOne,
    ...updateOne,
    ...deleteOne,
  },
};
