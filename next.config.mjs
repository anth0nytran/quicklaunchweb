/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : null,
  "https://www.googletagmanager.com",
  "https://connect.facebook.net",
  "https://assets.calendly.com",
].filter(Boolean).join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://vitals.vercel-analytics.com https://www.facebook.com https://graph.facebook.com https://connect.facebook.net",
  "frame-src https://calendly.com https://*.calendly.com https://checkout.stripe.com https://billing.stripe.com https://js.stripe.com https://hooks.stripe.com https://facebook.com https://www.facebook.com https://*.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com https://checkout.stripe.com https://billing.stripe.com https://facebook.com https://www.facebook.com https://*.facebook.com",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
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
        source: "/blog",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/blogs/subscription-web-design",
        destination: "/guides/pay-monthly-web-design-vs-upfront",
        permanent: true,
      },
      {
        source: "/blogs/done-for-you-websites",
        destination: "/guides/monthly-website-plan-whats-included",
        permanent: true,
      },
      {
        source: "/blogs/website-in-48-hours",
        destination: "/guides/can-a-website-really-be-built-in-48-hours",
        permanent: true,
      },
      {
        source: "/blogs/:path*",
        destination: "/guides/:path*",
        permanent: true,
      },
      {
        source: "/guides/subscription-web-design",
        destination: "/guides/pay-monthly-web-design-vs-upfront",
        permanent: true,
      },
      {
        source: "/guides/done-for-you-websites",
        destination: "/guides/monthly-website-plan-whats-included",
        permanent: true,
      },
      {
        source: "/guides/website-in-48-hours",
        destination: "/guides/can-a-website-really-be-built-in-48-hours",
        permanent: true,
      },
    ];
  },

  reactStrictMode: true,
  compress: true,
  generateEtags: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["clsx", "tailwind-merge", "lucide-react"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
