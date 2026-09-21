import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ChevronDown, ChevronRight } from 'lucide-react';

const Header = ({ theme = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/aboutus", label: "About Us" },
        {
            href: "#",
            label: "MUN",
            dropdown: [
                { href: "/cmun-connect", label: "CMUN Connect" },
                { href: "/mun2.0", label: "MUN 2.0" },
                { href: "/mun1.0", label: "MUN 1.0" },
                { href: "/Resources", label: "Diplomatic Resources" },
            ]
        },
        // { href: "/status", label: "My Status" }, // hidden for now — delegate portal to be released later
        { href: "/commnew", label: "Committees" },
        {
            href: "#",
            label: "Club",
            dropdown: [
                { href: "/ink&insights", label: "Ink & Insights" },
                { href: "/pastevents", label: "Past Events" },
                { href: "/upcomingevents", label: "Upcoming Events" },
                { href: "/founder", label: "Founder" },
                { href: "/news", label: "Newsletters" },
                { href: "/institutional-newsletter", label: "Institutional Newsletter" },
            ],
        },
        { href: "/media", label: "Media" },
        { href: "/ContactForm", label: "Contact" },
    ];

    const leftNavItems = navItems.slice(0, Math.ceil(navItems.length / 2));
    const rightNavItems = navItems.slice(Math.ceil(navItems.length / 2));

    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
    };

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2
            }
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.2
            }
        }
    };

    const isActive = (href) => {
        if (href === '/') {
            return router.pathname === href;
        }
        return router.pathname.startsWith(href);
    };

    const getNavTextColor = (isMobile = false) => {
        return isMobile ? 'text-ink' : 'text-ink hover:text-primary';
    };

    const getMobileButtonColor = () => 'text-ink';

    const renderNavItem = (item, isMobile = false) => {
        const active = isActive(item.href);

        if (item.dropdown) {
            return (
                <div
                    className={`relative group ${isMobile ? 'w-full' : ''}`}
                    onMouseEnter={() => !isMobile && setActiveDropdown(item.label)}
                    onMouseLeave={() => !isMobile && setActiveDropdown(null)}
                    onBlur={(e) => !isMobile && !e.currentTarget.contains(e.relatedTarget) && setActiveDropdown(null)}
                >
                    <button
                        className={`flex items-center justify-between w-full text-xl font-semibold nav-font ${isMobile ? 'text-red-800 py-4' : getNavTextColor() } ${active ? 'underline underline-offset-4' : ''}`}
                        aria-haspopup="true"
                        aria-expanded={isMobile ? mobileEventsOpen === item.label : activeDropdown === item.label}
                        onClick={() => isMobile
                            ? setMobileEventsOpen(prev => prev === item.label ? null : item.label)
                            : setActiveDropdown(prev => prev === item.label ? null : item.label)}
                    >
                        <span>{item.label}</span>
                        {isMobile ? <ChevronRight size={20} className={`transform transition-transform ${mobileEventsOpen === item.label ? 'rotate-90' : ''}`} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                        {((isMobile && mobileEventsOpen === item.label) || (!isMobile && activeDropdown === item.label)) && (
                            <motion.div
                                className={`${isMobile ? 'w-full' : 'absolute left-0 mt-2 w-48'} rounded-md shadow-lg`}
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <div className={`rounded-md ${isMobile ? 'bg-red-100' : 'bg-red-900'} shadow-md`}>
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className={`block px-4 py-2 text-sm ${isMobile ? 'text-red-800' : 'text-white' } hover:bg-red-800 hover:text-white transition duration-150 ease-in-out ${isActive(subItem.href) ? 'underline underline-offset-4 font-bold' : '' }`}
                                                role="menuitem"
                                                onClick={() => {
                                                    setActiveDropdown(null);
                                                    setMobileEventsOpen(null);
                                                    if (isMobile) setIsOpen(false);
                                                }}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }

        return (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={isMobile ? 'w-full' : ''}>
                <Link
                    href={item.href}
                    className={` block text-xl font-semibold nav-font ${isMobile ? 'text-red-800 py-4' : getNavTextColor() } ${active ? 'underline underline-offset-4' : ''} `}
                    onClick={() => isMobile && setIsOpen(false)}
                >
                    {item.label}
                </Link>
            </motion.div>
        );
    };

    return (
        <>
            <motion.header
                className={`fixed w-full z-50 transition-all duration-300 bg-paper border-b ${scrolled ? 'border-ink/15' : 'border-ink/10'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <nav className={`hidden lg:flex ${theme === 'red' ? 'space-x-8 xl:space-x-12' : 'space-x-12 xl:space-x-16'} flex-1 justify-end`}>
                        {leftNavItems.map((item) => <React.Fragment key={item.label}>{renderNavItem(item)}</React.Fragment>)}
                    </nav>

                    <Link href="/" className="flex items-center mx-4 sm:mx-8 group" aria-label="Conventus — home">
                        <div className={`rounded-full overflow-hidden bg-white ring-1 ring-ink/15 transition-all duration-300 ${scrolled ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-14 h-14 sm:w-16 sm:h-16'}`}>
                            <div className="relative w-full h-full p-1.5">
                                <Image
                                    src="/images/Conventus Logo.jpg"
                                    alt="Conventus logo"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                    </Link>

                    <nav className={`hidden lg:flex ${theme === 'red' ? 'space-x-8 xl:space-x-12' : 'space-x-8 xl:space-x-12'} flex-1`}>
                        {rightNavItems.map((item) => <React.Fragment key={item.label}>{renderNavItem(item)}</React.Fragment>)}
                    </nav>

                    <motion.button
                        className={`lg:hidden ${getMobileButtonColor()} z-50`}
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu size={24} />
                    </motion.button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 lg:hidden"
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col h-full justify-center items-center relative p-8">
                            <motion.button
                                className="absolute top-4 right-4 text-red-600 hover:text-red-400"
                                onClick={() => setIsOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>
                            <div className="w-full space-y-6">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        variants={itemVariants}
                                        custom={index}
                                        className="w-full"
                                    >
                                        {renderNavItem(item, true)}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
