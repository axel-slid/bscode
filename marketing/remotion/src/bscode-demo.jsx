import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import face0 from "../../../assets/agent-face-0.png";
import face1 from "../../../assets/agent-face-1.png";
import face2 from "../../../assets/agent-face-2.png";
import face3 from "../../../assets/agent-face-3.png";
import appIcon from "../../../assets/app-icon.png";
import cityBackground from "../../../assets/city-realistic-v2.png";

const APP_WIDTH = 1600;
const APP_HEIGHT = 900;
const FPS = 30;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const colors = ["#75b7ff", "#e59b67", "#ad91ff", "#72d1aa"];
const faces = [face0, face1, face2, face3];
const names = ["Jesse", "Maeve", "Grayson", "Julianna"];
const tasks = [
  "Build the command palette",
  "Review the responsive layout",
  "Run the release checks",
  "Write the launch notes",
];
const terminalLines = [
  ["Reading renderer.js", "Mapping command actions", "Updating keyboard flow", "Command palette ready"],
  ["Opening responsive states", "Checking 430px layout", "Fixing panel overflow", "Mobile layout verified"],
  ["$ npm run check", "53 checks passed", "$ npm run package:mac", "arm64 package signed"],
  ["Reading changed files", "Summarizing the release", "Linking generated outputs", "Launch notes complete"],
];

const progress = (frame, from, to) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: ease});

const fadeWindow = (frame, enter, full, leave, gone) =>
  interpolate(frame, [enter, full, leave, gone], [0, 1, 1, 0], clamp);

const typeText = (value, frame, from, to) =>
  value.slice(0, Math.floor(progress(frame, from, to) * value.length));

const BrandMark = ({size = 25}) => (
  <Img
    src={appIcon}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      objectFit: "cover",
      boxShadow: "0 0 0 1px #9cc9ff50, 0 4px 12px #0008",
    }}
  />
);

