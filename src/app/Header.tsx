import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 py-4 mb-8 bg-transparent">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          href="/"
          className="font-bold text-xl hover:underline focus:outline-none focus:ring-2 focus:ring-black rounded px-2 py-1"
        >
          <Link
            href="/about"
            className="hover:underline text-[2.5rem] font-700"
          >
            stone
          </Link>
        </Link>
        <nav className="space-x-8 text-[1.5rem]">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/gallery" className="hover:underline">
            Gallery
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
          <Link href="/signin" className="hover:underline">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
