import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="py-16 container mx-auto flex flex-col md:flex-row gap-12 justify-between">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col text-[5rem] font-bold mb-4 leading-[1.1]">
          <span className="text-left"> Find a stone,</span>
          <div className="flex gap-10">
            <span> </span>
            <span className="text-right">Become a stone.</span>
          </div>
        </div>
        <p className="text-lg w-[30rem]">
          Step into a realm where artistry transcends the ordinary. Book your
          appointment today to immerse yourself in a world of elegance, where
          every detail is crafted with impeccable precision and unrivaled
          beauty.
        </p>
      </div>
      <div>
        <Image
          src="/images/3-cropped.png"
          alt="about"
          width={1000}
          height={1000}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: 'auto',
            maxWidth: '600px',
          }}
        />
      </div>
    </section>
  );
}
