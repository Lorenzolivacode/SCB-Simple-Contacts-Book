import { Dispatch, SetStateAction } from "react";
import style from "./Toggle.module.css";

interface SwitchProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}
function Switch({ active, setActive }: SwitchProps) {
  return (
    <div
      className={`${style.main} ${active ? style.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className={style.mask}>
        <div className={style.dot} />
      </div>
    </div>
  );
}

export default Switch;
