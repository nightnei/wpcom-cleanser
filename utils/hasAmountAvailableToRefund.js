const isRefundable = (purchase) => {
  return purchase.is_refundable && purchase.product_type !== 'saas_plugin';
};

export const hasAmountAvailableToRefund = (purchase) => {
  return isRefundable(purchase) && purchase.refund_amount > 0;
};
