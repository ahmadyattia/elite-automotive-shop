import { useState } from "react";
import useFetchAppts from "../hooks/useFetchAppts";
import styles from "../styles/components/ApptsTable.module.css";
import ApptDescriptionModal from "./modal/ApptDescriptionModal";

function ApptsTable() {
  const { appointments, error, loading } = useFetchAppts();
  const [isOpen, setIsOpen] = useState(false);

  if (error) console.error(error);

  return (
    <div className={styles.mainContainer}>
      <h2>Appointments Table</h2>
      {error && !appointments && <p>Error while fetching appointments...</p>}

      {loading && !appointments && <p>Loading appointments...</p>}
      {appointments && (
        <table className={styles.apptsTable}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Vehicle Make</th>
              <th>Vehicle Model</th>
              <th>Vehicle Year</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => {
              return (
                <tr key={index}>
                  <td>{appt.customerName}</td>
                  <td>{appt.service}</td>
                  <td>{appt.date}</td>
                  <td>{appt.timeSlot}</td>
                  <td>{appt.vehicleMake}</td>
                  <td>{appt.vehicleModel}</td>
                  <td>{appt.vehicleYear}</td>
                  <td>{appt.email}</td>
                  <td>{appt.phone}</td>
                  <td className={styles.descTableData}>
                    {appt.description && (
                      <div className={styles.viewDescBtnFlex}>
                        <button
                          className={styles.viewDescBtn}
                          onClick={() => setIsOpen(true)}
                        >
                          View
                        </button>
                        <ApptDescriptionModal
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          description={appt.description}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApptsTable;
