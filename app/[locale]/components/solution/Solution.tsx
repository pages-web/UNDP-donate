"use client";
import React from "react";
import Comments from "./Comments";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Solution = ({ shiidel, shiidelEn, CommentMn, CommentEn }: any) => {
  const t = useTranslations();
  const { locale } = useParams();
  const articleToShow = locale == "en" ? shiidelEn : shiidel;
  return (
    <div className="flex flex-col items-center">
      <Button className="text-white mb-10 text-lg lg:text-xl bg-gradient-to-r from-[#F1672D] to-[#F7844D]  font-semibold rounded-[15px]  px-20 lg:px-32 py-4 lg:py-6 mt-5">
        {t("ШИЙДЭЛ")}
      </Button>
      <div className="py-6 px-4 flex justify-center items-center">
        {articleToShow[0]?.content ? (
          <div className="flex gap-6 flex-col items-start max-w-4xl w-full">
            {[1, 0].map((index) => (
              <div
                key={index}
                className="border-[3px] border-[#F1672D] shadow-lg  bg-white flex flex-col items-start sm:flex-row z-10 px-5 rounded-lg"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: articleToShow[index]?.content || "",
                  }}
                  className="font-normal text-center text-gray-900 text-sm leading-relaxed lg:text-xl lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-lg [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles available.</p>
        )}
      </div>
      <Comments CommentMn={CommentMn} CommentEn={CommentEn} />
    </div>
  );
};

export default Solution;
