import StoryDetail from '@/app/components/StoryDetail.jsx'

export const dynamic = "force-dynamic";
const Page = async ({ params }) => {
  const { Id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}`
  );

  const data = await response.json();

  return (
    <div className="px-4 py-5 md:px-8">
      <StoryDetail data={data} Id={Id} />
    </div>
  );
};

export default Page;