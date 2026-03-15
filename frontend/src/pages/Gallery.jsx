export default function Gallery() {
  const images = [
    { src: "https://media.istockphoto.com/id/1334161469/photo/good-boy-expressing-his-joy-after-grooming.jpg?s=612x612&w=0&k=20&c=_8ElnY8d6jQwtuXrG91ObxG4kk4wwUl8XoMvXgBT1l4=", alt: "Happy dog after grooming" },
    { src: "https://www.cats.org.uk/media/2oghg0ob/221129case142.jpg?rmode=max&width=500", alt: "Fluffy cat looking fresh" },
    { src: "https://pbs.twimg.com/media/HCr3tzSWoAELXH4.jpg", alt: "Small pup with bow tie" },
    { src: "https://img.freepik.com/premium-photo/cat-enjoying-spa-day-with-groomer_993044-7804.jpg", alt: "Relaxed cat after spa" },
    { src: "https://smoochie-pooch.com/wp-content/uploads/2024/02/golden-retriever.jpg", alt: "Golden retriever smiling" },
    { src: "https://seattleareafelinerescue.org/wp-content/uploads/2019/01/Web-graphics-25.jpg", alt: "Playful kitten" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Our Gallery</h1>
      <p className="text-center text-gray-600 mb-12">
        A glimpse of our happy customers after their grooming sessions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}