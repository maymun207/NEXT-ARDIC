import Image from "next/image";

export default function GlassCardsTransition() {
  return (
    <section
      style={{
        width: "100%",
        height: "clamp(200px, 25vh, 340px)",
        position: "relative",
        background: "#0a0a0a",
        overflow: "hidden",
        lineHeight: 0,
      }}
    >
      <Image
        src="/images/3cardsBlack.jpeg"
        alt="IoT makes things visible — AI makes data understandable — AIoT makes operations adaptive"
        fill
        style={{
          objectFit: "contain",
          objectPosition: "center center",
        }}
        sizes="100vw"
        priority
      />
    </section>
  );
}
