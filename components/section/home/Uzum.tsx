import { proxyImage } from "@/lib/proxyImage";
import { getLocale, getTranslations } from "next-intl/server";

const Uzum = async () => {
  const t = await getTranslations("home");
  const locale = await getLocale();
  return (
    <a
      href={`https://uzum.uz/${locale}/shop/planbaby`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative container flex gap-10 rounded-3xl bg-uzum-violet text-white max-lg:flex-col items-center max-lg:p-8 max-lg:pb-0 max-md:p-5 max-md:pb-0"
    >
      <h3 className="text-lg md:text-3xl font-bold max-lg:text-center lg:p-10">
        {t("uzum")}
      </h3>

      <img
        src={proxyImage("/uzum.png")}
        alt="Uzum market"
        width={806}
        height={374}
        className="object-contain max-md:w-full max-lg:w-[70%] lg:h-full lg:ml-[10%] lg:opacity-0 lg:invisible"
        aria-hidden="true"
        loading="lazy"
      />

      <img
        src={proxyImage("/uzum.png")}
        alt="Uzum market"
        width={486}
        height={244}
        className="absolute bottom-0 h-[130%] w-auto max-w-[40%] object-contain object-bottom lg:rounded-br-3xl max-lg:hidden max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0"
        loading="lazy"
      />
    </a>
  );
};

export default Uzum;
