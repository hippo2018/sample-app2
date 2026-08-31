import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import EventList from "./pages/EventList";
import EventForm from "./pages/EventForm";


export default function App() {
  return (
    <BrowserRouter>
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

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
