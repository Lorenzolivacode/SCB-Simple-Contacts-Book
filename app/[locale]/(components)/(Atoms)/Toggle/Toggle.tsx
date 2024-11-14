import styles from "./Toggle.module.css";

interface SwitchProps {
  active: boolean;
  setActive: () => void;
  title?: string;
}
function Switch({ active, setActive, title }: SwitchProps) {
  return (
    <div
      title={title}
      className={`${styles.main} ${active ? styles.active : ""}`}
      onClick={setActive}
    >
      <div className={styles.mask}>
        <div className={styles.dot} />
      </div>
    </div>
  );
}

export default Switch;
