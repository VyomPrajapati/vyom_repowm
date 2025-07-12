import HeroSection from "../components/hero-section";
import FeaturesSection from "../components/features-section";
import ImageCreationSection from "../components/image-creation-section";
import NavigationFull from "../../Core/NavigationFull";
import Footer from "../../Core/Footer";


export default function Home() {
  return (<>
    <main className="bg-black ">
      <div className="">
        <NavigationFull />
        <HeroSection />
        <FeaturesSection />
        <ImageCreationSection />
        
      </div><Footer />
    </main>
    </>
  )
}

