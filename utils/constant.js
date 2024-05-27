export const pagePerLimit = 20;
export const minSearchChar = 1;
export const pagePerLimitForPainting = pagePerLimit; //21;
export const macomber_id_number = 642;
export const TOTAL_NUM_MANUSCRIPTS_WITH_MS_STATUS_COMPLETE = 674;
export const defaultImageforPainting = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}assets/2afd0f28-0147-4624-91ec-ad3afe99ea45`;
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
export const rangeSliderMaxNoOfPaintingsManuscriptsPage = 200;
export const rangeSliderMinUniqueStoriesManuscriptsPage = 0;
export const rangeSliderMaxUniqueStoriesManuscriptsPage = 100;
export const omitCanonical_Story_Id = 7000;
export const storiesTableDetailView = (localData) => [
  { name: localData?.title_of_story },
];
export const storiesTableTitleView = (localData) => [
  { name: localData?.storys_earliest_date, value: "dateOfOrigin" },
  { name: localData?.manuscripts_with_story, value: "totalManuscriptStory" },
  { name: localData?.paintings_of_story, value: "totalPaintingStory" },
  { name: localData?.type_of_mary_story, value: "" },
  { name: localData?.theme, value: "" },
  { name: localData?.story_id, value: "" },
];
export const manuscriptsTableDetailView = [{ name: "Title of Manuscript" }];

export const manuscriptsTableTitleView = [
  { name: "Date Manuscript Created", value: "dateCreated" },
  { name: "Manuscript's Number of Stories", value: "totalStories" },
  { name: "Manuscript's Number of Unique Stories", value: "uniqueStories" },
  { name: "Manuscript's Number of Paintings", value: "totalPaintings" },
  { name: "Manuscript's Place of Origin", value: "" },
  { name: "Manuscript's Language", value: "" },
  { name: "Link to Manuscript Online", value: "" },
  { name: "Manuscript's Digital Quality", value: "" },
];
export const manuscriptsDetailTableTitle = [
  { name: "Order in MS" },
  { name: "Story Title" },
  { name: "Location in MS" },
  { name: "Paintings" },
  { name: "Story Recension" },
  { name: "Incipit" },
  { name: "Other Aspects" },
  { name: "Story ID" },
];
export const initialfilterItem = (localData) => ({
  title: localData?.filtered_search,
  checkItem: {
    withPaintings: {
      id: "1",
      isCheckbox: true,
      key: "withPaintings",
      label: localData?.with_paintings,
      isChecked: false,
      isFirstBreak: false,
    },
    mostIllustrated: {
      id: "2",
      isCheckbox: true,
      key: "mostIllustrated",
      label: localData?.most_illustrated,
      isChecked: false,
      isFirstBreak: false,
    },
    withEnglishTranslation: {
      id: "3",
      isCheckbox: true,
      key: "withEnglishTranslation",
      label: localData?.with_english_translation,
      isChecked: false,
      isFirstBreak: false,
    },
    africanStories: {
      id: "4",
      isCheckbox: true,
      key: "africanStories",
      label: localData?.african_stories,
      isChecked: false,
      isFirstBreak: false,
    },
    withHymn: {
      id: "5",
      isCheckbox: true,
      key: "withHymn",
      label: localData?.with_hymns,
      isChecked: false,
      isFirstBreak: false,
    },
    readInChurch: {
      id: "6",
      isCheckbox: true,
      key: "readInChurch",
      label: localData?.most_read_in_church,
      isChecked: false,
      isFirstBreak: false,
    },
    arabicOnly: {
      id: "7",
      isCheckbox: true,
      key: "arabicOnly",
      label: localData?.story_in_arabic_not_geez,
      isChecked: false,
      isFirstBreak: false,
    },
    miracleOfMaryStories: {
      id: "8",
      name: "type of story",
      isCheckbox: false,
      key: "miracleOfMaryStories",
      label: localData?.miracle_of_mary_stories,
      isChecked: false,
      isFirstBreak: true,
    },
    lifeOfMaryStories: {
      id: "9",
      name: "type of story",
      isCheckbox: false,
      key: "lifeOfMaryStories",
      label: localData?.life_of_mary_stories,
      isChecked: false,
      isFirstBreak: false,
    },
    earliestStories: {
      id: "10",
      name: "timeline",
      isCheckbox: false,
      key: "earliestStories",
      label: localData?.earliest_stories,
      isChecked: false,
      isFirstBreak: true,
    },
    recentStories: {
      id: "11",
      name: "timeline",
      isCheckbox: false,
      key: "recentStories",
      label: localData?.recent_stories,
      isChecked: false,
      isFirstBreak: false,
    },
    popularStories: {
      id: "12",
      isCheckbox: false,
      name: "top of story",
      key: "popularStories",
      label: localData?.common_stories,
      isChecked: false,
      isFirstBreak: true,
    },
    uniqueStories: {
      id: "13",
      name: "top of story",
      isCheckbox: false,
      key: "uniqueStories",
      label: localData?.rare_stories,
      isChecked: false,
      isFirstBreak: false,
    },

    printOnly: {
      id: "14",
      isCheckbox: false,
      name: "printing",
      key: "printOnly",
      label: localData?.print_only,
      isChecked: false,
      isFirstBreak: true,
    },
    excludePrintOnly: {
      id: "15",
      name: "printing",
      isCheckbox: false,
      key: "excludePrintOnly",
      label: localData?.exclude_print_only,
      isChecked: false,
      isFirstBreak: false,
    },
  },
});
export const initialPlaceItem = (localData) => ({
  title: localData?.storys_place_of_origin,
  isCheckbox: false,
  checkItem: [
    {
      id: "1",
      icon: true,
      label: `${localData?.africa}:`,
      name: "africa",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: localData?.ethiopia,
      name: "ethiopia",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: localData?.egypt,
      name: "egypt",
      isChecked: false,
    },
    {
      id: "4",
      icon: true,
      label: `${localData?.europe}:`,
      name: "europe",
      isChecked: false,
    },

    {
      id: "5",
      icon: false,
      label: localData?.france,
      name: "france",
      isChecked: false,
    },
    {
      id: "6",
      icon: false,
      label: localData?.spain,
      name: "spain",
      isChecked: false,
    },
    {
      id: "7",
      icon: true,
      label: `${localData?.levant}:`,
      name: "levant",
      isChecked: false,
    },
    {
      id: "8",
      icon: false,
      label: localData?.byzantium,
      name: "byzantium",
      isChecked: false,
    },
    {
      id: "9",
      icon: false,
      label: localData?.early_christian_world,
      name: "early christian world",
      isChecked: false,
    },
    // {
    //   id: "10",
    //   icon: false,
    //   label: "Unknown",
    //   name: "unknown",
    //   isChecked: false,
    // },
  ],
});
export const initialOriginalLangItem = (localData) => ({
  title: localData?.original_languages_of_story,
  isCheckbox: true,
  checkItem: [
    {
      id: "1",
      label: localData?.geez,
      name: "geez",
      isChecked: false,
    },
    {
      id: "2",
      label: localData?.arabic,
      name: "arabic",
      isChecked: false,
    },
  ],
});
export const initialTranslatedLangItem = (localData) => ({
  title: localData?.translated_languages_of_story,
  isCheckbox: true,
  checkItem: [
    {
      id: "3",
      label: localData?.amharic,
      name: "amharic",
      isChecked: false,
    },
    {
      id: "4",
      label: localData?.latin,
      name: "latin",
      isChecked: false,
    },
    {
      id: "5",
      label: localData?.french,
      name: "french",
      isChecked: false,
    },
    {
      id: "6",
      label: localData?.italian,
      name: "italian",
      isChecked: false,
    },
    {
      id: "7",
      label: localData?.english,
      name: "english",
      isChecked: false,
    },
  ],
});
export const initialfilterItemManuScript = (localData) => ({
  title: localData?.filtered_search,
  checkItem: {
    withPaintings: {
      id: "1",
      key: "withPaintings",
      isCheckbox: true,
      label: localData?.with_paintings,
      isChecked: false,
      isFirstBreak: false,
    },
    withOnlineDigitalCopy: {
      id: "2",
      key: "withOnlineDigitalCopy",
      isCheckbox: true,
      label: localData?.with_online_digital_copy,
      isChecked: false,
      isFirstBreak: false,
    },
    withColorDigitalCopy: {
      id: "3",
      key: "withColorDigitalCopy",
      isCheckbox: true,
      label: localData?.with_color_digital_copy,
      isChecked: false,
      isFirstBreak: false,
    },
    withUniqueStories: {
      id: "4",
      key: "withUniqueStories",
      isCheckbox: true,
      label: localData?.with_unique_stories,
      isChecked: false,
      isFirstBreak: false,
    },
    royalManuscript: {
      id: "5",
      key: "royalManuscript",
      isCheckbox: true,
      label: localData?.royal_manuscripts,
      isChecked: false,
      isFirstBreak: false,
    },
    withHymns: {
      id: "6",
      key: "withHymns",
      isCheckbox: true,
      label: localData?.with_hymns,
      isChecked: false,
      isFirstBreak: false,
    },
    oldestManuscript: {
      id: "7",
      name: "timeline",
      key: "oldestManuscript",
      isCheckbox: false,
      label: localData?.oldest_manuscripts,
      isChecked: false,
      isFirstBreak: true,
    },
    recentManuscript: {
      id: "8",
      name: "timeline",
      key: "recentManuscript",
      isCheckbox: false,
      label: localData?.recent_manuscripts,
      isChecked: false,
      isFirstBreak: false,
    },
    manyStories: {
      id: "9",
      name: "story count",
      key: "manyStories",
      isCheckbox: false,
      label: localData?.many_stories,
      isChecked: false,
      isFirstBreak: true,
    },
    fewStories: {
      id: "10",
      name: "story count",
      key: "fewStories",
      isCheckbox: false,
      label: localData?.few_stories,
      isChecked: false,
      isFirstBreak: false,
    },
    arabicManuscript: {
      id: "11",
      name: "arabic",
      key: "arabicManuscript",
      isCheckbox: false,
      label: localData?.arabic_manuscripts,
      isChecked: false,
      isFirstBreak: true,
    },
    gaazManuscript: {
      id: "12",
      name: "arabic",
      key: "gaazManuscript",
      isCheckbox: false,
      label: localData?.geez_manuscripts,
      isChecked: false,
      isFirstBreak: false,
    },
    printOnly: {
      id: "13",
      isCheckbox: false,
      name: "printing",
      key: "printOnly",
      label: localData?.print_only,
      isChecked: false,
      isFirstBreak: true,
    },
    excludePrintOnly: {
      id: "14",
      name: "printing",
      isCheckbox: false,
      key: "excludePrintOnly",
      label: localData?.exclude_print_only,
      isChecked: false,
      isFirstBreak: false,
    },
  },
});
export const initialPlaceItemManuScript = {
  title: "Manuscript's Last Known Location",
  isCheckbox: false,
  checkItem: [
    {
      id: "1",
      icon: true,
      label: "Africa:",
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
      label: "Middle East:",
      name: "middle_east",
      isChecked: false,
    },
    {
      id: "5",
      icon: false,
      label: "Israel",
      name: "israel",
      isChecked: false,
    },
    {
      id: "11",
      icon: true,
      label: "North America:",
      name: "north_america",
      isChecked: false,
    },
    {
      id: "12",
      icon: false,
      label: "US",
      name: "united states",
      isChecked: false,
    },
    {
      id: "13",
      icon: false,
      label: "Canada",
      name: "canada",
      isChecked: false,
    },
    {
      id: "6",
      icon: true,
      label: "Europe:",
      name: "europe",
      isChecked: false,
    },
    {
      id: "7",
      icon: false,
      label: "France",
      name: "france",
      isChecked: false,
    },
    {
      id: "8",
      icon: false,
      label: "Italy",
      name: "italy",
      isChecked: false,
    },
    {
      id: "10",
      icon: false,
      label: "UK",
      name: "united kingdom",
      isChecked: false,
    },
    {
      id: "9",
      icon: false,
      label: "Germany",
      name: "germany",
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
  title: "Manuscript's Known Region of Origin",
  isCheckbox: false,
  checkItem: [
    {
      id: "10",
      icon: true,
      label: "Ethiopia:",
      name: "ethiopia",
      isChecked: false,
    },
    {
      id: "1",
      icon: false,
      label: "North Ethiopia ",
      name: "north",
      isChecked: false,
    },
    {
      id: "2",
      icon: false,
      label: "West Ethiopia",
      name: "west",
      isChecked: false,
    },
    {
      id: "3",
      icon: false,
      label: "South Ethiopia",
      name: "south",
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
      label: "Iraq",
      name: "iraq",
      isChecked: false,
    },
  ],
};

export const breakpointColumnsForMasonry = {
  default: 4,
  1024: 3,
  768: 2,
  425: 1,
};

export const masonryTilesForResearchs_News_Events = (num) => {
  return num > 2
    ? { default: 3, 1100: 2, 700: 1 }
    : { default: 2, 1100: 2, 700: 1 };
};

export const subBannerDefaultImageUrl =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0RERERERCIvPjxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik0xMTkuOTUgMjUwLjE5NWg5Ljg1cTMuNjMgMCA2LjMyLS45MSAyLjctLjkgNC40OS0yLjU5IDEuNzktMS43IDIuNjctNC4xMi44OC0yLjQzLjg4LTUuNDIgMC0yLjg0LS44OC01LjE0dC0yLjY1LTMuOTJxLTEuNzYtMS42Mi00LjQ2LTIuNDctMi42OS0uODYtNi4zNy0uODZoLTkuODV2MjUuNDNabS0xMy4xOC0zNS42MmgyMy4wM3E3LjExIDAgMTIuMyAxLjY2IDUuMiAxLjY3IDguNTggNC42NnQ1LjAyIDcuMTVxMS42NCA0LjE3IDEuNjQgOS4xMSAwIDUuMTUtMS43MSA5LjQ0LTEuNzIgNC4yOC01LjE1IDcuMzctMy40MyAzLjA5LTguNiA0LjgtNS4xNyAxLjcyLTEyLjA4IDEuNzJoLTkuODV2MjQuOTRoLTEzLjE4di03MC44NVptMTA1LjM1IDEwLjQ4aC0zMS40NnYxOS42NWgyNC44djEwLjE0aC0yNC44djIwLjA0aDMxLjQ2djEwLjU0aC00NC42OXYtNzAuODVoNDQuNjl2MTAuNDhabTc4LjU1LTEwLjQ4aDkuOTV2NzAuODVIMjg5di00NS43N3EwLTIuNzQuMy01LjkzbC0yMS40MiA0MC4yM3EtMS41MSAyLjg5LTQuNjUgMi44OWgtMS44NnEtMy4xNCAwLTQuNjYtMi44OWwtMjEuNjYtNDAuMzdxLjE1IDEuNjEuMjUgMy4xOHQuMSAyLjg5djQ1Ljc3aC0xMS42MnYtNzAuODVoOS45NXEuODggMCAxLjUyLjA0LjY0LjA1IDEuMTUuMjUuNTIuMi45My42NC40Mi40NC44MSAxLjE3bDIxLjIyIDM5LjM1cS44MyAxLjU3IDEuNTQgMy4yMy43MSAxLjY3IDEuNCAzLjQzLjY4LTEuODEgMS40Mi0zLjUuNzMtMS42OSAxLjU3LTMuMjZsMjAuOTItMzkuMjVxLjM5LS43My44My0xLjE3LjQ0LS40NC45Ni0uNjQuNTEtLjIgMS4xNS0uMjUuNjQtLjA0IDEuNTItLjA0Wm05Mi42MSAwaDkuOTV2NzAuODVoLTExLjYydi00NS43N3EwLTIuNzQuMy01LjkzbC0yMS40MSA0MC4yM3EtMS41MiAyLjg5LTQuNjYgMi44OWgtMS44NnEtMy4xNCAwLTQuNjYtMi44OWwtMjEuNjYtNDAuMzdxLjE1IDEuNjEuMjUgMy4xOHQuMSAyLjg5djQ1Ljc3aC0xMS42MnYtNzAuODVoOS45NXEuODggMCAxLjUyLjA0LjY0LjA1IDEuMTUuMjUuNTIuMi45My42NC40Mi40NC44MSAxLjE3bDIxLjIyIDM5LjM1cS44MyAxLjU3IDEuNTQgMy4yMy43MSAxLjY3IDEuNCAzLjQzLjY4LTEuODEgMS40Mi0zLjUuNzMtMS42OSAxLjU3LTMuMjZsMjAuOTItMzkuMjVxLjM5LS43My44My0xLjE3LjQ0LS40NC45Ni0uNjQuNTEtLjIgMS4xNS0uMjUuNjQtLjA0IDEuNTItLjA0WiIvPjwvc3ZnPg==";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateFormate = (inputDate) => {
  if (!inputDate) {
    return "";
  }

  const parsedDate = new Date(inputDate);

  const day = parsedDate.getDate();
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};

export function setCookie(name, value, daysToExpire) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  var cookieString =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = cookieString;
}

export function getCookie(name) {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    // Check if the cookie starts with the desired name
    if (cookie.indexOf(name + "=") === 0) {
      // Extract and return the cookie value
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  // Return null if the cookie with the given name is not found
  return null;
}
