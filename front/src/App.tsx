import {
  lazy,
  Suspense,
} from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";


const Home =
  lazy(() => import("./pages/Home"));

const EventList =
  lazy(() => import("./pages/EventList"));

const EventForm =
  lazy(() => import("./pages/EventForm"));


function PageLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 6,
      }}
    >
      <CircularProgress />
    </Box>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>

          <Route
            element={<Layout />}
          >

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/events"
              element={<EventList />}
            />

            <Route
              path="/events/new"
              element={<EventForm />}
            />

            <Route
              path="/events/:id/edit"
              element={<EventForm />}
            />

          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
