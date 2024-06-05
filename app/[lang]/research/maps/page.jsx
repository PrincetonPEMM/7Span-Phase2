import MapsCom from "../../components/MapsCom";

export const dynamic = "force-dynamic";

const Maps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}maps/filters`
  );
  const filters = await res.json();

  return <MapsCom {...filters} />;
};

export default Maps;
