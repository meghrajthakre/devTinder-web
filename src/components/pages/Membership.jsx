import React, { useEffect, useState } from "react";
import { Check, Sparkles, Crown, AlertCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from '../../utils/constant';

const plans = [
    {
        name: "Premium",
        price: "₹399",
        period: "year",
        tag: "Popular",
        features: [
            "Unlimited likes",
            "See who liked you",
            "Advanced filters",
            "Priority support",
            "Verified badge",
        ],
    },
    {
        name: "Gold",
        price: "₹499",
        period: "year",
        tag: "Best Value",
        highlight: true,
        features: [
            "Everything in Premium",
            "Profile boost",
            "Direct messaging",
            "See profile visitors",
            "Exclusive gold badge",
        ],
    },
];

const Membership = () => {
    const [membershipStatus, setMembershipStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    // Check membership status on component mount
    const paymentVerification = async () => {
        try {
            const res = await axios.get(BASE_URL + '/payment/verify', {
                withCredentials: true
            });
            setMembershipStatus(res.data);
        } catch (error) {
            console.error('Error verifying payment:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        paymentVerification();
    }, []);

    const handlePayments = async (type) => {
        if (processing) return;

        try {
            setProcessing(true);

            // Create payment order
            const res = await axios.post(BASE_URL + '/payment/create', {
                membershipType: type
            }, {
                withCredentials: true
            });

            const { amount, currency, key, orderId, notes } = res.data;

            // Razorpay payment options
            const options = {
                key: key,
                amount,
                currency,
                name: "Devs Tinder",
                description: `${type} Membership - 1 Year`,
                order_id: orderId,
                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.email,
                    contact: '9999999999'
                },
                theme: {
                    color: "#33a1cc"
                },
                handler: async function (response) {
                    console.log('Payment successful:', response);

                    // Show success message
                    alert('🎉 Payment successful! Your  membership is now active.');

                    // Refresh membership status
                    await paymentVerification();
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment cancelled');
                        setProcessing(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            // Reset processing state after opening Razorpay
            setProcessing(false);

        } catch (error) {
            console.error('Payment error:', error);
            alert('❌ Failed to initiate payment. Please try again.');
            setProcessing(false);
        }
    };

    // Get active features based on membership type
    const getActiveFeatures = (membershipType) => {
        const plan = plans.find(p => p.name.toLowerCase() === membershipType.toLowerCase());
        return plan ? plan.features : [];
    };

    // Loading state
    if (loading) {
        return (
            <div className="mt-[64px] bg-gradient-to-b from-base-100 via-base-200 to-base-100 px-6 py-2"
                style={{ height: "calc(100vh - 70px)" }}>
                <div className="flex items-center justify-center h-full">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </div>
        );
    }

    // Already premium - show status
    if (membershipStatus?.isPremium) {
        const daysRemaining = membershipStatus.daysRemaining;
        const validUntil = new Date(membershipStatus.validUntil).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Get features based on membership type
        const activeFeatures = getActiveFeatures(membershipStatus.membershipType);
        // Determine if Gold membership for styling
        const isGold = membershipStatus.membershipType.toLowerCase() === 'gold';

        return (
            <div className="mt-[64px] bg-gradient-to-b from-base-100 via-base-200 to-base-100 px-6 py-12 pb-20 overflow-y-scroll"
                style={{ height: "calc(100vh - 70px)" }}>
                <div className="max-w-3xl mx-auto">
                    {/* Premium Status Card */}
                    <div className={`card bg-gradient-to-br border shadow-xl ${isGold
                            ? 'from-warning/10 to-primary/10 border-warning/30'
                            : 'from-primary/10 to-secondary/10 border-primary/30'
                        }`}>
                        <div className="card-body items-center text-center">
                            <Crown className={`w-14 h-14 mb-4 ${isGold ? 'text-warning' : 'text-primary'}`} />
                            <h2 className="card-title text-3xl mb-2 capitalize">
                                You're a {membershipStatus.membershipType} Member!
                            </h2>
                            <p className="text-base-content/70 mb-6">
                                Enjoying all {membershipStatus.membershipType} features
                            </p>

                            {/* Membership Details */}
                            <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100/50">
                                <div className="stat">
                                    <div className="stat-title">Valid Until</div>
                                    <div className="stat-value text-lg">{validUntil}</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-title">Days Remaining</div>
                                    <div className="stat-value text-lg">{daysRemaining} days</div>
                                </div>
                            </div>

                            {/* Expiring Soon Warning */}
                            {membershipStatus.expiringSoon && (
                                <div className="alert alert-warning mt-6">
                                    <AlertCircle size={20} />
                                    <span>Your membership is expiring soon! Renew to continue enjoying premium features.</span>
                                </div>
                            )}

                            {/* Active Features */}
                            <div className="mt-8  w-full ">
                                <h3 className="text-lg font-semibold mb-4">Active Features</h3>
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mx-auto">
                                    {activeFeatures.map((feature) => (
                                        <div key={feature} className="flex items-start gap-2">
                                            <Check
                                                className={`flex-shrink-0 mt-0.5 ${isGold ? 'text-warning' : 'text-success'
                                                    }`}
                                                size={16}
                                            />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upgrade Option (if Premium, show Gold upgrade) */}
                            {!isGold && (
                                <div className="mt-4 w-full ">
                                    <div className="divider">Want More?</div>
                                    <button
                                        onClick={() => handlePayments('Gold')}
                                        disabled={processing}
                                        className="btn btn-warning btn-sm rounded-full w-full"
                                    >
                                        Upgrade to Gold
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Not premium - show plans
    return (
        <div
            className="mt-[64px] bg-gradient-to-b from-base-100 via-base-200 to-base-100 px-6 py-2 overflow-y-scroll pb-18"
            style={{ height: "calc(100vh - 70px)" }}
        >
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 mt-5">
                <div className="flex justify-center mb-4">
                    <Sparkles className="w-12 h-12 text-warning animate-pulse" />
                </div>

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

                        <div className="mb-5">
                            <span
                                className={`text-3xl font-bold ${plan.highlight ? "text-warning" : "text-primary"
                                    }`}
                            >
                                {plan.price}
                            </span>
                            <span className="text-base-content/60 text-sm ml-1">
                                / {plan.period}
                            </span>
                        </div>

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
                            disabled={processing}
                            className={`btn btn-sm w-full rounded-full font-medium tracking-wide
                                ${plan.highlight
                                    ? "btn-warning text-neutral hover:brightness-110"
                                    : "btn-outline btn-primary"
                                }
                                ${processing ? 'loading' : ''}
                            `}
                        >
                            {processing ? 'Processing...' : `Choose ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-base-content/60 mt-8">
                Secure payments · 1 Year validity · No auto-renewals
            </p>
        </div>
    );
};

export default Membership;