import {execFileSync} from "node:child_process";
import {mkdtempSync, mkdirSync, renameSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const websiteRoot = process.env.BSCODE_WEBSITE_ROOT
  ? resolve(process.env.BSCODE_WEBSITE_ROOT)
  : resolve(projectRoot, "../../../../../../personal-website");
const mp4OutputPath = resolve(
  websiteRoot,
  "assets/bscode/motion/bscode-digital-twin.mp4",
);
const webmOutputPath = resolve(
  websiteRoot,
  "assets/bscode/motion/bscode-digital-twin.webm",
);
const movOutputPath = resolve(
  websiteRoot,
  "assets/bscode/motion/bscode-digital-twin-alpha.mov",
);
const renderDirectory = mkdtempSync(resolve(tmpdir(), "bscode-remotion-"));
const renderedMp4Path = resolve(renderDirectory, "bscode-digital-twin-render.mp4");
const silentMp4Path = resolve(renderDirectory, "bscode-digital-twin.mp4");
const renderedWebmPath = resolve(renderDirectory, "bscode-digital-twin-render.webm");
const silentWebmPath = resolve(renderDirectory, "bscode-digital-twin.webm");
const silentMovPath = resolve(renderDirectory, "bscode-digital-twin-alpha.mov");

try {
  mkdirSync(dirname(mp4OutputPath), {recursive: true});
  execFileSync(
    resolve(projectRoot, "node_modules/.bin/remotion"),
    [
      "render",
      "src/index.jsx",
      "BsCodeDigitalTwin",
      renderedWebmPath,
      "--codec=vp8",
      "--crf=20",
      "--pixel-format=yuva420p",
      "--image-format=png",
      "--concurrency=4",
      "--overwrite",
    ],
    {cwd: projectRoot, stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      renderedWebmPath,
      "-map",
      "0:v:0",
      "-c:v",
      "copy",
      "-an",
      "-y",
      silentWebmPath,
    ],
    {stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-c:v",
      "libvpx",
      "-i",
      silentWebmPath,
      "-map",
      "0:v:0",
      "-vf",
      "format=bgra",
      "-c:v",
      "hevc_videotoolbox",
      "-alpha_quality",
      "0.85",
      "-q:v",
      "55",
      "-tag:v",
      "hvc1",
      "-an",
      "-movflags",
      "+faststart",
      "-y",
      silentMovPath,
    ],
    {stdio: "inherit"},
  );
  execFileSync(
    resolve(projectRoot, "node_modules/.bin/remotion"),
    [
      "render",
      "src/index.jsx",
      "BsCodeDigitalTwin",
      renderedMp4Path,
      "--codec=h264",
      "--crf=20",
      "--pixel-format=yuv420p",
      '--props={"matteBackground":true}',
      "--concurrency=4",
      "--overwrite",
    ],
    {cwd: projectRoot, stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      renderedMp4Path,
      "-map",
      "0:v:0",
      "-c:v",
      "copy",
      "-an",
      "-movflags",
      "+faststart",
      "-y",
      silentMp4Path,
    ],
    {stdio: "inherit"},
  );
  renameSync(silentWebmPath, webmOutputPath);
  renameSync(silentMovPath, movOutputPath);
  renameSync(silentMp4Path, mp4OutputPath);
} finally {
  rmSync(renderDirectory, {recursive: true, force: true});
}
