function Loading() {
    return (
        <section className="min-h-screen absolute inset-0 bg-base-100 flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold mb-1.5">Loading...</h1>
            <progress className="progress w-40"></progress>
        </section>
    );
}

export default Loading;
