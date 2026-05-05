function HomeLink() {
  return (
    <div className="absolute inset-[-1px_calc(75%+0.5px)_-1px_-1px] overflow-clip" data-name="home-link">
      <div className="absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal inset-0 justify-center leading-[0] not-italic text-[25px] text-black text-center" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="leading-[normal]">Resume</p>
      </div>
    </div>
  );
}

function ProjectLink() {
  return (
    <div className="absolute bottom-[calc(6.25%-0.88px)] left-[calc(25%-0.5px)] overflow-clip right-1/2 top-[calc(6.25%-0.88px)]" data-name="project-link">
      <div className="absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal inset-0 justify-center leading-[0] not-italic text-[25px] text-black text-center" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="leading-[normal]">Projects</p>
      </div>
    </div>
  );
}

function BlogLink() {
  return (
    <div className="absolute bottom-[-1px] left-1/2 overflow-clip right-[calc(25%-0.5px)] top-[-1px]" data-name="blog-link">
      <div className="absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal inset-0 justify-center leading-[0] not-italic text-[25px] text-black text-center" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="leading-[normal]">Blogs</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-black border border-black border-solid inset-[6.25%_0] overflow-clip rounded-[40px]">
      <div className="absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal inset-[-1px] justify-center leading-[0] not-italic text-[25px] text-center text-white" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="leading-[normal]">Work</p>
      </div>
    </div>
  );
}

function WorkLink() {
  return (
    <div className="absolute inset-[-1px_calc(1%-0.98px)_-1px_calc(74%+0.48px)] overflow-clip" data-name="work-link">
      <div className="absolute flex flex-col font-['Recursive:Mono_Linear',sans-serif] font-normal inset-0 justify-center leading-[0] not-italic text-[25px] text-black text-center" style={{ fontVariationSettings: "'CASL' 0, 'CRSV' 0.5, 'MONO' 1" }}>
        <p className="leading-[normal]">Work</p>
      </div>
      <Frame />
    </div>
  );
}

export default function NavBarGlobal() {
  return (
    <div className="border border-black border-solid overflow-clip relative rounded-[80px] size-full" data-name="NavBar_Global">
      <HomeLink />
      <ProjectLink />
      <BlogLink />
      <WorkLink />
    </div>
  );
}