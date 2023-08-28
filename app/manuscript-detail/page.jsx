import React from "react";
import Table from "../components/Table";
import {
  MANUSCRIPT_DETAIL,
  manuscriptsDetailTableTitle,
} from "@/utils/constant";

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  // const { Id } = params;
  const Id = 1;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/${Id}`
  );

  const data = await response.json();

  const generateFirstParagraph = () => {
    const array = [];

    if (
      data.language &&
      data.manuscript_date_range_start &&
      data.manuscript_date_range_end
    ) {
      let text = `This <b>${data.language}</b> language manuscript was created between <b>${data.manuscript_date_range_start}</b> and <b>${data.manuscript_date_range_end}</b>. `;
      if (data.date_note) {
        if (data.date_note == "Date from ms (colophon)") {
          text +=
            "This date is precise, based on the scribe noting the date in the manuscript. ";
        } else if (data.date_note == "Date from king's name") {
          text +=
            "This date is estimated, based on the reigning Ethiopian king&apos;s name appearing in the manuscript.";
        } else if (data.date_note == "Date from ms (paleography)") {
          text +=
            "This date is estimated, based on paleography (a study of the manuscript&apos;s letter shapes).";
        } else if (data.date_note == "Date from catalog") {
          text +=
            "This date is estimated, based on a print or electronic catalog entry about the manuscript.";
        } else if (data.date_note == "Date from JRB and SGD") {
          text +=
            "This date is estimated, based on paleography, a study of the manuscript&apos;s letter shapes by Jeremy Brown and Stephen Delamarter.";
        } else {
          text += "This date is estimated based on various methods.";
        }
      }
      array.push({ text });
    }

    if (data.collections_sheet_relevant == "True") {
      let text = `This manuscript is held in the repository of ${data.institution_name} in their ${data.collection_name} in ${data.institution_city_state}, ${data.institution_country}`;
      if (data.link_to_digital_copy != null) {
        text += `To view the manuscript online, go <a href={data.link_to_digital_copy}><b>here</b></a>`;
      } else {
        text += link_to_digital_copy_note_external;
      }
      array.push({ text });
    } else {
      let text = `This manuscript&apos;s last known location (i.e., where it was microfilmed or digitized at some point in the past forty years)  is the repository of ${data.location_of_ms_imaging} in ${data.location_of_ms_imaging_city}, ${data.location_of_ms_imaging_country}.`;
      if (
        data.digital_repository &&
        data.digital_repository_city &&
        data.digital_repository_country
      ) {
        text += `A digital copy of this manuscript is held by ${data.digital_repository} in ${data.digital_repository_city} , ${data.digital_repository_country}. `;
      }
      array.push({ text });
    }

    if (data.total_stories != null) {
      let text;
      if (data.total_stories <= 1) {
        text = "This manuscript has only one Marian miracle story.";
      } else if (data.total_stories < 24) {
        text = `This manuscript has fewer Marian miracle stories than most, only <b>${data.total_stories}</b>.`;
      } else if (data.total_stories < 99) {
        text = `This manuscript has a typical number of Marian miracle stories: <b>${data.total_stories}</b>.`;
      } else if (data.total_stories < 199) {
        text = `This manuscript has a high number of Marian miracle stories: <b>${data.total_stories}</b>.`;
      } else {
        text = `This manuscript has a very high number of Marian miracle stories: <b>${total_stories}</b>.`;
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
        if (total_manuscript_paintings <= 6) {
          if (total_manuscript_paintings > 0) {
            text = `This manuscript has a few paintings of Marian miracle stories: <b>${data.total_manuscript_paintings}</b>.`;
          }
        } else if (data.total_manuscript_paintings < 15) {
          text = `This manuscript has some paintings of Marian miracle stories: <b>${data.total_manuscript_paintings}</b>.`;
        } else if (data.total_manuscript_paintings < 200) {
          text = `This manuscript has a lot of paintings of Marian miracle stories: <b>${total_manuscript_paintings}</b>.`;
        }
      } else if (data.tm_story_paintings == "RelatedImages") {
        text = `This manuscript has no paintings of Marian miracle stories, but it does have <b>${data.total_manuscript_paintings}</b> paintings of Mary and events in her life.`;
      }
      array.push({ text });
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
        if (data.scans_of_manuscript_in_color != null) {
          if (data.scans_of_manuscript_in_color == "Yes") {
            if (data.link_to_digital_copy != null) {
              text = `Fortunately, these paintings are digitized and available online in color. To view the manuscript online, go to the
                          <b><a href={data.link_to_digital_copy}> digital copy</a></b>.`;
            } else {
              text =
                "These paintings have been digitized in color but are not available online. Please encourage the repository to put this manuscript online.";
            }
          } else {
            if (data.link_to_digital_copy != null) {
              text = `These paintings are digitized and available online but only in black and white. To view the manuscript online, go to the
                          <b><a href={data.link_to_digital_copy}> digital copy</a></b>.`;
            }
          }
        }
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
      folios = `<b>${data.total_folios}</b>`;
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
      columns = `<b>${data.columns_per_page}</b> columns per page.`;
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
    array.push({ text: `${s1} ${s2} ${folio_start}` });

    s2 = "";
    s2 = "";

    if (data.pemm_cataloger_name != null && data.print_cataloger_name != null) {
      s1 = `The stories in this manuscript were cataloged by <b>${data.pemm_cataloger_name}</b> and <b>${data.print_cataloger_name}</b>.`;
    } else {
      if (data.pemm_cataloger_name != null) {
        s1 = `The stories in this manuscript were cataloged by <b>${data.pemm_cataloger_name}</b>`;
      } else if (data.print_cataloger_name != null) {
        s1 = `The stories in this manuscript were cataloged by <b>${data.print_cataloger_name}</b>`;
      }
    }
    if (data.pemm_volunteer_name != null) {
      s2 = `Assistance in the form of typing incipits was provided by <b>${data.pemm_volunteer_name}</b>.`;
    }
    array.push({ text: `${s1} ${s2}` });

    if (data.manuscript !== null) {
      p1 = `<h2><b>PEMM Manuscript Abbreviation:</b> ${data.manuscript}</h2>`;
    }

    if (data.hamburg_ms_id !== null) {
      p2 = `<h2><b>Beta Maṣāḥǝft Manuscript Abbreviation:</b> ${data.hamburg_ms_id}</h2>`;
    }

    if (data.Collection_shelfmark) {
      p4 = `<h2><b>Institutional Shelfmark:</b> ${data.Collection_shelfmark}</h2>`;
    }

    if (data.source) {
      p5 = `<h2><b>Additional Cataloging or Archive Information:</b> ${data.source}</h2>`;
    }
    array.push({ text: `${p1} ${p2} ${p3} ${p4} ${p5}` });

    if (data.manuscript.catalog != null) {
      array.push({
        text: `This manuscript has a print catalog: <b>${data.manuscript.catalog}</b>`,
      });
    }

    array.push({
      text: `If a story in our database appears only once, in this manuscript, we mark it below, with a ☆ in the last column. If a story has a hymn at the end, we mark it with a ♫. If we are not entirely sure if this story is the one we say it is, we mark it with (?).`,
    });

    return array;
  };

  const tableData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}manuscripts/stories/${data.id}`
  );

  console.log(tableData, "tableDatatableData");

  return (
    <div>
      <div className="container-fliud">
        <div className="pb-12">
          <h2 className="font-menu text-5xl font-medium">
            {data.manuscript_full_name}
          </h2>
          <div className="space-y-p">
            {generateFirstParagraph().map((data, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: data.text }}
              ></p>
            ))}
          </div>
          <div className="pt-5">
            <h3 className="font-menu text-5xl font-medium">EMIP (EMIP) 981a</h3>
            <Table
              isPageName={MANUSCRIPT_DETAIL}
              tableData={tableData}
              tableHeader={manuscriptsDetailTableTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;