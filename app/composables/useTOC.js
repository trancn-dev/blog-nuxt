export const useTOC = () => {
  const tableOfContents = useState("tableOfContents", () => []);
  const activeSection = useState("activeSection", () => "");

  const setTableOfContents = (toc) => {
    tableOfContents.value = toc;
    console.log("useTOC - setTableOfContents:", toc);
  };

  const setActiveSection = (section) => {
    activeSection.value = section;
  };

  return {
    tableOfContents,
    activeSection,
    setTableOfContents,
    setActiveSection,
  };
};
