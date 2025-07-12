import React from "react";
// import Navigation from "./components/Navigation";
import ArtGallery from "./components/ArtGallery";
import Cards from "./components/Cards";

import StartUsingAi from "./components/start-using-ai";
import DiscordLanding from "./components/discord-landing";
import Header from "./components/Header";
import Footer from "../Core/Footer";
import Commingsoon from "./components/Commingsoon";
import { PartnersSection } from "./components/partners-section";
import { Testimonials } from "./components/Testimonials";
import NAV_LAND from "./components/NAV_LAND";
import Hyperspeed from "./components/Hyperspeed";

const Main = () => {
  return (
    <div className="bg-black relative mb:bg-gradient-to-br from-[#050505] via-[#0a0a1f] to-[#0c0c0c]">
      {/* Navigation (Fixed on top with highest z-index) */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center ">
        <NAV_LAND />
      </div>

      {/* Main Content with Increasing z-index Order */}
      <div className="pt-0  relative">
        <div className="relative z-[30] mb:z-[10]">
          {/* Hyperspeed Animated Background only for Header */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Hyperspeed />
          </div>
          <Header />
        </div>

        <div className="relative z-[20] ">
          <Cards />
        </div>
      </div>

      <div className="relative z-[30]">
        <ArtGallery />
      </div>

      <div className="relative z-[40]">
        <DiscordLanding />
      </div>

      <div className="relative z-[50]">
        <Commingsoon />
      </div>

      <div className="relative z-[60]">
        <Testimonials />
      </div>

      <div className="relative z-[70]">
        <PartnersSection />
      </div>

      <div className="relative z-[80]">
        <StartUsingAi />
      </div>

      <div className="relative z-[90]">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
