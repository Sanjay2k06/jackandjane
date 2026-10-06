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
  sizeClass = "w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] lg:w-14 lg:h-14 xl:w-16 xl:h-16",
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
   PROTECTED CONTENT LAYOUT:
   - On Desktop (lg and up): Cartoons float primarily along outer left & right margins.
   - On Mobile (< lg): All 33 cartoon images are clearly visible (60–90px size)
     positioned safely along the left and right outer margins with safe viewport inset,
     alternating down each section without covering headings, cards, buttons or map.
   - Desktop layout & appearance are 100% preserved.
   ========================================================================= */

// 1. Hero Section (Cartoons 1 - 5)
export function HeroCartoons() {
  return (
    <>
      {/* 1. Cartoon 1 - Top Right on Mobile, Outer Left on Desktop */}
      <FloatingCartoon
        cartoonId={1}
        className="absolute right-2.5 sm:right-4 lg:left-6 xl:left-10 2xl:left-16 lg:right-auto top-20 sm:top-24 md:top-32"
        animClass="float-anim-1"
        delay="0s"
        rotation="-4deg"
        sizeClass="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 2. Cartoon 2 - Left Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={2}
        className="absolute left-2.5 sm:left-4 lg:left-8 xl:left-14 2xl:left-22 top-[34%] sm:top-[32%] lg:top-auto lg:bottom-16 md:bottom-24"
        animClass="float-anim-3"
        delay="1.2s"
        rotation="4deg"
        sizeClass="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] lg:w-14 lg:h-14 xl:w-18 xl:h-18"
      />
      {/* 3. Cartoon 3 - Right Mid on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={3}
        className="absolute right-2.5 sm:right-4 xl:left-auto lg:right-6 xl:right-10 2xl:right-16 top-[52%] sm:top-[50%] lg:top-28 md:top-36"
        animClass="float-anim-5"
        delay="2.1s"
        rotation="-3deg"
        sizeClass="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 4. Cartoon 4 - Left Lower on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={4}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-8 xl:right-14 2xl:right-22 bottom-20 sm:bottom-24 md:bottom-28"
        animClass="float-anim-7"
        delay="0.8s"
        rotation="5deg"
        sizeClass="w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
      {/* 5. Cartoon 5 - Right Bottom on Mobile, Outer Left Mid on Desktop */}
      <FloatingCartoon
        cartoonId={5}
        className="absolute right-2.5 sm:right-4 lg:right-auto lg:left-6 xl:left-12 2xl:left-20 bottom-4 sm:bottom-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
        animClass="float-anim-2"
        delay="1.6s"
        rotation="-4deg"
        sizeClass="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] lg:w-12 lg:h-12 xl:w-16 xl:h-16"
      />
    </>
  );
}

// 2. About Section (Cartoons 6 - 10)
export function AboutCartoons() {
  return (
    <>
      {/* 6. Cartoon 6 - Top Right on Mobile, Outer Left Upper on Desktop */}
      <FloatingCartoon
        cartoonId={6}
        className="absolute right-2.5 sm:right-4 lg:left-6 xl:left-12 2xl:left-18 lg:right-auto top-8 sm:top-12 lg:top-28 md:top-36"
        animClass="float-anim-4"
        delay="0.4s"
        rotation="-4deg"
        sizeClass="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 7. Cartoon 7 - Left Upper-Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={7}
        className="absolute left-2.5 sm:left-4 lg:left-8 xl:left-16 2xl:left-24 top-[22%] lg:top-auto lg:bottom-24 md:bottom-32"
        animClass="float-anim-8"
        delay="1.7s"
        rotation="5deg"
        sizeClass="w-[78px] h-[78px] sm:w-[86px] sm:h-[86px] lg:w-14 lg:h-14 xl:w-18 xl:h-18"
      />
      {/* 8. Cartoon 8 - Right Mid on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={8}
        className="absolute right-2.5 sm:right-4 lg:right-6 xl:right-12 2xl:right-18 top-[44%] lg:top-32 md:top-40"
        animClass="float-anim-2"
        delay="1.0s"
        rotation="4deg"
        sizeClass="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 9. Cartoon 9 - Left Lower-Mid on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={9}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-8 xl:right-16 2xl:right-24 top-[68%] lg:top-auto lg:bottom-28 md:bottom-36"
        animClass="float-anim-6"
        delay="2.3s"
        rotation="-5deg"
        sizeClass="w-[82px] h-[82px] sm:w-[88px] sm:h-[88px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
      {/* 10. Cartoon 10 - Right Bottom on Mobile, Outer Right Mid on Desktop */}
      <FloatingCartoon
        cartoonId={10}
        className="absolute right-2.5 sm:right-4 lg:right-6 xl:right-12 2xl:right-20 bottom-8 sm:bottom-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
        animClass="float-anim-1"
        delay="2.8s"
        rotation="-4deg"
        sizeClass="w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] lg:w-12 lg:h-12 xl:w-16 xl:h-16"
      />
    </>
  );
}

