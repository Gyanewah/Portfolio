// <picture> with AVIF + WebP sources from files made by `npm run images` (name-<width>.avif/.webp).
export default function ResponsiveImage({ src, widths, alt, sizes, className, width, height, eager = false }) {
  const set = (ext) => widths.map((w) => `${src}-${w}.${ext} ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        className={className}
        src={`${src}-${widths[0]}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}
