export default function Testimonials() {
  const testimonials = [
    {
      quote: "My dog looks amazing after every visit. Highly recommend!",
      author: "Sarah, Dog Owner",
    },
    {
      quote: "The staff are so gentle and caring. My cat actually enjoys grooming now!",
      author: "Alex, Cat Owner",
    },
    {
      quote: "Professional, friendly, and affordable. Best grooming service in town!",
      author: "Rina, Pet Lover",
    },
    {
      quote: "Booking was easy and the results were fantastic. Will come back again!",
      author: "David, Dog Owner",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h1>
      <p className="text-center text-gray-600 mb-12">
        We’re proud to share the experiences of pet owners who trust us with their furry friends.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, index) => (
          <blockquote
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-700 italic">"{t.quote}"</p>
            <footer className="mt-4 text-sm text-gray-500">— {t.author}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}