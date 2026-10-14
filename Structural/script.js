document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector('#trophySearch');
    input.placeholder = "Filter by Trophy Name, DLC Name, Paid or Free for DLC";
});

function filterTrophies() {
    const input = document.getElementById('trophySearch').value.toLowerCase().trim();
    const trophies = document.querySelectorAll('.trophy, .dlc-trophy');
    const sections = document.querySelectorAll('.category-section');

    // Word-boundary search (matches "Grin" in "Grinch" but NOT "Grind")
    const searchRegex = new RegExp('\\b' + input, 'i');

    // 1. TROPHY FILTERING
    for (let i = 0; i < trophies.length; i++) {
        const t = trophies[i];

        const nameAttr  = (t.getAttribute('data-name')  || "").toLowerCase();
        const groupAttr = (t.getAttribute('data-group') || "").toLowerCase();

        // Find the parent DLC overview wrapper
        const parentOverview = document.querySelector(
            `.overview-node[data-group="${groupAttr}"]`
        );

        // Inherit paid/free from the overview wrapper
        let paidText = "";
        if (parentOverview) {
            const paidAttr = parentOverview.getAttribute('data-paid'); // "true" or "false"
            paidText = paidAttr === "true" ? "paid" : "free";
        }

        const isMatch =
            input === "" ||
            searchRegex.test(nameAttr) ||
            searchRegex.test(groupAttr) ||
            paidText.includes(input);

        if (isMatch) {
            t.style.setProperty("display", "flex", "important");
            t.classList.remove('is-hidden');
        } else {
            t.style.setProperty("display", "none", "important");
            t.classList.add('is-hidden');
        }
    }

    // 2. SECTION HIDING / SHOWING
    for (let j = 0; j < sections.length; j++) {
        const sec = sections[j];
        const hasVisible = sec.querySelector('.trophy:not(.is-hidden), .dlc-trophy:not(.is-hidden)');

        if (input === "" || hasVisible) {
            sec.style.setProperty("display", "block", "important");
        } else {
            sec.style.setProperty("display", "none", "important");
        }
    }
}

// Live filtering on input
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'trophySearch') {
        filterTrophies();
    }
});

////

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