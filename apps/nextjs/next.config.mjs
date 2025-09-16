// @ts-check
import "./src/env.mjs";

import withMDX from "@next/mdx";

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com", "www.twillot.com", "cdnv2.ruguoapp.com", "www.setupyourpay.com"],
    unoptimized: true,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: "export",
  trailingSlash: true,
  basePath: "/imageprompt2",
  assetPrefix: "/imageprompt2",
};

export default withMDX()(config);
