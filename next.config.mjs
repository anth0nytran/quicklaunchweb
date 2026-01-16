/** @type {import('next').NextConfig} */
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
    optimizePackageImports: ["clsx", "tailwind-merge"],
  },

  // Ignore build errors for specific paths (remove for stricter builds)
  // typescript: {
  //   ignoreBuildErrors: false,
  // },
  // eslint: {
  //   ignoreDuringBuilds: false,
  // },
};

export default nextConfig;
