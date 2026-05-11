import Image from "next/image";

export function ParallaxHero({ src, alt, imageClassName = "" }) {
  return (
    // Outer div extends beyond section bounds to give room for parallax movement
    <div className="absolute" style={{ inset: "-12%", willChange: "transform" }}>
      {/* GSAP animates yPercent via data-scrub-y — compatible with Locomotive Scroll */}
      <div
        data-scrub-y="-8, 8"
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${imageClassName}`}
        />
      </div>
    </div>
  );
}
