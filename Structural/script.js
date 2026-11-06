<!-- Trophy Filtering System -->
//<![CDATA[
function filterTrophies() {
  const input = document.querySelector("#trophySearch");
  if (!input) return;

  const query = input.value.toLowerCase().trim();
  const isStatusSearch = query === "paid" || query === "free";
  const wantedStatus = query === "paid" ? "true" : "false";
  const overviews = document.querySelectorAll(".overview-node");
  const overviewByGroup = new Map();
  const matchingGroups = new Set();

  for (const overview of overviews) {
    const group = (overview.dataset.group || "").toLowerCase().trim();
    if (group) overviewByGroup.set(group, overview);

    const groupMatches = !isStatusSearch && query !== "" && group.includes(query);
    const matches =
      !query ||
      (isStatusSearch
        ? overview.dataset.paid === wantedStatus
        : groupMatches);

    overview.classList.toggle("is-hidden", !matches);
    overview.style.setProperty(
      "display",
      matches ? "block" : "none",
      "important"
    );

    if (matches && group) matchingGroups.add(group);
  }

  for (const trophy of document.querySelectorAll(".trophy, .dlc-trophy")) {
    const name = (trophy.dataset.name || "").toLowerCase();
    const group = (trophy.dataset.group || "").toLowerCase().trim();
    const overview = overviewByGroup.get(group);

    let matches;

    if (!query) {
      matches = true;
    } else if (isStatusSearch) {
      matches = !!overview && overview.dataset.paid === wantedStatus;
    } else {
      matches = name.includes(query) || matchingGroups.has(group);
    }

    trophy.classList.toggle("is-hidden", !matches);
    trophy.style.setProperty(
      "display",
      matches ? "flex" : "none",
      "important"
    );
  }

  for (const section of document.querySelectorAll(".category-section")) {
    const hasVisibleContent = section.querySelector(
      ".overview-node:not(.is-hidden), .trophy:not(.is-hidden), .dlc-trophy:not(.is-hidden)"
    );

    section.style.setProperty(
      "display",
      !query || hasVisibleContent ? "block" : "none",
      "important"
    );
  }
}

function initializeTrophySearch() {
  const input = document.querySelector("#trophySearch");

  if (input) {
    input.placeholder = "Filter by Trophy Name, DLC Name, Paid or Free for DLC";
    filterTrophies();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTrophySearch);
} else {
  initializeTrophySearch();
}

document.addEventListener("input", function (event) {
  if (event.target && event.target.id === "trophySearch") {
    filterTrophies();
  }
});
//]]>