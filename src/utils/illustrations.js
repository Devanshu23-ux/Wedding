const SKIN = "#f0c19a";
const SKIN_SHADE = "#e0a879";
const HAIR = "#3a2620";

function brideHair(bun){
  return `<path d="M-46 -8 C-50 -46 -18 -70 0 -70 C18 -70 50 -46 46 -8 C46 10 40 22 32 30 C34 8 30 -14 0 -18 C-30 -14 -34 8 -32 30 C-40 22 -46 10 -46 -8 Z" fill="${HAIR}"/>
  ${bun? `<circle cx="0" cy="-64" r="13" fill="${HAIR}"/>` : ""}
  <path d="M-32 30 C-34 46 -30 62 -22 74" fill="none" stroke="${HAIR}" stroke-width="10" stroke-linecap="round"/>
  <path d="M32 30 C34 46 30 62 22 74" fill="none" stroke="${HAIR}" stroke-width="10" stroke-linecap="round"/>`;
}
function groomHair(){
  return `<path d="M-40 -6 C-42 -42 -16 -60 0 -60 C16 -60 42 -42 40 -6 C40 -14 34 -30 0 -32 C-34 -30 -40 -14 -40 -6 Z" fill="${HAIR}"/>`;
}
function face(blushColor){
  return `
  <circle cx="-14" cy="2" r="3.2" fill="${HAIR}"/>
  <circle cx="14" cy="2" r="3.2" fill="${HAIR}"/>
  <path d="M-9 16 Q0 24 9 16" fill="none" stroke="${HAIR}" stroke-width="2.4" stroke-linecap="round"/>
  <ellipse cx="-24" cy="12" rx="7" ry="4.4" fill="${blushColor}" opacity=".55"/>
  <ellipse cx="24" cy="12" rx="7" ry="4.4" fill="${blushColor}" opacity=".55"/>`;
}

function brideFigure(x, outfitFill, outfitAccent, jewel, extra){
  return `
  <g transform="translate(${x},0)">
    <ellipse cx="0" cy="150" rx="70" ry="18" fill="#000" opacity=".07"/>
    <path d="M-58 210 C-58 130 -34 92 0 92 C34 92 58 130 58 210 Z" fill="${outfitFill}"/>
    <path d="M-58 210 C-58 150 -46 112 -30 98 L-30 210 Z" fill="${outfitAccent}" opacity=".55"/>
    <path d="M0 92 C34 92 58 130 58 210 L40 210 C40 140 24 106 0 96 Z" fill="${outfitAccent}" opacity=".3"/>
    <circle cx="0" cy="40" r="42" fill="${SKIN}"/>
    <path d="M-42 40 a42 42 0 0 0 84 0" fill="${SKIN_SHADE}" opacity=".3"/>
    ${brideHair(true)}
    <path d="M0 -14 L0 4" stroke="${jewel}" stroke-width="2"/>
    <circle cx="0" cy="6" r="2.6" fill="${jewel}"/>
    ${face("#e8899a")}
    <circle cx="-32" cy="34" r="3" fill="${jewel}"/>
    <circle cx="32" cy="34" r="3" fill="${jewel}"/>
    ${extra||""}
  </g>`;
}
function groomFigure(x, outfitFill, outfitAccent, jewel, extra){
  return `
  <g transform="translate(${x},0)">
    <ellipse cx="0" cy="150" rx="68" ry="18" fill="#000" opacity=".07"/>
    <path d="M-54 210 L-54 118 C-54 100 -30 88 0 88 C30 88 54 100 54 118 L54 210 Z" fill="${outfitFill}"/>
    <path d="M0 88 C-14 88 -26 92 -34 98 L-34 210 L-18 210 L-18 100 Z" fill="${outfitAccent}" opacity=".55"/>
    <path d="M-4 88 L-4 210" stroke="${outfitAccent}" stroke-width="4" opacity=".5"/>
    <circle cx="0" cy="38" r="40" fill="${SKIN}"/>
    <path d="M-40 38 a40 40 0 0 0 80 0" fill="${SKIN_SHADE}" opacity=".3"/>
    ${groomHair()}
    ${face("#dc9a86")}
    ${extra||""}
  </g>`;
}

