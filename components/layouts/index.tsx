import NavbarTop from "./navbar-top";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { getKbArticlesByCode } from "@/sdk/queries/kb";
import { getConfig } from "@/sdk/queries/auth";
import Footer from "./footer";
import Banner from "../banner/Banner";
import Requirement from "../requirement/requirement";
import Solution from "../solution/Solution";
import YourParticipation from "../your-participation/YourParticipation";
import Cooperation from "../cooperation/Cooperation";
import Image from "next/image";
export const revalidate = 300;

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = async ({ children }: DefaultLayoutProps) => {
  const { articles } = await getKbArticlesByCode("heregtsee");
  const { articles: hamtiinAjillagaa } = await getKbArticlesByCode(
    "hamtiin-ajillagaa"
  );
  const { articles: hamtarjAjiljbuiBaiguullaga } = await getKbArticlesByCode(
    "Хамтарч-ажилж-буй-байгууллага"
  );
  const { articles: participationArticles } = await getKbArticlesByCode(
    "tanii-oroltsoo-bichver"
  );
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
                          <Requirement articles={articles} />
                        </section>

                        <div className="flex flex-col items-center">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: articles[3]?.content || "",
                            }}
                            className=" font-normal text-center text-gray-900 text-sm leading-relaxed lg:text-xl lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-lg [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug"
                          />
                          <div className="flex sm:flex-row items-center gap-1 sm:gap-2 md:gap-4 lg:gap-2 text-black border-2 sm:border-[3px] border-[#F1672D] p-2 sm:p-2 md:p-2 lg:p-2 mt-5">
                            <p className="text-[10px] sm:text-base md:text-sm lg:text-base font-semibold text-center sm:text-left">
                              Монгол залуучуудын <br /> ажилгүйдлийн түвшин
                            </p>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                              17%
                            </h1>
                            <Image
                              alt="World Icon"
                              width={40}
                              height={40}
                              src="/images/world.png"
                              className="w-6 h-6 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10"
                            />
                            <Image
                              className="rotate-[-90deg] w-6 h-6 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 object-contain"
                              alt="Top Arrow"
                              width={40}
                              height={40}
                              src="/images/topArrow.png"
                            />
                            <p className="text-[10px] sm:text-base md:text-sm lg:text-base font-semibold text-center sm:text-left">
                              Дэлхийн <br /> дунджаас өндөр
                            </p>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: articles[2]?.content || "",
                            }}
                            className="font-normal text-center text-gray-900 text-base leading-relaxed lg:text-xl lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-2xl [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug"
                          />
                          <Solution />
                          <section id="yourParticipation">
                            <YourParticipation
                              carouselArticles={carouselArticles}
                              participationArticles={participationArticles}
                            />
                          </section>
                          <section id="cooperation">
                            <Cooperation
                              hamtiinAjillagaa={hamtiinAjillagaa}
                              hamtarjAjiljbuiBaiguullaga={
                                hamtarjAjiljbuiBaiguullaga
                              }
                            />
                          </section>
                        </div>
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
