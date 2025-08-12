export default function About() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-6">
        We started with one goal: to make high-quality products affordable for
        everyone...
      </p>
      <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
      <p className="mb-6">
        To bring you carefully curated products that combine style, durability,
        and value.
      </p>
      <h2 className="text-xl font-semibold mb-2">Why Choose Us</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Affordable without compromise</li>
        <li>Handpicked quality checks</li>
        <li>Friendly customer support</li>
      </ul>
    </div>
  );
}
