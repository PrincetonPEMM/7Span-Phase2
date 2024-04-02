import ManuScripts from "../components/ManuScripts";

export const dynamic = "force-dynamic";

const page = ({ params }) => {
  return (
    <div>
      <ManuScripts lang={params.lang} />
    </div>
  );
};

export default page;
