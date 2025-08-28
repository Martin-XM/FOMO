import { discordWidgetStyle } from "./tailwindClasses.js";

export default function DiscordWidget() {
  return (
    <div className={discordWidgetStyle}>
      <iframe
        src="https://discord.com/widget?id=586911558056017943&theme=dark"
        width="300"
        height="400"
        style={{ background: "transparent" }}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="rounded-lg shadow-xl"
      ></iframe>
    </div>
  );
}