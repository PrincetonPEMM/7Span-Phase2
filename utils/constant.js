export const pagePerLimit = 10;
export const tableDetailView = [{ name: "Title of Story" }];
export const tableTitleView = [
  { name: "Story ID" },
  { name: "Date of Origin" },
  { name: "No. of MSS with Story" },
  { name: "No. of Paintings of Story" },
  { name: "Type of Mary Story" },
  { name: "Theme " },
];
export const initialfilterItem = {
  title: "Filtered Search",
  checkItem: {
    withPaintings: {
      id: "1",
      label: "With Paintings",
      isChecked: false,
    },
    mostIllustrated: {
      id: "2",
      label: "Most Illustrated",
      isChecked: false,
    },
    withEnglishTranslation: {
      id: "3",
      label: "With English translation",
      isChecked: false,
    },
    ethiopianStories: {
      id: "4",
      label: "Ethiopian Stories",
      isChecked: false,
    },
    miracleOfMaryStories: {
      id: "5",
      label: "Miracle of Mary Stories ",
      isChecked: false,
    },
    lifeOfMaryStories: {
      id: "6",
      label: "Life of Mary Stories ",
      isChecked: false,
    },
    earliestStories: {
      id: "7",
      label: "Earliest Stories",
      isChecked: false,
    },
    recentStories: {
      id: "8",
      label: "Recent Stories",
      isChecked: false,
    },
    popularStories: {
      id: "9",
      label: "Popular Stories",
      isChecked: false,
    },
    rareStories: {
      id: "10",
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
      label: "Geez",
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
      label: "English",
      name: "english",
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
      label: "Latin",
      name: "latin",
      isChecked: false,
    },
  ],
};
