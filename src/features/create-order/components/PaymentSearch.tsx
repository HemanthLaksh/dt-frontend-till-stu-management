"use client";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";

interface PaymentSearchProps {
  paymentId: string;
  onPaymentIdChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  error: string;
}

export default function PaymentSearch({
  paymentId,
  onPaymentIdChange,
  onSearch,
  isLoading,
  error,
}: PaymentSearchProps) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-text-primary">
          Payment Details
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Enter the payment ID to retrieve the payment information.
        </p>
      </div>

      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
      >
        <div className="flex-1">
          <Input
            label="Payment ID"
            placeholder="e.g. pay_TtE7evoZZpOKRW"
            value={paymentId}
            onChange={(event) => onPaymentIdChange(event.target.value)}
            required
            error={error || undefined}
          />
        </div>

        <Button
          type="submit"
          loading={isLoading}
          disabled={!paymentId.trim() || isLoading}
          className="sm:mb-0"
        >
          Fetch Payment
        </Button>
      </form>
    </section>
  );
}
