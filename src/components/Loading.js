function Loading() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold mb-1.5">Loading...</h1>
            <progress className="progress w-56"></progress>
        </section>
    );
}

export default Loading;
