import type { NextConfig } from "next";

const RESUME_FILENAME = "Mofakh_Islam_Software_Developer.pdf";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // The hero link carries its own `download` filename, but a direct visit
        // to /resume.pdf would otherwise open inline under the wrong name.
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: `attachment; filename="${RESUME_FILENAME}"`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