// 3. Services Section (Cartoons 11 - 15)
export function ServicesCartoons() {
  return (
    <>
      {/* 11. Cartoon 11 - Top Right on Mobile, Outer Left Upper on Desktop */}
      <FloatingCartoon
        cartoonId={11}
        className="absolute right-2.5 sm:right-4 lg:left-6 xl:left-12 2xl:left-18 lg:right-auto top-14 sm:top-18 lg:top-20 md:top-28"
        animClass="float-anim-1"
        delay="0.5s"
        rotation="5deg"
        sizeClass="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 12. Cartoon 12 - Left Upper-Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={12}
        className="absolute left-2.5 sm:left-4 lg:left-8 xl:left-16 2xl:left-24 top-[32%] sm:top-[30%] lg:top-auto lg:bottom-20 md:bottom-28"
        animClass="float-anim-3"
        delay="1.8s"
        rotation="-4deg"
        sizeClass="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
      {/* 13. Cartoon 13 - Right Mid on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={13}
        className="absolute right-2.5 sm:right-4 lg:right-6 xl:right-12 2xl:right-18 top-[50%] sm:top-[48%] lg:top-24 md:top-36"
        animClass="float-anim-5"
        delay="0.9s"
        rotation="-5deg"
        sizeClass="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 14. Cartoon 14 - Left Lower on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={14}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-8 xl:right-16 2xl:right-24 bottom-22 sm:bottom-26 lg:bottom-24 md:bottom-32"
        animClass="float-anim-7"
        delay="2.2s"
        rotation="6deg"
        sizeClass="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] lg:w-14 lg:h-14 xl:w-17 xl:h-17"
      />
      {/* 15. Cartoon 15 - Right Bottom on Mobile, Outer Left Mid on Desktop */}
      <FloatingCartoon
        cartoonId={15}
        className="absolute right-2.5 sm:right-4 lg:right-auto lg:left-5 xl:left-10 2xl:left-14 bottom-6 sm:bottom-8 lg:bottom-auto lg:top-[50%] lg:-translate-y-1/2"
        animClass="float-anim-2"
        delay="1.4s"
        rotation="3deg"
        sizeClass="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 4. Programs Section (Cartoons 16 - 20)
export function ProgramsCartoons() {
  return (
    <>
      {/* 16. Cartoon 16 - Top Right on Mobile, Outer Left Upper on Desktop */}
      <FloatingCartoon
        cartoonId={16}
        className="absolute right-2.5 sm:right-4 lg:left-6 xl:left-12 2xl:left-18 lg:right-auto top-12 sm:top-16 lg:top-16 md:top-24"
        animClass="float-anim-4"
        delay="0.3s"
        rotation="-4deg"
        sizeClass="w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 17. Cartoon 17 - Left Upper-Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={17}
        className="absolute left-2.5 sm:left-4 lg:left-8 xl:left-16 2xl:left-24 top-[30%] sm:top-[28%] lg:top-auto lg:bottom-16 md:bottom-24"
        animClass="float-anim-6"
        delay="2.4s"
        rotation="3deg"
        sizeClass="w-[82px] h-[82px] sm:w-[88px] sm:h-[88px] lg:w-14 lg:h-14 xl:w-17 xl:h-17"
      />
      {/* 18. Cartoon 18 - Right Mid on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={18}
        className="absolute right-2.5 sm:right-4 lg:right-6 xl:right-12 2xl:right-18 top-[48%] sm:top-[46%] lg:top-20 md:top-28"
        animClass="float-anim-2"
        delay="0.7s"
        rotation="5deg"
        sizeClass="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 19. Cartoon 19 - Left Lower on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={19}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-8 xl:right-16 2xl:right-24 bottom-20 sm:bottom-24 lg:bottom-20 md:bottom-28"
        animClass="float-anim-8"
        delay="2.1s"
        rotation="-5deg"
        sizeClass="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 20. Cartoon 20 - Right Bottom on Mobile, Outer Right Mid on Desktop */}
      <FloatingCartoon
        cartoonId={20}
        className="absolute right-2.5 sm:right-4 lg:right-5 xl:right-10 2xl:right-14 bottom-5 sm:bottom-7 lg:bottom-auto lg:top-[50%] lg:-translate-y-1/2"
        animClass="float-anim-1"
        delay="1.5s"
        rotation="-3deg"
        sizeClass="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 5. Approach Section (Cartoons 21 - 25)
export function ApproachCartoons() {
  return (
    <>
      {/* 21. Cartoon 21 - Left Top on Mobile, Outer Left Upper on Desktop */}
      <FloatingCartoon
        cartoonId={21}
        className="absolute left-2.5 sm:left-4 lg:left-6 xl:left-12 2xl:left-18 top-14 sm:top-18 lg:top-24 md:top-36"
        animClass="float-anim-3"
        delay="0.6s"
        rotation="-5deg"
        sizeClass="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 22. Cartoon 22 - Right Upper-Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={22}
        className="absolute right-2.5 sm:right-4 lg:left-8 xl:left-16 2xl:left-24 lg:right-auto top-[30%] sm:top-[28%] lg:top-auto lg:bottom-24 md:bottom-36"
        animClass="float-anim-7"
        delay="2.0s"
        rotation="4deg"
        sizeClass="w-[78px] h-[78px] sm:w-[86px] sm:h-[86px] lg:w-14 lg:h-14 xl:w-17 xl:h-17"
      />
      {/* 23. Cartoon 23 - Left Mid on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={23}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-6 xl:right-12 2xl:right-18 top-[50%] sm:top-[48%] lg:top-28 md:top-40"
        animClass="float-anim-5"
        delay="1.1s"
        rotation="5deg"
        sizeClass="w-[84px] h-[84px] sm:w-[90px] sm:h-[90px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 24. Cartoon 24 - Right Lower on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={24}
        className="absolute right-2.5 sm:right-4 lg:right-8 xl:right-16 2xl:right-24 bottom-22 sm:bottom-26 lg:bottom-28 md:bottom-40"
        animClass="float-anim-1"
        delay="2.7s"
        rotation="-4deg"
        sizeClass="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 25. Cartoon 25 - Left Bottom on Mobile, Outer Left Mid on Desktop */}
      <FloatingCartoon
        cartoonId={25}
        className="absolute left-2.5 sm:left-4 lg:left-5 xl:left-10 2xl:left-14 bottom-6 sm:bottom-8 lg:bottom-auto lg:top-[50%] lg:-translate-y-1/2"
        animClass="float-anim-6"
        delay="1.8s"
        rotation="3deg"
        sizeClass="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 6. Centres Section (Cartoons 26 - 29)
export function CentresCartoons() {
  return (
    <>
      {/* 26. Cartoon 26 - Top Right on Mobile, Outer Left Upper on Desktop */}
      <FloatingCartoon
        cartoonId={26}
        className="absolute right-2.5 sm:right-4 lg:left-6 xl:left-12 2xl:left-18 lg:right-auto top-8 sm:top-12 lg:top-28 md:top-36"
        animClass="float-anim-2"
        delay="0.4s"
        rotation="-4deg"
        sizeClass="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 27. Cartoon 27 - Left Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={27}
        className="absolute left-2.5 sm:left-4 lg:left-8 xl:left-16 2xl:left-24 top-[36%] sm:top-[34%] lg:top-auto lg:bottom-20 md:bottom-28"
        animClass="float-anim-8"
        delay="1.9s"
        rotation="5deg"
        sizeClass="w-[82px] h-[82px] sm:w-[88px] sm:h-[88px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 28. Cartoon 28 - Right Mid on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={28}
        className="absolute right-2.5 sm:right-4 lg:right-6 xl:right-12 2xl:right-18 top-[64%] sm:top-[62%] lg:top-32 md:top-40"
        animClass="float-anim-4"
        delay="1.2s"
        rotation="4deg"
        sizeClass="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 29. Cartoon 29 - Left Bottom on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={29}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-8 xl:right-16 2xl:right-24 bottom-6 sm:bottom-10 lg:bottom-24 md:bottom-32"
        animClass="float-anim-6"
        delay="2.5s"
        rotation="-3deg"
        sizeClass="w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
    </>
  );
}

// 7. Contact & Footer Section (Cartoons 30 - 33)
export function ContactCartoons() {
  return (
    <>
      {/* 30. Cartoon 30 - Top Right on Mobile, Outer Left Upper on Desktop */}
      <FloatingCartoon
        cartoonId={30}
        className="absolute right-2.5 sm:right-4 lg:left-6 xl:left-12 2xl:left-18 lg:right-auto top-8 sm:top-12 lg:top-16 md:top-24"
        animClass="float-anim-3"
        delay="0.6s"
        rotation="-5deg"
        sizeClass="w-[78px] h-[78px] sm:w-[86px] sm:h-[86px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 31. Cartoon 31 - Left Mid on Mobile, Outer Left Lower on Desktop */}
      <FloatingCartoon
        cartoonId={31}
        className="absolute left-2.5 sm:left-4 lg:left-8 xl:left-16 2xl:left-24 top-[32%] sm:top-[30%] lg:top-auto lg:bottom-20 md:bottom-28"
        animClass="float-anim-7"
        delay="2.2s"
        rotation="4deg"
        sizeClass="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] lg:w-12 lg:h-12 xl:w-15 xl:h-15"
      />
      {/* 32. Cartoon 32 - Right Lower on Mobile, Outer Right Upper on Desktop */}
      <FloatingCartoon
        cartoonId={32}
        className="absolute right-2.5 sm:right-4 lg:right-6 xl:right-12 2xl:right-18 top-[60%] sm:top-[58%] lg:top-20 md:top-28"
        animClass="float-anim-5"
        delay="1.3s"
        rotation="6deg"
        sizeClass="w-[84px] h-[84px] sm:w-[90px] sm:h-[90px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
      {/* 33. Cartoon 33 - Left Bottom on Mobile, Outer Right Lower on Desktop */}
      <FloatingCartoon
        cartoonId={33}
        className="absolute left-2.5 sm:left-4 lg:left-auto lg:right-8 xl:right-16 2xl:right-24 bottom-6 sm:bottom-10 lg:bottom-24 md:bottom-32"
        animClass="float-anim-1"
        delay="2.8s"
        rotation="-4deg"
        sizeClass="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] lg:w-13 lg:h-13 xl:w-16 xl:h-16"
      />
    </>
  );
}
