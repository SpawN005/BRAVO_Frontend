import { BRAND } from "@/types/brand";
import Image from "next/image";

// const brandData: BRAND[] = [
//   {
//     logo: "/images/brand/brand-01.svg",
//     name: "Google",
//     visitors: 3.5,
//     revenues: "5,768",
//     sales: 590,
//     conversion: 4.8,
//   },
//   {
//     logo: "/images/brand/brand-02.svg",
//     name: "Twitter",
//     visitors: 2.2,
//     revenues: "4,635",
//     sales: 467,
//     conversion: 4.3,
//   },
//   {
//     logo: "/images/brand/brand-03.svg",
//     name: "Github",
//     visitors: 2.1,
//     revenues: "4,290",
//     sales: 420,
//     conversion: 3.7,
//   },
//   {
//     logo: "/images/brand/brand-04.svg",
//     name: "Vimeo",
//     visitors: 1.5,
//     revenues: "3,580",
//     sales: 389,
//     conversion: 2.5,
//   },
//   {
//     logo: "/images/brand/brand-05.svg",
//     name: "Facebook",
//     visitors: 3.5,
//     revenues: "6,768",
//     sales: 390,
//     conversion: 4.2,
//   },
// ];

const TableOne = ({ data }) => {
  console.log(data);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Standings
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Club
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Match played
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Wins
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Draws
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Losses
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Pts</h5>
          </div>
        </div>

        {data?.map((team, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${
              key === data.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image
                  src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
                  alt="team"
                  width={48}
                  height={48}
                />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {team?.team.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{team?.wins}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{team?.wins}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{team?.draws}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-[#f87171]">{team?.losses}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="font-bold text-meta-5">{team?.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
