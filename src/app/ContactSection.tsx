export default function ContactSection() {
  return (
    <section className="w-full py-24 bg-[#e5e5e5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 px-8">
        <div className="flex-1 mb-12 md:mb-0">
          <h2 className="text-5xl font-bold mb-6">Contact us</h2>
          <p className="text-lg text-black mb-4">
            Interested in working together? Fill out some info and we will be in
            touch shortly.
            <br />
            We can&apos;t wait to hear from you!
          </p>
        </div>
        <form className="flex-1 grid grid-cols-2 gap-6 bg-transparent">
          <div className="col-span-2 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-gray-500">(required)</span>
              </label>
              <input
                type="text"
                required
                className="w-full rounded-full border border-gray-400 px-4 py-2 bg-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full rounded-full border border-gray-400 px-4 py-2 bg-white"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-gray-500">(required)</span>
            </label>
            <input
              type="email"
              required
              className="w-full rounded-full border border-gray-400 px-4 py-2 bg-white"
            />
            <div className="flex items-center mt-2">
              <input type="checkbox" id="newsletter" className="mr-2" />
              <label htmlFor="newsletter" className="text-sm">
                Sign up for news and updates
              </label>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Message <span className="text-gray-500">(required)</span>
            </label>
            <textarea
              required
              className="w-full rounded-3xl border border-gray-400 px-4 py-2 bg-white min-h-[120px]"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-10 py-3 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