const MacChrome = ({agentCount}) => (
  <div
    style={{
      height: 42,
      display: "flex",
      alignItems: "center",
      padding: "0 17px",
      boxSizing: "border-box",
      background: "linear-gradient(180deg,#20242c,#191d24)",
      borderBottom: "1px solid #ffffff10",
      color: "#b7bdc7",
      position: "relative",
      zIndex: 20,
    }}
  >
    <div style={{display: "flex", gap: 9}}>
      {["#ff605c", "#ffbd44", "#00ca4e"].map((color) => (
        <span key={color} style={{width: 12, height: 12, borderRadius: 20, background: color}} />
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        left: 70,
        display: "flex",
        alignItems: "center",
        gap: 9,
        font: "600 12px Inter, ui-sans-serif, system-ui",
      }}
    >
      <BrandMark size={23} />
      <span style={{color: "#e5e9ef"}}>BsCode</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 6,
        color: "#7e8795",
        font: "700 10px ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      <span>local</span>
      <span>·</span>
      <span>/Projects/bscode</span>
      <span>·</span>
      <span style={{color: agentCount ? "#75d8af" : "#737c89"}}>
        {agentCount ? `${agentCount} agent${agentCount === 1 ? "" : "s"} active` : "ready"}
      </span>
    </div>
    <div style={{marginLeft: "auto", display: "flex", gap: 13, font: "600 11px Inter, system-ui"}}>
      <span style={{color: "#7b8491"}}>⌂</span>
      <span>◐</span>
      <span>⚙</span>
      <span style={{color: "#e1e5eb"}}>9:41</span>
      <span style={{color: "#75d8af"}}>▰ 84%</span>
    </div>
  </div>
);

const WorkspaceTabs = ({agentCount}) => (
  <div
    style={{
      position: "absolute",
      left: 226,
      right: 0,
      top: 42,
      height: 50,
      display: "flex",
      alignItems: "flex-end",
      background: "#141920",
      borderBottom: "1px solid #ffffff13",
      paddingLeft: 12,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        height: 43,
        minWidth: 240,
        padding: "0 18px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "#edf1f6",
        background: "#1c222b",
        border: "1px solid #6fb9ff80",
        borderBottom: 0,
        borderRadius: "15px 15px 0 0",
        font: "650 12px Inter, system-ui",
        boxSizing: "border-box",
      }}
    >
      local
      <span style={{fontSize: 9, color: agentCount ? "#72d1aa" : "#7a8491", marginLeft: 8}}>
        {agentCount ? `${agentCount} working` : "empty"}
      </span>
      <span style={{marginLeft: "auto", color: "#727b88"}}>×</span>
    </div>
    <div style={{padding: "0 14px 12px", color: "#9ca5b3", fontSize: 19}}>+</div>
  </div>
);

const FileSidebar = () => {
  const files = [
    ["▾", ".bscode", true],
    ["▸", "src", true],
    ["", "renderer.js", false],
    ["", "styles.css", false],
    ["", "main.js", false],
    ["▸", "assets", true],
    ["", "package.json", false],
    ["", "README.md", false],
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 92,
        bottom: 26,
        width: 226,
        background: "#11151b",
        borderRight: "1px solid #ffffff12",
        color: "#9da4b0",
      }}
    >
      <div
        style={{
          height: 42,
          padding: "0 15px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderBottom: "1px solid #ffffff10",
          font: "650 12px Inter, system-ui",
        }}
      >
        <span style={{color: "#f0f2f5"}}>Files</span>
        <span>Notes</span>
        <span style={{marginLeft: "auto", fontSize: 16}}>⊞</span>
      </div>
      <div style={{padding: "12px 10px", font: "500 11px ui-monospace, Menlo, monospace"}}>
        {files.map(([marker, name, folder], index) => (
          <div
            key={name}
            style={{
              height: 29,
              display: "flex",
              alignItems: "center",
              gap: 7,
              paddingLeft: folder ? 2 : 26,
              borderRadius: 6,
              color: index === 2 ? "#e5e8ee" : "#9ca3af",
              background: index === 2 ? "#ffffff0c" : "transparent",
            }}
          >
            <span style={{width: 10, color: "#6c7481"}}>{marker}</span>
            <span style={{color: folder ? "#77b8ff" : "#8f97a4"}}>{folder ? "▰" : "·"}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBar = ({agentCount}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 26,
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      background: "#10141a",
      borderTop: "1px solid #ffffff12",
      color: "#7f8896",
      font: "600 9px ui-monospace, Menlo, monospace",
      boxSizing: "border-box",
    }}
  >
    <span style={{color: "#6fd5a8"}}>◇ Local workspace</span>
    <span style={{marginLeft: 18}}>{agentCount}/4 agents</span>
    <span style={{marginLeft: 14}}>CPU 22%</span>
    <span style={{marginLeft: 12}}>Memory 11 GB / 16 GB</span>
    <span style={{marginLeft: "auto"}}>arm64 · main</span>
  </div>
);

const AddAgentButton = ({frame}) => {
  const clickFrames = [105, 165, 225, 285];
  const click = Math.max(...clickFrames.map((center) => 1 - Math.min(1, Math.abs(frame - center) / 8)));
  return (
    <div
      style={{
        position: "absolute",
        right: 17,
        top: 10,
        height: 31,
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
        gap: 7,
        borderRadius: 9,
        background: click > 0 ? "#75b7ff32" : "#75b7ff16",
        boxShadow: `inset 0 0 0 1px #75b7ff66, 0 0 ${20 * click}px #75b7ff40`,
        color: "#b8d9ff",
        font: "750 10px Inter, system-ui",
        transform: `scale(${1 - click * 0.05})`,
      }}
    >
      <span style={{fontSize: 16, lineHeight: 1}}>+</span> Add agent
    </div>
  );
};

const EmptySlate = ({frame}) => {
  const fade = 1 - progress(frame, 95, 118);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        opacity: fade,
        color: "#7e8794",
        fontFamily: "Inter, system-ui",
      }}
    >
      <div style={{textAlign: "center", transform: `translateY(${(1 - fade) * -12}px)`}}>
        <div
          style={{
            width: 74,
            height: 74,
            margin: "0 auto 19px",
            display: "grid",
            placeItems: "center",
            borderRadius: 23,
            border: "1px dashed #75b7ff70",
            background: "#75b7ff0d",
            color: "#9acaff",
            fontSize: 31,
          }}
        >
          +
        </div>
        <div style={{color: "#e6ebf2", fontSize: 17, fontWeight: 750}}>Blank workspace</div>
        <div style={{fontSize: 11, marginTop: 7}}>Add an agent when you are ready to begin.</div>
      </div>
    </div>
  );
};

const AgentHeader = ({index, state}) => (
  <div
    style={{
      height: 47,
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      borderBottom: "1px solid #ffffff12",
      background: `linear-gradient(90deg,${colors[index]}14,transparent 38%)`,
      boxSizing: "border-box",
    }}
  >
    <Img
      src={faces[index]}
      style={{
        width: 31,
        height: 31,
        imageRendering: "pixelated",
        borderRadius: 7,
        boxShadow: `0 0 0 1px ${colors[index]}80`,
      }}
    />
    <span style={{color: "#edf1f6", font: "700 12px Inter, system-ui", marginLeft: 10}}>{names[index]}</span>
    <span
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 7,
        color: state === "done" ? "#8b95a2" : "#848d9a",
        font: "650 9px Inter, system-ui",
      }}
    >
      <span style={{width: 6, height: 6, borderRadius: 6, background: state === "ready" ? "#788391" : colors[index]}} />
      {state === "ready" ? "Ready" : state === "done" ? "Done" : "Working"}
      <span style={{fontSize: 14}}>⋯</span>
    </span>
  </div>
);

