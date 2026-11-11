import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Point } from "@/lib/stats";

const tick = { fill: "var(--color-muted)", fontSize: 12 };
const grid = "var(--color-line)";

function tipStyle() {
  return {
    background: "var(--color-ink)",
    border: "1px solid var(--color-line)",
    borderRadius: 12,
    color: "var(--color-fg)",
    fontSize: 13,
  };
}

export function TrendChart({
  data,
  unit,
  kind = "area",
  goal,
}: {
  data: Point[];
  unit: string;
  kind?: "area" | "bar" | "line";
  goal?: number;
}) {
  const hasValue = data.some((point) => (point.value ?? 0) > 0);
  if (!hasValue) {
    return <p className="text-sm text-muted">Nothing logged in this window yet.</p>;
  }
  const common = (
    <>
      <CartesianGrid stroke={grid} vertical={false} />
      <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval="preserveStartEnd" />
      <YAxis tick={tick} tickLine={false} axisLine={false} width={40} />
      <Tooltip
        contentStyle={tipStyle()}
        formatter={(value) => [`${value ?? 0} ${unit}`, ""]}
        labelFormatter={(_, payload) => {
          const row = payload?.[0]?.payload as Point | undefined;
          return row?.date ?? "";
        }}
      />
    </>
  );
  return (
    <div className="h-56 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        {kind === "bar" ? (
          <BarChart data={data}>
            {common}
            {goal != null ? <ReferenceLine y={goal} stroke="var(--color-muted)" strokeDasharray="4 4" /> : null}
            <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : kind === "line" ? (
          <LineChart data={data}>
            {common}
            {goal != null ? <ReferenceLine y={goal} stroke="var(--color-muted)" strokeDasharray="4 4" /> : null}
            <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={false} connectNulls={false} />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            {common}
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.18}
              connectNulls={false}
              strokeWidth={2}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function PercentChart({ data }: { data: { label: string; date: string; pct: number }[] }) {
  const has = data.some((point) => point.pct > 0);
  if (!has) return <p className="text-sm text-muted">Nothing logged in this window yet.</p>;
  return (
    <div className="h-56 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={tick} tickLine={false} axisLine={false} width={40} domain={[0, 100]} />
          <Tooltip contentStyle={tipStyle()} formatter={(value) => [`${value ?? 0}%`, "Done"]} />
          <Bar dataKey="pct" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
