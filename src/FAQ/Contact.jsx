import React, { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from '../utils/constant';
import Back from '../components/buttons/Back'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setSubmitStatus({ type: 'error', message: 'Please fill in all fields' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // FIX: Axios automatically handles JSON, just pass formData directly
            const res = await axios.post(`${BASE_URL}/contact`, formData);

            // FIX: Axios response is in res.data, not res.ok
            if (res.status === 200) {
                setSubmitStatus({ 
                    type: 'success', 
                    message: res.data.message || 'Message sent successfully! Check your email for confirmation.' 
                });
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error('Contact form error:', error);
            
            // FIX: Handle axios error response
            if (error.response) {
                // Server responded with error status
                setSubmitStatus({ 
                    type: 'error', 
                    message: error.response.data.message || 'Failed to send message. Please try again later.' 
                });
            } else if (error.request) {
                // Request was made but no response
                setSubmitStatus({ 
                    type: 'error', 
                    message: 'Cannot connect to server. Please check your connection.' 
                });
            } else {
                // Something else happened
                setSubmitStatus({ 
                    type: 'error', 
                    message: 'An error occurred. Please try again.' 
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error status when user starts typing
        if (submitStatus?.type === 'error') {
            setSubmitStatus(null);
        }
    };

    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
            <div className="absolute top-6 left-6">
                <Back />
            </div>

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Contact DevStinder
                </h2>
                <p className="text-gray-400 text-center mb-6">
                    Have a question or feedback? We'd love to hear from you.
                </p>

                {/* Support Email */}
                <div className="flex items-center justify-center gap-2 mb-6 text-gray-300">
                    <Mail size={18} />
                    <a
                        href="mailto:meghrajthakre444@gmail.com"
                        className="hover:underline hover:text-white transition"
                    >
                        meghrajthakre444@gmail.com
                    </a>
                </div>

                {/* Status Message */}
                {submitStatus && (
                    <div 
                        className={`mb-4 p-3 rounded-xl text-sm ${
                            submitStatus.type === 'success' 
                                ? 'bg-green-900/50 border border-green-700 text-green-200' 
                                : 'bg-red-900/50 border border-red-700 text-red-200'
                        }`}
                    >
                        {submitStatus.message}
                    </div>
                )}

                {/* Contact Form */}
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            disabled={isSubmitting}
                            required
                            className="w-full p-3 rounded-xl bg-black border border-zinc-700 focus:outline-none focus:border-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            disabled={isSubmitting}
                            required
                            className="w-full p-3 rounded-xl bg-black border border-zinc-700 focus:outline-none focus:border-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            disabled={isSubmitting}
                            required
                            className="w-full p-3 rounded-xl bg-black border border-zinc-700 h-32 resize-none focus:outline-none focus:border-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;