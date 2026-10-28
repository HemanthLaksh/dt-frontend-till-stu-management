"use client";

import PaymentSearch from "@/features/create-order/components/PaymentSearch";
import PaymentDetails from "@/features/create-order/components/PaymentDetails";
import CreateOrderForm from "@/features/create-order/components/CreateOrderForm";
import { useCreateOrder } from "@/features/create-order/hooks/useCreateOrder";

export default function CreateOrder() {
  const {
    orderType,
    changeOrderType,
    formValues,
    updateField,
    paymentId,
    setPaymentId,
    payment,
    isFetchingPayment,
    isCheckingPlan,
    isCreatingOrder,
    paymentError,
    error,
    success,
    searchPayment,
    loadNotesPlanPrice,
    submitOrder,
    resetForm,
  } = useCreateOrder();

  return (
    <main className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Create Order
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            Retrieve payment details and create a student or notes order.
          </p>
        </header>

        <PaymentSearch
          paymentId={paymentId}
          onPaymentIdChange={setPaymentId}
          onSearch={searchPayment}
          isLoading={isFetchingPayment}
          error={paymentError}
        />

        <PaymentDetails payment={payment} />

        <CreateOrderForm
          orderType={orderType}
          onOrderTypeChange={changeOrderType}
          values={formValues}
          onChange={updateField}
          onLoadNotesPrice={loadNotesPlanPrice}
          onSubmit={submitOrder}
          onReset={resetForm}
          isCheckingPlan={isCheckingPlan}
          isCreatingOrder={isCreatingOrder}
          disabled={!payment || isFetchingPayment}
          error={error}
          success={success}
        />
      </div>
    </main>
  );
}
