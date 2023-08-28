export const pagePerLimit = 20;
export const TOTAL_NUM_MANUSCRIPTS_WITH_MS_STATUS_COMPLETE = 641;
export const TRANSLATION_STATUS_OPTIONS = [
  "Published translation",
  "Complete Translation",
  "Complete Unpublished Translation",
];
export const ID_LIST = [
  "13",
  "187",
  "161",
  "162",
  "163",
  "19",
  "27",
  "33",
  "54",
  "153",
  "154",
  "16",
  "46",
  "43",
  "48",
  "59",
  "57",
  "61",
  "68",
  "82",
  "83",
  "99",
  "103",
  "112",
  "158",
  "140",
  "142",
  "7",
  "125",
  "152",
  "148",
  "236",
];
export const STORIES = "Stories";
export const MANUSCRIPTS = "Manuscripts";
export const MANUSCRIPT_DETAIL = "Manuscript-Detail";
export const rangeSliderMinForStoriesStoriesPage = 1350;
export const rangeSliderMaxForStoriesStoriesPage = 2020;
export const rangeSliderMinForManuscriptsStoriesPage = 0;
export const rangeSliderMaxForManuscriptsStoriesPage = 700;
export const rangeSliderMinForPaintingsStoriesPage = 0;
export const rangeSliderMaxForPaintingsStoriesPage = 100;
export const rangeSliderMinDateOfCreationManuscriptsPage = 1100;
export const rangeSliderMaxDateOfCreationManuscriptsPage = 2020;
export const rangeSliderMinNoOfStoriesManuscriptsPage = 0;
export const rangeSliderMaxNoOfStoriesManuscriptsPage = 400;
export const rangeSliderMinNoOfPaintingsManuscriptsPage = 0;
export const rangeSliderMaxNoOfPaintingsManuscriptsPage = 100;
export const rangeSliderMinUniqueStoriesManuscriptsPage = 0;
export const rangeSliderMaxUniqueStoriesManuscriptsPage = 100;
export const storiesTableDetailView = [{ name: "Title of Story" }];
export const storiesTableTitleView = [
  { name: "Story ID" },
  { name: "Story's Date of Origin" },
  { name: "Manuscripts with Story" },
  { name: "Paintings of Story" },
  { name: "Type of Mary Story" },
  { name: "Theme " },
];
export const manuscriptsTableDetailView = [{ name: "Title of Manuscript" }];
export const manuscriptsTableTitleView = [
  { name: "Date Manuscript Created" },
  { name: "Manuscript's Number of Stories" },
  { name: "Manuscript's Number of Unique Stories" },
  { name: "Manuscript's Place of Origin" },
  { name: "Manuscript's Number of Paintings" },
  { name: "Manuscript's Language" },
  { name: "Link to Manuscript Online" },
  { name: "Manuscript's Digital Quality" },
];
export const manuscriptsDetailTableTitle = [
  { name: "Story ID" },
  { name: "Story Title" },
  { name: "Location in MS" },
  { name: "Number in MS" },
  { name: "Story Recension" },
  { name: "Incipit" },
  { name: "Other Aspects" },
];
export const initialfilterItem = {
  title: "Filtered Search",
  checkItem: {
    withPaintings: {
      id: "1",
      isCheckbox: true,
      key: "withPaintings",
      label: "With Paintings",
      isChecked: false,
    },
    mostIllustrated: {
      id: "2",
      isCheckbox: true,
      key: "mostIllustrated",
      label: "Most Illustrated",
      isChecked: false,
    },
    withEnglishTranslation: {
      id: "3",
      isCheckbox: true,
      key: "withEnglishTranslation",
      label: "With English Translation",
      isChecked: false,
    },
    ethiopianStories: {
      id: "4",
      isCheckbox: true,
      key: "ethiopianStories",
      label: "Ethiopian Stories",
      isChecked: false,
    },
    miracleOfMaryStories: {
      id: "5",
      name: "type of story",
      isCheckbox: false,
      key: "miracleOfMaryStories",
      label: "Miracle of Mary Stories ",
      isChecked: false,
    },
    lifeOfMaryStories: {
      id: "6",
      name: "type of story",
      isCheckbox: false,
      key: "lifeOfMaryStories",
      label: "Life of Mary Stories ",
      isChecked: false,
    },
    earliestStories: {
      id: "7",
      name: "timeline",
      isCheckbox: false,
      key: "earliestStories",
      label: "Earliest Stories",
      isChecked: false,
    },
    recentStories: {
      id: "8",
      name: "timeline",
      isCheckbox: false,
      key: "recentStories",
      label: "Recent Stories",
      isChecked: false,
    },
    popularStories: {
      id: "9",
      isCheckbox: false,
      name: "top of story",
      key: "popularStories",
      label: "Popular Stories",
      isChecked: false,
    },
    uniqueStories: {
      id: "10",
      name: "top of story",
      isCheckbox: false,
      key: "uniqueStories",
      label: "Rare Stories",
      isChecked: false,
    },
  },
};
export const initialPlaceItem = {
  title: "Story's Place of Origin",
  checkItem: [
    {
      id: "1",
      icon: true,
      label: "Africa",
      name: "africa",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "Ethiopia",
      name: "ethiopia",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "Egypt",
      name: "egypt",
      isChecked: false,
    },
    {
      id: "4",
      icon: true,
      label: "Europe",
      name: "Europe",
      isChecked: false,
    },

    {
      id: "5",
      icon: false,
      label: "France",
      name: "france",
      isChecked: false,
    },
    {
      id: "6",
      icon: false,
      label: "Spain",
      name: "spain",
      isChecked: false,
    },
    {
      id: "7",
      icon: true,
      label: "Levant",
      name: "levant",
      isChecked: false,
    },
    {
      id: "8",
      icon: false,
      label: "Unknown",
      name: "unknown",
      isChecked: false,
    },
  ],
};
export const initialLangItem = {
  title: "Languages of Story",
  checkItem: [
    {
      id: "1",
      label: "Gǝˁǝz",
      name: "geez",
      isChecked: false,
    },
    {
      id: "2",
      label: "Arabic",
      name: "arabic",
      isChecked: false,
    },
    {
      id: "3",
      label: "Amharic",
      name: "amharic",
      isChecked: false,
    },
    {
      id: "4",
      label: "Latin",
      name: "latin",
      isChecked: false,
    },
    {
      id: "5",
      label: "French",
      name: "french",
      isChecked: false,
    },
    {
      id: "6",
      label: "Italian",
      name: "italian",
      isChecked: false,
    },
    {
      id: "7",
      label: "English",
      name: "english",
      isChecked: false,
    },
  ],
};
export const initialfilterItemManuScript = {
  title: "Filtered Search",
  checkItem: {
    withPaintings: {
      id: "1",
      key: "withPaintings",
      isCheckbox: true,
      label: "With Paintings",
      isChecked: false,
    },
    withOnlineDigitalCopy: {
      id: "2",
      key: "withOnlineDigitalCopy",
      isCheckbox: true,
      label: "With online digital copy",
      isChecked: false,
    },
    withColorDigitalCopy: {
      id: "3",
      key: "withColorDigitalCopy",
      isCheckbox: true,
      label: "With color digital copy",
      isChecked: false,
    },
    withUniqueStories: {
      id: "4",
      key: "withUniqueStories",
      isCheckbox: true,
      label: "With unique stories",
      isChecked: false,
    },
    oldestManuscript: {
      id: "5",
      name: "timeline",
      key: "oldestManuscript",
      isCheckbox: false,
      label: "Oldest manuscripts",
      isChecked: false,
    },
    recentManuscript: {
      id: "6",
      name: "timeline",
      key: "recentManuscript",
      isCheckbox: false,
      label: "Recent manuscripts",
      isChecked: false,
    },
    arabicManuscript: {
      id: "7",
      name: "arabic",
      key: "arabicManuscript",
      isCheckbox: false,
      label: "Arabic manuscripts",
      isChecked: false,
    },
    arabicAndGaazManuscript: {
      id: "8",
      name: "arabic",
      key: "arabicAndGaazManuscript",
      isCheckbox: false,
      label: "Arabic & Gǝˁǝz manuscripts",
      isChecked: false,
    },
  },
};
export const initialPlaceItemManuScript = {
  title: "Manuscript's Last Known Location",
  checkItem: [
    {
      id: "1",
      icon: false,
      label: "Africa",
      name: "africa",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "Egypt",
      name: "Egypt",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "Ethiopia",
      name: "Ethiopia",
      isChecked: false,
    },
    {
      id: "4",
      icon: false,
      label: "Middle East",
      name: "middle_east",
      isChecked: false,
    },
    {
      id: "5",
      icon: false,
      label: "Israel",
      name: "Israel",
      isChecked: false,
    },
    {
      id: "11",
      icon: false,
      label: "North America",
      name: "north_america",
      isChecked: false,
    },
    {
      id: "12",
      icon: false,
      label: "US",
      name: "US",
      isChecked: false,
    },
    {
      id: "13",
      icon: false,
      label: "Canada",
      name: "Canada",
      isChecked: false,
    },
    {
      id: "6",
      icon: false,
      label: "Europe",
      name: "Europe",
      isChecked: false,
    },
    {
      id: "7",
      icon: false,
      label: "France",
      name: "France",
      isChecked: false,
    },
    {
      id: "8",
      icon: false,
      label: "Italy",
      name: "Italy",
      isChecked: false,
    },
    {
      id: "10",
      icon: false,
      label: "UK",
      name: "UK",
      isChecked: false,
    },
    {
      id: "9",
      icon: false,
      label: "Germany",
      name: "Germany",
      isChecked: false,
    },

    {
      id: "14",
      icon: false,
      label: "Other",
      name: "other",
      isChecked: false,
    },
  ],
};
export const initialOriginRegionManuScript = {
  title: "Manuscript's Known Region of origin",
  checkItem: [
    {
      id: "1",
      icon: false,
      label: "North Ethiopia ",
      name: "north",
      isChecked: false,
    },
    {
      id: "4",
      icon: false,
      label: "Eritrea",
      name: "eritrea",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "West Ethiopia",
      name: "westEthopia",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "South Ethiopia",
      name: "southEthopia",
      isChecked: false,
    },

    {
      id: "5",
      icon: false,
      label: "Egypt",
      name: "egypt",
      isChecked: false,
    },
    {
      id: "6",
      icon: false,
      label: "Turkey",
      name: "turkey",
      isChecked: false,
    },
    {
      id: "7",
      icon: false,
      label: "Syria",
      name: "syria",
      isChecked: false,
    },
    {
      id: "8",
      icon: false,
      label: "Unknown",
      name: "unknown",
      isChecked: false,
    },
  ],
};
