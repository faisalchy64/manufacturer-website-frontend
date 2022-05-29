function Blog() {
    return (
        <section className="p-10">
            <h1 className="text-3xl mb-1.5">
                What is a unit test? Why should write unit tests?
            </h1>
            <p className="mb-5">
                Unit testing involves testing individual components of the
                software program or application. The main purpose behind this is
                to check that all the individual parts are working as intended.
                A unit is known as the smallest possible component of software
                that can be tested. Generally, it has a few inputs and a single
                output. <br /> <br /> Because, unit testing ensures that all
                code meets quality standards before it's deployed. This ensures
                a reliable engineering environment where quality is paramount.
                Over the course of the product development life cycle, unit
                testing saves time and money, and helps developers write better
                code, more efficiently.
            </p>
            <h1 className="text-3xl mb-1.5">
                What are the different ways to manage a state in a React
                application?
            </h1>
            <p>
                There are several other ways to manage state​s in React. They
                are:
            </p>
            <ul className="list-disc ml-5 mb-5">
                <li>React Context API</li>
                <li>React useReducer Hook</li>
                <li>Apollo Link State</li>
                <li>Redux</li>
            </ul>

            <h1 className="text-3xl mb-1.5">
                Why you do not set the state directly in React?
            </h1>
            <p>There are some reason below:</p>
            <ul className="list-disc ml-5 mb-5">
                <li>
                    If you update it directly, calling the setState() afterward
                    may just replace the update you made.
                </li>
                <li>
                    When you directly update the state, it does not change
                    this.state immediately. Instead, it creates a pending state
                    transition, and accessing it after calling this method will
                    only return the present value.
                </li>
                <li>
                    You will lose control of the state across all components.
                </li>
            </ul>

            <h1 className="text-3xl mb-1.5">
                How does prototypical inheritance work?
            </h1>
            <p className="mb-5">
                Every object with its methods and properties contains an
                internal and hidden property known as Prototype. The Prototypal
                Inheritance is a feature in javascript used to add methods and
                properties in objects. It is a method by which an object can
                inherit the properties and methods of another object.
                Traditionally, in order to get and set the Prototype of an
                object, we use Object.getPrototypeOf and Object.setPrototypeOf.
                Nowadays, in modern language, it is being set using __proto__.
            </p>

            <h1 className="text-3xl mb-1.5">
                How will you improve the performance of a React Application?
            </h1>
            <p>
                By follow some steps we will improve the performance of a React
                Application.
            </p>

            <ul className="list-disc ml-5">
                <li>Keeping component state local where necessary.</li>
                <li>
                    Memoizing React components to prevent unnecessary
                    re-renders.
                </li>
                <li>Code-splitting in React using dynamic import</li>
                <li>Windowing or list virtualization in React.</li>
                <li>Lazy loading images in React.</li>
            </ul>
        </section>
    );
}

export default Blog;