const AgentCard = ({index, frame, addedAt, taskAt}) => {
  const show = spring({
    frame: frame - addedAt,
    fps: FPS,
    config: {damping: 18, stiffness: 150, mass: 0.75},
  });
  const taskMix = progress(frame, taskAt, taskAt + 18);
  const workMix = progress(frame, taskAt + 24, 720);
  const taskFocus = fadeWindow(frame, taskAt - 48, taskAt - 30, taskAt + 7, taskAt + 28);
  const workPulse = frame > taskAt + 18 ? (Math.sin((frame + index * 17) / 10) + 1) / 2 : 0;
  const complete = frame >= 710 && index < 3;
  const visibleLines = Math.max(1, Math.floor(interpolate(workMix, [0, 1], [1, 4], clamp)));
  const taskLabel = tasks[index];
  return (
    <div
      style={{
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        borderRadius: 13,
        overflow: "hidden",
        background: "#0c1015",
        boxShadow: `inset 0 0 0 ${1 + taskFocus}px ${colors[index]}${taskFocus > 0.15 ? "bb" : "85"}, 0 ${10 + taskFocus * 12}px ${28 + taskFocus * 24}px #0008, 0 0 ${taskFocus * 34}px ${colors[index]}30`,
        opacity: show,
        transform: `translate(${(1 - show) * (index % 2 ? 92 : -92)}px, ${(1 - show) * (index < 2 ? -54 : 54)}px) rotate(${(1 - show) * (index % 2 ? 4 : -4)}deg) scale(${0.86 + show * 0.14 + taskFocus * 0.035}) translateY(${-taskFocus * 7}px)`,
        zIndex: taskFocus > 0.05 ? 8 : 1,
      }}
    >
      <AgentHeader index={index} state={!taskMix ? "ready" : complete ? "done" : "working"} />
      <div
        style={{
          position: "absolute",
          inset: "47px 0 0",
          padding: "15px 18px",
          background: "#0c1015",
          color: "#b8c0ca",
          font: "500 10px/1.62 ui-monospace, Menlo, monospace",
          boxSizing: "border-box",
        }}
      >
        {!taskMix ? (
          <div style={{height: "100%", display: "grid", placeItems: "center", color: "#697482"}}>
            Waiting for a task…
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: 13,
                padding: "8px 10px",
                borderRadius: 7,
                background: `${colors[index]}13`,
                boxShadow: `inset 0 0 0 1px ${colors[index]}35`,
                color: "#dce3eb",
                opacity: taskMix,
                transform: `translateY(${(1 - taskMix) * 8}px)`,
              }}
            >
              <span style={{color: colors[index]}}>@{names[index]}</span> {taskLabel}
            </div>
            {terminalLines[index].slice(0, visibleLines).map((line, lineIndex) => {
              const lineShow = progress(frame, taskAt + 18 + lineIndex * 27, taskAt + 31 + lineIndex * 27);
              return (
              <div
                key={line}
                style={{
                  color: lineIndex === visibleLines - 1 ? "#dce3eb" : "#727c89",
                  opacity: lineShow,
                  transform: `translateX(${(1 - lineShow) * 9}px)`,
                }}
              >
                <span style={{color: colors[index]}}>› </span>{line}
              </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                bottom: 18,
                height: 4,
                borderRadius: 9,
                background: "#ffffff0c",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, 18 + workMix * (index === 3 ? 66 : 82))}%`,
                  borderRadius: 9,
                  background: colors[index],
                  boxShadow: `0 0 ${10 + workPulse * 12}px ${colors[index]}90`,
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TaskComposer = ({frame}) => {
  const assignments = [
    {from: 340, to: 385, index: 0},
    {from: 395, to: 440, index: 1},
    {from: 450, to: 495, index: 2},
    {from: 505, to: 550, index: 3},
  ];
  const active = assignments.find((assignment) => frame >= assignment.from && frame < assignment.to + 10);
  const overall = fadeWindow(frame, 320, 340, 552, 575);
  if (!active && overall <= 0) return null;
  const assignment = active || [...assignments].reverse().find((item) => frame >= item.from) || assignments[0];
  const value = `@${names[assignment.index]} ${tasks[assignment.index]}`;
  const typed = typeText(value, frame, assignment.from, assignment.to - 8);
  const sent = progress(frame, assignment.to - 8, assignment.to);
  return (
    <div
      style={{
        position: "absolute",
        left: 190,
        right: 190,
        bottom: 18,
        height: 58,
        borderRadius: 16,
        background: "rgba(9,13,18,.96)",
        boxShadow: `0 18px 46px #000b, inset 0 0 0 1px ${colors[assignment.index]}70, 0 0 30px ${colors[assignment.index]}12`,
        display: "flex",
        alignItems: "center",
        padding: "0 17px",
        color: "#dce3eb",
        font: "600 11px Inter, system-ui",
        opacity: overall,
        transform: `translateX(${assignment.index % 2 ? 94 : -94}px) translateY(${(1 - overall) * 18}px) scale(${1 - sent * 0.02})`,
        zIndex: 30,
      }}
    >
      <span style={{color: colors[assignment.index], fontWeight: 850}}>
        {typed.slice(0, Math.min(names[assignment.index].length + 1, typed.length))}
      </span>
      <span style={{marginLeft: 4}}>{typed.slice(names[assignment.index].length + 1).trimStart()}</span>
      <span style={{marginLeft: "auto", color: "#737d8a"}}>⌘↵</span>
      <span
        style={{
          marginLeft: 13,
          width: 32,
          height: 32,
          display: "grid",
          placeItems: "center",
          borderRadius: 9,
          background: sent > 0 ? "#75b7ff" : "#75b7ff20",
          color: sent > 0 ? "#08111c" : "#a8d1ff",
        }}
      >
        ↵
      </span>
    </div>
  );
};

