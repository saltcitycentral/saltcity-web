/**
 * The loading screen: the logo rises, a hairline fills, the screen lifts.
 *
 * It is plain server-rendered markup and CSS, switched on by the inline script
 * below, so it is in place before React hydrates and the hero never shows
 * first. Once per visit; never for reduced motion. The timings here match the
 * delays in globals.css (.sc-loader).
 */
const SCRIPT =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('sc-loader')!=='1'){" +
  "sessionStorage.setItem('sc-loader','1');" +
  "var l=document.getElementById('sc-loader');l.classList.add('is-on');" +
  "setTimeout(function(){l.style.display='none'},2900)}}catch(e){}";

export default function HomeLoader() {
  return (
    <>
      {/* The script edits this element before hydration, hence the suppression. */}
      <div id="sc-loader" className="sc-loader" aria-hidden="true" suppressHydrationWarning>
        <div>
          <div className="sc-loader-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.svg" alt="" width={190} height={113} />
          </div>
          <div className="sc-loader-line" />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
