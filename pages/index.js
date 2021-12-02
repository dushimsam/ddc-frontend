import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { app_config } from "../utils/constants";
import AboutUsPart from "../components/homepage/aboutUs.jsx";
import CarouselPart from "../components/homepage/carousel";
import TopProducts from "../components/homepage/top-products";
import Recommendations from "../components/homepage/recommendations";
import WelcomingProducts from "../components/homepage/welcoming-products";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{app_config.APP_NAME}</title>
      </Head>

      <Navbar />
      <WelcomingProducts />
      <CarouselPart />
      <TopProducts />
      <AboutUsPart />
      <Recommendations />
      <Footer />
    </div>
  );
}
