import React from "react";
// import Home from "./view/home/[username]/page";

import "./globals.css";
// import Main from "./view/landingPage/page";
// import ContactSection from "./view/contactus/page";
// import Home from "./view/home/[username]/page";
// import Main from "./view/landingPage/page";
// import ProductGeneration from "./view/BRANDINGKIT/PRODUCT_GENERATION/page";
// import MockupGenerationPage from "./view/Mockupgeneration/page";
// import NewText2Image from "./view/IMAGEGENERATIONNEW/newtexttoimage/page";
import AISTICKERGEN from "./view/IMAGEGENERATIONNEW/AI_Sticker_generation/page";
// import MockupsGeneration from "./view/BRANDINGKIT/MOCKUPS_GENERATION/page";

// Define Page as a React functional component
const Page: React.FC = () => {
  return (
    <>
    {/* <Main /> */}
    {/* <ProductGeneration /> */}
    {/* <MockupsGeneration /> */}
    <AISTICKERGEN />
{/* <NewText2Image /> */}
    {/* <MockupGenerationPage /> */}
    {/* <Home /> */}
    {/* <ContactSection /> */}
    </>
  );
};

export default Page;
