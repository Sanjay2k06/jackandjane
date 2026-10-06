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
  sizeClass = "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 xl:w-16 xl:h-16",
}: FloatingProps) {
  const item = getCartoon(cartoonId);

  return (
    <div
      className={`pointer-events-none select-none z-[5] ${className}`}
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
          <div className="relative rounded-2xl sm:rounded-3xl p-1 bg-white border-2 border-foreground/25 shadow-[3px_3px_0_rgba(28,29,46,0.20),0_8px_18px_rgba(28,29,46,0.08)] ring-1 ring-white/90">
            <img
              src={item.src}
              alt={item.alt}
              onError={(e) => {
                const current = e.currentTarget.src;
                if (current.includes("/assets/cartoons/")) {
                  e.currentTarget.src = current.replace("/assets/cartoons/", "/cartoons/");
                } else if (current.includes("/cartoons/")) {
                  e.currentTarget.src = current.replace("/cartoons/", "/assets/cartoons/");
                }
              }}
              className={`${sizeClass} rounded-xl object-cover`}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARTOON DECORATIONS:
   - Same design, same placement system on desktop and mobile.
   - On mobile, cartoons use safe margin offsets and float with 50% gentler
     movement (translateY -5px to -7px, rotate 1deg to 1.8deg) to eliminate jitter.
   - Desktop layout & full animation intensity remain 100% preserved.
   ========================================================================= */

// 1. Hero Section (Cartoons 1 - 5)
export function HeroCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={1}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-10 2xl:left-16 top-20 sm:top-24 md:top-32"
        animClass="float-anim-1"
        delay="0s"
        rotation="-3deg"
      />
      <FloatingCartoon
        cartoonId={2}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-14 2xl:left-22 bottom-12 sm:bottom-16 md:bottom-24"
        animClass="float-anim-3"
        delay="1.2s"
        rotation="2.5deg"
      />
      <FloatingCartoon
        cartoonId={3}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-10 2xl:right-16 top-24 sm:top-28 md:top-36"
        animClass="float-anim-5"
        delay="2.1s"
        rotation="-2.5deg"
      />
      <FloatingCartoon
        cartoonId={4}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-14 2xl:right-22 bottom-16 sm:bottom-20 md:bottom-28"
        animClass="float-anim-7"
        delay="0.8s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={5}
        className="absolute left-3 sm:left-5 md:left-6 xl:left-12 2xl:left-20 top-1/2 -translate-y-1/2"
        animClass="float-anim-2"
        delay="1.6s"
        rotation="2.5deg"
      />
    </>
  );
}

// 2. About Section (Cartoons 6 - 10)
export function AboutCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={6}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-12 2xl:left-18 top-20 sm:top-28 md:top-36"
        animClass="float-anim-4"
        delay="0.4s"
        rotation="-2.5deg"
      />
      <FloatingCartoon
        cartoonId={7}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-16 2xl:left-24 bottom-16 sm:bottom-24 md:bottom-32"
        animClass="float-anim-8"
        delay="1.7s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={8}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-12 2xl:right-18 top-24 sm:top-32 md:top-40"
        animClass="float-anim-2"
        delay="1.0s"
        rotation="2.5deg"
      />
      <FloatingCartoon
        cartoonId={9}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-16 2xl:right-24 bottom-20 sm:bottom-28 md:bottom-36"
        animClass="float-anim-6"
        delay="2.3s"
        rotation="-3deg"
      />
      <FloatingCartoon
        cartoonId={10}
        className="absolute right-3 sm:right-5 md:right-6 xl:right-12 2xl:right-20 top-1/2 -translate-y-1/2"
        animClass="float-anim-1"
        delay="2.8s"
        rotation="-2.5deg"
      />
    </>
  );
}

// 3. Services Section (Cartoons 11 - 15)
export function ServicesCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={11}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-12 2xl:left-18 top-16 sm:top-20 md:top-28"
        animClass="float-anim-1"
        delay="0.5s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={12}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-16 2xl:left-24 bottom-16 sm:bottom-20 md:bottom-28"
        animClass="float-anim-3"
        delay="1.8s"
        rotation="-2.5deg"
      />
      <FloatingCartoon
        cartoonId={13}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-12 2xl:right-18 top-20 sm:top-24 md:top-36"
        animClass="float-anim-5"
        delay="0.9s"
        rotation="-3deg"
      />
      <FloatingCartoon
        cartoonId={14}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-16 2xl:right-24 bottom-18 sm:bottom-24 md:bottom-32"
        animClass="float-anim-7"
        delay="2.2s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={15}
        className="absolute left-2.5 sm:left-4 md:left-5 xl:left-10 2xl:left-14 top-[50%] -translate-y-1/2"
        animClass="float-anim-2"
        delay="1.4s"
        rotation="2deg"
      />
    </>
  );
}

