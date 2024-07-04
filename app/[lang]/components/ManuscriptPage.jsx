"use client";

import {
  MANUSCRIPT_DETAIL,
  manuscriptsDetailTableTitle,
  pagePerLimit,
} from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import BackBtn from "./BackBtn";
import { TablePagination } from "./Pagination";
import Table from "./Table";

export default function Manuscript({ Id, data, table }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [perPage, setPerPage] = useState(pagePerLimit);
  const [tableData, setTableData] = useState(table);
  const didMount = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(
    (prevPage) => {
      if (didMount.current) {
        fetch(
          `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/stories/${Id}?page=${page}&perPage=${perPage}`
        )
          .then((res) => res.json())
          .then((data) => {
            const table = document.querySelector("#emip-table");
            const top = table.getBoundingClientRect().y;
            window.scrollTo({
              top: top + window.scrollY,
              behavior: "smooth",
            });
            setTableData(data);
          })
          .catch((error) => console.error("Error", error));
      } else {
        didMount.current = true;
      }
    },
    [page]
  );

  const generateFirstParagraph = () => {
    const array = [];

    if (data.ms_status !== "Complete") {
      let text = "PEMM has not yet cataloged this manuscript.";
      if (data.ms_status === "Incomplete: awaiting digitization") {
        text += " The cataloging is <b>awaiting digitization</b>.";
      }
      array.push({ text });
    }

    if (
      data.language &&
      data.manuscript_date_range_start &&
      data.manuscript_date_range_end
    ) {
      let text = `This <b>${data.language}</b> language manuscript was created between <b>${data.manuscript_date_range_start}</b> and <b>${data.manuscript_date_range_end}</b>. `;
      if (data.date_note) {
        if (data.date_note == "Date from ms (colophon)") {
          text += `This date is precise, based on the scribe noting the date in the manuscript. `;
        } else if (data.date_note == "Date from king's name") {
          text += `This date is estimated, based on the reigning Ethiopian royal ruler's name appearing in the manuscript.`;
        } else if (data.date_note == "Date from ms (paleography)") {
          text +=
            "This date is estimated, based on paleography (a study of the manuscript&apos;s letter shapes).";
        } else if (data.date_note == "Date from catalog") {
          text +=
            "This date is estimated, based on a print or electronic catalog entry about the manuscript.";
        } else if (data.date_note == "Date from JRB and SGD") {
          text +=
            "This date is estimated, based on paleography, a study of the manuscript&apos;s letter shapes, by <b>Jeremy Brown and Stephen Delamarter</b>.";
        } else {
          text += "This date is estimated based on various methods.";
        }
      }
      if (data.royal_manuscript) {
        text += ` The royal ruler's name mentioned in the manuscript is <b>${data.royal_manuscript}</b>.`;
      }
      array.push({ text });
    }
    let text;
    if (data.collections_sheet_relevant == "True") {
      text = `This manuscript is held in the repository of <b>${
        data.institution_name
      }</b> in their <b>${data.collection_name}</b> in <b>${
        data.institution_city_state
      }, ${data.institution_country}</b>. ${
        data.ms_location_note
          ? `This manuscript's last known location in Ethiopia was <b>${data.ms_location_note}</b>. `
          : " "
      }`;

      // array.push({ text });
    } else {
      text = `This manuscript&apos;s last known location (i.e., where it was microfilmed or digitized at some point in the past forty years)  is the repository of <b>${data.location_of_ms_imaging} in ${data.location_of_ms_imaging_city}, ${data.location_of_ms_imaging_country}</b>. `;
      if (
        data.digital_repository &&
        data.digital_repository_city &&
        data.digital_repository_country
      ) {
        text += `A digital copy of this manuscript is held by ${data.digital_repository} in ${data.digital_repository_city} , ${data.digital_repository_country}. `;
      }
      // array.push({ text });
    }
    array.push({ text });

    text = "";
    if (data.link_to_digital_copy != null) {
      text = `To view the manuscript, go to the <a  class="text-primary-500 hover:text-secondary-500" href=${data.link_to_digital_copy} target="_blank">digital copy</a>.`;
    } else {
      text = data.link_to_digital_copy_note_external;
    }
    array.push({ text });

    if (data.total_stories != null) {
      let text;
      if (+data.total_stories === 0) {
        text =
          "This manuscript has an unidentified number of Marian miracle stories.";
      } else if (+data.total_stories === 1) {
        text = "This manuscript has only one Marian miracle story.";
      } else if (+data.total_stories < 24) {
        text = `This manuscript has fewer Marian miracle stories than most, only <b>${data.total_stories}</b>.`;
      } else if (+data.total_stories < 99) {
        text = `This manuscript has a typical number of Marian miracle stories: <b>${data.total_stories}</b>.`;
      } else if (+data.total_stories < 199) {
        text = `This manuscript has a high number of Marian miracle stories: <b>${data.total_stories}</b>.`;
      } else {
        text = `This manuscript has a very high number of Marian miracle stories: <b>${data.total_stories}</b>.`;
      }
      if (Number(data?.total_unique_story) === 1) {
        text += ` Of these stories, <b>${data?.total_unique_story}</b> is unique, marked with a <b>☆</b> in the table below, under Other Aspects.`;
      }
      if (Number(data?.total_unique_story) > 1) {
        text += ` Of these stories, <b>${data.total_unique_story}</b> are unique, marked with a <b>☆</b> in the table below, under Other Aspects.`;
      }

      if (Number(data?.total_stanza_story) === 1) {
        text += ` Also, <b>${data?.total_stanza_story}</b> has a stanza or hymn at the end, marked with a <b>♫</b> in the table below, under Other Aspects.`;
      }
      if (Number(data?.total_stanza_story) > 1) {
        text += ` Also, <b>${data.total_stanza_story}</b> have stanzas or hymns at their end, marked with a <b>♫</b> in the table below, under Other Aspects.`;
      }

      if (Number(data?.total_confidence_score) === 1) {
        text += ` Also, we are uncertain about the identification of <b>${data.total_confidence_score}</b> stories, marked with a <b>[?]</b> in the table below, under Other Aspects.`;
      }
      if (Number(data?.total_confidence_score) > 1) {
        text += ` Also, we are uncertain about the identification of <b>${data.total_confidence_score}</b> number of stories, marked with a <b>[?]</b> in the table below, under Other Aspects.`;
      }

      array.push({ text });
    }

    if (
      data.tm_story_paintings != null ||
      data.total_manuscript_paintings != null
    ) {
      let text;
      if (data.tm_story_paintings == "No") {
        text = "This manuscript has no paintings of Marian miracle stories.";
      } else if (data.tm_story_paintings == "Yes") {
        if (data.total_manuscript_paintings <= 6) {
          if (data.total_manuscript_paintings > 0) {
            text = `This manuscript has a few paintings of Marian miracle stories: <b>${data.total_manuscript_paintings}</b>.`;
          }
        } else if (data.total_manuscript_paintings < 15) {
          text = `This manuscript has some paintings of Marian miracle stories: <b>${data.total_manuscript_paintings}</b>.`;
        } else if (data.total_manuscript_paintings < 200) {
          text = `This manuscript has a lot of paintings of Marian miracle stories: <b>${data.total_manuscript_paintings}</b>.`;
        }
      } else if (data.tm_story_paintings == "Related Images") {
        text = `This manuscript has no paintings of Marian miracle stories, but it does have ${
          data.total_manuscript_paintings > 1
            ? `<b>${data.total_manuscript_paintings}</b> paintings`
            : `<b>${data.total_manuscript_paintings}</b> painting`
        } of Mary and events in her life.  `;
      }
      text &&
        array.push({
          text: `${text} ${
            data.total_manuscript_paintings > 0
              ? `To see the paintings in this manuscript, go to its PEMM <a  class="text-primary-500 font-bold hover:text-secondary-500" href="/paintings/by-manuscript/${Id}">Paintings by Manuscript</a> page.`
              : ""
          }`,
        });
    }
    if (
      data.tm_story_paintings != null ||
      data.total_manuscript_paintings != null
    ) {
      let text;
      if (
        data.tm_story_paintings == "Yes" ||
        data.tm_story_paintings == "RelatedImages"
      ) {
        // if (data.scans_of_manuscript_in_color != null) {
        if (data.scans_of_manuscript_in_color == "Yes") {
          if (data.link_to_digital_copy != null) {
            // text = `Fortunately, these paintings are <b>digitized</b> and available online in <b>color</b>. To view the manuscript, go to the
            //                 <b><a  class="text-primary-500 hover:text-secondary-500 font-bold" href=${data.link_to_digital_copy} target="_blank"> digital copy</a></b>.`;

            text = `Fortunately, these paintings are <b>digitized</b> and available online in <b>color</b>.`;
          } else {
            text =
              "These paintings have been <b>digitized in color</b> but are <b>not available online</b>. We hope the repository will put this manuscript online soon.";
          }
        } else {
          if (data.link_to_digital_copy != null) {
            // text = `These paintings are digitized and available online but only in black and white. To view the manuscript online, go to the
            //                 <b><a  class="text-primary-500 hover:text-secondary-500 font-bold" href=${data.link_to_digital_copy} target="_blank"> digital copy</a></b>.`;
            text = `These paintings are digitized and available online but only in <b>black and white</b>.`;
          }
        }
        // }
      }
      array.push({ text });
    }
    let folios = "";
    let pages = null;
    let scans = "";
    let columns = "";
    let lines = "";
    let folio_start = "";
    let num = 0;
    let s1 = "";
    let s2 = "";
    let p1 = "";
    let p2 = "";
    let p3 = "";
    let p4 = "";
    let p5 = "";

    if (data.total_folios != null) {
      folios = `<b>${data.total_folios}</b> folios`;
      num++;
    }
    if (data.total_scans != null) {
      if (num == 0) {
        scans = `<b>${data.total_scans}</b> scans`;
      } else if (num == 1) {
        scans = ` and <b>${data.total_scans}</b> scans`;
      } else {
        scans = `, and <b>${data.total_scans}</b> scans`;
      }
    }
    if (scans != "" || folios != "") {
      s1 = `This manuscript has a total of ${folios}${scans}.`;
    }
    if (data.columns_per_page != null) {
      columns = `<b>${data.columns_per_page}</b> columns per page`;
    }
    if (data.line_range_per_column != null) {
      if (data.columns_per_page != null) {
        lines = `and approximately <b>${data.line_range_per_column}</b> lines per column`;
      } else {
        lines = `approximately <b>${data.line_range_per_column}</b> lines per column`;
      }
    }
    if (columns != "" || lines != "") {
      s2 = `It has ${columns} ${lines}.`;
    }
    if (data.folio_start_of_the_tm_part != null) {
      folio_start = `The Marian miracle stories begin on folio <b>${data.folio_start_of_the_tm_part}</b> of the whole manuscript.`;
    }
    array.push({
      text: `${s1} ${s2} ${folio_start} ${
        data.duplicate_missing_scans_rebound_in_disorder === "Yes" &&
        data.mss_rebound_in_disorder_or_breaks_in_sequence
          ? `Some manuscripts get rebound in disorder (folios do not appear in the original sequence) or have breaks in the sequence (folios are missing that appeared in the original manuscript). This manuscript is <b>${data.mss_rebound_in_disorder_or_breaks_in_sequence}</b>.`
          : ""
      }`,
    });
    s1 = "";
    s2 = "";
    s2 = "";

    if (data.pemm_cataloger_name != null && data.print_cataloger_name != null) {
      s1 = `The stories in this manuscript were cataloged by <b>${data.pemm_cataloger_name}</b> and <b>${data.print_cataloger_name}</b>.`;
    } else {
      if (data.pemm_cataloger_name != null) {
        s1 = `The stories in this manuscript were cataloged by <b>${data.pemm_cataloger_name}</b>.`;
      } else if (data.print_cataloger_name != null) {
        s1 = `The stories in this manuscript were cataloged by <b>${data.print_cataloger_name}</b>.`;
      }
    }
    if (data.pemm_volunteer_name != null) {
      s2 = `Assistance and/or typing of incipits by <b>${data.pemm_volunteer_name}</b>.`;
    }
    array.push({
      text: `${s1} ${s2} `,
    });

    if (data.manuscript !== null) {
      p1 = `The PEMM abbreviation for this manuscript is <b>${data.manuscript}</b>.`;
      array.push({ text: p1 });
    }

    if (data.hamburg_ms_id !== null) {
      p2 += `The Beta Maṣāḥǝft abbreviation for this manuscript is ${
        data.hamburg_link
          ? `<a href=${data.hamburg_link} target="_blank" className="text-primary-500 font-bold hover:text-secondary-500">${data.hamburg_ms_id}</a>`
          : `<b>${data.hamburg_ms_id}</b>`
      }. `;
    }
    if (data.other_ms_id !== null) {
      p2 += `Other shelfmarks and/or abbreviations for this manuscript include <b>${data.other_ms_id}</b>.`;
    }
    array.push({ text: p2 });
    // array.push({ text: p3 });
    if (data.Collection_shelfmark) {
      p4 = `<b>Institutional Shelfmark:</b> ${data.Collection_shelfmark}.`;
      array.push({ text: p4 });
    }

    if (data?.manuscript_research_note != null)
      array.push({
        text: data.manuscript_research_note,
      });

    if (data.source) {
      p5 = `<p  class="p-beside-p">Regarding this manuscript's repository: ${data.source}</p>`;
      array.push({ text: p5 });
    }
    // array.push({ text: `${p1} ${p2} ${p3} ${p4} ${p5}` });

    if (data.manuscript.catalog != null) {
      array.push({
        text: `This manuscript has a print catalog: <b>${data.manuscript.catalog}</b>.`,
      });
    }

    array.push({
      text: `For more information about understanding this table, see <b><a href="/about/connect/using-the-site"  className="text-primary-500 font-bold hover:text-secondary-500">Using This Site</a></b>. If you think any of the information on this page is incorrect (e.g., the location, date, folios, story IDs), please use our <a href=https://docs.google.com/forms/d/e/1FAIpQLSe-ZLVpV7XDGV_8wApnycQk1ZFa5C9Ij8HaIAZTcdsrYNWkEA/viewform target="_blank" className="text-primary-500 font-bold hover:text-secondary-500">PEMM Feedback Form</a> to let us know. We depend on users like you to improve the site.`,
    });

    return array;
  };

  return data ? (
    <div className="container-fluid py-4 space-y-4 lg:py-7">
      <BackBtn />
      <h1 className="text-2xl text-primary-500 font-bold lg:text-3xl xl:text-4xl font-body">
        {data.manuscript_full_name}
      </h1>
      <div className="space-y-2 font-body a-tag-whithout-underline-and-green space-y-p">
        {generateFirstParagraph().map((data, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: data.text }}></p>
        ))}
      </div>
      {tableData && (
        <div id="emip-table">
          <h3 className="text-2xl font-medium font-body lg:text-2xl">
            {data.manuscript}
          </h3>
          <Table
            // search=""
            isPageName={MANUSCRIPT_DETAIL}
            tableData={tableData.data}
            tableHeader={manuscriptsDetailTableTitle}
            toggleBtn={false}
            // meta={{
            //   total: tableData.total,
            //   per_page: perPage,
            //   current_page: page,
            //   last_page: 50,
            // }}
            // isOpen={true}
            // onPageChange={(e) => {
            //   setPage(e.selected + 1);
            // }}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
            Id={Id}
          />
          <TablePagination
            meta={{
              total: tableData.total,
              per_page: perPage,
              current_page: page,
              last_page: 50,
              page: page,
            }}
            isOpen={isOpen}
            onPageChange={(num) => {
              setPage(num);
              setExpandedRows([]);
            }}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center py-36 justify-center w-full text-2xl text-primary-500 font-bold">
      <h1>Records Not Found</h1>
    </div>
  );
}
