"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import FilterButton from "./form/FilterButton";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import MdiClose from "@/assets/icons/MdiClose";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MapsCom = ({
  dateOfManuscipts,
  languageManuscript,
  paintingsManuscript,
  collectionManuscript,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams();
  const { dateMs, langMs, paintingMs, colleMs } = getFilterFromParams();
  const [dateOfMs, setDateOfMs] = useState(dateMs ?? []);
  const [languageMs, setLanguageMs] = useState(langMs);
  const [paintingsMs, setPaintingsMs] = useState(paintingMs);
  const [collectionMs, setCollectionMs] = useState(colleMs);
  const [menuCollapse, setMenuCollapse] = useState(false);

  const makeParamsArray = (key, arr) => {
    if (arr.length)
      if (key === "dateOfManuscipt")
        return arr
          .map((itm) => {
            setFilterInParams(key, itm.key, false);
            return `filters[${key}][]=${itm.key}&`;
          })
          .join("");
      else
        return arr
          .map((itm) => {
            setFilterInParams(key, itm.key, false);
            return `filters[${key}]=${itm.key}&`;
          })
          .join("");
    return "";
  };

  useEffect(() => {
    fetchData();
  }, [dateOfMs, languageMs, paintingsMs, collectionMs]);

  const fetchData = async () => {
    const params = `${makeParamsArray(
      "dateOfManuscipt",
      dateOfMs
    )}${makeParamsArray(
      "languageOfManuscript",
      Boolean(languageMs) ? [languageMs] : []
    )}${makeParamsArray(
      "paintingsOfManuscript",
      Boolean(paintingsMs) ? [paintingsMs] : []
    )}${makeParamsArray(
      "collectionOfManuscript",
      Boolean(collectionMs) ? [collectionMs] : []
    )}`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAPBOX_URL}?${params}`
      );
      const data = await response.json();

      mapboxgl.accessToken = data.settings.token;
      // if (map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: data.settings.style,
        center: [38.990478515625, 11.66299611230805],
        zoom: 2,
      });
      map.current.on("load", () => {
        map.current.addSource(data.settings.source, {
          type: "geojson",
          data: data.mapBoxData,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: data.settings.source,
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#e5a942",
              100,
              "#da232a",
              350,
              "#ec6f57",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });

        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: data.settings.source,
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["Open Sans Regular", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        map.current.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: data.settings.source,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // inspect a cluster on click
        map.current.on("click", "clusters", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map.current
            .getSource(data.settings.source)
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        map.current.on("click", "unclustered-point", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const {
            id,
            manuscript,
            manuscript_full_name,
            language,
            manuscript_date_range_start,
            manuscript_date_range_end,
            web_page_address,
          } = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<b>id:</b> <a class="text-primary-500 font-bold hover:text-secondary-500" href='/manuscripts/${web_page_address}'> ${id} </a><br/>
                  <b>Manuscript:</b> ${manuscript} <br/>
                  <b>Manuscript full name:</b> ${manuscript_full_name} <br/>
                  <b>Language:</b> ${language} <br/>
                  <b>Date:</b> ${manuscript_date_range_start} - ${manuscript_date_range_end} <br/>`
            )
            .addTo(map.current);
        });

        map.current.on("mouseenter", "clusters", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "clusters", () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  };

  const setFilterInParams = (key, value, isRemove = false) => {
    if (isRemove || !value) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
      return;
    }
    if (["dateOfManuscipt"].includes(key)) {
      newParams.append(key, value);
    } else newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  function getFilterFromParams() {
    const datePainting = params.getAll("dateOfManuscipt");
    const dateMs = dateOfManuscipts.filter((dop) =>
      datePainting.includes(dop.key)
    );

    const paintingColor = params.getAll("languageOfManuscript");
    const langMsT = languageManuscript.filter((dop) =>
      paintingColor.includes(dop.key)
    );

    const typeStory = params.get("paintingsOfManuscript");
    const paintingMsT = paintingsManuscript.filter((dop) =>
      [typeStory].includes(dop.key)
    );

    const inst = params.get("collectionOfManuscript");
    const colleMsT = collectionManuscript.filter((dop) =>
      [inst].includes(dop.key)
    );
    return {
      dateMs,
      langMs: langMsT[0],
      paintingMs: paintingMsT[0],
      colleMs: colleMsT[0],
    };
  }

  return (
    <div>
      <FilterButton
        onClick={() => {
          setMenuCollapse(!menuCollapse);
        }}
        area-label={menuCollapse ? false : true}
        className="block h-7 w-7 flex-none p-1 z-40 text-primary-500 lg:hidden"
      ></FilterButton>
      {/* sidebar filter start  */}
      {menuCollapse && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuCollapse(false);
          }}
        >
          <div
            className={`z-50 justify-between bg-offWhite-500 items-center p-6 inset-y-0 w-80 right-auto fixed transition-transform duration-700  ${
              menuCollapse
                ? "open -translate-x-5  transform"
                : "-translate-x-96 close transform"
            } `}
          >
            <button
              className="text-right block "
              onClick={() => {
                setMenuCollapse(!menuCollapse);
              }}
              area-label={menuCollapse ? "true" : "false"}
            >
              <MdiClose />
            </button>
            <div className="text-lg p-1 font-semibold space-y-4 mt-4">
              <div>
                <Dropdown
                  title="Date of Manuscript"
                  selected={dateOfMs}
                  setSelected={useCallback(
                    (e) => {
                      console.log(e, "e");
                      setDateOfMs(e);
                    },
                    [dateOfMs]
                  )}
                  options={dateOfManuscipts}
                  isMultiple={true}
                />
              </div>
              <div>
                <Dropdown
                  title="Language of Manuscript"
                  selected={languageMs}
                  setSelected={setLanguageMs}
                  options={languageManuscript}
                  isMultiple={false}
                />
              </div>
              <div>
                <Dropdown
                  title="Paintings in Manuscript"
                  selected={paintingsMs}
                  setSelected={setPaintingsMs}
                  options={paintingsManuscript}
                  isMultiple={false}
                />
              </div>
              <div>
                <Dropdown
                  title="Paintings in Manuscript"
                  selected={collectionMs}
                  setSelected={setCollectionMs}
                  options={collectionManuscript}
                  isMultiple={false}
                />
              </div>
              <div className="text-center w-full md:text-left">
                <button
                  area-label="clear all selected values"
                  className="bg-primary-500 w-full text-white px-2 py-1.5 hover:text-primary-500 text-center border border-primary-500 rounded-lg text-xs md:text-sm hover:bg-transparent transition-colors"
                  onClick={() => {
                    setDateOfMs([]);
                    setLanguageMs([]);
                    setPaintingsMs([]);
                    setCollectionMs(null);
                    setTimeout(() => {
                      setMenuCollapse(false);
                    }, 5000);
                    router.push(`${pathname}`);
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <div className="md:sticky bg-offWhite-500 z-10 py-4 top-0">
        <div className="mb-1 font-body lg:mx-auto lg:justify-normal">
          <div className="grid gap-2 grid-cols-1 justify-between mb-1 font-body lg:justify-between sm:grid-cols-4 lg:grid-cols-9">
            <div className="lg:col-span-2 hidden lg:block">
              <Dropdown
                title="Date of Manuscript"
                selected={dateOfMs}
                setSelected={useCallback(
                  (e) => {
                    console.log(e, "e");
                    setDateOfMs(e);
                  },
                  [dateOfMs]
                )}
                options={dateOfManuscipts}
                isMultiple={true}
              />
            </div>
            <div className="sm:col-span-2 font-body hidden lg:block">
              <Dropdown
                title="Language of Manuscript"
                selected={languageMs}
                setSelected={setLanguageMs}
                options={languageManuscript}
                isMultiple={false}
              />
            </div>
            <div className="sm:col-span-2 font-body hidden lg:block">
              <Dropdown
                title="Paintings in Manuscript"
                selected={paintingsMs}
                setSelected={setPaintingsMs}
                options={paintingsManuscript}
                isMultiple={false}
              />
            </div>
            <div className="sm:col-span-2 font-body hidden lg:block ">
              <Dropdown
                title="Paintings in Manuscript"
                selected={collectionMs}
                setSelected={setCollectionMs}
                options={collectionManuscript}
                isMultiple={false}
              />
            </div>
            <div className="text-center w-full md:text-left hidden lg:block">
              <button
                area-label="clear all selected values"
                className="bg-primary-500 w-full text-white px-2 py-2 hover:text-primary-500 text-center border border-primary-500 rounded-lg text-xs md:text-sm hover:bg-transparent transition-colors"
                onClick={() => {
                  setDateOfMs([]);
                  setLanguageMs([]);
                  setPaintingsMs([]);
                  setCollectionMs(null);
                  router.push(`${pathname}`);
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default MapsCom;
