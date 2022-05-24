function FAQ() {
    return (
        <section className="w-4/5 mx-auto my-20 py-5">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Frequently Asked Questions
            </h1>

            <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2.5">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xl font-bold">
                    What is Comparts?
                </div>
                <div className="collapse-content">
                    <p>
                        Comparts is a leading manufacturer company. Comparts
                        manufacture computer parts. We work globally through our
                        website.
                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2.5">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xl font-bold">
                    Do I need an Comparts account?
                </div>
                <div className="collapse-content">
                    <p>Yes, you need to create an account on Comparts.</p>
                </div>
            </div>

            <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xl font-bold">
                    Can I order any computer parts from Comparts?
                </div>
                <div className="collapse-content">
                    <p>Yes, you can order any computer parts from Comparts.</p>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
