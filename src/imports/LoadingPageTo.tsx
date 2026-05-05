import svgPaths from "./svg-p7puglcjhx";

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

export default function LoadingPageTo() {
  return (
    <div className="bg-[#fff7ea] relative size-full" data-name="Loading Page - TO">
      <div className="relative size-full">
        <Magento />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal h-[383px] justify-center leading-[0] left-[960px] not-italic text-[200px] text-black text-center top-[540.5px] w-[1212px]" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
          <p className="leading-[normal]">Loading...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}