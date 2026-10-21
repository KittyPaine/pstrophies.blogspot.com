<!-- Trophy Filtering System -->
//<![CDATA[
function filterTrophies() {
  const input = document.querySelector("#trophySearch");
  if (!input) return;

  const query = input.value.toLowerCase().trim();
  const isStatusSearch = query === "paid" || query === "free";
  const overviews = document.querySelectorAll(".overview-node");
  const overviewByGroup = new Map();

  for (const overview of overviews) {
    const group = (overview.dataset.group || "").toLowerCase().trim();
    if (group) overviewByGroup.set(group, overview);
  }

  const matchingGroups = new Set();

  for (const [group, overview] of overviewByGroup) {
    const statusMatches =
      isStatusSearch &&
      overview.dataset.paid === (query === "paid" ? "true" : "false");
    const groupMatches = !isStatusSearch && query !== "" && group.includes(query);

    if (!query || statusMatches || groupMatches) {
      matchingGroups.add(group);
    }

    overview.style.setProperty(
      "display",
      !query || statusMatches || groupMatches ? "block" : "none",
      "important"
    );
  }

  for (const trophy of document.querySelectorAll(".trophy, .dlc-trophy")) {
    const name = (trophy.dataset.name || "").toLowerCase();
    const group = (trophy.dataset.group || "").toLowerCase().trim();
    const overview = overviewByGroup.get(group);

    let matches;

    if (!query) {
      matches = true;
    } else if (isStatusSearch) {
      matches =
        !!overview &&
        overview.dataset.paid === (query === "paid" ? "true" : "false");
    } else {
      matches = name.includes(query) || matchingGroups.has(group);
    }

    trophy.style.setProperty("display", matches ? "flex" : "none", "important");
    trophy.classList.toggle("is-hidden", !matches);
  }

  for (const section of document.querySelectorAll(".category-section")) {
    const hasVisibleTrophy = section.querySelector(
      ".trophy:not(.is-hidden), .dlc-trophy:not(.is-hidden)"
    );

    section.style.setProperty(
      "display",
      !query || hasVisibleTrophy ? "block" : "none",
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

<!-- Operator Matery Guide -->
  document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {
    const tooltip = document.getElementById(&#39;custom-tooltip&#39;);

    // Handle all interactions on .op-card
    document.querySelectorAll(&#39;.op-card&#39;).forEach(card =&gt; {
      const nameTag = card.querySelector(&#39;.op-name&#39;);

      // 1. Hover over Operator Name -&gt; Show Intended Role Tooltip
      if (nameTag) {
        nameTag.addEventListener(&#39;mouseenter&#39;, () =&gt; {
          const roleText = nameTag.getAttribute(&#39;data-tooltip&#39;);
          if (roleText) {
            tooltip.textContent = roleText;
            tooltip.style.display = &#39;block&#39;;
          }
        });

        nameTag.addEventListener(&#39;mousemove&#39;, (e) =&gt; {
          tooltip.style.left = (e.clientX + 15) + &#39;px&#39;;
          tooltip.style.top = (e.clientY + 15) + &#39;px&#39;;
        });

        nameTag.addEventListener(&#39;mouseleave&#39;, () =&gt; {
          tooltip.style.display = &#39;none&#39;;
        });

        // 2. Click Operator Name -&gt; Expand/Collapse Full Card Description
        nameTag.addEventListener(&#39;click&#39;, (e) =&gt; {
          e.stopPropagation(); // Prevents double-triggering if clicking header
          card.classList.toggle(&#39;active&#39;);
        });
      }
    });
  });