import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Review from "../components/Reviews";
import Showcase from "../components/Showcase";
import Social from "../components/Social";
import Summary from "../components/Summary";

function Home() {
    return (
        <main>
            <Hero />
            <Showcase />
            <Summary />
            <Review />
            <Social />
            <Faq />
            <Footer />
        </main>
    );
}

export default Home;
