import svgPaths from "./svg-wdg7zg3wiw";
import imgFrameMedium from "figma:asset/05147e92268842d49ae0c93c0b28b51ac1a616ba.png";
import imgFrameBlogger from "./`asset/592307c7cc171309dd79d80a977e0531a335162d.png";

function FrameMedium() {
  return (
    <div className="absolute blur-[10px] h-[1080px] left-[960px] top-0 w-[960px]" data-name="Frame (Medium)">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrameMedium} />
      </div>
    </div>
  );
}

function MediumNew() {
  return (
    <div className="absolute h-[303px] left-[1305px] overflow-clip top-[390px] w-[330px]" data-name="Medium New">
      <div className="absolute inset-[12%_6%_14%_2%]" data-name="Vector">
        <div className="absolute inset-[-6.24%_-13.16%_-9.81%_-11.27%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 377.753 260.22">
            <g filter="url(#filter0_d_1_5890)" id="Vector">
              <path d={svgPaths.p7e31900} fill="var(--fill-0, black)" />
              <path d={svgPaths.p5b06e00} stroke="var(--stroke-0, #FFFCEC)" strokeWidth="14" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="260.22" id="filter0_d_1_5890" width="377.753" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_5890" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_5890" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal h-[257px] justify-center leading-[0] left-[calc(50%-0.5px)] not-italic opacity-0 text-[100px] text-black text-center top-[calc(50%-1px)] w-[333px]" href="https://medium.com/@ratishg2005" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="cursor-pointer decoration-solid leading-[0.62] underline">ratishgupta.com</p>
      </a>
    </div>
  );
}

function Medium() {
  return (
    <div className="absolute contents left-[960px] top-0" data-name="Medium">
      <FrameMedium />
      <MediumNew />
    </div>
  );
}

function FrameBlogger() {
  return (
    <div className="absolute blur-[10px] h-[1080px] left-0 top-0 w-[960px]" data-name="Frame (Blogger)">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrameBlogger} />
      </div>
    </div>
  );
}

function Blogger1() {
  return (
    <div className="absolute h-[405px] left-[297px] overflow-clip top-[337px] w-[385px]" data-name="Blogger">
      <div className="absolute inset-[13%_13%_12.01%_12%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 288.758 303.708">
          <path clipRule="evenodd" d={svgPaths.pbe19e00} fill="url(#paint0_linear_1_5884)" fillRule="evenodd" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_5884" x1="3.8901" x2="265.252" y1="4.06688" y2="252.514">
              <stop stopColor="#FF975F" />
              <stop offset="1" stopColor="#FF7930" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-[27%] right-[27.16%] top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176.474 202.5">
          <path clipRule="evenodd" d={svgPaths.p8c0e5f0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal h-[303px] justify-center leading-[0] left-[190.5px] not-italic opacity-0 text-[90px] text-black text-center top-[204.5px] w-[289px]" href="https://ratishg2005.blogspot.com/" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="cursor-pointer decoration-solid leading-[0.96] underline">ratishgupta.com</p>
      </a>
    </div>
  );
}

function Blogger() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Blogger">
      <FrameBlogger />
      <Blogger1 />
    </div>
  );
}

function HighlightCurrent() {
  return <div className="absolute bg-black border border-black border-solid bottom-[5%] left-1/2 right-1/4 rounded-[40px] top-[5%]" data-name="highlight-current" />;
}

function Frame() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[150px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 150 80">
        <g id="Frame 16">
          <g id="Vector">
            <path d={svgPaths.p2fe44f00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p9468c80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3c29cf80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2853cff0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2dfba440} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1445c300} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[150px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 150 80">
        <g id="Frame 19">
          <g id="Vector">
            <path d={svgPaths.p1a8fcd80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p5474770} fill="var(--fill-0, black)" />
            <path d={svgPaths.p23c2bd00} fill="var(--fill-0, black)" />
            <path d={svgPaths.pe771800} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[150px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 150 80">
        <g id="Frame 18">
          <g id="Vector">
            <path d={svgPaths.pd493600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1c201e80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2e4d2b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3f294680} fill="var(--fill-0, white)" />
            <path d={svgPaths.p236f6a00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[150px]" role="button" tabIndex="0">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 150 80">
        <g id="Frame 17">
          <g id="Vector">
            <path d={svgPaths.p3f24a300} fill="var(--fill-0, black)" />
            <path d={svgPaths.p33797480} fill="var(--fill-0, black)" />
            <path d={svgPaths.p32c1d200} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2b766600} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2588a400} fill="var(--fill-0, black)" />
            <path d={svgPaths.p23b03600} fill="var(--fill-0, black)" />
            <path d={svgPaths.pf9f5000} fill="var(--fill-0, black)" />
            <path d={svgPaths.p28bd4880} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Magento() {
  return (
    <div className="absolute left-[16px] size-[90px] top-[20px]" data-name="Magento">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <g id="Magento-Logo">
          <path d={svgPaths.p33cc4080} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <div className="bg-white relative size-full" data-name="Blogs-Page">
      <Medium />
      <Blogger />
      <div className="absolute flex h-[955px] items-center justify-center left-[960px] top-[125px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[955px]">
            <div className="absolute inset-[-9px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 955 9">
                <line id="Line 1" stroke="var(--stroke-0, #1C1C1C)" strokeWidth="9" x2="955" y1="4.5" y2="4.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[45px] items-center justify-center left-[960px] top-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[45px]">
            <div className="absolute inset-[-9px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 9">
                <line id="Line 2" stroke="var(--stroke-0, #1C1C1C)" strokeWidth="9" x2="45" y1="4.5" y2="4.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.6)] h-[80px] left-[660px] rounded-[40px] top-[45px] w-[600px]" data-name="navbar-global">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <HighlightCurrent />
          <button className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[80px] left-0 overflow-clip rounded-bl-[40px] rounded-tl-[40px] top-0 w-[150px]" data-name="Nav-ICONS">
            <Frame />
          </button>
          <button className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[80px] left-[450px] overflow-clip rounded-br-[50px] rounded-tr-[40px] top-0 w-[150px]" data-name="Nav-ICONS">
            <Frame3 />
          </button>
          <div className="absolute bg-[rgba(255,255,255,0)] h-[80px] left-[300px] overflow-clip top-0 w-[150px]" data-name="Nav-ICONS">
            <Frame2 />
          </div>
          <button className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[80px] left-[150px] overflow-clip top-0 w-[150px]" data-name="Nav-ICONS">
            <Frame1 />
          </button>
        </div>
        <div aria-hidden="true" className="absolute border-3 border-black border-solid inset-[-3px] pointer-events-none rounded-[43px]" />
      </div>
      <Magento />
    </div>
  );
}