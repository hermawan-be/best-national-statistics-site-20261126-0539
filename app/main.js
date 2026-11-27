/* main.js — Logika halaman: menandai navigasi aktif, menggambar grafik
   dari data.js, serta sortir dan saring tabel provinsi. */

"use strict";

(function () {
  var D = window.STATS_DATA;
  var C = window.CHARTS;
  if (!D || !C) return;

  function fmtInt(n) {
    return C.fmtId(n, 0);
  }
  function fmtComma(n, d) {
    return C.fmtId(n, d === undefined ? 1 : d);
  }

  /* Tandai tautan navigasi halaman yang sedang dibuka. */
  var here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  var page = document.body.getAttribute("data-page");
  var host = null;

  function mount(id, svg) {
    host = document.getElementById(id);
    if (host) host.innerHTML = svg;
  }

  if (page === "home") {
    mount(
      "chart-population",
      C.lineChart({
        labels: D.POPULATION_SERIES.map(function (p) {
          return String(p.year);
        }),
        values: D.POPULATION_SERIES.map(function (p) {
          return p.value;
        }),
        format: function (v) {
          return fmtComma(v, 1);
        },
        color: "#0f5132",
      })
    );
    mount(
      "chart-growth",
      C.barChart({
        labels: D.GROWTH_SERIES.map(function (p) {
          return String(p.year);
        }),
        values: D.GROWTH_SERIES.map(function (p) {
          return p.value;
        }),
        format: function (v) {
          return fmtComma(v, 2) + "%";
        },
        color: "#0f5132",
      })
    );
  }

  if (page === "penduduk") {
    mount(
      "chart-top-provinces",
      C.hbarChart({
        labels: D.TOP_PROVINCES.map(function (p) {
          return p.name;
        }),
        values: D.TOP_PROVINCES.map(function (p) {
          return p.population / 1000000;
        }),
        format: function (v) {
          return fmtComma(v, 1) + " jt";
        },
        color: "#0f5132",
      })
    );
    mount(
      "chart-population",
      C.lineChart({
        labels: D.POPULATION_SERIES.map(function (p) {
          return String(p.year);
        }),
        values: D.POPULATION_SERIES.map(function (p) {
          return p.value;
        }),
        format: function (v) {
          return fmtComma(v, 1);
        },
        color: "#0f5132",
      })
    );
    mount(
      "chart-age",
      C.stackedBar(
        D.AGE_GROUPS_2025.map(function (g) {
          return { label: g.label, value: g.value, color: g.color };
        })
      )
    );
    mount(
      "chart-generations",
      C.hbarChart({
        labels: D.GENERATIONS_2025.map(function (g) {
          return g.label;
        }),
        values: D.GENERATIONS_2025.map(function (g) {
          return g.value;
        }),
        format: function (v) {
          return fmtComma(v, 2) + "%";
        },
        color: "#4a6fa5",
      })
    );
  }

  if (page === "ekonomi") {
    mount(
      "chart-gdp",
      C.barChart({
        labels: D.GDP_SERIES.map(function (p) {
          return String(p.year);
        }),
        values: D.GDP_SERIES.map(function (p) {
          return p.value;
        }),
        format: function (v) {
          return fmtInt(v);
        },
        color: "#0f5132",
      })
    );
    mount(
      "chart-growth",
      C.barChart({
        labels: D.GROWTH_SERIES.map(function (p) {
          return String(p.year);
        }),
        values: D.GROWTH_SERIES.map(function (p) {
          return p.value;
        }),
        format: function (v) {
          return fmtComma(v, 2) + "%";
        },
        color: "#0f5132",
      })
    );
    mount(
      "chart-inflation",
      C.lineChart({
        labels: D.INFLATION_SERIES.map(function (p) {
          return String(p.year);
        }),
        values: D.INFLATION_SERIES.map(function (p) {
          return p.value;
        }),
        format: function (v) {
          return fmtComma(v, 2) + "%";
        },
        color: "#c8102e",
      })
    );
    mount(
      "chart-sectors",
      C.hbarChart({
        labels: D.SECTORS_2024.map(function (s) {
          return s.label;
        }),
        values: D.SECTORS_2024.map(function (s) {
          return s.value;
        }),
        format: function (v) {
          return fmtComma(v, 2) + "%";
        },
        color: "#2e7d5b",
      })
    );
  }

  if (page === "provinsi") {
    var tbody = document.querySelector("#province-table tbody");
    var filter = document.getElementById("province-filter");
    var count = document.getElementById("province-count");
    var rows = D.PROVINCES.map(function (p) {
      return {
        name: p.name,
        population: p.population,
        area: p.area,
        density: p.population / p.area,
        ipm: p.ipm,
      };
    });
    var sortKey = "population";
    var sortDir = -1;

    function render() {
      var q = filter ? filter.value.trim().toLowerCase() : "";
      var shown = rows.filter(function (r) {
        return !q || r.name.toLowerCase().indexOf(q) !== -1;
      });
      shown.sort(function (a, b) {
        var av = a[sortKey];
        var bv = b[sortKey];
        if (typeof av === "string") return sortDir * av.localeCompare(bv, "id");
        return sortDir * (av - bv);
      });
      tbody.innerHTML = shown
        .map(function (r) {
          return (
            "<tr><td>" +
            r.name +
            "</td><td class='num'>" +
            fmtInt(r.population) +
            "</td><td class='num'>" +
            fmtComma(r.area, 2) +
            "</td><td class='num'>" +
            fmtInt(Math.round(r.density)) +
            "</td><td class='num'>" +
            fmtComma(r.ipm, 2) +
            "</td></tr>"
          );
        })
        .join("");
      if (count) count.textContent = shown.length + " dari 38 provinsi ditampilkan.";
      document.querySelectorAll("#province-table th[data-key]").forEach(function (th) {
        var k = th.getAttribute("data-key");
        th.setAttribute("aria-sort", k === sortKey ? (sortDir === 1 ? "ascending" : "descending") : "none");
      });
    }

    document.querySelectorAll("#province-table th[data-key]").forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.getAttribute("data-key");
        if (sortKey === k) {
          sortDir = -sortDir;
        } else {
          sortKey = k;
          sortDir = k === "name" ? 1 : -1;
        }
        render();
      });
    });
    if (filter) filter.addEventListener("input", render);
    render();
  }
})();
