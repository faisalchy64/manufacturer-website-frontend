import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Review from "../components/Reviews";
import Showcase from "../components/Showcase";
import Summary from "../components/Summary";

function Home() {
    return (
        <main>
            <Hero />
            <Showcase />
            <Summary />
            <Review />
            <Footer />
        </main>
    );
}

export default Home;
