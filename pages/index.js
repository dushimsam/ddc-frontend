import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import {app_config} from "../utils/constants";

export default function Home() {
    return (
        <div>
            <Head>
                <title>{app_config.APP_NAME}</title>
            </Head>

            <div className={"container-fluid m-0 p-0"}>
                <Navbar/>
                <div className={"bg-darkish"}>
                    THIS IS THE LANDING PAGE
                </div>
                {/*<ReachUsOnWhatsapp/>*/}
                <Footer/>
            </div>
        </div>
    );
}