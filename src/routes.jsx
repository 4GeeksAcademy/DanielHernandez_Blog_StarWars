import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { People } from "./pages/People";
import { Planet } from "./pages/Planet";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      <Route path="/" element={<Home />} />

      <Route path="/People/:uid" element={<People />} />
      <Route path="/Planet/:uid" element={<Planet />} />


      <Route path="/Single/:theId" element={<Single />} />
      <Route path="/Demo" element={<Demo />} />
    </Route>
  )
);
