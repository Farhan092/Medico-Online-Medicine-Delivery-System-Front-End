import Image from "next/image";
import Header from "../components/deliveryman/header";
import Footer from "../components/deliveryman/footer";
import OrderTable from "../order/page";

export default function Home() {
  return (
    <>
      <Header />
      <OrderTable />

      <Footer />
    </>
  );
}