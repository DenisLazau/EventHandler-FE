import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function EventList() {
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reloadPage, setReloadPage] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5267/api/Event")
      .then((res) => {
        setEventList(res.data);
        setReloadPage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadPage]);

  const deleteEvent = (id) => {
    axios.delete(`http://localhost:5267/api/Event/${id}`);
    setReloadPage(true);
    setSearch("");
  };

  const searchEvent = () => {
    axios
      .get(`http://localhost:5267/api/Event/filter/Category?Category=${search}`)
      .then((res) => {
        setEventList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEventClick = (event) => {
    // Handle event click, you can show additional data here
    setSelectedEvent(event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: isSelected ? "#3174ad" : "#4285f4", // Adjust the background color
      borderRadius: "5px",
      opacity: 0.8,
      color: "#fff",
      border: "3px solid #3174ad", // Add a border color
      display: "block",
      paddingLeft: "8px",
      paddingRight: "8px",
      fontWeight: "bold",
      fontSize: "14px",
    };

    return {
      style,
    };
  };

  return (
    <>
      <NavBar title="Event List" btn="Go Back" classN="btn btn-warning" path="/" />
      <div className="container-sm">
        <div className="input-group mb-4 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Calendar Category"
            aria-label="Search by Calendar Category"
            aria-describedby="button-addon2"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-info"
            type="submit"
            id="button-addon2"
            onClick={searchEvent}
          >
            Search
          </button>
        </div>
        <Calendar
        localizer={localizer}
        events={eventList.map((event) => ({
          id: event.id,
          title: event.EventName,
          start: new Date(event.date),
          end: new Date(event.date),
          seats: event.seats,
          date: event.date,
          name: event.EventName,
          category: event.event_Type,
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter} // Add this prop
      />

        {selectedEvent && (
          <div>
            <h3>{selectedEvent.title}</h3>
            <p>Date: {selectedEvent.date}</p>
            <p>Name: {selectedEvent.name}</p>
            <p>Category: {selectedEvent.category}</p>
            <p>VIP Seats: {selectedEvent.seats.find((seat) => seat.seatType === "VIP")?.numberOfSeats || 0}</p>
            <p>Free Seats: {selectedEvent.seats.find((seat) => seat.seatType === "free")?.numberOfSeats || 0}</p>

            <Link
              to="/pages/EventList/UpdateEventList"
              state={{
                id: selectedEvent.id,
                eventType: selectedEvent.category,
                eventName: selectedEvent.name,
                date: selectedEvent.date,
                vipSeats: selectedEvent.seats.find((seat) => seat.seatType === "VIP")?.numberOfSeats || 0,
                freeSeats: selectedEvent.seats.find((seat) => seat.seatType === "free")?.numberOfSeats || 0,
              }}
              className="btn btn-success ms-3"
            >
              Book Ticket
            </Link>

            <button
              type="button"
              className="btn btn-danger ms-3"
              onClick={() => {
                deleteEvent(selectedEvent.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default EventList;
