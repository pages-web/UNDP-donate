import { getKbArticlesByCode } from "../../sdk/queries/kb";
import { Metadata } from "next";
import Banner from "../[locale]/components/banner/Banner";
import Gratitude from "../[locale]/components/gratitude/Gratitude";
import Faq from "../[locale]/components/faq/FAQ";
import Carousel from "../[locale]/components/carousel/Carousel";
import About from "../[locale]/components/about/About";
import { getConfig } from "../../sdk/queries/auth";
import Description from "../[locale]/components/common/Description";
import PartnerOrganization from "./components/partnerOrgazination/PartnerOrganization";
import VideoPlayer from "./components/videos/Video";

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
    "banner",
    "carousel",
    "About-mn",
    "About-en",
    "Gratitude-mn",
    "Gratitude-en",
    "faq-mn",
    "faq-en",
    "text-1",
    "partner-organization",
    "Сэргээгдэх",
    "Positive",
    "video-default-image",
  ];

  const articles = await Promise.all(
    articleCodes.map((code) =>
      getKbArticlesByCode(code).then((res) => res.articles)
    )
  );

  const [
    bannerMn,
    carousel,
    aboutMn,
    aboutEn,
    gratitudeMn,
    gratitudeEn,
    faqMn,
    faqEn,
    summary,
    partner,
    Сэргээгдэх,
    Positive,
    videodefaultimage,
  ] = articles;

  return (
    <div className="px-[30px] flex flex-col gap-5 bg-[#EBEBEB]">
      <Banner bannerMn={bannerMn} />
      <Description summary={summary} />
      <section id="about">
        <About aboutMn={aboutMn} aboutEn={aboutEn} />
      </section>

      <Carousel
        carousel={carousel}
        Сэргээгдэх={Сэргээгдэх}
        Positive={Positive}
      />
      <VideoPlayer videodefaultimage={videodefaultimage} />
      <section id="faq">
        <Faq faqMn={faqMn} faqEn={faqEn} />
      </section>
      <PartnerOrganization partner={partner} />
      <Gratitude gratitudeMn={gratitudeMn} gratitudeEn={gratitudeEn} />
    </div>
  );
}
