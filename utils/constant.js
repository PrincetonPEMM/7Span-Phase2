export const pagePerLimit = 10;
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
export const rangeSliderMinForStoriesStoriesPage = 1350;
export const rangeSliderMaxForStoriesStoriesPage = 2000;
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
  { name: "Data Manuscript Created" },
  { name: "Manuscript's Number of Stories" },
  { name: "Unique Stories" },
  { name: "Manuscript's Place of Origin" },
  { name: "Manuscript's Number of Paintins" },
  { name: "Manuscript's Language" },
  { name: "Link to Manuscript Online" },
  { name: "Manuscript's Digital Quality" },
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
      label: "Egypt",
      name: "egypt",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "Ethiopia",
      name: "ethiopia",
      isChecked: false,
    },
    {
      id: "4",
      icon: true,
      label: "Europe",
      name: "europe",
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
      label: "With Paintings",
      isChecked: false,
    },
    withOnlineDigitalCopy: {
      id: "2",
      key: "withOnlineDigitalCopy",
      label: "With online digital copy",
      isChecked: false,
    },
    withColorDigitalCopy: {
      id: "3",
      key: "withColorDigitalCopy",
      label: "With color digital copy",
      isChecked: false,
    },
    withUniqueStories: {
      id: "4",
      key: "withUniqueStories",
      label: "With unique stories",
      isChecked: false,
    },
    oldestManuscript: {
      id: "5",
      key: "oldestManuscript",
      label: "Oldest manuscripts",
      isChecked: false,
    },
    recentManuscript: {
      id: "6",
      key: "recentManuscript",
      label: "Recent manuscripts",
      isChecked: false,
    },
    arabicManuscript: {
      id: "7",
      key: "arabicManuscript",
      label: "Arabic manuscripts",
      isChecked: false,
    },
    arabicAndGaazManuscript: {
      id: "8",
      key: "arabicAndGaazManuscript",
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
      label: "Africa: Egypt Ethiopia",
      name: "africa",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "Middle East: Israel",
      name: "middle_east",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "Europe: France Italy Germany United Kingdom",
      name: "europe",
      isChecked: false,
    },
    {
      id: "4",
      icon: false,
      label: "North America: United States Canadaa",
      name: "north_america",
      isChecked: false,
    },
    {
      id: "5",
      icon: false,
      label: "Other",
      name: "other",
      isChecked: false,
    },
  ],
};
export const initialOriginRegionManuScript = {
  title: "Manuscript's Known Region of Origin",
  checkItem: [
    {
      id: "1",
      icon: false,
      label: "Northern Ethiopia",
      name: "north",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "Southern Ethiopia",
      name: "south",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "Western Ethiopia",
      name: "west",
      isChecked: false,
    },
    {
      id: "4",
      icon: false,
      label: "Eritrea Ethiopia",
      name: "eritrea",
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