const OutputPanel = ({frame}) => {
  const slide = progress(frame, 755, 790);
  const files = [
    ["command-palette.js", "Jesse", 796],
    ["responsive-review.md", "Maeve", 822],
    ["release-checks.txt", "Grayson", 848],
  ];
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 92,
        bottom: 26,
        width: 320,
        opacity: slide,
        transform: `translateX(${(1 - slide) * 100}px)`,
        background: "#12171e",
        borderLeft: "1px solid #ffffff14",
        color: "#a5adba",
        overflow: "hidden",
        zIndex: 16,
      }}
    >
      <div
        style={{
          height: 45,
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ffffff10",
          font: "750 12px Inter, system-ui",
          color: "#edf0f5",
        }}
      >
        Outputs <span style={{marginLeft: "auto", color: "#747d8a"}}>↻ &nbsp; ×</span>
      </div>
      <div style={{padding: "17px 14px"}}>
        <div style={{font: "800 9px Inter, system-ui", color: "#758090", letterSpacing: 1.2}}>SESSION FILES</div>
        {files.map(([file, agent, at], index) => {
          const show = spring({frame: frame - at, fps: FPS, config: {damping: 18, stiffness: 140}});
          return (
            <div
              key={file}
              style={{
                marginTop: 12,
                border: `1px solid ${colors[index]}42`,
                background: `linear-gradient(135deg,${colors[index]}13,#72d1aa08)`,
                borderRadius: 10,
                padding: 12,
                boxShadow: "0 10px 26px #0005",
                opacity: show,
                transform: `translateX(${(1 - show) * 26}px)`,
              }}
            >
              <div style={{color: "#e4e9f0", font: "700 10px Inter, system-ui"}}>{file}</div>
              <div style={{marginTop: 6, color: "#7d8796", font: "500 8px Inter, system-ui"}}>
                Generated by {agent} · just now
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 14,
            height: 104,
            borderRadius: 9,
            background: "#0b0f14",
            padding: 12,
            color: "#aeb7c3",
            font: "500 9px/1.7 ui-monospace, Menlo, monospace",
          }}
        >
          <div style={{color: "#72d1aa"}}>✓ 53 tests passed</div>
          <div>✓ responsive states reviewed</div>
          <div>✓ arm64 package signed</div>
          <div style={{color: "#77b8ff"}}>Ready to ship.</div>
        </div>
      </div>
    </div>
  );
};

