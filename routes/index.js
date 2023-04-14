import express from "express"
import viewsRoutes from "./views.routes.js"

const route = express.Router()

route.use("/", viewsRoutes)



export default route