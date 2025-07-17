import { Product } from "./types";

export const AllProducts: Product[] = [
  {
    id: "6f7be9e4-12b1-47f6-984e-09b74c6f1661",
    name: {
      ptBR: "Blusa de Gola Alta Minimalista",
      enUS: "Minimalist Turtleneck Top",
    },
    category: "clothes",
    priceBRL: 129,
    priceUSD: 27,
    color: "black",
    colorsAvailables: ["black", "heather-gray"],
    sizes: [
      { ptBR: "PP", enUS: "XS", available: true },
      { ptBR: "P", enUS: "S", available: true },
      { ptBR: "M", enUS: "M", available: true },
      { ptBR: "G", enUS: "L", available: true },
      { ptBR: "GG", enUS: "XL", available: false },
    ],
    shortDescription: {
      ptBR: "Elegância minimalista com gola alta e tecido confortável.",
      enUS: "Minimalist elegance with turtleneck and comfortable fabric.",
    },
    description: {
      ptBR: "Essa blusa preta de gola alta é perfeita para dias frios e combina com diversos estilos. Ideal para sobreposições ou uso individual com colares e acessórios.",
      enUS: "This black turtleneck top is perfect for cooler days and suits various styles. Ideal for layering or wearing solo with necklaces and accessories.",
    },
    alt: {
      ptBR: "Mulher com blusa preta de gola alta e blazer por cima caminhando na cidade.",
      enUS: "Woman wearing a black turtleneck and blazer, walking in the city.",
    },
    imagesUrl: [
      "/products/dmitry-ganin-SlWNt1py6Zc-unsplash.jpg",
      "/products/dmitry-ganin-3fvrrOOByDk-unsplash.jpg",
      "/products/dmitry-ganin-CQsJVhAwFTw-unsplash.jpg",
    ],
    rate: 4.6,
  },
  {
    id: "8888858a-f278-45b8-a7d7-f6cb63478307",
    name: {
      ptBR: "Jaqueta Cropped Marrom",
      enUS: "Brown Cropped Jacket",
    },
    category: "clothes",
    priceBRL: 179,
    priceUSD: 36,
    color: "brown",
    colorsAvailables: ["brown", "natural", "black"],
    sizes: [
      { ptBR: "PP", enUS: "XS", available: false },
      { ptBR: "P", enUS: "S", available: true },
      { ptBR: "M", enUS: "M", available: true },
      { ptBR: "G", enUS: "L", available: true },
      { ptBR: "GG", enUS: "XL", available: false },
    ],
    shortDescription: {
      ptBR: "Jaqueta feminina em veludo, estilo cropped, perfeita para looks casuais e urbanos.",
      enUS: "Velvet cropped jacket, perfect for casual and urban looks.",
    },
    description: {
      ptBR: "Com um corte moderno e tecido aveludado, essa jaqueta marrom é ideal para dias de meia estação. O modelo cropped combina com calças de cintura alta e acessórios estilosos.",
      enUS: "With a modern cut and velvety fabric, this brown cropped jacket is ideal for mild weather. The cropped design pairs perfectly with high-waisted pants and stylish accessories.",
    },
    alt: {
      ptBR: "Mulher com jaqueta marrom cropped e calça jeans encostada em uma cerca.",
      enUS: "Woman wearing a cropped brown jacket and jeans, leaning on a fence.",
    },
    imagesUrl: [
      "/products/anthony-a-2PUKLjNqtBA-unsplash.jpg",
      "/products/anthony-a-gD4RTPnYft8-unsplash.jpg",
      "/products/anthony-a-iSEBXuycfdo-unsplash.jpg",
    ],
    rate: 4.5,
  },
  {
    id: "a31f5147-cdfa-42a7-bfb5-0e53c0e9ea4e",
    name: {
      ptBR: "Blazer Feminino Oversized",
      enUS: "Oversized Women's Blazer",
    },
    category: "clothes",
    priceBRL: 219,
    priceUSD: 45,
    color: "black",
    colorsAvailables: ["black", "gray", "natural"],
    sizes: [
      { ptBR: "PP", enUS: "XS", available: false },
      { ptBR: "P", enUS: "S", available: false },
      { ptBR: "M", enUS: "M", available: true },
      { ptBR: "G", enUS: "L", available: true },
      { ptBR: "GG", enUS: "XL", available: true },
    ],
    shortDescription: {
      ptBR: "Blazer preto oversized com corte reto e tecido leve.",
      enUS: "Oversized black blazer with straight cut and lightweight fabric.",
    },
    description: {
      ptBR: "Um blazer moderno, leve e com caimento impecável. Ideal para compor looks formais ou streetwear com elegância. Pode ser usado aberto ou fechado, com top ou camisa.",
      enUS: "A modern blazer with a light, elegant drape. Ideal for formal or streetwear outfits. Wear it open or buttoned, with a top or shirt underneath.",
    },
    alt: {
      ptBR: "Mulher usando blazer preto com top branco e óculos escuros.",
      enUS: "Woman wearing a black blazer with a white top and sunglasses.",
    },
    imagesUrl: [
      "/products/virginia-marinova-XUsAwaV_soM-unsplash.jpg",
      "/products/virginia-marinova-CulhD_FRXEY-unsplash.jpg",
      "/products/virginia-marinova--nEEnZroOtI-unsplash.jpg",
    ],
    rate: 4.8,
  },
  {
    id: "e2b2dd5e-75d6-46d6-9f3a-ff982f1c3b91",
    name: {
      ptBR: "Vestido Sombra Elegante",
      enUS: "Elegant Shadow Dress",
    },
    category: "clothes",
    priceBRL: 389,
    priceUSD: 78,
    color: "black",
    colorsAvailables: ["black"],
    sizes: [
      { ptBR: "PP", enUS: "XS", available: false },
      { ptBR: "P", enUS: "S", available: true },
      { ptBR: "M", enUS: "M", available: true },
      { ptBR: "G", enUS: "L", available: true },
      { ptBR: "GG", enUS: "XL", available: false },
    ],
    shortDescription: {
      ptBR: "Vestido justo preto com mangas longas, toque dramático e elegante.",
      enUS: "Form-fitting black dress with long sleeves and a dramatic, elegant vibe.",
    },
    description: {
      ptBR: "Com um design marcante e sofisticado, este vestido preto valoriza a silhueta com elegância. Ideal para eventos noturnos, editoriais ou quem busca um visual impactante.",
      enUS: "With a bold and sophisticated design, this black dress enhances the silhouette with elegance. Perfect for evening events, editorials, or anyone seeking a striking look.",
    },
    alt: {
      ptBR: "Mulher usando vestido preto elegante com luvas pretas e unhas douradas, posando dramaticamente.",
      enUS: "Woman wearing an elegant black dress with black gloves and gold nails, posing dramatically.",
    },
    imagesUrl: [
      "/products/pexels-daigoro-folz-2151516346-32111872.jpg",
      "/products/pexels-daigoro-folz-2151516346-32111873.jpg",
      "/products/pexels-daigoro-folz-2151516346-32111878.jpg",
    ],
    rate: 4.9,
  },
  {
    id: "9e899ac2-7b0f-4811-b66e-86b1557bb85d",
    name: {
      ptBR: "Casaco College Patchwork Bege",
      enUS: "Beige Patchwork College Jacket",
    },
    category: "clothes",
    priceBRL: 249,
    priceUSD: 52,
    color: "natural",
    colorsAvailables: ["natural", "brown", "olive-green"],
    sizes: [
      { ptBR: "PP", enUS: "XS", available: false },
      { ptBR: "P", enUS: "S", available: true },
      { ptBR: "M", enUS: "M", available: true },
      { ptBR: "G", enUS: "L", available: true },
      { ptBR: "GG", enUS: "XL", available: true },
    ],
    shortDescription: {
      ptBR: "Casaco college em estilo patchwork com aplicações e bordados esportivos.",
      enUS: "Patchwork-style college jacket with sports-themed patches and embroidery.",
    },
    description: {
      ptBR: "Inspirado no visual universitário americano, este casaco patchwork traz atitude e estilo. Com detalhes bordados e mix de tecidos em bege e branco, é ideal para destacar o look urbano.",
      enUS: "Inspired by classic American varsity style, this patchwork jacket adds attitude and style. Featuring embroidered details and mixed beige and white fabrics, it’s perfect for bold urban outfits.",
    },
    alt: {
      ptBR: "Homem vestindo casaco bege com vários patches e olhando para o interior do casaco.",
      enUS: "Man wearing a beige jacket with multiple patches, looking inside the coat.",
    },
    imagesUrl: [
      "/products/marek-mucha-e4NyCTWIyqk-unsplash.jpg",
      "/products/marek-mucha-clU55anGN6s-unsplash.jpg",
      "/products/marek-mucha-pkuTokHR7Gs-unsplash.jpg",
    ],
    rate: 4.7,
  },
  {
    id: "b82f36b5-7790-4b36-8f57-47cf67f473c7",
    name: {
      ptBR: "Conjunto de Terno Verde Escuro Elegante",
      enUS: "Elegant Dark Green Suit Set",
    },
    category: "clothes",
    priceBRL: 699,
    priceUSD: 145,
    color: "olive-green",
    colorsAvailables: ["olive-green", "black", "walnut"],
    sizes: [
      { ptBR: "PP", enUS: "XS", available: false },
      { ptBR: "P", enUS: "S", available: true },
      { ptBR: "M", enUS: "M", available: true },
      { ptBR: "G", enUS: "L", available: true },
      { ptBR: "GG", enUS: "XL", available: true },
    ],
    shortDescription: {
      ptBR: "Terno verde escuro com caimento sob medida e detalhes refinados.",
      enUS: "Dark green suit with tailored fit and refined details.",
    },
    description: {
      ptBR: "Este conjunto de terno verde escuro traz sofisticação com seu corte preciso, botões dourados e lenço decorativo. Ideal para eventos formais ou para quem deseja transmitir elegância no dia a dia.",
      enUS: "This dark green suit set brings sophistication through its precise tailoring, gold buttons, and decorative pocket square. Perfect for formal occasions or anyone aiming to convey elegance daily.",
    },
    alt: {
      ptBR: "Homem vestindo terno verde escuro com camisa preta, lenço decorativo no bolso e acessórios dourados.",
      enUS: "Man wearing a dark green suit with black shirt, decorative pocket square, and gold accessories.",
    },
    imagesUrl: [
      "/products/omid-bonyadian-lQ0bz51_cXM-unsplash.jpg",
      "/products/omid-bonyadian-6OpE-aBqOUU-unsplash.jpg",
      "/products/omid-bonyadian-tquzv78ZzHU-unsplash.jpg",
    ],
    rate: 4.9,
  },
  {
    id: "9f23c88b-1b7e-4121-b041-dc735f764f39",
    name: {
      ptBR: "Tênis AirVolt Neo X",
      enUS: "AirVolt Neo X Sneakers",
    },
    category: "shoes",
    priceBRL: 449.9,
    priceUSD: 89.9,
    color: "gray",
    colorsAvailables: ["light-yellow", "black"],
    sizes: [
      { ptBR: "37", enUS: "6", available: true },
      { ptBR: "38", enUS: "6.5", available: true },
      { ptBR: "39", enUS: "7", available: true },
      { ptBR: "40", enUS: "8", available: true },
      { ptBR: "41", enUS: "9", available: true },
      { ptBR: "42", enUS: "10", available: true },
      { ptBR: "43", enUS: "11", available: true },
      { ptBR: "44", enUS: "11.5", available: false },
    ],
    shortDescription: {
      ptBR: "Tênis esportivo com design futurista, amortecimento em gel e cabedal translúcido.",
      enUS: "Sport sneaker with futuristic design, gel cushioning, and translucent upper.",
    },
    description: {
      ptBR: "O AirVolt Neo X combina estilo e performance. Com cabedal translúcido, entressola com amortecimento em gel amarelo e solado antiderrapante, oferece leveza e conforto tanto para esportes quanto para o dia a dia.",
      enUS: "The AirVolt Neo X blends style and performance. Featuring a translucent upper, yellow gel cushioning midsole, and non-slip outsole, it offers lightweight comfort for sports or daily wear.",
    },
    alt: {
      ptBR: "Tênis esportivo com detalhes em amarelo, preto, cinza e vermelho flutuando no ar.",
      enUS: "Sport sneakers with yellow, black, gray, and red details floating in the air.",
    },
    imagesUrl: [
      "/products/pexels-melvin-buezo-1253763-2529148.jpg",
      "/products/pexels-melvin-buezo-1253763-2529147.jpg",
      "/products/pexels-melvin-buezo-1253763-2529146.jpg",
    ],
    rate: 4.8,
  },
];
