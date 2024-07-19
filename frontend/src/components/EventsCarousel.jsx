import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const EventsCarousel = ({ categories = [] }) => {
  const getImagesFromCategories = () => {
    return categories.map((category) => ({
      image: category.image,
      title: category.title,
    }));
  };

  const items =
    categories.length > 5
      ? getImagesFromCategories()
      : [
          {
            image:
              "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/zp0ymtpxvxcqho7tzmyg.jpg",
            title: "",
          },
          {
            image:
              "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/ddgceodch6xv2exspylu.jpg",
            title: "",
          },
          {
            image:
              "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/pfq2n8dmfafbqg7cavtb.jpg",
            title: "",
          },
          {
            image:
              "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/egoqzpdahdyfyjjych5e.jpg",
            title: "",
          },
          {
            image:
              "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226061/college-fest/sample-images/lli74qwyvptn3yczhv5r.jpg",
            title: "",
          },
        ];

  const settings = {
    dots: true,
    infinite: true, // Corrected typo
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings} className="h-[60vh]">
      {items.map((item, index) => (
        <div className="relative" key={index}>
          <img
            src={item.image}
            alt={`Slide ${index}`}
            className="h-[60vh] w-full object-cover"
          />
          <div className="p-1 rounded-md absolute top-2 right-2 bg-light-4 opacity-40 text-black">
            {item.title}
          </div>
        </div>
      ))}
    </Slider>
  );
};
