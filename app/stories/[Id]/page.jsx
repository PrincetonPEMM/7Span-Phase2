import StoryDetail from "@/app/components/StoryDetail.jsx";

export const dynamic = "force-dynamic";
const Page = async ({ params }) => {
  const { Id } = params;
  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}stories/${Id}`
    );

    data = await response.json();
  } catch (error) {
    console.log("Error", error);
  }

  return (
    <div className="px-4 py-5 md:px-8">
      <StoryDetail data={data} Id={Id} />
    </div>
  );
};

export default Page;
