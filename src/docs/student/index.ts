import updateprofile from "./updateProfile";
import subscribetochapter from "./subscribeChapter";
import subscribetosubject from "./subscribeSubject";
import uploadAvatar from "./uploadAvatar";

export default {
  /* "/governement": {
    ...getAll,
    ...createOne,
  },*/
  "/student/{id}": {
    ...updateprofile,
  },
  "/student/subscribechapter": {
    ...subscribetochapter,
  },
  "/student/subscribesubject": {
    ...subscribetosubject,
  },
  "/student/upload": {
    ...uploadAvatar,
  },
};
