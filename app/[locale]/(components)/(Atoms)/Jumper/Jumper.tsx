import styles from "./Jumper.module.css";

function Jumper() {
  return (
    <div className={`${styles.jumper_container} w-20px`}>
      <div className="bg-primary-sat-medium-light" />
    </div>
  );
}

export default Jumper;