const OutputTransfers = ({frame}) => {
  const transfers = [
    {at: 770, fromX: 720, fromY: 390, toY: 185, label: "command-palette.js", color: colors[0]},
    {at: 801, fromX: 1180, fromY: 390, toY: 258, label: "responsive-review.md", color: colors[1]},
    {at: 832, fromX: 720, fromY: 665, toY: 331, label: "release-checks.txt", color: colors[2]},
  ];
  return transfers.map((transfer) => {
    const travel = progress(frame, transfer.at, transfer.at + 26);
    const opacity = fadeWindow(frame, transfer.at - 3, transfer.at + 4, transfer.at + 22, transfer.at + 29);
    const arc = Math.sin(travel * Math.PI) * -72;
    const x = interpolate(travel, [0, 1], [transfer.fromX, 1450]);
    const y = interpolate(travel, [0, 1], [transfer.fromY, transfer.toY]) + arc;
    return (
      <div
        key={transfer.label}
        style={{
          position: "absolute",
          left: x,
          top: y,
          height: 28,
          padding: "0 11px",
          display: "flex",
          alignItems: "center",
          borderRadius: 20,
          background: "rgba(8,12,17,.94)",
          border: `1px solid ${transfer.color}80`,
          boxShadow: `0 10px 28px #000b, 0 0 24px ${transfer.color}35`,
          color: "#dfe6ee",
          font: "650 8px ui-monospace, Menlo, monospace",
          opacity,
          transform: `translate(-50%,-50%) scale(${0.86 + Math.sin(travel * Math.PI) * 0.18})`,
          zIndex: 65,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{color: transfer.color, marginRight: 6}}>◆</span>{transfer.label}
      </div>
    );
  });
};

const Cursor = ({frame}) => {
  let x = 1390;
  let y = 116;
  let click = 0;
  const addClicks = [105, 165, 225, 285];
  if (frame < 320) {
    const move = progress(frame, 62, 100);
    x = interpolate(move, [0, 1], [1040, 1390]);
    y = interpolate(move, [0, 1], [510, 116]);
    click = Math.max(...addClicks.map((center) => 1 - Math.min(1, Math.abs(frame - center) / 8)));
  } else if (frame < 575) {
    x = interpolate(frame, [320, 340, 385, 405, 440, 460, 495, 515, 550, 575], [1390, 1256, 1256, 1444, 1444, 1256, 1256, 1444, 1444, 1444], {...clamp, easing: Easing.inOut(Easing.cubic)});
    y = interpolate(progress(frame, 320, 340), [0, 1], [116, 804]);
    click = Math.max(...[382, 437, 492, 547].map((center) => 1 - Math.min(1, Math.abs(frame - center) / 8)));
  } else if (frame < 900) {
    const move = progress(frame, 720, 758);
    x = interpolate(move, [0, 1], [1444, 1508]);
    y = interpolate(move, [0, 1], [804, 116]);
    click = 1 - Math.min(1, Math.abs(frame - 760) / 8);
  } else {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 24,
        height: 31,
        zIndex: 80,
        filter: "drop-shadow(0 3px 5px #000c)",
        transform: `scale(${1 - Math.max(0, click) * 0.12})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#f8fbff",
          clipPath: "polygon(0 0,0 92%,27% 68%,43% 100%,56% 94%,40% 63%,76% 63%)",
        }}
      />
      {click > 0 && (
        <div
          style={{
            position: "absolute",
            left: -12,
            top: -12,
            width: 42,
            height: 42,
            borderRadius: 50,
            border: "2px solid #77b8ff",
            opacity: click,
            transform: `scale(${0.45 + click * 0.9})`,
          }}
        />
      )}
    </div>
  );
};

const StandardWorkspace = ({frame}) => {
  const addedAt = [112, 172, 232, 292];
  const taskAt = [382, 437, 492, 547];
  const agentCount = addedAt.filter((at) => frame >= at).length;
  const outputMix = progress(frame, 748, 790);
  const outputOpen = outputMix > 0;
  return (
    <>
      <MacChrome agentCount={agentCount} />
      <WorkspaceTabs agentCount={agentCount} />
      <FileSidebar />
      <div
        style={{
          position: "absolute",
          left: 226,
          right: outputMix * 320,
          top: 92,
          bottom: 26,
          background: "#161b22",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 50,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            color: "#7e8793",
            borderBottom: "1px solid #ffffff0e",
            font: "600 9px ui-monospace, Menlo, monospace",
          }}
        >
          local · ~/Projects/bscode
          <span style={{marginLeft: "auto"}}>{agentCount ? `${agentCount}/4 agents` : "No agents"}</span>
          <AddAgentButton frame={frame} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 13,
            right: 13,
            top: 63,
            bottom: 13,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 10 + outputMix * 2,
            transform: `scale(${1 - outputMix * 0.012})`,
            transformOrigin: "50% 50%",
          }}
        >
          <EmptySlate frame={frame} />
          {[0, 1, 2, 3].map((index) => (
            frame >= addedAt[index] ? (
              <AgentCard key={index} index={index} frame={frame} addedAt={addedAt[index]} taskAt={taskAt[index]} />
            ) : <div key={index} />
          ))}
        </div>
        <TaskComposer frame={frame} />
      </div>
      {outputOpen && <OutputPanel frame={frame} />}
      {frame >= 760 && frame < 870 && <OutputTransfers frame={frame} />}
      <StatusBar agentCount={agentCount} />
      <Cursor frame={frame} />
    </>
  );
};

const CinematicAgent = ({index, frame, focusStrength = 0}) => {
  const show = spring({
    frame: frame - 925 - index * 5,
    fps: FPS,
    config: {damping: 19, stiffness: 130, mass: 0.8},
  });
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        borderRadius: 17 + focusStrength * 5,
        background: focusStrength > 0.35 ? "rgba(15,20,27,.87)" : "rgba(13,18,24,.62)",
        backdropFilter: "blur(22px) saturate(.82)",
        boxShadow: `0 0 0 ${1 + focusStrength}px ${colors[index]}${focusStrength > 0.35 ? "90" : "3d"}, 0 ${18 + focusStrength * 10}px ${42 + focusStrength * 28}px #0009, 0 0 ${focusStrength * 80}px ${colors[index]}18`,
        overflow: "hidden",
        opacity: show * (1 - focusStrength * 0.04),
        transform: `translateY(${(1 - show) * 28}px) scale(${0.94 + show * 0.06})`,
      }}
    >
      <AgentHeader index={index} state={index === 0 ? "done" : "working"} />
      <div style={{padding: "18px 20px", color: "#dbe2ea", font: "500 10px/1.65 ui-monospace, Menlo, monospace"}}>
        <div style={{color: colors[index], fontWeight: 700}}>{tasks[index]}</div>
        <div style={{color: "#a4aeba", marginTop: 9}}>{terminalLines[index][3]}</div>
        <div style={{color: "#747f8d", marginTop: 13}}>{focusStrength > 0.35 ? "Focused · awaiting follow-up" : `Working · ETA ${index + 1}m`}</div>
      </div>
    </div>
  );
};

