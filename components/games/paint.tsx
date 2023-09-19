import { useRef, useEffect, useState } from "react";

const pallet = [
  "#1a1c2c",
  "#5d275d",
  "#b13e53",
  "#ef7d57",
  "#ffcd75",
  "#a7f070",
  "#38b764",
  "#257179",
  "#29366f",
  "#3b5dc9",
  "#41a6f6",
  "#73eff7",
  "#f4f4f4",
  "#94b0c2",
  "#566c86",
  "#333c57",
];

const SIZE = 64;
const CANVAS_SIZE = 256;
const PIXEL_SIZE = CANVAS_SIZE / SIZE;
const TIMESCALE = 1 / 256;
const DITHER_SCALE = 4;
const CHANGE_RATE = 0.01;

const bayerMatrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function drawPixel(
  context: CanvasRenderingContext2D,
  value: number,
  x: number,
  y: number,
) {

  for (let k = 0; k < DITHER_SCALE * DITHER_SCALE; k++) {
    const newValue =
      value +
      bayerMatrix[k % DITHER_SCALE][Math.floor(k / DITHER_SCALE)] /
      (DITHER_SCALE * DITHER_SCALE);

    const color = pallet[Math.floor(newValue) & 0xf];

    context.fillStyle = color;
    context.fillRect(
      x * PIXEL_SIZE + ((k % DITHER_SCALE) * PIXEL_SIZE) / DITHER_SCALE,
      y * PIXEL_SIZE +
      (Math.floor(k / DITHER_SCALE) * PIXEL_SIZE) / DITHER_SCALE,
      PIXEL_SIZE / DITHER_SCALE,
      PIXEL_SIZE / DITHER_SCALE,
    );
  }
}

function drawAt(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  value: number,
) {
  for (let i = -size; i <= size; i++) {
    for (let j = -size; j <= size; j++) {
      const dist = Math.sqrt(i * i + j * j);
      if (dist <= size) {
        drawPixel(context, value, Math.floor(x + i), Math.floor(y + j));
      }
    }
  }
}

export default function Paint() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const lastPosition = useRef<{ x: number; y: number } | null>({ x: 0, y: 0 });
  const value = useRef(0);
  const [brushSize, setBrushSize] = useState(0);

  useEffect(() => {
    const context = canvas.current!.getContext("2d")!;
    context.fillStyle = pallet[12];
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons === 0) return;

    const x = Math.floor(e.nativeEvent.offsetX / PIXEL_SIZE);
    const y = Math.floor(e.nativeEvent.offsetY / PIXEL_SIZE);

    const context = canvas.current!.getContext("2d")!;

    if (lastPosition.current != null) {
      while (
        Math.abs(x - lastPosition.current.x) > 1 ||
        Math.abs(y - lastPosition.current.y) > 1
      ) {
        const dx = x - lastPosition.current.x;
        const dy = y - lastPosition.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const nx: number = lastPosition.current.x + dx / d;
        const ny: number = lastPosition.current.y + dy / d;

        const color = e.buttons === 1 ? value.current : 12;

        drawAt(context, nx, ny, brushSize, color);
        lastPosition.current = { x: nx, y: ny };
        value.current += CHANGE_RATE;
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    setBrushSize(
      Math.floor(Math.max(0, Math.min(brushSize + -e.deltaY / 100, 8))),
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    lastPosition.current = {
      x: e.nativeEvent.offsetX / PIXEL_SIZE,
      y: e.nativeEvent.offsetY / PIXEL_SIZE,
    };

    const color = e.buttons === 1 ? value.current : 12;

    drawAt(
      canvas.current!.getContext("2d")!,
      lastPosition.current.x,
      lastPosition.current.y,
      brushSize,
      color,
    );

    value.current += CHANGE_RATE * 10;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <canvas
        ref={canvas}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onPointerMove={handlePointerMove}
        onPointerUp={() => (lastPosition.current = null)}
        onPointerDown={handlePointerDown}
        onContextMenu={(e) => e.preventDefault()}
        onWheel={handleWheel}
      />
    </div>
  );
}
