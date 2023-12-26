import Navbar from "../components/layout/Navbar";
import CarServices from "../components/home/CarServices";
import HowAutoConnect from "../components/home/HowAutoConnect";
import WhyChooseAuto from "../components/home/WhyChooseAuto";
import SmartApp from "../components/home/SmartApp";
import YouLiveUs from "../components/home/YouLiveUs";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CarServices />
      <HowAutoConnect />
      <WhyChooseAuto />
      <SmartApp />
      <YouLiveUs />
    </div>
  );
}