const MentionComposer = ({frame}) => {
  const show = progress(frame, 1000, 1026);
  const prompt = "@Maeve check the mobile layout";
  const typed = typeText(prompt, frame, 1032, 1112);
  const menuOpacity = fadeWindow(frame, 1018, 1032, 1060, 1074);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 300,
          right: 300,
          bottom: 30,
          height: 62,
          borderRadius: 19,
          background: "rgba(8,12,16,.86)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 18px 45px #0009, inset 0 0 0 1px #ffffff22",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          color: "#d6dde6",
          font: "600 12px Inter, system-ui",
          opacity: show,
          transform: `translateY(${(1 - show) * 24}px)`,
        }}
      >
        {typed ? (
          <>
            <span style={{color: colors[1], fontWeight: 850}}>{typed.slice(0, Math.min(6, typed.length))}</span>
            <span style={{marginLeft: 4}}>{typed.slice(6).trimStart()}</span>
          </>
        ) : <span style={{color: "#77818e"}}>Mention an agent with @</span>}
        <span style={{marginLeft: "auto", color: "#697482"}}>⌘K</span>
        <span style={{marginLeft: 14, color: "#9ecfff", fontSize: 18}}>↵</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 300,
          bottom: 100,
          width: 350,
          borderRadius: 13,
          background: "rgba(9,13,18,.95)",
          border: "1px solid #ffffff1c",
          boxShadow: "0 18px 38px #0008",
          padding: 7,
          opacity: menuOpacity,
          transform: `translateY(${(1 - menuOpacity) * 10}px)`,
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={names[index]}
            style={{
              height: 42,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              borderRadius: 8,
              background: index === 1 ? "#ffffff0d" : "transparent",
              color: "#dfe4eb",
              font: "650 11px Inter, system-ui",
            }}
          >
            <Img src={faces[index]} style={{width: 27, height: 27, imageRendering: "pixelated", marginRight: 10}} />
            {names[index]}
            <span style={{marginLeft: "auto", color: colors[index], fontSize: 9}}>Agent {index + 1}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const CinematicMode = ({frame}) => {
  const focusMix = progress(frame, 982, 1030);
  const initial = [
    {x: 48, y: 72, w: 657, h: 346},
    {x: 723, y: 72, w: 829, h: 346},
    {x: 48, y: 436, w: 657, h: 346},
    {x: 723, y: 436, w: 829, h: 346},
  ];
  const focused = [
    {x: 285, y: 552, w: 300, h: 175},
    {x: 315, y: 78, w: 970, h: 446},
    {x: 650, y: 552, w: 300, h: 175},
    {x: 1015, y: 552, w: 300, h: 175},
  ];
  return (
    <div style={{position: "absolute", inset: 0, background: "linear-gradient(145deg,#11151b 0%,#090c10 48%,#12161b 100%)", overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${62 - focusMix * 4}% ${34 + focusMix * 3}%,rgba(255,255,255,.055),transparent 28%),linear-gradient(180deg,rgba(255,255,255,.025),rgba(0,0,0,.22))`,
        }}
      />
      {[0, 1, 2, 3].map((index) => {
        const start = initial[index];
        const end = focused[index];
        const x = interpolate(focusMix, [0, 1], [start.x, end.x]);
        const y = interpolate(focusMix, [0, 1], [start.y, end.y]);
        const width = interpolate(focusMix, [0, 1], [start.w, end.w]);
        const height = interpolate(focusMix, [0, 1], [start.h, end.h]);
        const isSelected = index === 1;
        return (
          <div
            key={names[index]}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width,
              height,
              opacity: isSelected ? 1 : 1 - focusMix * 0.28,
              transform: `translateY(${isSelected ? -Math.sin(focusMix * Math.PI) * 12 : Math.sin(focusMix * Math.PI) * 12}px)`,
              zIndex: isSelected ? 3 : 2,
            }}
          >
            <CinematicAgent index={index} frame={frame} focusStrength={isSelected ? focusMix : 0} />
          </div>
        );
      })}
      {focusMix > 0.05 && (
        <div
          style={{
            position: "absolute",
            left: interpolate(focusMix, [0, 1], [730, 332]),
            top: interpolate(focusMix, [0, 1], [80, 87]),
            color: colors[1],
            font: "850 9px Inter, system-ui",
            letterSpacing: 1.5,
            opacity: focusMix,
            zIndex: 5,
          }}
        >
          FOCUSED AGENT
        </div>
      )}
      <MentionComposer frame={frame} />
      <div style={{position: "absolute", right: 26, top: 21, color: "#c9d1db", font: "500 13px Inter, system-ui"}}>Exit &nbsp; ×</div>
    </div>
  );
};

const CityAgentCard = ({index, frame, left, top}) => {
  const show = spring({
    frame: frame - 1172 - index * 7,
    fps: FPS,
    config: {damping: 20, stiffness: 115, mass: 0.9},
  });
  const activity = (Math.sin((frame + index * 31) / 8) + 1) / 2;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 244,
        minHeight: 148,
        borderRadius: 15,
        background: "rgba(9,13,18,.88)",
        border: "1px solid rgba(255,255,255,.2)",
        boxShadow: "0 20px 55px rgba(0,0,0,.55), inset 0 1px rgba(255,255,255,.06)",
        backdropFilter: "blur(18px) saturate(.8)",
        padding: 13,
        boxSizing: "border-box",
        transform: `translateY(${(1 - show) * 28}px) scale(${0.9 + show * 0.1})`,
        opacity: show,
        zIndex: 3,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#eef3f8",
          font: "750 11px Inter, system-ui",
        }}
      >
        <Img src={faces[index]} style={{width: 28, height: 28, imageRendering: "pixelated", borderRadius: 7, marginRight: 9}} />
        {names[index]}
        <span style={{marginLeft: "auto", color: "#aab4c0", fontSize: 8, display: "flex", alignItems: "center", gap: 6}}>
          <i style={{display: "block", width: 6, height: 6, borderRadius: 8, background: colors[index], boxShadow: `0 0 ${6 + activity * 7}px ${colors[index]}`}} />
          LIVE
        </span>
      </div>
      <div
        style={{
          marginTop: 13,
          color: "#e3e8ee",
          font: "600 9px/1.4 ui-monospace, Menlo, monospace",
        }}
      >
        {tasks[index]}
      </div>
      <div
        style={{
          marginTop: 9,
          color: "#7f8996",
          font: "500 8px ui-monospace, Menlo, monospace",
        }}
      >
        {terminalLines[index][Math.min(3, Math.floor(progress(frame, 1185 + index * 6, 1260 + index * 5) * 4))]}
      </div>
      <div
        style={{
          marginTop: 13,
          height: 3,
          borderRadius: 5,
          background: "rgba(255,255,255,.09)",
          overflow: "hidden",
        }}
      >
        <div style={{height: "100%", width: `${45 + progress(frame, 1185, 1310) * (42 + index * 2)}%`, background: colors[index], opacity: 0.82}} />
      </div>
      <div style={{position: "absolute", left: "50%", top: "100%", width: 1, height: 70, background: "linear-gradient(#ffffff55,transparent)", opacity: show * 0.7}} />
    </div>
  );
};

const CityMode = ({frame}) => {
  const drift = progress(frame, 1200, 1320);
  const agents = [
    {left: 282, top: 348},
    {left: 568, top: 302},
    {left: 873, top: 318},
    {left: 1190, top: 360},
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#0a0d12",
        color: "#e9f0f8",
      }}
    >
      <Img
        src={cityBackground}
        style={{
          position: "absolute",
          inset: -28,
          width: APP_WIDTH + 56,
          height: APP_HEIGHT + 56,
          objectFit: "cover",
          filter: "brightness(.66) saturate(.72) contrast(1.03)",
          transform: `scale(${1.015 + drift * 0.02}) translate(${drift * -8}px,${drift * -3}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg,rgba(4,7,11,.28),rgba(4,7,11,.08) 44%,rgba(4,7,11,.48)),radial-gradient(circle at 50% 54%,transparent 24%,rgba(0,0,0,.36) 92%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 44,
          top: 38,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 15px",
          borderRadius: 13,
          background: "rgba(8,12,17,.78)",
          border: "1px solid rgba(255,255,255,.16)",
          boxShadow: "0 16px 42px #0007",
          backdropFilter: "blur(18px)",
          font: "750 13px Inter, system-ui",
        }}
      >
        <BrandMark size={31} />
        Agent City
        <span style={{color: "#72d1aa", fontSize: 10}}>4 agents live</span>
      </div>
      {agents.map((agent, index) => (
        <CityAgentCard key={names[index]} index={index} frame={frame} {...agent} />
      ))}
    </div>
  );
};

