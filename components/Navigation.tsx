"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlassButton } from "@/components/ui/glass";
import { useEventTracker } from "@/lib/analytics";

interface NavigationProps {
    onOpenUpsellModal: (plan: "starter" | "pro") => void;
}

export function Navigation({ onOpenUpsellModal }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { track } = useEventTracker();
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Work", href: "#work" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Guides", href: "/guides" },
        { name: "FAQ", href: "#faq" },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If it's a hash link and we're on the home page, smooth scroll
        if (href.startsWith("#") && pathname === "/") {
            e.preventDefault();
            const targetId = href.substring(1);
            const element = document.getElementById(targetId);

            setIsOpen(false);

            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            setIsOpen(false);
        }
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || isOpen ? "py-2 bg-black border-b border-white/[0.08]" : "py-4 md:py-6 bg-transparent"
                }`}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1.5 font-bold tracking-tight z-50 relative">
                    <span className="text-accent font-black text-lg">QL</span>
                    <span className="text-white/20 font-light">|</span>
                    <span className="text-white/90">QuickLaunchWeb</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="hover:text-white transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <GlassButton
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                            track('cta_click', {
                                cta_text: 'Start My Free Website',
                                cta_location: 'header',
                                event_category: 'engagement',
                                event_label: 'header_cta',
                            });
                            onOpenUpsellModal("starter");
                        }}
                    >
                        Start My Free Website
                    </GlassButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2 text-white/80 hover:text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 bg-black h-[100dvh] md:hidden"
                        >
                            <nav className="flex flex-col gap-6 text-lg font-medium text-white/80">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="block py-2 hover:text-white hover:pl-2 transition-all duration-200 border-b border-white/[0.05]"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <GlassButton
                                    variant="primary"
                                    size="lg"
                                    className="w-full justify-center"
                                    onClick={() => {
                                        setIsOpen(false);
                                        track('cta_click', {
                                            cta_text: 'Start My Free Website',
                                            cta_location: 'mobile_menu',
                                            event_category: 'engagement',
                                            event_label: 'header_cta_mobile',
                                        });
                                        onOpenUpsellModal("starter");
                                    }}
                                >
                                    Start My Free Website
                                </GlassButton>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
