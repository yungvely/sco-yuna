// @ts-ignore
import anime from "animejs";
import opentype from "opentype.js";
import { useEffect, useRef, useState } from "react";

type Props = {
  textLines: string[];
  fontUrls: string[];
  fontSizes?: number[];
  lineHeights?: number[];
  strokeColors?: string[];
  fillColors?: string[];
  strokeWidths?: number[];
  lineDelays?: number[];
  goldLineIndex?: number;
  glowLineIndex?: number;
  nicknameHighlight?: {
    lineIndex: number;
    range: [number, number];
    color: string; // 예: "gradient" 또는 "#f5b263"
  };
  onComplete?: () => void;
};

export const HandwritingText = ({
  textLines,
  fontUrls,
  fontSizes = [],
  lineHeights = [],
  strokeColors = [],
  fillColors = [],
  strokeWidths = [],
  lineDelays = [],
  goldLineIndex,
  glowLineIndex,
  nicknameHighlight,
  onComplete,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const safe = <T,>(arr: T[], fallback: T, len: number) =>
      Array.from({ length: len }, (_, i) => arr[i] ?? fallback);

    const fontUrlList = safe(fontUrls, fontUrls.at(-1)!, textLines.length);
    const sizes = safe(fontSizes, 100, textLines.length);
    const strokes = safe(strokeColors, "#000", textLines.length);
    const fills = safe(fillColors, "#000", textLines.length);
    const widths = safe(strokeWidths, 1.5, textLines.length);
    const lineHs = safe(lineHeights, 1.2, textLines.length);

    Promise.all(fontUrlList.map((url) => opentype.load(url))).then((fonts) => {
      if (!svgRef.current) return;
      const svg = svgRef.current;
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      defs.innerHTML = `
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fefcea"/>
          <stop offset="25%" stop-color="#f9d976"/>
          <stop offset="50%" stop-color="#e0b647"/>
          <stop offset="75%" stop-color="#c6a64f"/>
          <stop offset="100%" stop-color="#f9d976"/>
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="50%" stop-color="white" stop-opacity="0.8" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="2s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="softGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur1" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur2" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur3" />
          <feFlood flood-color="#f1e0a5" flood-opacity="1" result="color" />
          <feMerge result="mergedBlur">
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur3" />
          </feMerge>
          <feComposite in="color" in2="blurred" operator="in" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      `;
      svg.appendChild(defs);

      const pathElements: SVGPathElement[] = [];
      const fillElements: SVGPathElement[] = [];
      const shadowElements: SVGPathElement[] = [];

      let y = 0;
      const lineWidths: number[] = [];
      const linesY: number[] = [];

      // 1. 각 줄의 시각적 길이 계산
      const maxLineWidth = textLines.reduce((max, line, i) => {
        const font = fonts[i];
        const size = sizes[i];
        const glyphs = font.stringToGlyphs(line);

        const width = glyphs.reduce(
          (acc: number, g: typeof opentype) =>
            acc + g.advanceWidth * (size / font.unitsPerEm),
          0
        );
        lineWidths[i] = width;
        return Math.max(max, width);
      }, 0);

      const PADDING_X = 20;
      const PADDING_Y = 20;
      const svgWidth = maxLineWidth + PADDING_X * 2;

      textLines.forEach((line, i) => {
        const font = fonts[i];
        const size = sizes[i];
        const stroke = strokes[i];
        const fill = fills[i];
        const strokeWidth = widths[i];
        const lineHeight = lineHs[i];

        y += size * lineHeight;
        linesY[i] = y;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const lineWidth = lineWidths[i];
        const translateX = svgWidth / 2 - lineWidth / 2;
        const adjustX =
          i === 0 && /[가-힣]/.test(textLines[i]) ? size * 0.25 : 0;
        g.setAttribute("transform", `translate(${translateX + adjustX}, 0)`);

        svg.appendChild(g);

        let chunks: { text: string; color?: string }[] = [{ text: line }];
        if (i === nicknameHighlight?.lineIndex) {
          const [start, end] = nicknameHighlight.range;
          chunks = [
            { text: line.slice(0, start) },
            { text: line.slice(start, end), color: nicknameHighlight.color },
            { text: line.slice(end) },
          ];
        }

        let cursorX = 0;
        for (const { text: chunk, color } of chunks) {
          const glyphs = font.stringToGlyphs(chunk);
          for (const glyph of glyphs) {
            const path = glyph.getPath(cursorX, y, size);
            const d = path.toPathData();

            if (i === 1) {
              for (let s = 6; s >= 1; s--) {
                const shadow = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
                shadow.setAttribute("d", d);
                shadow.setAttribute("fill", "#c6a64f");
                shadow.setAttribute("transform", `translate(${s}, ${s})`);
                shadow.style.opacity = "0";
                g.appendChild(shadow);
                shadowElements.push(shadow);
              }
            }

            const el = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            el.setAttribute("d", d);
            el.setAttribute("stroke-width", strokeWidth.toString());

            if (i === goldLineIndex) {
              el.setAttribute("fill", "url(#goldGradient)");
              el.setAttribute("stroke", "url(#goldGradient)");
            } else if (i === glowLineIndex) {
              el.setAttribute("fill", fill);
              el.setAttribute("filter", "url(#softGlow)");
              el.setAttribute("stroke", "none");
            } else {
              el.setAttribute("fill", fill);
              el.setAttribute("stroke", stroke);
            }

            const length = el.getTotalLength();
            el.style.strokeDasharray = `${length}`;
            el.style.strokeDashoffset = `${length}`;
            el.style.fillOpacity = "0";
            g.appendChild(el);
            pathElements.push(el);
            fillElements.push(el);

            if (i === goldLineIndex) {
              const shine = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
              );
              shine.setAttribute("d", d);
              shine.setAttribute("fill", "none");
              shine.setAttribute("stroke", "url(#shine)");
              shine.setAttribute("stroke-width", strokeWidth.toString());
              shine.setAttribute("stroke-linecap", "round");
              g.appendChild(shine);
            }

            cursorX += glyph.advanceWidth * (size / font.unitsPerEm);
          }
        }
      });

      const svgHeight = y + PADDING_Y;
      svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
      setSvgSize({ width: Math.ceil(svgWidth), height: Math.ceil(svgHeight) });
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.style.display = "block";

      anime({
        targets: shadowElements,
        opacity: [0, 1],
        duration: 1000,
        delay: (lineDelays?.[0] ?? 0) + textLines[0].length * 60 + 100,
        easing: "easeOutQuad",
      });

      anime({
        targets: pathElements,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 100,
        delay: (_: unknown, i: number) => {
          let charCount = 0;
          let lineIndex = 0;
          for (const line of textLines) {
            const len = line.length;
            if (i < charCount + len) break;
            charCount += len;
            lineIndex++;
          }
          return (lineDelays[lineIndex] ?? 0) + i * 60;
        },
      });

      anime({
        targets: fillElements,
        fillOpacity: [0, 1],
        easing: "easeOutQuad",
        duration: 100,
        delay: (_: unknown, i: number) => {
          let charCount = 0;
          let lineIndex = 0;
          for (const line of textLines) {
            const len = line.length;
            if (i < charCount + len) break;
            charCount += len;
            lineIndex++;
          }
          return (lineDelays[lineIndex] ?? 0) + i * 60 + 80;
        },
        complete: onComplete,
      });
    });
  }, [
    textLines,
    fontUrls,
    fontSizes,
    lineHeights,
    strokeColors,
    fillColors,
    strokeWidths,
    lineDelays,
    goldLineIndex,
    glowLineIndex,
    nicknameHighlight,
    onComplete,
  ]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width: "90%",
        maxWidth: "320px",
        height: "auto",
        margin: "0 auto",
      }}
    />
  );
};
