import { getSupabaseAdmin } from "@/lib/supabase-admin";
import AdminOrdersTable from "@/components/AdminOrdersTable";

export const dynamic = "force-dynamic";

type AdminOrdersPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

const allowedStatuses = ["paid", "purchasing", "delivered", "refunded"];

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const params = (await searchParams) || {};
  const selectedStatus = params.status?.trim() || "";

  const supabaseAdmin = getSupabaseAdmin();

  let query = supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (selectedStatus && allowedStatuses.includes(selectedStatus)) {
    query = query.eq("status", selectedStatus);
  }

  const { data: orders, error } = await query;

  if (error) {
    return (
      <main className="bg-[#f7f6f1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">
              Admin Orders
            </h1>
            <p className="mt-4 text-red-600">
              Failed to load orders: {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f6f1]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">
            Orders
          </h1>
          <p className="mt-3 text-slate-600">
            Review paid orders and update fulfillment status.
          </p>
        </div>

        <AdminOrdersTable
          orders={orders ?? []}
          selectedStatus={selectedStatus}
        />
      </div>
    </main>
  );
}