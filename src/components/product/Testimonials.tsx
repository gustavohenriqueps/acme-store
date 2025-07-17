import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { ReviewType } from "@/data/types";

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const reviews: ReviewType[] = t.raw("reviews");

  return (
    <div className="my-24 ">
      <h4 className="font-semibold text-lg border-b-1 mb-8 pb-6">
        {t("title")}
      </h4>
      <div className="flex flex-col gap-12">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-24 pb-12 border-b-1"
          >
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center gap-1">
                {[...Array(review.rate)].map((_, i) => (
                  <Star
                    key={`full-${i}`}
                    fill="currentColor"
                    stroke="none"
                    className="text-yellow-400"
                  />
                ))}
                {[...Array(5 - review.rate)].map((_, i) => (
                  <Star
                    key={`empty-${i}`}
                    fill="currentColor"
                    className="text-gray-200"
                  />
                ))}
                <span className="ml-2">{review.rate}</span>
              </div>
              <h5 className="font-medium">{review.title}</h5>
              <p className="text-sm text-zinc-500 font-medium">
                {review.description1}
              </p>
              {review.description2 && (
                <p className="text-sm text-zinc-500 font-medium">
                  {review.description2}
                </p>
              )}
            </div>

            <div className="flex lg:flex-col items-center lg:items-start min-w-2xs gap-4 ">
              <h6 className="font-medium">{review.name}</h6>
              <span className="block lg:hidden h-6 w-px bg-zinc-200" />
              <p className="text-zinc-600">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
