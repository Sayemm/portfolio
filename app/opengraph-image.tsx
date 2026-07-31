import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { noteCount } from "@/lib/notes";

// 1200x630 is the standard OG frame; LinkedIn renders it as a large card
// (it wants at least 1200x627 before it will use the wide format).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mofakh Islam — backend developer, Regina SK. A public notebook.";

const OG_DIR = path.join(process.cwd(), "app/_og");
const font = (file: string) => fs.readFileSync(path.join(OG_DIR, file));

// Modernist tokens — kept literal because satori resolves no CSS variables.
const GROUND = "#f3f2f2";
const INK = "#201e1d";
const ACCENT = "#ec3013";
const NEUTRAL = "#605d5d";
const RULE = "rgba(32,30,29,0.4)";

export default async function OpengraphImage() {
  const portrait = fs
    .readFileSync(path.join(process.cwd(), "public/portrait.jpg"))
    .toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: GROUND,
          color: INK,
          fontFamily: "Archivo",
          padding: "56px 64px",
        }}
      >
        {/* wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          MOFAKH<span style={{ color: ACCENT }}>.</span>COM
        </div>

        <div style={{ display: "flex", height: 2, background: RULE, margin: "28px 0 44px" }} />

        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "IBM Plex Mono",
                fontSize: 20,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 26,
              }}
            >
              Backend developer · Regina, SK
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 96,
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
              }}
            >
              <span>Mofakh</span>
              <span>Islam</span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 30,
                fontSize: 27,
                lineHeight: 1.4,
                color: NEUTRAL,
                maxWidth: 620,
              }}
            >
              A public notebook — C#, .NET, Docker, SQL, networking and system
              design.
            </div>
          </div>

          {/* portrait, matching the site's circle + ink ring */}
          <div style={{ display: "flex", alignItems: "flex-start", paddingLeft: 48 }}>
            <img
              src={`data:image/jpeg;base64,${portrait}`}
              alt=""
              width={260}
              height={260}
              style={{
                width: 260,
                height: 260,
                borderRadius: 130,
                objectFit: "cover",
                border: `4px solid ${INK}`,
                filter: "grayscale(1) contrast(1.08)",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", height: 2, background: RULE, margin: "40px 0 22px" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "IBM Plex Mono",
            fontSize: 20,
            color: NEUTRAL,
          }}
        >
          <span>{noteCount()} notes</span>
          <span>mofakh.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: font("archivo-400.woff"), weight: 400, style: "normal" },
        { name: "Archivo", data: font("archivo-800.woff"), weight: 800, style: "normal" },
        {
          name: "IBM Plex Mono",
          data: font("plexmono-400.woff"),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
