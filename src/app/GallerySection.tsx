import Image from 'next/image';

export default function GallerySection() {
  return (
    <section className="relative w-full py-24 flex flex-col items-center bg-white overflow-hidden">
      {/* 배경 마키 텍스트 */}
      <div className="absolute inset-0 flex items-start pt-8 overflow-hidden pointer-events-none select-none z-0">
        <div className="marquee-track w-full">
          <span className="marquee-text text-black">
            {Array(2).fill('Featured Product ').join('')}
          </span>
        </div>
      </div>
      {/* 실제 콘텐츠 */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full mx-auto gap-12">
          <div className="flex-1 flex justify-center">
            <div className="relative w-[350px] h-[480px] md:w-[400px] md:h-[540px] bg-gray-100 shadow-lg overflow-hidden">
              <Image
                src="/images/main-example.png"
                alt="Product"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded z-10"
                priority
                quality={100}
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative">
            <div className="relative z-10">
              <p className="mb-8 text-lg text-black max-w-md">
                Use this space to talk about your shop and your products. How
                and where are they made, what makes them unique?
              </p>
              <a
                href="#"
                className="inline-block px-10 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition text-base"
              >
                SHOP ALL
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-4 mt-8 px-4">
          <div className="flex-1">
            <div className="mt-4">
              <div className="font-semibold text-lg text-black">
                Product Name
              </div>
              <div className="text-black">€25.00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
