from pathlib import Path

from PIL import Image, ImageDraw


SOURCE = Path(__file__).resolve().parents[1] / "public" / "assets" / "clients"
DESTINATION = SOURCE / "circular"
SUPPORTED = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
CANVAS_SIZE = 480


def circular_crop(image_path: Path, output_path: Path) -> None:
    with Image.open(image_path) as source:
        if getattr(source, "is_animated", False):
            source.seek(0)
        image = source.convert("RGBA")

    crop_size = min(image.size)
    left = (image.width - crop_size) // 2
    top = (image.height - crop_size) // 2
    image = image.crop((left, top, left + crop_size, top + crop_size))
    image = image.resize((CANVAS_SIZE, CANVAS_SIZE), Image.Resampling.LANCZOS)

    mask = Image.new("L", (CANVAS_SIZE, CANVAS_SIZE), 0)
    ImageDraw.Draw(mask).ellipse((2, 2, CANVAS_SIZE - 3, CANVAS_SIZE - 3), fill=255)
    image.putalpha(mask)
    image.save(output_path, "PNG", optimize=True)


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    source_images = sorted(
        path for path in SOURCE.iterdir() if path.is_file() and path.suffix.lower() in SUPPORTED
    )
    for image_path in source_images:
        circular_crop(image_path, DESTINATION / f"{image_path.stem}.png")
    print(f"Created {len(source_images)} circular client images in {DESTINATION}")


if __name__ == "__main__":
    main()
