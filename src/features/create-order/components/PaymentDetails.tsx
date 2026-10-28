import { formatCurrency } from "../utils/createOrder.utils";
import type { PaymentDetails as PaymentDetailsType } from "../types/createOrder.types";

interface PaymentDetailsProps {
  payment: PaymentDetailsType | null;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-text-secondary">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-text-primary">
        {value || "—"}
      </p>
    </div>
  );
}

export default function PaymentDetails({ payment }: PaymentDetailsProps) {
  if (!payment) return null;

  const captured = payment.captured;

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Payment Summary
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Verify the payment before creating an order.
          </p>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            captured
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {captured ? "Captured" : payment.status || "Not captured"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Detail label="Payment ID" value={payment.id} />
        <Detail label="Gateway Order ID" value={payment.order_id} />
        <Detail
          label="Payment Amount"
          value={formatCurrency(payment.amount / 100, payment.currency)}
        />
        <Detail label="Payment Method" value={payment.method} />
        <Detail label="Bank" value={payment.bank || "—"} />
        <Detail label="Email" value={payment.email || "—"} />
        <Detail label="Contact" value={payment.contact || "—"} />
        <Detail
          label="Bank Transaction ID"
          value={payment.acquirer_data?.bank_transaction_id || "—"}
        />
      </div>
    </section>
  );
}