const FeatureCaption = ({frame}) => {
  const beats = [
    {from: 12, to: 96, title: "Begin with a blank workspace."},
    {from: 102, to: 322, title: "Bring agents in as the work grows."},
    {from: 328, to: 568, title: "Give every agent a clear task."},
    {from: 572, to: 748, title: "Watch every agent work at the same time."},
    {from: 754, to: 895, title: "Open finished work without leaving the session."},
    {from: 910, to: 1002, title: "Expand into a focused view."},
    {from: 1006, to: 1134, title: "@ an agent from the bottom command bar."},
    {from: 1138, to: 1182, title: "Collapse the focus view into City View."},
    {from: 1186, to: 1312, title: "See every agent across the city."},
  ];
  return (
    <>
      {beats.map((beat) => {
        const opacity = fadeWindow(frame, beat.from, beat.from + 12, beat.to - 12, beat.to);
        const rise = progress(frame, beat.from, beat.from + 18);
        return (
          <div
            key={beat.title}
            style={{
              position: "absolute",
              left: 108,
              top: 150,
              maxWidth: 820,
              color: "#f4f7fa",
              fontFamily: "Inter, system-ui",
              fontSize: 34,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -1.7,
              opacity,
              transform: `translate(${(1 - rise) * -26}px,${(1 - rise) * 18}px) scale(${0.975 + rise * 0.025})`,
              zIndex: 100,
              textShadow: "0 2px 5px rgba(0,0,0,.95), 0 6px 26px rgba(0,0,0,.9)",
            }}
          >
            {beat.title}
          </div>
        );
      })}
    </>
  );
};

