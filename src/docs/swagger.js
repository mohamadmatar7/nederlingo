import schemas from "./schemas.js";
import paths from "./paths/index.js";

export default {
    openapi: "3.0.0",
    info: {},
    servers: [],
    tags: [],
    paths,
    components: {
        schemas,
    }
  }