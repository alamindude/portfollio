// Procedural "constellation core" — the placeholder content rendered by
// ScrollFrameAnimation when no real frame sequence is supplied yet.
//
// Concept: a scattered cloud of nodes converges into a structured, rotating
// network as the user scrolls — a visual metaphor for turning scattered
// ideas into working systems (websites, bots, automation pipelines).
//
// This is intentionally self-contained (no external assets) so the hero
// works out of the box. Swap it for a real photographed/rendered frame
// sequence by passing `framesPath` + `frameCount` to <ScrollFrameAnimation />.

const NODE_COUNT = 46;

function fibonacciSphere(count, radius) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function createScene(radius = 1) {
  const rand = seededRandom(1337);
  const assembled = fibonacciSphere(NODE_COUNT, radius);
  const scattered = assembled.map(() => ({
    x: (rand() - 0.5) * radius * 6,
    y: (rand() - 0.5) * radius * 6,
    z: (rand() - 0.5) * radius * 6,
  }));

  // Precompute nearest-neighbor edges on the assembled sphere so the
  // connection pattern looks intentional rather than random noise.
  const edges = [];
  for (let i = 0; i < assembled.length; i++) {
    const dists = [];
    for (let j = 0; j < assembled.length; j++) {
      if (i === j) continue;
      const a = assembled[i];
      const b = assembled[j];
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
      dists.push([d, j]);
    }
    dists.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < 3; k++) {
      const j = dists[k][1];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edges.find((e) => e.key === key)) edges.push({ key, a: i, b: j });
    }
  }

  return { assembled, scattered, edges };
}

function rotateY(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos, };
}

function rotateX(p, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Draw one frame of the constellation core onto a 2D canvas context.
 * @param ctx CanvasRenderingContext2D
 * @param scene output of createScene()
 * @param progress 0..1 scroll progress
 * @param opts { width, height, lowFi }
 */
export function drawScene(ctx, scene, progress, opts) {
  const { width, height, lowFi } = opts;
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) * 0.34;

  // Assembly eases in over the first 65% of the scroll; the remainder is a
  // slow confident rotation of the fully-formed network.
  const assembly = Math.min(1, progress / 0.65);
  const eased = 1 - Math.pow(1 - assembly, 3);
  const rotY = progress * Math.PI * 2.1 + 0.4;
  const rotX = 0.35 + Math.sin(progress * Math.PI) * 0.12;

  const projected = scene.assembled.map((p, i) => {
    const s = scene.scattered[i];
    const mixed = {
      x: lerp(s.x, p.x, eased),
      y: lerp(s.y, p.y, eased),
      z: lerp(s.z, p.z, eased),
    };
    let r = rotateY(mixed, rotY);
    r = rotateX(r, rotX);
    const perspective = 1 / (2.4 - r.z / scale);
    return {
      x: cx + r.x * scale * perspective,
      y: cy + r.y * scale * perspective,
      z: r.z,
      perspective,
    };
  });

  // Color drifts from violet toward cyan as the system "comes online".
  const hueMix = eased;
  const edgeColor = (alpha) =>
    `rgba(${lerp(110, 34, hueMix)}, ${lerp(86, 211, hueMix)}, ${lerp(255, 238, hueMix)}, ${alpha})`;

  ctx.lineWidth = lowFi ? 0.6 : 0.8;
  scene.edges.forEach(({ a, b }) => {
    const pa = projected[a];
    const pb = projected[b];
    const depth = (pa.perspective + pb.perspective) / 2;
    const alpha = Math.max(0, Math.min(0.5, (depth - 0.35) * 0.9)) * (0.35 + eased * 0.65);
    if (alpha <= 0.01) return;
    ctx.strokeStyle = edgeColor(alpha);
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
  });

  projected
    .slice()
    .sort((a, b) => a.z - b.z)
    .forEach((p) => {
      const r = Math.max(0.6, 2.4 * p.perspective);
      const alpha = 0.35 + 0.65 * Math.min(1, p.perspective);
      if (!lowFi) {
        ctx.shadowBlur = 14 * p.perspective;
        ctx.shadowColor = edgeColor(0.9);
      }
      ctx.fillStyle = edgeColor(alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  ctx.shadowBlur = 0;
}
