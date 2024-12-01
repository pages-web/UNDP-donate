import { getKbArticlesByCode } from "../../sdk/queries/kb";
import { Metadata } from "next";
import Banner from "../[locale]/components/banner/Banner";
import React from "react";
import Gratitude from "../[locale]/components/gratitude/Gratitude";
import Faq from "../[locale]/components/faq/FAQ";
import Carousel from "../[locale]/components/carousel/Carousel";
import About from "../[locale]/components/about/About";
import { getConfig } from "../../sdk/queries/auth";
import Description from "../[locale]/components/common/Description";
import AnimatedCounter from "./components/common/AnimatedCounter";
export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();

  return {
    title: config.name + " - Хандив өгөх",
    openGraph: {
      title: config.name + " - Хандив өгөх",
    },
  };
}

export default async function Home() {
  const articleCodes = [
    "main-banner",
    "carousel",
    "about-mn",
    "about-en",
    "Gratitude-mn",
    "Gratitude-en",
    "faq-mn",
    "faq-en",
    "additional-explanation-mn",
  ];

  const articles = await Promise.all(
    articleCodes.map((code) =>
      getKbArticlesByCode(code).then((res) => res.articles)
    )
  );

  const [
    bannerArticles,
    carousel,
    aboutMn,
    aboutEn,
    gratitudeMn,
    gratitudeEn,
    faqMn,
    faqEn,
    additionalexplanationmn,
  ] = articles;

  return (
    <div className="px-[30px] py-5 flex flex-col gap-5 bg-[#EBEBEB]">
      <Banner bannerArticles={bannerArticles} />
      <Description additionalexplanationmn={additionalexplanationmn} />
      <section id="about">
        <About aboutMn={aboutMn} aboutEn={aboutEn} />
      </section>

      <Carousel carousel={carousel} />
      <section id="faq">
        <Faq faqMn={faqMn} faqEn={faqEn} />
      </section>
      <Gratitude gratitudeMn={gratitudeMn} gratitudeEn={gratitudeEn} />
    </div>
  );
}
