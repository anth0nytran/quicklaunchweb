"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlassButton } from "@/components/ui/glass";
import { useEventTracker } from "@/lib/analytics";

export type NavLink = { name: string; href: string };

interface NavigationProps {
    onOpenUpsellModal?: (plan: "starter" | "growth" | "city_dominator") => void;
    onOpenPlanPicker?: () => void;
    /** Override the nav links. Defaults to the web services set. */
    links?: NavLink[];
    /** Override the header CTA label. */
    ctaLabel?: string;
    /** When set, the CTA becomes a link instead of opening the plan picker. */
    ctaHref?: string;
}

const defaultNavLinks: NavLink[] = [
    { name: "Features", href: "#features" },
    { name: "Work", href: "#work" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Guides", href: "/guides" },
    { name: "FAQ", href: "#faq" },
];

export function Navigation({
    onOpenUpsellModal,
    onOpenPlanPicker,
    links,
    ctaLabel = "Start My Free Website",
    ctaHref,
}: NavigationProps) {
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

    const navLinks = links ?? defaultNavLinks;

    // Pages that render the web services template and therefore own its anchors.
    const webServicePaths = ["/services/web-design", "/houston-web-design-for-contractors"];
    const ownsDefaultAnchors = webServicePaths.includes(pathname);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith("#")) {
            setIsOpen(false);
            return;
        }

        // Smooth scroll only when the section actually exists on this page.
        const element = document.getElementById(href.substring(1));
        setIsOpen(false);
        if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Hash links fall back to the page that owns them when we are somewhere else.
    const resolveHref = (href: string) => {
        if (!href.startsWith("#")) return href;
        if (links) return pathname === "/" ? href : `/${href}`;
        return ownsDefaultAnchors ? href : `/services/web-design${href}`;
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
                            href={resolveHref(link.href)}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="hover:text-white transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    {ctaHref ? (
                        <Link
                            href={resolveHref(ctaHref)}
                            onClick={(e) => {
                                track('cta_click', {
                                    cta_text: ctaLabel,
                                    cta_location: 'header',
                                    event_category: 'engagement',
                                    event_label: 'header_cta',
                                });
                                handleLinkClick(e, ctaHref);
                            }}
                        >
                            <GlassButton variant="secondary" size="sm">
                                {ctaLabel}
                            </GlassButton>
                        </Link>
                    ) : onOpenPlanPicker ? (
                        <GlassButton
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                track('cta_click', {
                                    cta_text: ctaLabel,
                                    cta_location: 'header',
                                    event_category: 'engagement',
                                    event_label: 'header_cta',
                                });
                                onOpenPlanPicker();
                            }}
                        >
                            {ctaLabel}
                        </GlassButton>
                    ) : (
                        <Link href="/services/web-design#pricing">
                            <GlassButton variant="secondary" size="sm">
                                {ctaLabel}
                            </GlassButton>
                        </Link>
                    )}
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
                                            href={resolveHref(link.href)}
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
                                {ctaHref ? (
                                    <Link
                                        href={resolveHref(ctaHref)}
                                        onClick={(e) => {
                                            track('cta_click', {
                                                cta_text: ctaLabel,
                                                cta_location: 'mobile_menu',
                                                event_category: 'engagement',
                                                event_label: 'header_cta_mobile',
                                            });
                                            handleLinkClick(e, ctaHref);
                                        }}
                                        className="block"
                                    >
                                        <GlassButton
                                            variant="primary"
                                            size="lg"
                                            className="w-full justify-center"
                                        >
                                            {ctaLabel}
                                        </GlassButton>
                                    </Link>
                                ) : onOpenPlanPicker ? (
                                    <GlassButton
                                        variant="primary"
                                        size="lg"
                                        className="w-full justify-center"
                                        onClick={() => {
                                            setIsOpen(false);
                                            track('cta_click', {
                                                cta_text: ctaLabel,
                                                cta_location: 'mobile_menu',
                                                event_category: 'engagement',
                                                event_label: 'header_cta_mobile',
                                            });
                                            onOpenPlanPicker();
                                        }}
                                    >
                                        {ctaLabel}
                                    </GlassButton>
                                ) : (
                                    <Link
                                        href="/services/web-design#pricing"
                                        onClick={() => setIsOpen(false)}
                                        className="block"
                                    >
                                        <GlassButton
                                            variant="primary"
                                            size="lg"
                                            className="w-full justify-center"
                                        >
                                            {ctaLabel}
                                        </GlassButton>
                                    </Link>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
