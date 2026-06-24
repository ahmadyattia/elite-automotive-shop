import styles from "../../styles/components/modal/ApptDescriptionModal.module.css";

function ApptDescriptionModal({ description, isOpen, setIsOpen }) {
  console.log("here");
  return (
    <>
      {isOpen && (
        <div className={styles.mainBox}>
          <div className={styles.descriptionBox}>
            <button onClick={() => setIsOpen(false)}>Close</button>
            <h2>Description</h2>
            <p>{description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ApptDescriptionModal;
