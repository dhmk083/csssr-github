import { useInput } from "@dhmk/react";

type Props = {
  value: number;
  onChange(value: number);
};

export default function PageSizeSelector({ value, onChange }: Props) {
  const input = useInput(value.toString());
  const changed = input.value !== value.toString();

  return (
    <div>
      Кол-во результатов на странице:
      <input type="number" {...input} />
      {changed && (
        <button onClick={() => onChange(Math.floor(+input.value))}>OK</button>
      )}
    </div>
  );
}
