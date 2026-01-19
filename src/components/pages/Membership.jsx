import React from "react";
import { Check, Sparkles } from "lucide-react";
import axios from "axios";
import { BASE_URL } from '../../utils/constant';

const plans = [
    {
        name: "Premium",
        price: "₹399 / month",
        tag: "Popular",
        features: [
            "Unlimited likes",
            "See who liked you",
            "Advanced filters",
            "Priority support",
        ],
    },
    {
        name: "Gold",
        price: "₹499 / month",
        tag: "Best Value",
        highlight: true,
        features: [
            "Everything in Premium",
            "Profile boost",
            "Direct messaging",
            "See profile visitors",
            "Exclusive badge",
        ],
    },
];

const Membership = () => {

    const handlePayments = async (type) => {
        try {
            const res = await axios.post(BASE_URL + '/payment/create', {
                membershipType: type
            }, {
                withCredentials: true
            })
            console.log(res.data)
            const { amount, currency, key, orderId, notes , } = res.data;

            const options = {
                key: key,
                amount,
                currency,
                name: "Devs Tinder",
                description: "Membership Purchase",
                image: "/logo.png",
                order_id: orderId,
                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.email,
                    contact: '999999999'
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();


        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div
            className=" mt-[64px] bg-gradient-to-b  from-base-100 via-base-200 to-base-100 px-6 py-2 overflow-y-scroll pb-18"
            style={{ height: "calc(100vh - 70px)" }}
        >
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 mt-5">


                <h1 className="text-3xl font-bold leading-tight">
                    Love deserves something{" "}
                    <span className="text-primary">special</span>
                </h1>

                <p className="mt-3 text-base-content/70">
                    Upgrade your experience and connect without limits
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-3xl p-7 border transition-all duration-300 
  hover:-translate-y-1 hover:shadow-xl
  ${plan.highlight
                                ? "border-warning/40 bg-warning/5 shadow-warning/20"
                                : "border-base-300 bg-base-100/80"
                            }`}
                    >
                        {/* Tag */}
                        <div className="absolute -top-4 left-6">
                            <span
                                className={`badge badge-sm px-3 py-2 font-medium tracking-wide
      ${plan.highlight
                                        ? "badge-warning text-neutral"
                                        : "badge-ghost border border-base-300"
                                    }`}
                            >
                                {plan.tag}
                            </span>
                        </div>

                        <h2 className="text-xl font-semibold text-base-content mb-1">
                            {plan.name}
                        </h2>

                        <p
                            className={`text-3xl font-bold mb-5 ${plan.highlight ? "text-warning" : "text-primary"
                                }`}
                        >
                            {plan.price}
                        </p>

                        <ul className="space-y-3 mb-6 text-sm text-base-content/80">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                    <Check
                                        className={`${plan.highlight ? "text-warning" : "text-success"
                                            }`}
                                        size={16}
                                    />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handlePayments(plan.name)}
                            className={`btn btn-sm w-full rounded-full font-medium tracking-wide
                                     ${plan.highlight
                                    ? "btn-warning text-neutral hover:brightness-110"
                                    : "btn-outline btn-primary"
                                }`}
                        >
                            Choose {plan.name}
                        </button>
                    </div>

                ))}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-base-content/60 mt-8">
                Secure payments · Cancel anytime · No auto-renewals
            </p>
        </div>
    );
};


export default Membership;