const AppWindow = ({frame}) => {
  const circle = interpolate(frame, [900, 985], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const squashOut = progress(frame, 1138, 1170);
  const cityExpand = progress(frame, 1168, 1202);
  const standardOpacity = 1 - progress(frame, 975, 985);
  const cinematicVisible = frame >= 900;
  const cityVisible = frame >= 1162;
  const cityOpacity = progress(frame, 1164, 1174);
  const cinematicOpacity = 1 - progress(frame, 1160, 1176);
  return (
    <div
      style={{
        position: "relative",
        width: APP_WIDTH,
        height: APP_HEIGHT,
        borderRadius: 25,
        background: "#0e1218",
        overflow: "hidden",
        boxShadow: "0 55px 140px #000c, 0 0 0 1px #ffffff24, inset 0 0 0 1px #000",
      }}
    >
      <div style={{position: "absolute", inset: 0, opacity: standardOpacity}}>
        <StandardWorkspace frame={frame} />
      </div>
      {cinematicVisible && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: frame < 985 ? `circle(${circle * 980}px at 50% 50%)` : "none",
            transform: `scaleX(${1 + squashOut * 0.055}) scaleY(${1 - squashOut * 0.95})`,
            opacity: cinematicOpacity,
            transformOrigin: "50% 50%",
          }}
        >
          <CinematicMode frame={frame} />
        </div>
      )}
      {frame >= 900 && frame < 985 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: circle * 1960,
            height: circle * 1960,
            borderRadius: "50%",
            border: "3px solid #d5eaff",
            boxShadow: "0 0 32px #75b7ff, inset 0 0 32px #75b7ff",
            opacity: 1 - progress(frame, 965, 985),
            transform: "translate(-50%,-50%)",
            zIndex: 85,
            pointerEvents: "none",
          }}
        />
      )}
      {cityVisible && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: cityOpacity,
            transform: `scaleX(${1.055 - cityExpand * 0.055}) scaleY(${0.05 + cityExpand * 0.95})`,
            transformOrigin: "50% 50%",
          }}
        >
          <CityMode frame={frame} />
        </div>
      )}
      {frame >= 1148 && frame < 1190 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 3,
            background: "linear-gradient(90deg,transparent,#b7ddff,#e8f5ff,#b7ddff,transparent)",
            boxShadow: "0 0 30px #75b7ff",
            opacity: 1 - Math.abs(frame - 1168) / 22,
            zIndex: 90,
          }}
        />
      )}
    </div>
  );
};

const cameraForFrame = (frame) => {
  const frames = [0, 32, 90, 120, 165, 225, 285, 325, 370, 420, 470, 520, 570, 640, 735, 790, 880, 925, 985, 1035, 1125, 1168, 1210, 1319];
  const sample = (values) => interpolate(frame, frames, values, {...clamp, easing: Easing.inOut(Easing.cubic)});
  const addClick = Math.max(...[105, 165, 225, 285].map((center) => Math.max(0, 1 - Math.abs(frame - center) / 9)));
  const assignmentClick = Math.max(...[382, 437, 492, 547].map((center) => Math.max(0, 1 - Math.abs(frame - center) / 10)));
  const impact = Math.max(addClick, assignmentClick);
  return {
    scale: sample([0.79, 0.865, 0.875, 0.925, 0.94, 0.94, 0.94, 0.885, 0.945, 0.955, 0.955, 0.95, 0.865, 0.875, 0.885, 0.93, 0.93, 0.9, 0.93, 0.955, 0.94, 0.9, 0.885, 0.9]) - impact * 0.008,
    x: sample([0, 0, -8, 38, -48, 42, -42, 0, 44, -54, 46, -52, 0, 0, 0, -78, -92, -38, 0, -52, -32, 0, 0, 0]),
    y: sample([58, 12, 8, 22, 17, -5, -13, 7, 26, 22, -18, -22, 5, 12, 8, 5, 8, 4, 0, -24, -28, 0, 8, 4]) + impact * 3,
    rx: sample([4.2, 1.5, 1.2, 0.7, 0.3, -0.5, -0.8, 0.6, 0.5, 0.1, -0.6, -0.8, 0.7, 1.1, 0.6, 0.25, 0.2, 0.45, 0.1, -0.4, -0.55, 0.4, 0.7, 0.25]),
    ry: sample([-4.8, -2.1, -1.2, 1.6, -1.8, 1.5, -1.35, -0.5, 1.45, -1.55, 1.35, -1.45, -0.4, 0.45, 0.75, -1.6, -1.25, 0.75, 0.15, -1.0, -0.7, -0.2, 0.8, -0.35]),
    rz: sample([-0.8, -0.15, 0, 0.12, -0.15, 0.12, -0.1, 0, 0.08, -0.1, 0.08, -0.08, 0, 0.04, 0, -0.08, -0.05, 0.08, 0, -0.08, -0.04, 0, 0.08, 0]),
  };
};

export const BsCodeDemo = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({frame, fps, config: {damping: 22, stiffness: 96, mass: 0.9}});
  const end = progress(frame, 1300, 1319);
  const camera = cameraForFrame(frame);
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 42%,#17191d 0%,#0b0c0f 54%,#050607 100%)",
        fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, system-ui",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(110deg,rgba(255,255,255,.025),transparent 26%,transparent 72%,rgba(255,255,255,.018))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          perspective: 2400,
          opacity: intro * (1 - end),
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          style={{
            width: APP_WIDTH,
            height: APP_HEIGHT,
            transformOrigin: "50% 50%",
            transform: `translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.scale * (0.96 + intro * 0.04)}) rotateX(${camera.rx}deg) rotateY(${camera.ry}deg) rotateZ(${camera.rz}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <AppWindow frame={frame} />
        </div>
      </div>
      <FeatureCaption frame={frame} />
    </AbsoluteFill>
  );
};
