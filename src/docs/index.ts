import governement from "./government";
import basicInfo from "./generalinfo";
import server from "./server";
import tags from "./tags";
import classes from "./class";
import components from "./components";
import subject from "./subject";
import chapter from "./chapter";
import student from "./student";
import auth from "./auth";
export default {
  ...basicInfo,
  ...server,
  ...components,

  ...tags,
  paths: {
    ...auth,
    ...governement,
    ...classes,
    ...subject,
    ...chapter,
    ...student,
  },
};
