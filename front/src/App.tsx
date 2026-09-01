import {
  lazy,
  Suspense,
} from "react";

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
    <div className="loading">
      <span className="spinner" />
    </div>
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
