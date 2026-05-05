import svgPaths from "./svg-a4v371515o";

function Discord() {
  return (
    <div className="absolute left-[33px] overflow-clip size-[32px] top-[172px]" data-name="Discord">
      <div className="absolute inset-[13.99%_4%_18%_4%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4403 21.7642">
          <path d={svgPaths.p36063800} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['REM:Regular',sans-serif] font-normal h-[23px] justify-center leading-[0] left-[16.5px] opacity-0 text-[4px] text-black text-center top-[14.5px] w-[27px]" href="https://discord.com/channels/kammy_r">
        <p className="cursor-pointer decoration-solid leading-[normal] underline">{`https://discord.com/channels/kammy_r`}</p>
      </a>
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[33px] overflow-clip size-[32px] top-[96px]" data-name="LinkedIn">
      <div className="absolute inset-[9.76%_6.24%_6.24%_9.76%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.88 26.88">
          <path d={svgPaths.p18bffc00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['REM:Regular',sans-serif] font-normal h-[23px] justify-center leading-[0] left-[16.5px] opacity-0 text-[4px] text-black text-center top-[16.5px] w-[27px]" href="https://www.linkedin.com/in/ratish-gupta/">
        <p className="cursor-pointer decoration-solid leading-[normal] underline">{`https://www.linkedin.com/in/ratish-gupta/`}</p>
      </a>
    </div>
  );
}

function Git() {
  return (
    <div className="absolute left-[34px] overflow-clip size-[32px] top-[20px]" data-name="Git">
      <div className="absolute inset-[-0.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.36 32.36">
          <path d={svgPaths.p13718280} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.18" />
        </svg>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['REM:Regular',sans-serif] font-normal h-[23px] justify-center leading-[0] left-[16.5px] opacity-0 text-[4px] text-black text-center top-[14.5px] w-[27px]" href="https://github.com/ratshgupta-guptar76">
        <p className="cursor-pointer decoration-solid leading-[normal] underline">{`https://github.com/ratshgupta-guptar76`}</p>
      </a>
    </div>
  );
}

function Social() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[246px] left-[-1px] overflow-clip top-[792px] w-[98px]" data-name="Social">
      <Discord />
      <LinkedIn />
      <Git />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Ropa_Sans:Regular',sans-serif] justify-center leading-[0] left-[50px] not-italic size-[32px] text-[30px] text-black text-center top-[74px]">
        <p className="leading-[normal]">•</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Ropa_Sans:Regular',sans-serif] justify-center leading-[0] left-[50px] not-italic size-[32px] text-[30px] text-black text-center top-[148px]">
        <p className="leading-[normal]">•</p>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[90px] left-1/2 top-[calc(50%-487px)] w-[100px]" data-name="Close">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 90">
        <g id="Close">
          <g filter="url(#filter0_d_1_5828)" id="Vector">
            <path d={svgPaths.p1c8dedf0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2e154f80} stroke="var(--stroke-0, white)" strokeWidth="2" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_5828" width="48" x="26" y="25">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_5828" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_5828" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="absolute bg-[#e8e4f6] border border-black border-solid h-[1080px] left-0 overflow-clip rounded-[14px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[100px]" data-name="Sidebar">
      <Social />
      <Close />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute h-[1080px] left-[1820px] rounded-bl-[14px] rounded-tl-[14px] top-0 w-[100px]" data-name="SIDEBAR">
      <Sidebar1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#d0c3c3] h-[1080px] left-0 overflow-clip top-0 w-[1920px]">
      <Sidebar />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['RomanD:Regular',sans-serif] h-[195px] justify-center leading-[0] left-[909.5px] not-italic text-[100px] text-black text-center top-[240.5px] w-[1819px]">
        <p className="leading-[normal]">PROJECTS</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['RomanD:Regular',sans-serif] h-[195px] justify-center leading-[0] left-[909.5px] not-italic text-[100px] text-black text-center top-[825.5px] w-[1819px]">
        <p className="leading-[normal]">RESUME</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['RomanD:Regular',sans-serif] h-[195px] justify-center leading-[0] left-[909.5px] not-italic text-[100px] text-black text-center top-[630.5px] w-[1819px]">
        <p className="leading-[normal]">BLOGS</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['RomanD:Regular',sans-serif] h-[195px] justify-center leading-[0] left-[909.5px] not-italic text-[100px] text-black text-center top-[455.5px] w-[1819px]">
        <p className="leading-[normal]">WORK</p>
      </div>
    </div>
  );
}

function Magento() {
  return (
    <div className="absolute left-[16px] size-[90px] top-[20px]" data-name="Magento">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <g id="Magento">
          <path d={svgPaths.p33cc4080} fill="var(--fill-0, #584D4D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function MenuDropBox() {
  return (
    <div className="bg-[#fffcea] relative rounded-[14px] size-full" data-name="Menu-DropBox">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame />
        <Magento />
      </div>
      <div aria-hidden="true" className="absolute border border-[#171717] border-solid inset-[-1px] pointer-events-none rounded-[15px]" />
    </div>
  );
}