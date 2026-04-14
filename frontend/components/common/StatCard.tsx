export const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: number;
  sub?: string;
}) => (
  <div className="flex-1 border border-black p-6 min-w-0">
    <p className="text-[10px] uppercase  text-gray-400 font-bold mb-3">
      {label}
    </p>
    <p className="text-5xl font-bold leading-none">{value}</p>
    {sub && <p className="text-[11px] text-gray-400 mt-2">{sub}</p>}
  </div>
);