// 4. Programs Section (Cartoons 16 - 20)
export function ProgramsCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={16}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-12 2xl:left-18 top-14 sm:top-16 md:top-24"
        animClass="float-anim-4"
        delay="0.3s"
        rotation="-2.5deg"
      />
      <FloatingCartoon
        cartoonId={17}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-16 2xl:left-24 bottom-14 sm:bottom-16 md:bottom-24"
        animClass="float-anim-6"
        delay="2.4s"
        rotation="2.5deg"
      />
      <FloatingCartoon
        cartoonId={18}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-12 2xl:right-18 top-16 sm:top-20 md:top-28"
        animClass="float-anim-2"
        delay="0.7s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={19}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-16 2xl:right-24 bottom-16 sm:bottom-20 md:bottom-28"
        animClass="float-anim-8"
        delay="2.1s"
        rotation="-3deg"
      />
      <FloatingCartoon
        cartoonId={20}
        className="absolute right-2.5 sm:right-4 md:right-5 xl:right-10 2xl:right-14 top-[50%] -translate-y-1/2"
        animClass="float-anim-1"
        delay="1.5s"
        rotation="-2deg"
      />
    </>
  );
}

// 5. Approach Section (Cartoons 21 - 25)
export function ApproachCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={21}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-12 2xl:left-18 top-18 sm:top-24 md:top-36"
        animClass="float-anim-3"
        delay="0.6s"
        rotation="-3deg"
      />
      <FloatingCartoon
        cartoonId={22}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-16 2xl:left-24 bottom-18 sm:bottom-24 md:bottom-36"
        animClass="float-anim-7"
        delay="2.0s"
        rotation="2.5deg"
      />
      <FloatingCartoon
        cartoonId={23}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-12 2xl:right-18 top-20 sm:top-28 md:top-40"
        animClass="float-anim-5"
        delay="1.1s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={24}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-16 2xl:right-24 bottom-20 sm:bottom-28 md:bottom-40"
        animClass="float-anim-1"
        delay="2.7s"
        rotation="-2.5deg"
      />
      <FloatingCartoon
        cartoonId={25}
        className="absolute left-2.5 sm:left-4 md:left-5 xl:left-10 2xl:left-14 top-[50%] -translate-y-1/2"
        animClass="float-anim-6"
        delay="1.8s"
        rotation="2deg"
      />
    </>
  );
}

// 6. Centres Section (Cartoons 26 - 29)
export function CentresCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={26}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-12 2xl:left-18 top-20 sm:top-28 md:top-36"
        animClass="float-anim-2"
        delay="0.4s"
        rotation="-2.5deg"
      />
      <FloatingCartoon
        cartoonId={27}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-16 2xl:left-24 bottom-16 sm:bottom-20 md:bottom-28"
        animClass="float-anim-8"
        delay="1.9s"
        rotation="3deg"
      />
      <FloatingCartoon
        cartoonId={28}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-12 2xl:right-18 top-22 sm:top-32 md:top-40"
        animClass="float-anim-4"
        delay="1.2s"
        rotation="2.5deg"
      />
      <FloatingCartoon
        cartoonId={29}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-16 2xl:right-24 bottom-18 sm:bottom-24 md:bottom-32"
        animClass="float-anim-6"
        delay="2.5s"
        rotation="-2deg"
      />
    </>
  );
}

// 7. Contact & Footer Section (Cartoons 30 - 33)
export function ContactCartoons() {
  return (
    <>
      <FloatingCartoon
        cartoonId={30}
        className="absolute left-2.5 sm:left-4 md:left-6 xl:left-12 2xl:left-18 top-14 sm:top-16 md:top-24"
        animClass="float-anim-3"
        delay="0.6s"
        rotation="-3deg"
      />
      <FloatingCartoon
        cartoonId={31}
        className="absolute left-3 sm:left-6 md:left-8 xl:left-16 2xl:left-24 bottom-16 sm:bottom-20 md:bottom-28"
        animClass="float-anim-7"
        delay="2.2s"
        rotation="2.5deg"
      />
      <FloatingCartoon
        cartoonId={32}
        className="absolute right-2.5 sm:right-4 md:right-6 xl:right-12 2xl:right-18 top-16 sm:top-20 md:top-28"
        animClass="float-anim-5"
        delay="1.3s"
        rotation="3.5deg"
      />
      <FloatingCartoon
        cartoonId={33}
        className="absolute right-3 sm:right-6 md:right-8 xl:right-16 2xl:right-24 bottom-18 sm:bottom-24 md:bottom-32"
        animClass="float-anim-1"
        delay="2.8s"
        rotation="-2.5deg"
      />
    </>
  );
}
