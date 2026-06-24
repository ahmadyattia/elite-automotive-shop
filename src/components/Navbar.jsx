import styles from "../styles/components/Navbar.module.css";

const Navbar = () => {
  return (
    <ol className={styles.navbarLst}>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/appointments">Appointments</a>
      </li>
      {/* <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact Us</a></li> */}
      <li>
        <a href="/admin-dashboard">Dashboard</a>
      </li>
    </ol>
  );
};

export default Navbar;
