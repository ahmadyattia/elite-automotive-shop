import { useEffect, useRef, useState } from "react";
import styles from "../../src/styles/pages/Appointments.module.css";
import { supabase } from "../utils/supabase";
import useFetchBookedSlots from "../hooks/useFetchBookedSlots";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const nextSection = sectionRefs[currentStep]?.current;
    if (nextSection) {
      setTimeout(() => {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        nextSection.focus();
      }, 100);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!service) {
      setCurrentStep(0);
    }

    if (service) {
      setCurrentStep(1);
    }

    if (date) {
      setCurrentStep(2);
    }

    if (date && timeSlot) {
      setCurrentStep(3);
    }

    if (date && timeSlot && vehicleMake && vehicleModel && vehicleYear) {
      setCurrentStep(4);
    }

    if (
      date &&
      timeSlot &&
      vehicleMake &&
      vehicleModel &&
      vehicleYear &&
      email &&
      phone &&
      customerName
    ) {
      setCurrentStep(5);
    }

    if (
      date &&
      timeSlot &&
      vehicleMake &&
      vehicleModel &&
      vehicleYear &&
      email &&
      phone &&
      customerName &&
      description
    ) {
      setCurrentStep(6);
    }
  }, [
    date,
    timeSlot,
    email,
    phone,
    customerName,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    service,
    description,
  ]);

  const openHours = {
    start: 8,
    end: 17,
  };

  const {
    bookedSlots,
    loading: loadingBookedSlots,
    error: fetchBookedSlotsError,
  } = useFetchBookedSlots();

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
      return !bookedSlots.some((appt) => {
        return appt.date === date && appt.slot === slot;
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

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

    const bookedSlot = {
      date,
      slot: timeSlot,
    };

    const { error: placeApptError } = await supabase // post the appointment
      .from("appointments")
      .insert(appointment)
      .select();

    const { error: postSlotError } = await supabase
      .from("BookedSlots")
      .insert(bookedSlot)
      .select();

    // error handling

    if (placeApptError || postSlotError) {
      if (placeApptError && !postSlotError) {
        setError(placeApptError);
        console.error(placeApptError);
      }

      if (postSlotError && !placeApptError) {
        setError(postSlotError);
        console.error(postSlotError);
      }

      if (placeApptError && postSlotError) {
        setError(`${placeApptError} & ${postSlotError}`);
        console.error(placeApptError);
        console.error(postSlotError);
      }

      setSuccess(false);
    } else {
      setSuccess(true);
      navigate("/success");
    }

    window.scrollTo({
      // scroll to top on submit (for the user to see the error at the top if it exists)
      top: 0,
      behavior: "smooth",
    });

    setIsSubmitting(false);
  };

  console.log(sectionRefs[currentStep]);

  return (
    <div className={styles.booking}>
      {error && !success && (
        <p>
          Server error encountered while booking the appointment. Sorry for the
          inconvenience!
        </p>
      )}
      {success && !error && <p>Appointment booked successfully!</p>}
      <div>
        <h1>Book an Appointment</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.services} ref={sectionRefs[0]}>
            <label className={styles.servicesLabel}>Select a Service:</label>
            {/* <div className={styles.serviceBtns}> */}
            <button
              type="button"
              className={
                service === "Oil Change" ? styles.focusedBtn : undefined
              }
              onClick={() => setService("Oil Change")}
            >
              Oil Change
            </button>
            <button
              type="button"
              className={
                service === "Tire Service" ? styles.focusedBtn : undefined
              }
              onClick={() => setService("Tire Service")}
            >
              Tire Service
            </button>
            <button
              type="button"
              className={
                service === "Brake Inspection" ? styles.focusedBtn : undefined
              }
              onClick={() => setService("Brake Inspection")}
            >
              Brake Inspection
            </button>
            <button
              type="button"
              className={
                service === "General Maintenance"
                  ? styles.focusedBtn
                  : undefined
              }
              onClick={() => setService("General Maintenance")}
            >
              General Maintenance
            </button>
            <button
              type="button"
              className={service === "Other" ? styles.focusedBtn : undefined}
              onClick={() => setService("Other")}
            >
              Other
            </button>
            {/* </div> */}
          </div>
          {/* <hr /> */}
          {service && (
            <div ref={sectionRefs[1]}>
              <label htmlFor="date">Select a Date: </label>
              <input
                id="date"
                name="date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}
          {/* <hr /> */}
          {date &&
            loadingBookedSlots &&
            !bookedSlots &&
            !fetchBookedSlotsError && <p>Loading available slots...</p>}
          {date &&
            fetchBookedSlotsError &&
            !bookedSlots &&
            !loadingBookedSlots && <p>Error loading available slots...</p>}
          {date &&
            bookedSlots &&
            !fetchBookedSlotsError &&
            !loadingBookedSlots && (
              <div ref={sectionRefs[2]} className={styles.timeSlots}>
                <label>Select Time Slot: </label>
                {availableTimeSlots().map((slot, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className={
                        timeSlot === slot
                          ? `${styles.focusedBtn} ${styles.timeSlot}`
                          : styles.timeSlot
                      }
                      onClick={() => setTimeSlot(slot)}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
          {/* <hr /> */}
          {timeSlot && (
            <div ref={sectionRefs[3]}>
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
            <div ref={sectionRefs[4]}>
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
                type="tel"
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
            <div ref={sectionRefs[5]}>
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
            <button
              ref={sectionRefs[6]}
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Appointments;
