import { LOGO_CENTRAL, LOGO_MARK, LOGO_VIEWBOX, LOGO_WORD } from "./logoPaths";

/**
 * The loading screen, made from the logo.
 *
 * The roofline draws itself as a line and fills in. The name rises in beneath
 * it, letter by letter. Then the space under the roof opens like a doorway:
 * a window in the shape of the logo grows until the page has come through it.
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
  "setTimeout(function(){l.style.display='none'},3600)}}catch(e){}";

export default function HomeLoader() {
  return (
    <>
      {/* The script edits this element before hydration, hence the suppression. */}
      <div id="sc-loader" className="sc-loader" aria-hidden="true" suppressHydrationWarning>
        {/* The dark screen. The doorway is cut out of this, not out of the logo. */}
        <div className="sc-loader-bg" />

        <svg className="sc-loader-logo" viewBox={LOGO_VIEWBOX} fill="#fff">
          <path className="sc-lm-mark" d={LOGO_MARK.d} pathLength={1} />
          <g className="sc-lm-text">
            <g className="sc-lm-word">
              {LOGO_WORD.map((d, i) => (
                <path key={i} d={d} style={{ ["--i" as string]: i }} />
              ))}
            </g>
            <g className="sc-lm-central">
              {LOGO_CENTRAL.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </g>
        </svg>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