export const ILLUSTRATIONS = {
  haldi: {
    label:"Haldi",
    svg:(w=400,h=460)=>`
    <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="gHaldi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9ad"/><stop offset="1" stop-color="#f8c24c"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#gHaldi)"/>
      <circle cx="60" cy="60" r="30" fill="#fff3c8" opacity=".55"/>
      <circle cx="${w-50}" cy="100" r="20" fill="#fff3c8" opacity=".5"/>
      <circle cx="${w-70}" cy="${h-60}" r="34" fill="#e8a93a" opacity=".25"/>
      <g transform="translate(${w/2} ${h-230})">
        ${brideFigure(-70,"#f7c948","#e8a93a","#8a5a1c", `<g transform="translate(0,-78)"><circle r="4" fill="#fff8e2"/><circle cx="-9" cy="4" r="3" fill="#fff8e2"/><circle cx="9" cy="4" r="3" fill="#fff8e2"/></g>`)}
        ${groomFigure(70,"#fbe28a","#e8a93a","#8a5a1c","")}
      </g>
    </svg>`
  },
  mehendi: {
    label:"Mehendi",
    svg:(w=400,h=460)=>`
    <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="gMehendi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7ecd2"/><stop offset="1" stop-color="#8fbf87"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#gMehendi)"/>
      <path d="M30 50 C50 30 70 30 80 50 C90 30 110 30 120 50" stroke="#4f7a45" stroke-width="3" fill="none" opacity=".45"/>
      <circle cx="${w-60}" cy="70" r="22" fill="#f4fbef" opacity=".5"/>
      <path d="M${w-40} ${h-40} q-30 -10 -30 -40" stroke="#4f7a45" stroke-width="3" fill="none" opacity=".4"/>
      <g transform="translate(${w/2} ${h-230})">
        ${brideFigure(-70,"#6f9e5f","#4f7a45","#2f4a26", `<circle cx="0" cy="40" r="3" fill="#2f4a26" opacity=".5"/>`)}
        ${groomFigure(70,"#bcd9a9","#4f7a45","#2f4a26","")}
      </g>
    </svg>`
  },
  sangeet: {
    label:"Sangeet",
    svg:(w=400,h=460)=>`
    <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gSangeet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1030"/><stop offset="1" stop-color="#6a1f4a"/></linearGradient>
        <radialGradient id="spot1" cx="30%" cy="0%" r="60%"><stop offset="0" stop-color="#ffdd7a" stop-opacity=".55"/><stop offset="1" stop-color="#ffdd7a" stop-opacity="0"/></radialGradient>
        <radialGradient id="spot2" cx="75%" cy="0%" r="60%"><stop offset="0" stop-color="#ff86c8" stop-opacity=".5"/><stop offset="1" stop-color="#ff86c8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#gSangeet)"/>
      <rect width="${w}" height="${h}" fill="url(#spot1)"/>
      <rect width="${w}" height="${h}" fill="url(#spot2)"/>
      <line x1="60" y1="0" x2="10" y2="140" stroke="#ffdd7a" stroke-width="10" opacity=".18"/>
      <line x1="${w-60}" y1="0" x2="${w-10}" y2="140" stroke="#ff86c8" stroke-width="10" opacity=".18"/>
      <circle cx="70" cy="40" r="3" fill="#ffe8a0"/><circle cx="110" cy="70" r="2.4" fill="#ffe8a0"/>
      <circle cx="${w-80}" cy="50" r="2.6" fill="#ffbfe0"/><circle cx="${w-40}" cy="90" r="2" fill="#ffbfe0"/>
      <g transform="translate(${w/2} ${h-230})">
        ${brideFigure(-70,"#c23a7a","#8a1f56","#ffd77a", `<path d="M-30 100 L30 100" stroke="#ffd77a" stroke-width="2" opacity=".6"/>`)}
        ${groomFigure(70,"#241a35","#3d2a55","#ffd77a", `<rect x="-3" y="94" width="6" height="60" fill="#ffd77a" opacity=".5"/>`)}
      </g>
    </svg>`
  },
  wedding: {
    label:"Wedding",
    svg:(w=400,h=460)=>`
    <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="gWedding" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe7d6"/><stop offset="1" stop-color="#f4c9b0"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#gWedding)"/>
      <path d="M40 90 L40 20 L${w-40} 20 L${w-40} 90" fill="none" stroke="#c8a24e" stroke-width="6"/>
      <path d="M40 20 Q${w/2} -10 ${w-40} 20" fill="none" stroke="#c8a24e" stroke-width="6"/>
      <circle cx="40" cy="20" r="7" fill="#c8a24e"/><circle cx="${w-40}" cy="20" r="7" fill="#c8a24e"/>
      <g opacity=".7">
        <circle cx="70" cy="34" r="6" fill="#f6d9de"/><circle cx="110" cy="26" r="5" fill="#f6d9de"/>
        <circle cx="${w-70}" cy="34" r="6" fill="#f6d9de"/><circle cx="${w-110}" cy="26" r="5" fill="#f6d9de"/>
      </g>
      <g transform="translate(${w/2} ${h-220})">
        ${brideFigure(-70,"#a3203a","#7c1128","#e8c877", `<path d="M-36 -30 L-30 20 M36 -30 L30 20" stroke="#e8c877" stroke-width="2" opacity=".7"/>`)}
        ${groomFigure(70,"#f4ead8","#c8a24e","#7c1128", `<path d="M0 84 a40 16 0 0 1 0 0" fill="none"/><rect x="-30" y="80" width="60" height="10" rx="5" fill="#c8a24e"/>`)}
      </g>
    </svg>`
  }
};
