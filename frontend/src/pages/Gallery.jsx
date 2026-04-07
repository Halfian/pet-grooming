import { useState, useEffect, use } from "react";

export default function Gallery() {
  const images = [
    { src: "https://media.istockphoto.com/id/1334161469/photo/good-boy-expressing-his-joy-after-grooming.jpg?s=612x612&w=0&k=20&c=_8ElnY8d6jQwtuXrG91ObxG4kk4wwUl8XoMvXgBT1l4=", alt: "Happy dog after grooming" },
    { src: "https://www.cats.org.uk/media/2oghg0ob/221129case142.jpg?rmode=max&width=500", alt: "Fluffy cat looking fresh" },
    { src: "https://pbs.twimg.com/media/HCr3tzSWoAELXH4.jpg", alt: "Small pup with bow tie" },
    { src: "https://img.freepik.com/premium-photo/cat-enjoying-spa-day-with-groomer_993044-7804.jpg", alt: "Relaxed cat after spa" },
    { src: "https://smoochie-pooch.com/wp-content/uploads/2024/02/golden-retriever.jpg", alt: "Golden retriever smiling" },
    { src: "https://seattleareafelinerescue.org/wp-content/uploads/2019/01/Web-graphics-25.jpg", alt: "Playful kitten" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Our Gallery</h1>
      <p className="text-center text-gray-600 mb-12">
        A glimpse of our happy customers after their grooming sessions.
      </p>

      {/* Carousel wrapper */}
      <div className="max-w-3xl mx-auto relative">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover md:object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevSlide}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}