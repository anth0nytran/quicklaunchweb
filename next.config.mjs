/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : null,
  "https://www.googletagmanager.com",
  "https://connect.facebook.net",
].filter(Boolean).join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://vitals.vercel-analytics.com https://www.facebook.com https://graph.facebook.com https://connect.facebook.net",
  "frame-src https://checkout.stripe.com https://billing.stripe.com https://js.stripe.com https://hooks.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com https://checkout.stripe.com https://billing.stripe.com",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig = {
  // ==========================================================================
  // Image Optimization
  // ==========================================================================
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Optimize for faster loading
    formats: ["image/avif", "image/webp"],
  },

  // ==========================================================================
  // Security Headers (Production)
  // ==========================================================================
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // XSS Protection (legacy browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy (disable unused features)
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Strict Transport Security (HTTPS only)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
      // Additional security for API routes
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/blogs/:path*",
        destination: "/guides/:path*",
        permanent: true,
      },
      // Old pillar guide URLs → New SEO-optimized URLs
      {
        source: "/guides/subscription-web-design",
        destination: "/guides/why-website-not-getting-customers",
        permanent: true,
      },
      {
        source: "/guides/done-for-you-websites",
        destination: "/guides/how-to-get-more-customers-website",
        permanent: true,
      },
      {
        source: "/guides/website-in-48-hours",
        destination: "/guides/do-you-need-a-website",
        permanent: true,
      },
    ];
  },

  // ==========================================================================
  // Production Optimizations
  // ==========================================================================

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Power usage optimization
  poweredByHeader: false, // Remove X-Powered-By header

  // ==========================================================================
  // Build Optimizations
  // ==========================================================================

  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["clsx", "tailwind-merge", "lucide-react"],
  },

  // Ignore build errors for specific paths (remove for stricter builds)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
