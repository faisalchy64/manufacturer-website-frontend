function Social() {
    return (
        <section className="flex flex-col justify-center items-center w-4/5 h-80 mx-auto my-5 p-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-5 text-base-100">
                Want To Get Updates
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2">
                <input
                    type="email"
                    placeholder="email@example.com"
                    class="input font-bold w-full md:w-[350px]"
                />
                <button class="btn w-24">Subscribe</button>
            </div>
        </section>
    );
}

export default Social;
