"use client";

type ProfitChartItem = {
  label: string;
  revenue: number;
  cost: number;
  profit: number;
};

function formatMoney(amountInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

export default function ProfitChart({
  data,
}: {
  data: ProfitChartItem[];
}) {
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.revenue, item.cost, item.profit]),
    1
  );

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Monthly Profit Chart
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Revenue, cost, and profit by month.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-900" />
          <span className="text-slate-700">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="text-slate-700">Cost</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-slate-700">Profit</span>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">
                {item.label}
              </p>
              <p className="text-xs text-slate-500">
                Profit: {formatMoney(item.profit)}
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>Revenue</span>
                  <span>{formatMoney(item.revenue)}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-slate-900"
                    style={{
                      width: `${(item.revenue / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>Cost</span>
                  <span>{formatMoney(item.cost)}</span>
                </div>
                <div className="h-3 rounded-full bg-amber-100">
                  <div
                    className="h-3 rounded-full bg-amber-400"
                    style={{
                      width: `${(item.cost / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>Profit</span>
                  <span>{formatMoney(item.profit)}</span>
                </div>
                <div className="h-3 rounded-full bg-green-100">
                  <div
                    className="h-3 rounded-full bg-green-500"
                    style={{
                      width: `${(item.profit / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}