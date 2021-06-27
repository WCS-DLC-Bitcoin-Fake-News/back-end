import express from "express";
import UserRoutes from "./UserRoutes.js"
import BunkerRoutes from "./BunkerRoutes.js"
const router = express.Router();

// This is equivalent to defining routes in the way bellow 
// router.use("/users", UserRoutes)
// router.use("/users", BunkerRoutes)

const routesBuilder = (routes) => {
    routes.forEach(route => router.use(route.route, route.middleware))
}

const appRoutes = [{
    route: "/users", 
    middleware: UserRoutes 
  },
  {
    route: "/bunkers", 
    middleware: BunkerRoutes
  }
]

routesBuilder(appRoutes);

export default router;