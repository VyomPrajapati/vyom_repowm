import Footer from "../Core/Footer"
import CategorySections from "./components/Categorysections"
import FeaturedArticles from "./components/FeaturedArticles"
import FollowSection from "./components/Follow"
import Header from "./components/header"

export default function Blog() {
  return (
    <>
    <div className="flex flex-col min-h-screen w-full bg-black text-white font-poppins overflow-x-hidden">
      <Header />

      {/* Main Content */}
      <main className="mt-20 pt-10 font-poppins w-full">
        <FeaturedArticles />
        <CategorySections />
        <FollowSection />
      </main>
    </div>
    <Footer />
    </>
  )
}
