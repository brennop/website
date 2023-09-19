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

export function draw(
  context: CanvasRenderingContext2D,
  data: Float32Array,
  t: number,
) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const value = data[i + j * SIZE];

      for (let k = 0; k < DITHER_SCALE * DITHER_SCALE; k++) {
        const newValue =
          value +
          bayerMatrix[k % DITHER_SCALE][Math.floor(k / DITHER_SCALE)] /
            (DITHER_SCALE * DITHER_SCALE);
        const color = pallet[Math.floor(newValue) & 0xf];
        context.fillStyle = color;
        context.fillRect(
          i * PIXEL_SIZE + ((k % DITHER_SCALE) * PIXEL_SIZE) / DITHER_SCALE,
          j * PIXEL_SIZE +
            (Math.floor(k / DITHER_SCALE) * PIXEL_SIZE) / DITHER_SCALE,
          PIXEL_SIZE / DITHER_SCALE,
          PIXEL_SIZE / DITHER_SCALE,
        );
      }
    }
  }
}

function drawAt(
  data: Float32Array,
  x: number,
  y: number,
  size: number,
  value: number,
) {
  for (let i = -size; i < size; i++) {
    for (let j = -size; j < size; j++) {
      if (i * i + j * j < size * size) {
        const index = Math.floor(x + i) + Math.floor(y + j) * SIZE;
        data[index] = value;
      }
    }
  }
}

export default function Paint() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number | null>(null);
  const lastPosition = useRef<{ x: number; y: number } | null>({ x: 0, y: 0 });
  const value = useRef(0);

  const data = useRef<Float32Array>(
    new Float32Array(CANVAS_SIZE * CANVAS_SIZE),
  );
  const [brushSize, setBrushSize] = useState(1);

  useEffect(() => {
    draw(canvas.current!.getContext("2d")!, data.current!, 0);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;

    const x = Math.floor(e.nativeEvent.offsetX / PIXEL_SIZE);
    const y = Math.floor(e.nativeEvent.offsetY / PIXEL_SIZE);

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

        drawAt(data.current!, nx, ny, brushSize, value.current);
        lastPosition.current = { x: nx, y: ny };
        value.current += CHANGE_RATE;
      }
    }

    draw(canvas.current!.getContext("2d")!, data.current!, 0);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    setBrushSize(
      Math.floor(Math.max(1, Math.min(brushSize + -e.deltaY / 100, 16))),
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    lastPosition.current = {
      x: e.nativeEvent.offsetX / PIXEL_SIZE,
      y: e.nativeEvent.offsetY / PIXEL_SIZE,
    };

    drawAt(
      data.current!,
      lastPosition.current.x,
      lastPosition.current.y,
      brushSize,
      value.current,
    );

    draw(canvas.current!.getContext("2d")!, data.current!, 0);
    value.current += CHANGE_RATE;
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
        onWheel={handleWheel}
      />
    </div>
  );
}
