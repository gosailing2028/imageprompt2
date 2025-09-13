import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import type { MarketingConfig } from "~/types";

export const getMarketingConfig = async ({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}): Promise<MarketingConfig> => {
  const dict = await getDictionary(lang);
  return {
    mainNav: [
      {
        title: "Prompt Generator",
        href: `/tools/image-to-prompt`,
      },
      {
        title: "Magic Enhance",
        href: `/tools/magic-enhance`,
      },
      {
        title: "AI Describe",
        href: `/tools/ai-describe`,
      },
      {
        title: "AI Generator",
        href: `/tools/ai-generator`,
      },
      {
        title: "Pricing",
        href: `/pricing`,
      },
      {
        title: "Blog", 
        href: `/blog`,
      },
    ],
  };
};
