import LazyViewport from "@/components/shared/LazyViewport";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import CategorySectionBanner from "@/features/advertisements/components/Public/CategorySectionBanner";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import NewsListSkeleton from "@/features/articles/components/Public/NewsList/NewsListSkeleton";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import CategoryWithChildren from "@/features/home/components/CategoryWithChildren/CategoryWithChildren";
import CategoryWithChildrenSkeleton from "@/features/home/components/CategoryWithChildren/CategoryWithChildrenSkeleton";
import ColoredCategoryNews from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNews";
import ColoredCategoryNewsSkeleton from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNewsSkeleton";
import ColoredHoverCategoryNews from "@/features/home/components/ColoredHoverCategoryNews/ColoredHoverCategoryNews";
import ColoredHoverCategoryNewsSkeleton from "@/features/home/components/ColoredHoverCategoryNews/ColoredHoverCategoryNewsSkeleton";
import ColumnViewCategoryNews from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNews";
import ColumnViewCategoryNewsSkeleton from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNewsSkeleton";
import ColumnViewMultiCategoryNews from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNews";
import ColumnViewMultiCategoryNewsSkeleton from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNewsSkeleton";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";
import MultiCategoryInOneRow from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRow";
import MultiCategoryInOneRowSkeleton from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRowSkeleton";


function Home() {
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
    });

  const categoriesHook = useCategoriesHooks();
  const { data: categories } = categoriesHook.useFetchPublicCategories({});

  const footerAd = advertisements?.data?.footer;

const categoryData = categories?.data ?? [];

const categoryOne = categoryData[0];
const categoryTwo = categoryData[1];
const categoryThree = categoryData[2];
const categoryFour = categoryData[3];
const categoryFive = categoryData[4];
const categorySix = categoryData[5];
const categorySeven = categoryData[6];
const categoryEight = categoryData[7];
const categoryNine = categoryData[8];

const remainingCategories = categoryData.slice(9);

const getBgColor = (index: number) =>
  index % 2 === 0
    ? "var(--color-public-bg-tint-two)"
    : "var(--color-public-bg-tint-one)";

  return (
    <div className="flex flex-col  justify-center items-center w-full">
      <Headline />
      <LatestNews />

      {categories?.data?.length > 0 && (
        <>
          {categoryOne && (
            <LazyViewport
              fallback={<MultiCategoryInOneRowSkeleton color="transparent" />}
              minHeight="350px"
              rootMargin="400px"
            >
              <CategorySectionBanner category={categoryOne} color={getBgColor(0)}>
                <MultiCategoryInOneRow
                  categoryOne={categoryOne}
                  categoryTwo={categoryTwo}
                  color={getBgColor(0)}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryThree && (
            <LazyViewport
              fallback={<CategoryWithChildrenSkeleton color="transparent" />}
              minHeight="400px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryThree} color={getBgColor(1)}>
                <CategoryWithChildren
                  category={categoryThree}
                  color={getBgColor(1)}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryFour && (
            <LazyViewport
              fallback={<ColoredCategoryNewsSkeleton color="#e1e9cb" />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryFour} color="#e1e9cb">
                <ColoredCategoryNews category={categoryFour} color="#e1e9cb" />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryFive && (
            <LazyViewport
              fallback={
                <ColoredHoverCategoryNewsSkeleton color="transparent" />
              }
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryFive} color={getBgColor(2)}>
                <ColoredHoverCategoryNews
                  category={categoryFive}
                  color={getBgColor(2)}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categorySix && (
            <LazyViewport
              fallback={<ColumnViewCategoryNewsSkeleton color="transparent" />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categorySix} color={getBgColor(3)}>
                <ColumnViewCategoryNews
                  category={categorySix}
                  color={getBgColor(3)}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categorySeven && (
            <LazyViewport
              fallback={
                <ColumnViewMultiCategoryNewsSkeleton color="transparent" />
              }
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categorySeven} color={getBgColor(4)}>
                <ColumnViewMultiCategoryNews
                  categoryOne={categorySeven}
                  categoryTwo={categoryEight}
                  color={getBgColor(4)}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryNine && (
            <LazyViewport
              fallback={<ColoredHoverCategoryNewsSkeleton color="#1f1e1e" />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryNine} color="#1f1e1e">
                <ColoredHoverCategoryNews
                  category={categoryNine}
                  color="#1f1e1e"
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {remainingCategories?.map((category: any,i) => (
            <LazyViewport
              key={category?.id}
              fallback={<NewsListSkeleton show="list" color="transparent" />}
              minHeight="300px"
              rootMargin="300px"
            >
              <CategorySectionBanner category={category} color={getBgColor(i+1)}>
                <CategoryBasedNewsList
                  categorySlug={category?.slug}
                  color={getBgColor(i+1)}
                />
              </CategorySectionBanner>
            </LazyViewport>
          ))}
        </>
      )}

      {footerAd && (
        <LazyViewport minHeight="100px" rootMargin="200px">
          <div className="w-full pt-8 pb-2 flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-md ">
              <BannerAdvertisement Ad={footerAd} />
            </div>
          </div>
        </LazyViewport>
      )}
    </div>
  );
}
export default Home;
