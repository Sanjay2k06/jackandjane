import React from "react";
import { ALL_CARTOONS, getCartoon, type CartoonItem } from "../data/cartoons";

export { ALL_CARTOONS, getCartoon, type CartoonItem };

interface FloatingProps {
  cartoonId: number;
  className?: string;
  animClass?: string;
  delay?: string;
  rotation?: string;
  sizeClass?: string;
}

export function FloatingCartoon({
  cartoonId,
  className = "",
  animClass = "float-anim-1",
  delay = "0s",
  rotation = "0deg",
  sizeClass = "w-12 h-12 md:w-15 md:h-15 xl:w-16 xl:h-16",
}: FloatingProps) {
  const item = getCartoon(cartoonId);

  return (
    <div
      className={`pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div
        className={animClass}
        style={{
          animationDelay: delay,
        }}
      >
        <div
          style={{ transform: `rotate(${rotation})` }}
          className="transition-transform duration-500 ease-out"
        >
          <img
            src={item.src}
            alt={item.alt}
            className={`${sizeClass} rounded-2xl border border-foreground/15 object-cover shadow-[4px_4px_0_rgba(28,29,46,0.10)] bg-card/90 backdrop-blur-xs ring-1 ring-white/70`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PROTECTED CONTENT LAYOUT: OUTER MARGIN PLACEMENTS
   Cartoons decorate ONLY the outer left and right whitespace margins.
   The center content area is a strictly protected zone: no cartoons
   over headings, paragraphs, cards, buttons, images, or map elements.
   All 33 cartoon images are distributed vertically throughout the page.
   ========================================================================= */

// 1. Hero Section (Cartoons 1 - 5)
// Positioned in the outer left & right margins flanking hero content & image
export function HeroCartoons() {
  return (
    <>
      {/* Outer Left Upper: Red Dragon (flanking above heading) */}
      <FloatingCartoon
        cartoonId={1}
        className="absolute left-6 xl:left-10 2xl:left-16 top-24 md:top-32 hidden lg:block"
        animClass="float-anim-1"
        delay="0s"
        rotation="-5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: Cute Elephant (flanking below CTA buttons) */}
      <FloatingCartoon
        cartoonId={2}
        className="absolute left-8 xl:left-14 2xl:left-22 bottom-16 md:bottom-24 hidden lg:block"
        animClass="float-anim-3"
        delay="1.2s"
        rotation="4deg"
        sizeClass="w-14 h-14 xl:w-18 xl:h-18"
      />
      {/* Outer Right Upper: Ice Bear (flanking right above hero image) */}
      <FloatingCartoon
        cartoonId={3}
        className="absolute right-6 xl:left-auto xl:right-10 2xl:right-16 top-28 md:top-36 hidden lg:block"
        animClass="float-anim-5"
        delay="2.1s"
        rotation="-4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Iron Man Chibi (flanking right below hero image) */}
      <FloatingCartoon
        cartoonId={4}
        className="absolute right-8 xl:left-auto xl:right-14 2xl:right-22 bottom-20 md:bottom-28 hidden lg:block"
        animClass="float-anim-7"
        delay="0.8s"
        rotation="5deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
      {/* Outer Left Mid: Ponpon (extra wide viewport margin accent) */}
      <FloatingCartoon
        cartoonId={5}
        className="absolute left-6 xl:left-12 2xl:left-20 top-1/2 -translate-y-1/2 hidden 2xl:block"
        animClass="float-anim-2"
        delay="1.6s"
        rotation="4deg"
        sizeClass="w-12 h-12 xl:w-16 xl:h-16"
      />
    </>
  );
}

// 2. About Section (Cartoons 6 - 10)
// Positioned in the outer margins flanking the About headline and gallery
export function AboutCartoons() {
  return (
    <>
      {/* Outer Left Upper: Panda (flanking About heading on left) */}
      <FloatingCartoon
        cartoonId={6}
        className="absolute left-6 xl:left-12 2xl:left-18 top-28 md:top-36 hidden lg:block"
        animClass="float-anim-4"
        delay="0.4s"
        rotation="-4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: Unicorn (flanking gallery cards on left) */}
      <FloatingCartoon
        cartoonId={7}
        className="absolute left-8 xl:left-16 2xl:left-24 bottom-24 md:bottom-32 hidden lg:block"
        animClass="float-anim-8"
        delay="1.7s"
        rotation="6deg"
        sizeClass="w-14 h-14 xl:w-18 xl:h-18"
      />
      {/* Outer Right Upper: Cool Grizzly (flanking About heading on right) */}
      <FloatingCartoon
        cartoonId={8}
        className="absolute right-6 xl:right-12 2xl:right-18 top-32 md:top-40 hidden lg:block"
        animClass="float-anim-2"
        delay="1.0s"
        rotation="4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Duck (flanking gallery cards on right) */}
      <FloatingCartoon
        cartoonId={9}
        className="absolute right-8 xl:right-16 2xl:right-24 bottom-28 md:bottom-36 hidden lg:block"
        animClass="float-anim-6"
        delay="2.3s"
        rotation="-5deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
      {/* Outer Right Mid: Kawaii Sticker (extra wide viewport margin accent) */}
      <FloatingCartoon
        cartoonId={10}
        className="absolute right-6 xl:right-12 2xl:right-20 top-1/2 -translate-y-1/2 hidden 2xl:block"
        animClass="float-anim-1"
        delay="2.8s"
        rotation="-4deg"
        sizeClass="w-12 h-12 xl:w-16 xl:h-16"
      />
    </>
  );
}

// 3. Services Section (Cartoons 11 - 15)
// Positioned in the outer gutters flanking the sticky stacked cards
export function ServicesCartoons() {
  return (
    <>
      {/* Outer Left Upper: Friend 11 */}
      <FloatingCartoon
        cartoonId={11}
        className="absolute left-6 xl:left-12 2xl:left-18 top-20 md:top-28 hidden lg:block"
        animClass="float-anim-1"
        delay="0.5s"
        rotation="5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: Friend 12 */}
      <FloatingCartoon
        cartoonId={12}
        className="absolute left-8 xl:left-16 2xl:left-24 bottom-20 md:bottom-28 hidden lg:block"
        animClass="float-anim-3"
        delay="1.8s"
        rotation="-4deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
      {/* Outer Right Upper: Ice Bear */}
      <FloatingCartoon
        cartoonId={13}
        className="absolute right-6 xl:right-12 2xl:right-18 top-24 md:top-36 hidden lg:block"
        animClass="float-anim-5"
        delay="0.9s"
        rotation="-5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Panda */}
      <FloatingCartoon
        cartoonId={14}
        className="absolute right-8 xl:right-16 2xl:right-24 bottom-24 md:bottom-32 hidden lg:block"
        animClass="float-anim-7"
        delay="2.2s"
        rotation="6deg"
        sizeClass="w-14 h-14 xl:w-17 xl:h-17"
      />
      {/* Outer Left Mid: Ponpon (extra wide viewport accent) */}
      <FloatingCartoon
        cartoonId={15}
        className="absolute left-5 xl:left-10 2xl:left-14 top-[50%] -translate-y-1/2 hidden 2xl:block"
        animClass="float-anim-2"
        delay="1.4s"
        rotation="3deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 4. Programs Section (Cartoons 16 - 20)
// Positioned in the outer margins flanking the 3D program pathway cards
export function ProgramsCartoons() {
  return (
    <>
      {/* Outer Left Upper: Teddy Plushie */}
      <FloatingCartoon
        cartoonId={16}
        className="absolute left-6 xl:left-12 2xl:left-18 top-16 md:top-24 hidden lg:block"
        animClass="float-anim-4"
        delay="0.3s"
        rotation="-4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: We Bare Bears Grizzly */}
      <FloatingCartoon
        cartoonId={17}
        className="absolute left-8 xl:left-16 2xl:left-24 bottom-16 md:bottom-24 hidden lg:block"
        animClass="float-anim-6"
        delay="2.4s"
        rotation="3deg"
        sizeClass="w-14 h-14 xl:w-17 xl:h-17"
      />
      {/* Outer Right Upper: Wolverine Chibi */}
      <FloatingCartoon
        cartoonId={18}
        className="absolute right-6 xl:right-12 2xl:right-18 top-20 md:top-28 hidden lg:block"
        animClass="float-anim-2"
        delay="0.7s"
        rotation="5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Ai Art */}
      <FloatingCartoon
        cartoonId={19}
        className="absolute right-8 xl:right-16 2xl:right-24 bottom-20 md:bottom-28 hidden lg:block"
        animClass="float-anim-8"
        delay="2.1s"
        rotation="-5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Mid: Kawaii Memo Stickers (extra wide viewport accent) */}
      <FloatingCartoon
        cartoonId={20}
        className="absolute right-5 xl:right-10 2xl:right-14 top-[50%] -translate-y-1/2 hidden 2xl:block"
        animClass="float-anim-1"
        delay="1.5s"
        rotation="-3deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 5. Approach Section (Cartoons 21 - 25)
// Positioned in the outer margins flanking the 4-stage circular reveal
export function ApproachCartoons() {
  return (
    <>
      {/* Outer Left Upper: Friend 21 */}
      <FloatingCartoon
        cartoonId={21}
        className="absolute left-6 xl:left-12 2xl:left-18 top-24 md:top-36 hidden lg:block"
        animClass="float-anim-3"
        delay="0.6s"
        rotation="-5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: Elephant Friend 22 */}
      <FloatingCartoon
        cartoonId={22}
        className="absolute left-8 xl:left-16 2xl:left-24 bottom-24 md:bottom-36 hidden lg:block"
        animClass="float-anim-7"
        delay="2.0s"
        rotation="4deg"
        sizeClass="w-14 h-14 xl:w-17 xl:h-17"
      />
      {/* Outer Right Upper: Friend 23 */}
      <FloatingCartoon
        cartoonId={23}
        className="absolute right-6 xl:right-12 2xl:right-18 top-28 md:top-40 hidden lg:block"
        animClass="float-anim-5"
        delay="1.1s"
        rotation="5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Friend 24 */}
      <FloatingCartoon
        cartoonId={24}
        className="absolute right-8 xl:right-16 2xl:right-24 bottom-28 md:bottom-40 hidden lg:block"
        animClass="float-anim-1"
        delay="2.7s"
        rotation="-4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Mid: Friend 25 (extra wide viewport accent) */}
      <FloatingCartoon
        cartoonId={25}
        className="absolute left-5 xl:left-10 2xl:left-14 top-[50%] -translate-y-1/2 hidden 2xl:block"
        animClass="float-anim-6"
        delay="1.8s"
        rotation="3deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 6. Centres Section (Cartoons 26 - 29)
// Positioned in the outer margins flanking the location cards and interactive map
export function CentresCartoons() {
  return (
    <>
      {/* Outer Left Upper: Friend 26 */}
      <FloatingCartoon
        cartoonId={26}
        className="absolute left-6 xl:left-12 2xl:left-18 top-28 md:top-36 hidden lg:block"
        animClass="float-anim-2"
        delay="0.4s"
        rotation="-4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: Friend 27 */}
      <FloatingCartoon
        cartoonId={27}
        className="absolute left-8 xl:left-16 2xl:left-24 bottom-20 md:bottom-28 hidden lg:block"
        animClass="float-anim-8"
        delay="1.9s"
        rotation="5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Upper: Friend 28 */}
      <FloatingCartoon
        cartoonId={28}
        className="absolute right-6 xl:right-12 2xl:right-18 top-32 md:top-40 hidden lg:block"
        animClass="float-anim-4"
        delay="1.2s"
        rotation="4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Friend 29 */}
      <FloatingCartoon
        cartoonId={29}
        className="absolute right-8 xl:right-16 2xl:right-24 bottom-24 md:bottom-32 hidden lg:block"
        animClass="float-anim-6"
        delay="2.5s"
        rotation="-3deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 7. Contact & Footer Section (Cartoons 30 - 33)
// Positioned in the outer margins flanking Get In Touch and footer
export function ContactCartoons() {
  return (
    <>
      {/* Outer Left Upper: Friend 30 */}
      <FloatingCartoon
        cartoonId={30}
        className="absolute left-6 xl:left-12 2xl:left-18 top-16 md:top-24 hidden lg:block"
        animClass="float-anim-3"
        delay="0.6s"
        rotation="-5deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Left Lower: Friend 31 */}
      <FloatingCartoon
        cartoonId={31}
        className="absolute left-8 xl:left-16 2xl:left-24 bottom-20 md:bottom-28 hidden lg:block"
        animClass="float-anim-7"
        delay="2.2s"
        rotation="4deg"
        sizeClass="w-12 h-12 xl:w-15 xl:h-15"
      />
      {/* Outer Right Upper: Friend 32 */}
      <FloatingCartoon
        cartoonId={32}
        className="absolute right-6 xl:right-12 2xl:right-18 top-20 md:top-28 hidden lg:block"
        animClass="float-anim-5"
        delay="1.3s"
        rotation="6deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
      {/* Outer Right Lower: Friend 33 */}
      <FloatingCartoon
        cartoonId={33}
        className="absolute right-8 xl:right-16 2xl:right-24 bottom-24 md:bottom-32 hidden lg:block"
        animClass="float-anim-1"
        delay="2.8s"
        rotation="-4deg"
        sizeClass="w-13 h-13 xl:w-16 xl:h-16"
      />
    </>
  );
}
