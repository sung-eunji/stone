import Image from 'next/image';

export default function MainSection() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/images/main-example.png"
        alt="main example"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
        priority
        quality={100}
        sizes="120vw"
      />
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
          Discover Artistry That Transcends Time
        </h1>
        <p className="mb-8 max-w-2xl mx-auto text-lg text-white drop-shadow">
          Delve into a realm where creativity and elegance intertwine
          seamlessly, offering a curated experience that celebrates the finest
          in artistic expression. Our platform is dedicated to those who
          appreciate the nuanced beauty and sophistication inherent in
          exceptional art forms.
        </p>
        <a
          href="/about"
          className="inline-block px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition shadow"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
