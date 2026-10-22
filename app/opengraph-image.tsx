import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Share card shown when the site is linked on LinkedIn, WhatsApp, Slack, X and so on.
// Next.js renders it to a PNG at build time and adds the og:image tags for it.

export const alt = "Mansi Kamble, Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "public/images/profile_banner1.png"), "base64");
const photoSrc = `data:image/png;base64,${photo}`;

// Syne ExtraBold for the name, like the site's headings. Google Fonts serves a TTF (which
// ImageResponse needs) when asked without a browser user agent. Falls back to the default font.
async function loadSyne() {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Syne:wght@800")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}
const syne = await loadSyne();

// Dark theme colours from globals.css
const BG = "#120F1C";
const TITLE = "#F4EFFC";
const TEXT = "#A69CB9";
const ACCENT = "#A855F7";
const BUTTON = "#DB2777";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: BG, position: "relative" }}>
        {/* Accent square in the corner, like the banner */}
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 150, height: 150, background: ACCENT }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: TEXT, fontSize: 24 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#10B981" }} />
            Open to new roles
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              fontFamily: "Syne",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 0.95,
            }}
          >
            <span style={{ color: TITLE }}>MANSI</span>
            <span style={{ color: ACCENT }}>KAMBLE</span>
          </div>
          <div style={{ width: 80, height: 4, marginTop: 32, background: BUTTON }} />
          <div style={{ marginTop: 28, color: TITLE, fontSize: 40, fontWeight: 700 }}>Full Stack Developer</div>
          <div style={{ marginTop: 14, color: TEXT, fontSize: 26, lineHeight: 1.4 }}>
            Fast, SEO-friendly web apps, CMS platforms and dashboards with React, Next.js and Node.
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={photoSrc} alt="" height={600} style={{ position: "absolute", right: 60, bottom: 0 }} />
      </div>
    ),
    { ...size, fonts: syne ? [{ name: "Syne", data: syne, weight: 800, style: "normal" }] : [] },
  );
}
