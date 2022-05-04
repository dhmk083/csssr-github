import { useInput } from "@dhmk/react";
import Stack from "components/Stack";
import styles from "./styles.module.scss";

type Props = {
  value: number;
  onChange(value: number);
};

export default function PageSizeSelector({ value, onChange }: Props) {
  const input = useInput(value.toString());
  const changed = input.value !== value.toString();

  return (
    <Stack>
      <span>Кол-во результатов на странице:</span>
      <input type="number" {...input} className={styles.input} />
      {changed && (
        <button onClick={() => onChange(Math.floor(+input.value))}>OK</button>
      )}
    </Stack>
  );
}
