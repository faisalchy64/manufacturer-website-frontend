function Hero() {
    return (
        <div
            className="hero md:w-4/5 h-4/5 mx-auto md:my-5 md:rounded-2xl"
            style={{
                backgroundImage: "url(https://tinyurl.com/3bcmk8wc)",
            }}
        >
            <div className="hero-overlay bg-opacity-60 md:rounded-2xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md text-base-100">
                    <h1 className="my-5 text-5xl font-bold">Hello there</h1>
                    <p className="my-5 text-lg">
                        We Make The Best Quality Computer Parts For Your
                        Business...
                    </p>
                    <button className="btn btn-primary my-5">Order Now</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
