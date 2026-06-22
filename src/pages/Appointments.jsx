import { useEffect, useMemo, useState } from "react";
import styles from "../../src/styles/pages/Appointments.module.css";

const Appointments = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const openHours = {
    start: 8,
    end: 17,
  };

  const appointments = [
    { date: "2026-06-26", slot: "13:00" },
    { date: "2026-06-27", slot: "15:00" },
  ];

  // reset time slot selection on date change
  useEffect(() => {
    setTimeSlot("");
  }, [date]);

  const availableTimeSlots = () => {
    const slots = [];

    let i = openHours.start;

    while (i <= openHours.end) {
      slots.push(`${i}:00`);

      i++;
    }

    return slots.filter((slot) => {
      return !appointments.some((appt) => {
        return appt.date === date && appt.slot === slot;
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      service,
      date,
      timeSlot,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      customerName,
      phone,
      email,
      description,
    };

    console.log(appointment);
  };

  return (
    <div>
      <h1>Book an Appointment</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.services}>
          <label>Select a Service:</label>
          <button
            className={service === "Oil Change" ? styles.focusedBtn : undefined}
            onClick={() => setService("Oil Change")}
          >
            Oil Change
          </button>
          <button
            className={
              service === "Tire Service" ? styles.focusedBtn : undefined
            }
            onClick={() => setService("Tire Service")}
          >
            Tire Service
          </button>
          <button
            className={
              service === "Brake Inspection" ? styles.focusedBtn : undefined
            }
            onClick={() => setService("Brake Inspection")}
          >
            Brake Inspection
          </button>
          <button
            className={
              service === "General Maintenance" ? styles.focusedBtn : undefined
            }
            onClick={() => setService("General Maintenance")}
          >
            General Maintenance
          </button>
          <button
            className={service === "Other" ? styles.focusedBtn : undefined}
            onClick={() => setService("Other")}
          >
            Other
          </button>
        </div>

        {service && (
          <div>
            <label htmlFor="date">Select a Date: </label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}

        {date && (
          <div>
            <label>Select Time Slot: </label>
            {availableTimeSlots().map((slot) => {
              return (
                <button
                  className={timeSlot === slot ? styles.focusedBtn : undefined}
                  onClick={() => setTimeSlot(slot)}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}

        {timeSlot && (
          <div>
            <h2>Vehicle Information</h2>
            <label htmlFor="vehicleMake">Make:</label>
            <input
              id="vehicleMake"
              type="text"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
            />

            <label htmlFor="vehicleModel">Model:</label>
            <input
              id="vehicleModel"
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
            />

            <label htmlFor="vehicleYear">Year:</label>
            <input
              id="vehicleYear"
              type="text"
              value={vehicleYear}
              onChange={(e) => setVehicleYear(e.target.value)}
            />
          </div>
        )}

        {timeSlot && vehicleMake && vehicleModel && vehicleYear && (
          <div>
            <h2>Customer Information</h2>
            <label htmlFor="customerName">Full Name:</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <label htmlFor="phone">Phone Number:</label>
            <input
              id="phone"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {timeSlot && customerName && phone && email && (
          <div>
            <label htmlFor="description">Description (optional)</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        )}

        {timeSlot && customerName && phone && email && (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default Appointments;
