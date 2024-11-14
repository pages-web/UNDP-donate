import NavbarTop from "./navbar-top";
import { Tabs, TabsContent } from "../../components/ui/tabs";
import { Card, CardContent } from "../../components/ui/card";
import { getKbArticlesByCode } from "../../../../sdk/queries/kb";
import { getConfig } from "../../../../sdk/queries/auth";
import Footer from "./footer";
import Banner from "../banner/Banner";
import Requirement from "../requirement/requirement";
import Solution from "../solution/Solution";
import YourParticipation from "../your-participation/YourParticipation";
import Cooperation from "../cooperation/Cooperation";
import PartnerOrganization from "../cooperation/PartnerOrganization";
import CooperationPart from "../cooperation/Cooperation-part";
import React from "react";

export const revalidate = 300;

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = async ({ children }: DefaultLayoutProps) => {
  const articleCodes = [
    "heregtsee-mn",
    "hamtarch-ajilj-bui-baiguullaga",
    "heregtsee-en",
    "hamtiin-ajillagaa-mn",
    "hamtiin-ajillagaa-en",
    "tanii-oroltsoo-bichver-mn",
    "tanii-oroltsoo-bichver-en",
    "shiidel-mn",
    "shiidel-en",
    "tanii-oroltsoo-carousel-image",
    "main-banner",
  ];

  const articles = await Promise.all(
    articleCodes.map((code) =>
      getKbArticlesByCode(code).then((res) => res.articles)
    )
  );

  const [
    heregtsee,
    hamtragchBaiguullaga,
    heregtseeEn,
    hamtiinAjillagaa,
    hamtiinAjillagaaEn,
    participationArticles,
    participationArticlesEn,
    shiidel,
    shiidelEn,
    carouselArticles,
    bannerArticles,
  ] = articles;

  const { config } = await getConfig();
  const logo = config?.uiOptions?.logo || "/images/default-logo.png";

  return (
    <>
      <NavbarTop logo={logo} />
      <div className="min-h-screen">
        <Banner bannerArticles={bannerArticles} />
        <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse xl:flex-row gap-6 -mt-16 pb-12">
            <Card className="flex-auto bg-background relative shadow-lg">
              <CardContent className="pt-2">
                <Tabs defaultValue="account">
                  <TabsContent value="account">
                    {heregtsee[0]?.content ? (
                      <div>
                        <section id="requirement">
                          <Requirement
                            articles={heregtsee}
                            heregtseeEn={heregtseeEn}
                          />
                        </section>
                        <Solution shiidel={shiidel} shiidelEn={shiidelEn} />
                        <section id="yourParticipation">
                          <YourParticipation
                            carouselArticles={carouselArticles}
                            participationArticles={participationArticles}
                            participationArticlesEn={participationArticlesEn}
                          />
                        </section>
                        <section id="cooperation">
                          <Cooperation
                            hamtiinAjillagaaEn={hamtiinAjillagaaEn}
                            hamtiinAjillagaa={hamtiinAjillagaa}
                          />
                          <CooperationPart />
                          <PartnerOrganization
                            hamtragchBaiguullaga={hamtragchBaiguullaga}
                          />
                        </section>
                      </div>
                    ) : (
                      <p>No article content available.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <div>
              <Card className="xl:w-[500px] bg-background flex-none top-[88px] sticky shadow-lg">
                {children}
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
