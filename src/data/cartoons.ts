/* Auto-generated from cartoon_image/ directory */
export interface CartoonItem {
  id: number;
  src: string;
  alt: string;
}

export const ALL_CARTOONS: CartoonItem[] = [
  {
    "id": 1,
    "src": "/assets/cartoons/cartoon-01.jpg",
    "alt": "Cute Cartoon Red Dragon with Bright Colors and Big Eyes"
  },
  {
    "id": 2,
    "src": "/assets/cartoons/cartoon-02.jpg",
    "alt": "Cute Elephant coloring pages"
  },
  {
    "id": 3,
    "src": "/assets/cartoons/cartoon-03.jpg",
    "alt": "Ice bear angry"
  },
  {
    "id": 4,
    "src": "/assets/cartoons/cartoon-04.jpg",
    "alt": "Imagem gerada com IA do Homem de Ferro"
  },
  {
    "id": 5,
    "src": "/assets/cartoons/cartoon-05.jpg",
    "alt": "Jelly fish coloring pages for kids fun time"
  },
  {
    "id": 6,
    "src": "/assets/cartoons/cartoon-06.jpg",
    "alt": "Panda con Recorte Visual"
  },
  {
    "id": 7,
    "src": "/assets/cartoons/cartoon-07.jpg",
    "alt": "Unicornio"
  },
  {
    "id": 8,
    "src": "/assets/cartoons/cartoon-08.jpg",
    "alt": "We Bare Bears Cool Grizzly Sticker"
  },
  {
    "id": 9,
    "src": "/assets/cartoons/cartoon-09.jpg",
    "alt": "a beautiful duck picture for coming soon"
  },
  {
    "id": 10,
    "src": "/assets/cartoons/cartoon-10.jpg",
    "alt": "Playful Cartoon Friend 10"
  },
  {
    "id": 11,
    "src": "/assets/cartoons/cartoon-11.jpg",
    "alt": "Playful Cartoon Friend 11"
  },
  {
    "id": 12,
    "src": "/assets/cartoons/cartoon-12.jpg",
    "alt": "Playful Cartoon Friend 12"
  },
  {
    "id": 13,
    "src": "/assets/cartoons/cartoon-13.jpg",
    "alt": "Playful Cartoon Friend 13"
  },
  {
    "id": 14,
    "src": "/assets/cartoons/cartoon-14.jpg",
    "alt": "Playful Cartoon Friend 14"
  },
  {
    "id": 15,
    "src": "/assets/cartoons/cartoon-15.jpg",
    "alt": "Playful Cartoon Friend 15"
  },
  {
    "id": 16,
    "src": "/assets/cartoons/cartoon-16.jpg",
    "alt": "Playful Cartoon Friend 16"
  },
  {
    "id": 17,
    "src": "/assets/cartoons/cartoon-17.jpg",
    "alt": "Playful Cartoon Friend 17"
  },
  {
    "id": 18,
    "src": "/assets/cartoons/cartoon-18.jpg",
    "alt": "Playful Cartoon Friend 18"
  },
  {
    "id": 19,
    "src": "/assets/cartoons/cartoon-19.jpg",
    "alt": "Playful Cartoon Friend 19"
  },
  {
    "id": 20,
    "src": "/assets/cartoons/cartoon-20.jpg",
    "alt": "Playful Cartoon Friend 20"
  },
  {
    "id": 21,
    "src": "/assets/cartoons/cartoon-21.jpg",
    "alt": "Playful Cartoon Friend 21"
  },
  {
    "id": 22,
    "src": "/assets/cartoons/cartoon-22.jpg",
    "alt": "Playful Cartoon Friend 22"
  },
  {
    "id": 23,
    "src": "/assets/cartoons/cartoon-23.jpg",
    "alt": "Playful Cartoon Friend 23"
  },
  {
    "id": 24,
    "src": "/assets/cartoons/cartoon-24.jpg",
    "alt": "Playful Cartoon Friend 24"
  },
  {
    "id": 25,
    "src": "/assets/cartoons/cartoon-25.jpg",
    "alt": "Playful Cartoon Friend 25"
  },
  {
    "id": 26,
    "src": "/assets/cartoons/cartoon-26.jpg",
    "alt": "Playful Cartoon Friend 26"
  },
  {
    "id": 27,
    "src": "/assets/cartoons/cartoon-27.jpg",
    "alt": "Playful Cartoon Friend 27"
  },
  {
    "id": 28,
    "src": "/assets/cartoons/cartoon-28.jpg",
    "alt": "Playful Cartoon Friend 28"
  },
  {
    "id": 29,
    "src": "/assets/cartoons/cartoon-29.jpg",
    "alt": "ponpon"
  },
  {
    "id": 30,
    "src": "/assets/cartoons/cartoon-30.jpg",
    "alt": "teddy - mr bean plushie"
  },
  {
    "id": 31,
    "src": "/assets/cartoons/cartoon-31.jpg",
    "alt": "wolverine_chibi_by_nickyparsonavenger-d8lczmf_png 10241073"
  },
  {
    "id": 32,
    "src": "/assets/cartoons/cartoon-32.jpg",
    "alt": "Playful Cartoon Friend 32"
  },
  {
    "id": 33,
    "src": "/assets/cartoons/cartoon-33.jpg",
    "alt": "20  Cute Kawaii Memo Stickers  and Animal doodles collection"
  }
];

export function getCartoon(id: number): CartoonItem {
  const index = ((id - 1) % ALL_CARTOONS.length + ALL_CARTOONS.length) % ALL_CARTOONS.length;
  return ALL_CARTOONS[index]!;
}
