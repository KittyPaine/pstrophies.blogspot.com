// ==================================================
// PSTrophyGuides — Main Client-Side Utility Engine
// ==================================================

// Set placeholder text for search inputs on page load
document.addEventListener("DOMContentLoaded", function () {
  var searchInputs = document.querySelectorAll("#trophySearch");
  searchInputs.forEach(function (input) {
    input.setAttribute("placeholder", "Filter by Trophy or DLC Name...");
  });
});

// Dual-Attribute Search & Section Filtering
function filterTrophies() {
  const input = document.getElementById("trophySearch").value.toLowerCase().trim();
  const trophies = document.querySelectorAll(".trophy");
  const sections = document.querySelectorAll(".category-section");
  let totalVisible = 0;

  // Word boundary search matching starting characters
  const searchRegex = new RegExp("\\b" + input, "i");

  // 1. Filter trophies by data-name or data-group
  for (let i = 0; i < trophies.length; i++) {
    const t = trophies[i];
    const nameAttr = t.getAttribute("data-name") || "";
    const groupAttr = t.getAttribute("data-group") || "";

    const isMatch = input === "" || searchRegex.test(nameAttr) || searchRegex.test(groupAttr);

    if (isMatch) {
      t.style.setProperty("display", "flex", "important");
      t.classList.remove("is-hidden");
      totalVisible++;
    } else {
      t.style.setProperty("display", "none", "important");
      t.classList.add("is-hidden");
    }
  }

  // 2. Hide empty sections automatically
  for (let j = 0; j < sections.length; j++) {
    const sec = sections[j];
    const hasVisible = sec.querySelector(".trophy:not(.is-hidden)");

    if (input === "" || hasVisible) {
      sec.style.setProperty("display", "block", "important");
    } else {
      sec.style.setProperty("display", "none", "important");
    }
  }

  const counter = document.getElementById("counter");
  if (counter) counter.innerText = "Showing " + totalVisible + " Trophies";
}

// Trigger filter on live user typing
document.addEventListener("input", function (e) {
  if (e.target && e.target.id === "trophySearch") {
    filterTrophies();
  }
});

// HUD Tag Tooltip Mapper
document.addEventListener("DOMContentLoaded", function () {
  const tooltips = {
    Platinum: "Unlocked after earning all other base game trophies.",
    Story: "This trophy is earned by completing certain in game checkpoints, such as chapter end or ending.",
    Sidequest: "This trophy is earned by completing optional side content.",
    "Diff. Spec.": "This trophy is tied to completing the game on a specific difficulty setting.",
    Stackable: "This trophy can be earned simultaneously with other trophies in the same playthrough.",
    "Collect.": "This trophy involves collecting items or collectibles.",
    Grind: "This trophy requires repetitive tasks or a significant time investment.",
    "MP ONLY": "This trophy requires an online connection and is Player vs Player.",
    "CO-OP ONLY": "This trophy requires an online connection and is Player vs Enviroment.",
    "SOLO Rec.": "This trophy is recommended to be done alone for ease or efficiency.",
    "CO-OP Rec.": "This trophy is easier or more efficient to perform in Co-op.",
    "MP Rec.": "This trophy is recommended to be done in Multiplayer as it is not worth boosting.",
    "Boost Rec.": "This trophy is best earned by coordinating with others to boost.",
    "Time Limited": "This trophy has a time limit.",
    Buggy: "Be careful: This trophy is known to be glitchy and may not pop when intended. Save often.",
    "Paid DLC": "This trophy requires a paid expansion pack.",
    "Free DLC": "This trophy is part of a free update.",
  };

  document.querySelectorAll(".hud-tag").forEach((tag) => {
    const text = tag.textContent.trim();
    if (tooltips[text]) {
      tag.setAttribute("data-tooltip", tooltips[text]);
    }
  });
});

// Interactive Operator Card Tooltips & Collapsible Toggle
document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.getElementById("custom-tooltip");

  document.querySelectorAll(".op-card").forEach((card) => {
    const nameTag = card.querySelector(".op-name");

    if (nameTag) {
      nameTag.addEventListener("mouseenter", () => {
        const roleText = nameTag.getAttribute("data-tooltip");
        if (roleText) {
          tooltip.textContent = roleText;
          tooltip.style.display = "block";
        }
      });

      nameTag.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.clientX + 15 + "px";
        tooltip.style.top = e.clientY + 15 + "px";
      });

      nameTag.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      nameTag.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.toggle("active");
      });
    }
  });
});
