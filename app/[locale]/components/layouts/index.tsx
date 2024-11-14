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
import React from "react";
import PartnerOrganization from "../cooperation/PartnerOrganization";
import CooperationPart from "../cooperation/Cooperation-part";
export const revalidate = 300;

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = async ({ children }: DefaultLayoutProps) => {
  const { articles } = await getKbArticlesByCode("heregtsee-mn");
  const { articles: hamtragchBaiguullaga } = await getKbArticlesByCode(
    "hamtarch-ajilj-bui-baiguullaga"
  );
  const { articles: heregtseeEn } = await getKbArticlesByCode("heregtsee-en");
  const { articles: hamtiinAjillagaa } = await getKbArticlesByCode(
    "hamtiin-ajillagaa-mn"
  );
  const { articles: hamtiinAjillagaaEn } = await getKbArticlesByCode(
    "hamtiin-ajillagaa-en"
  );

  const { articles: participationArticles } = await getKbArticlesByCode(
    "tanii-oroltsoo-bichver-mn"
  );
  const { articles: participationArticlesEn } = await getKbArticlesByCode(
    "tanii-oroltsoo-bichver-en"
  );
  const { articles: shiidel } = await getKbArticlesByCode("shiidel-mn");
  const { articles: shiidelEn } = await getKbArticlesByCode("shiidel-en");
  const { articles: carouselArticles } = await getKbArticlesByCode(
    "tanii-oroltsoo-carousel-image"
  );

  const { articles: bannerArticles } = await getKbArticlesByCode("main-banner");
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
                    {articles[0]?.content ? (
                      <div>
                        <section id="requirement">
                          <Requirement
                            articles={articles}
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
              <Card className=" xl:w-[500px] bg-background flex-none top-[88px] sticky shadow-lg">
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
