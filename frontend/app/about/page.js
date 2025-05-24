export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          About Ecozon
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Ecozon is committed to bringing eco-friendly, sustainable products to
          people who care about the planet. Our mission is simple: create a
          cleaner, greener future through conscious consumer choices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              🌱 Sustainability
            </h2>
            <p className="text-gray-600">
              Every product we sell is curated for its eco-impact and long-term
              sustainability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              🚚 Fast Delivery
            </h2>
            <p className="text-gray-600">
              We offer reliable, eco-conscious shipping options with minimal
              packaging waste.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">
              💬 Customer Care
            </h2>
            <p className="text-gray-600">
              Our support team is always here to help with any questions or
              product concerns.
            </p>
          </div>
        </div>

        <div className="mt-16 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Ecozon. All rights reserved.
        </div>
      </div>
    </div>
  );
}
