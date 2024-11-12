import { Button } from "../ui/button";
import CooperationPart from "./Cooperation-part";
import PartnerOrganization from "./PartnerOrganization";
const Cooperation = async ({
  hamtiinAjillagaa,
  hamtarjAjiljbuiBaiguullaga,
}: any) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center py-20 bg-gradient-to-b">
        <Button className="text-white text-lg lg:text-xl bg-gradient-to-r from-[#F1672D] to-[#F7844D] font-semibold rounded-[15px] px-16 lg:px-24 py-3 lg:py-6 mt-16 lg:mt-20 focus:ring-4 focus:ring-orange-200 focus:outline-none">
          ХАМТЫН АЖИЛЛАГАА
        </Button>

        {hamtiinAjillagaa[0]?.content && (
          <div className="flex flex-col items-start gap-8 max-w-3xl w-full mt-10 lg:mt-14 relative">
            <div className="flex flex-col gap-4 rounded-[20px] ">
              <div
                dangerouslySetInnerHTML={{
                  __html: hamtiinAjillagaa[0].content,
                }}
                className="font-normal text-center text-gray-900 text-base leading-relaxed lg:text-xl lg:leading-loose [&>*]:my-4 [&p]:text-gray-700 [&p]:leading-relaxed [&h1]:text-2xl [&h1]:font-semibold [&h1]:leading-tight [&h2]:text-xl [&h2]:font-medium [&h2]:leading-snug lg:[&>*]:my-3 lg:[&_p]:leading-snug"
              />
            </div>
          </div>
        )}
      </div>
      <CooperationPart />
    </div>
  );
};

export default Cooperation;
