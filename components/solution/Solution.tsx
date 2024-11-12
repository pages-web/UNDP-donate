import { getKbArticlesByCode } from "@/sdk/queries/kb";
import Comments from "./Comments";
import { Button } from "../ui/button";

const Solution = async () => {
  const { articles } = await getKbArticlesByCode("shiidel");

  return (
    <div className="flex flex-col items-center">
      <Button className="text-white mb-10 text-lg lg:text-xl bg-gradient-to-r from-[#F1672D] to-[#F7844D]  font-semibold rounded-[15px]  px-20 lg:px-32 py-4 lg:py-6 mt-16">
        ШИЙДЭЛ
      </Button>
      <div className="py-6 px-4 flex justify-center items-center">
        {articles[0]?.content ? (
          <div className="flex gap-6 flex-col items-start max-w-4xl w-full">
            {[1, 0].map((index) => (
              <div
                key={index}
                className="border-[3px] border-[#F1672D] shadow-lg  bg-white flex flex-col items-start sm:flex-row z-10 p-5 rounded-lg"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: articles[index]?.content || "",
                  }}
                  className="[&_*]:text-lg [&_*]:leading-tight font-normal text-black"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles available.</p>
        )}
      </div>
      <Comments />
    </div>
  );
};

export default Solution;
