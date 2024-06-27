import Payment from "@/components/payment/Payment";
import { NextPageWithLayout } from "../_app";
import Layout from "@/layout";

const PaymentPage: NextPageWithLayout = () => {
  return <Payment />;
};

PaymentPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PaymentPage;
