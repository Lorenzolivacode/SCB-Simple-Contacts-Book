import { Dispatch, SetStateAction } from "react";
import styles from "./Toggle.module.css";

interface SwitchProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}
function Switch({ active, setActive }: SwitchProps) {
  return (
    <div
      className={`${styles.main} ${active ? styles.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className={styles.mask}>
        <div className={styles.dot} />
      </div>
    </div>
  );
}

export default Switch;
