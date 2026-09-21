import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    CheckCircle2,
    Instagram,
    Linkedin,
    Link as LinkIcon,
    Mail,
    MapPin,
    Phone,
    Send,
    XCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConventusChatbot from '@/components/ConventusChatBot';

const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';

const contactDetails = [
    {
        label: 'Email',
        value: 'conventus@niet.co.in',
        href: 'mailto:conventus@niet.co.in',
        icon: Mail,
    },
    {
        label: 'Phone',
        value: '+91 92894 52713',
        href: 'tel:+919289452713',
        icon: Phone,
    },
    {
        label: 'Visit us',
        value: 'NIET, Plot 19, Knowledge Park II, Greater Noida, Uttar Pradesh 201306',
        href: 'https://maps.google.com/?q=NIET+Plot+19+Knowledge+Park+II+Greater+Noida',
        icon: MapPin,
    },
];

const fieldClass =
    'w-full border border-ink/20 bg-paper/40 px-4 py-3.5 text-sm text-ink placeholder:text-ink-500/70 transition-colors duration-200 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        if (status?.type === 'error') setStatus(null);
    };

    const validateForm = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus({ type: 'error', message: 'Please complete every field before sending.' });
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
            setStatus({ type: 'error', message: 'Enter a valid email address.' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setStatus(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/contact/`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            const message = response.data?.message || 'Your message has been received.';
            const failed = message.toLowerCase().includes('failed');

            setStatus({ type: failed ? 'error' : 'success', message });
            if (!failed) setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'We could not send your message. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-paper text-ink">
            <Head>
                <title>Contact Conventus | NIET Model United Nations Society</title>
                <meta
                    name="description"
                    content="Contact the Conventus Model United Nations Society at NIET, Greater Noida."
                />
            </Head>

            <Header theme="red" />

            <main className="pt-20">
                <section className="relative overflow-hidden bg-ink text-white border-b border-accent/25">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,160,75,0.16),transparent_36%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.035)_1px,_transparent_1px)] bg-[size:38px_38px]" />

                    <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-28 lg:pt-28 lg:pb-36 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65 }}
                        >
                            <p className="eyebrow text-xs font-bold text-accent-300 mb-6">Correspondence</p>
                            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.98] text-balance">
                                Begin a conversation with Conventus
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-white/65 text-base sm:text-lg leading-8 max-w-lg lg:justify-self-end text-pretty"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.12 }}
                        >
                            Questions about the society, collaborations, publications, or upcoming activities are welcome.
                            Write to the team and include the details that will help us respond clearly.
                        </motion.p>
                    </div>
                </section>

                <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 -mt-14 pb-24 lg:pb-32">
                    <div className="grid lg:grid-cols-[0.82fr_1.18fr] items-stretch shadow-[0_28px_80px_rgba(73,45,32,0.12)]">
                        <motion.aside
                            className="bg-primary text-white p-8 sm:p-10 lg:p-12 flex flex-col"
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                        >
                            <p className="eyebrow text-[11px] font-bold text-white/60">Direct channels</p>
                            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold mt-4">
                                Reach the society
                            </h2>
                            <p className="text-white/70 text-sm leading-6 mt-4 max-w-sm">
                                Use the form for detailed enquiries, or choose a direct channel below.
                            </p>

                            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
                                {contactDetails.map(({ label, value, href, icon: Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group flex items-start gap-4 py-5 text-white transition-colors hover:text-accent-300"
                                    >
                                        <Icon size={19} strokeWidth={1.7} className="mt-0.5 flex-shrink-0" />
                                        <span className="min-w-0">
                                            <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{label}</span>
                                            <span className="block text-sm leading-6 break-words">{value}</span>
                                        </span>
                                        <ArrowUpRight size={15} className="ml-auto mt-1 flex-shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </a>
                                ))}
                            </div>

                            <div className="mt-auto pt-10">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">Follow Conventus</p>
                                <div className="flex flex-wrap gap-3">
                                    <SocialLink href="https://www.instagram.com/niet_conventus/" label="Instagram" icon={Instagram} />
                                    <SocialLink href="https://www.linkedin.com/company/niet-conventus/" label="LinkedIn" icon={Linkedin} />
                                    <SocialLink href="https://linktr.ee/conventusclub" label="Linktree" icon={LinkIcon} />
                                </div>
                            </div>
                        </motion.aside>

                        <motion.div
                            className="bg-white p-8 sm:p-10 lg:p-14"
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                        >
                            <p className="eyebrow text-[11px] font-bold text-primary">Send a message</p>
                            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold mt-4 text-balance">
                                Tell us how we can help
                            </h2>
                            <div className="mt-6 mb-9"><span className="accent-rule" /></div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <FormField label="Your name" htmlFor="name">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={fieldClass}
                                            placeholder="Full name"
                                            required
                                        />
                                    </FormField>

                                    <FormField label="Email address" htmlFor="email">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={fieldClass}
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </FormField>
                                </div>

                                <div className="mt-5">
                                    <FormField label="How can we help?" htmlFor="message">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={7}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`${fieldClass} resize-y min-h-40`}
                                            placeholder="Share the context for your enquiry"
                                            required
                                        />
                                    </FormField>
                                </div>

                                {status && (
                                    <div
                                        className={`mt-5 flex items-start gap-3 border px-4 py-3 text-sm ${
                                            status.type === 'success'
                                                ? 'border-green-200 bg-green-50 text-green-800'
                                                : 'border-primary/25 bg-primary/5 text-primary-800'
                                        }`}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {status.type === 'success' ? (
                                            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
                                        ) : (
                                            <XCircle size={18} className="mt-0.5 flex-shrink-0" />
                                        )}
                                        <span>{status.message}</span>
                                    </div>
                                )}

                                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary min-w-44 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px"
                                    >
                                        <Send size={16} />
                                        {loading ? 'Sending...' : 'Send message'}
                                    </button>
                                    <p className="text-xs leading-5 text-ink-500">
                                        Your details are used only to reply to this enquiry.
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </section>
            </main>

            <ConventusChatbot />
            <Footer />
        </div>
    );
}

function FormField({ label, htmlFor, children }) {
    return (
        <label className="block" htmlFor={htmlFor}>
            <span className="block text-xs font-semibold text-ink mb-2">{label}</span>
            {children}
        </label>
    );
}

function SocialLink({ href, label, icon: Icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-accent-300 hover:bg-accent-300 hover:text-ink"
        >
            <Icon size={17} strokeWidth={1.8} />
        </a>
    );
}
