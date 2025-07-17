import Image from 'next/image';

export default function GalleryPage() {
  // 예시 데이터 (실제 데이터로 교체 가능)
  const images = [
    { src: '/images/1.png', product: 'Product Name 1', artist: 'Artist 1' },
    { src: '/images/2.png', product: 'Product Name 2', artist: 'Artist 2' },
    { src: '/images/3.png', product: 'Product Name 3', artist: 'Artist 3' },
    { src: '/images/4.png', product: 'Product Name 4', artist: 'Artist 4' },
    { src: '/images/5.png', product: 'Product Name 5', artist: 'Artist 5' },
    { src: '/images/6.png', product: 'Product Name 6', artist: 'Artist 6' },
    { src: '/images/7.png', product: 'Product Name 7', artist: 'Artist 7' },
    { src: '/images/8.png', product: 'Product Name 8', artist: 'Artist 8' },
  ];

  return (
    <section className="py-16  mx-auto">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {images.map((item, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-xs shadow-sm bg-white"
          >
            <Image
              src={item.src}
              alt={item.product}
              width={2000}
              height={2000}
              className="w-full h-[420px] object-cover object-center"
              priority={idx < 2}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col items-start">
              <span className="text-lg font-semibold text-white drop-shadow">
                {item.product}
              </span>
              <span className="text-sm text-gray-200 drop-shadow mt-1">
                {item.artist}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
