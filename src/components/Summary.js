import customer from "../images/team.png";
import revenue from "../images/revenue.png";
import review from "../images/chat.png";

function Summary() {
    return (
        <section className="w-4/5 mx-auto my-5 py-5">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Business Summary
            </h1>

            <div className="grid md:grid-cols-3 shadow rounded-3xl py-10 bg-accent text-base-100">
                <div className="flex flex-col items-center">
                    <div className="text-secondary">
                        <img src={customer} alt="" />
                    </div>
                    <div className="stat-title">We Served</div>
                    <div className="stat-value">100K+</div>
                    <div className="stat-desc">Customers</div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-secondary">
                        <img src={revenue} alt="" />
                    </div>
                    <div className="stat-title">Annual</div>
                    <div className="stat-value">120M+</div>
                    <div className="stat-desc">Revenue</div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-secondary">
                        <img src={review} alt="" />
                    </div>
                    <div className="stat-title">Reviews</div>
                    <div className="stat-value">75K+</div>
                    <div className="stat-desc">Reviews</div>
                </div>
            </div>
        </section>
    );
}

export default Summary;
