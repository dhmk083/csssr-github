type Props = {
  page: number;
  totalPages: number;
  onChange(p: number);
};

export default function Pager({ page, totalPages, onChange }: Props) {
  return (
    <div>
      {page > 1 && <button onClick={() => onChange(page - 1)}>Назад</button>}
      {page < totalPages && (
        <button onClick={() => onChange(page + 1)}>Вперед</button>
      )}
    </div>
  );
}
