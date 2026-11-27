/* charts.js — Pembuat grafik SVG dari data, ditulis tangan.
   Tanpa library grafik, tanpa gambar raster, tanpa font web.
   Semua fungsi mengembalikan string SVG yang siap disisipkan ke halaman. */

"use strict";

var CHART_COLORS = ["#0f5132", "#c8102e", "#2e7d5b", "#e0a100", "#4a6fa5", "#7a4a8f"];

function fmtId(n, decimals) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals || 0,
    maximumFractionDigits: decimals || 0,
  });
}

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function niceMax(max) {
  if (max <= 0) return 1;
  var pow = Math.pow(10, Math.floor(Math.log10(max)));
  var norm = max / pow;
  var steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (var i = 0; i < steps.length; i++) {
    if (norm <= steps[i]) return steps[i] * pow;
  }
  return 10 * pow;
}

/* Grafik batang vertikal. opts: {labels, values, format, color, height, unit} */
function barChart(opts) {
  var w = 720;
  var h = opts.height || 320;
  var padL = 64;
  var padR = 16;
  var padT = 30;
  var padB = 42;
  var iw = w - padL - padR;
  var ih = h - padT - padB;
  var min = Math.min(0, Math.min.apply(null, opts.values));
  var max = niceMax(Math.max.apply(null, opts.values));
  var span = max - min || 1;
  var n = opts.values.length;
  var slot = iw / n;
  var barW = Math.min(56, slot * 0.62);
  var y0 = padT + ih * (1 - (0 - min) / span);
  var parts = [];
  parts.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">');
  var ticks = 4;
  for (var t = 0; t <= ticks; t++) {
    var v = min + (span * t) / ticks;
    var y = padT + ih * (1 - (v - min) / span);
    parts.push('<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) + '" stroke="#e3ddd2" stroke-width="1"/>');
    parts.push('<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="#6b655c">' + esc(opts.format(v)) + "</text>");
  }
  parts.push('<line x1="' + padL + '" y1="' + y0.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y0.toFixed(1) + '" stroke="#9a938a" stroke-width="1.5"/>');
  opts.values.forEach(function (v, i) {
    var x = padL + slot * i + (slot - barW) / 2;
    var y = padT + ih * (1 - (v - min) / span);
    var bh = Math.max(0, y0 - y);
    var color = opts.color || CHART_COLORS[0];
    if (v < 0) {
      y = y0;
      bh = Math.max(0, padT + ih * (1 - (0 - min) / span) - (padT + ih * (1 - (v - min) / span)));
      bh = Math.abs(padT + ih * (1 - (v - min) / span) - y0);
      color = "#c8102e";
    }
    parts.push('<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + color + '"/>');
    var ly = v < 0 ? y + bh + 16 : y - 8;
    parts.push('<text x="' + (x + barW / 2).toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="600" fill="#2b2620">' + esc(opts.format(v)) + "</text>");
    parts.push('<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (h - 14) + '" text-anchor="middle" font-size="12" fill="#6b655c">' + esc(opts.labels[i]) + "</text>");
  });
  parts.push("</svg>");
  return parts.join("");
}

/* Grafik batang horizontal. opts: {labels, values, format, color, height} */
function hbarChart(opts) {
  var w = 720;
  var rowH = 34;
  var labelW = 210;
  var h = opts.height || (opts.values.length * rowH + 46);
  var padR = 76;
  var padT = 8;
  var iw = w - labelW - padR;
  var max = niceMax(Math.max.apply(null, opts.values));
  var parts = [];
  parts.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">');
  opts.values.forEach(function (v, i) {
    var y = padT + i * rowH;
    var bw = Math.max(2, (v / max) * iw);
    parts.push('<text x="' + (labelW - 10) + '" y="' + (y + 19) + '" text-anchor="end" font-size="13" fill="#2b2620">' + esc(opts.labels[i]) + "</text>");
    parts.push('<rect x="' + labelW + '" y="' + (y + 4) + '" width="' + bw.toFixed(1) + '" height="20" rx="3" fill="' + (opts.color || CHART_COLORS[0]) + '"/>');
    parts.push('<text x="' + (labelW + bw + 8).toFixed(1) + '" y="' + (y + 19) + '" font-size="12" font-weight="600" fill="#2b2620">' + esc(opts.format(v)) + "</text>");
  });
  parts.push("</svg>");
  return parts.join("");
}

/* Grafik garis. opts: {labels, values, format, color, height} */
function lineChart(opts) {
  var w = 720;
  var h = opts.height || 320;
  var padL = 64;
  var padR = 24;
  var padT = 30;
  var padB = 42;
  var iw = w - padL - padR;
  var ih = h - padT - padB;
  var min = Math.min.apply(null, opts.values);
  var max = Math.max.apply(null, opts.values);
  if (min > 0) min = Math.min(0, min - (max - min) * 0.15);
  var span = max - min || 1;
  var n = opts.values.length;
  function px(i) {
    return padL + (iw * i) / (n - 1);
  }
  function py(v) {
    return padT + ih * (1 - (v - min) / span);
  }
  var parts = [];
  parts.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">');
  var niceTop = niceMax(max);
  var ticks = 4;
  for (var t = 0; t <= ticks; t++) {
    var v = min + (span * t) / ticks;
    var y = py(v);
    parts.push('<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) + '" stroke="#e3ddd2" stroke-width="1"/>');
    parts.push('<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="#6b655c">' + esc(opts.format(v)) + "</text>");
  }
  var d = opts.values
    .map(function (v, i) {
      return (i === 0 ? "M" : "L") + px(i).toFixed(1) + " " + py(v).toFixed(1);
    })
    .join(" ");
  parts.push('<path d="' + d + '" fill="none" stroke="' + (opts.color || CHART_COLORS[0]) + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>');
  opts.values.forEach(function (v, i) {
    parts.push('<circle cx="' + px(i).toFixed(1) + '" cy="' + py(v).toFixed(1) + '" r="5" fill="#fff" stroke="' + (opts.color || CHART_COLORS[0]) + '" stroke-width="3"/>');
    var anchor = "middle";
    var lx = px(i);
    if (i === 0) {
      anchor = "start";
      lx = px(i) + 8;
    } else if (i === n - 1) {
      anchor = "end";
      lx = px(i) - 8;
    }
    parts.push('<text x="' + lx.toFixed(1) + '" y="' + (py(v) - 12).toFixed(1) + '" text-anchor="' + anchor + '" font-size="12" font-weight="600" fill="#2b2620">' + esc(opts.format(v)) + "</text>");
    parts.push('<text x="' + px(i).toFixed(1) + '" y="' + (h - 14) + '" text-anchor="middle" font-size="12" fill="#6b655c">' + esc(opts.labels[i]) + "</text>");
  });
  parts.push("</svg>");
  return parts.join("");
}

/* Batang bertumpuk 100% dengan legenda. segments: [{label, value, color}] */
function stackedBar(segments) {
  var w = 720;
  var h = 64;
  var total = segments.reduce(function (a, s) {
    return a + s.value;
  }, 0);
  var parts = [];
  parts.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img">');
  var x = 0;
  segments.forEach(function (s) {
    var sw = (s.value / total) * w;
    parts.push('<rect x="' + x.toFixed(1) + '" y="6" width="' + sw.toFixed(1) + '" height="30" fill="' + s.color + '"/>');
    if (sw > 90) {
      parts.push('<text x="' + (x + sw / 2).toFixed(1) + '" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">' + fmtId(s.value, 2) + "%</text>");
    }
    x += sw;
  });
  parts.push("</svg>");
  var legend = segments
    .map(function (s) {
      return '<span class="legend-item"><span class="legend-swatch" style="background:' + s.color + '"></span>' + esc(s.label) + " — <strong>" + fmtId(s.value, 2) + "%</strong></span>";
    })
    .join("");
  return parts.join("") + '<div class="legend">' + legend + "</div>";
}

window.CHARTS = {
  barChart: barChart,
  hbarChart: hbarChart,
  lineChart: lineChart,
  stackedBar: stackedBar,
  fmtId: fmtId,
};
