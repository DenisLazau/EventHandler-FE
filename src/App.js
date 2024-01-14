import "./App.css";
import Event from "./pages/Event/Event";
import EventList from "./pages/EventList/EventList";
import { Routes, Route } from "react-router-dom";
import UpdateEventList from "./pages/EventList/UpdateEventList";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<Login />}
        ></Route>

        <Route path="/Signup" element={<Event />}></Route>
        <Route
          path="/pages/EventList/EventList"
          element={<EventList />}
        ></Route>
        <Route
          path="./pages/EventList/EventList"
          element={<EventList />}
        />
        <Route
          path="/pages/EventList/UpdateEventList"
          element={<UpdateEventList />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
