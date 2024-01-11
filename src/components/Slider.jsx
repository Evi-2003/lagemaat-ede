import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useRef } from 'react';

export default function InspiratieCarousel() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );
  const imageRefs = useRef([]);
  const afbeeldingen = [
    '/foto1.webp',
    '/pand.webp',
    '/marcel.webp',
    '/bloemen.webp',
    '/Bloemen3.webp',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            observer.unobserve(lazyImage);
          }
        });
      },
      {
        root: sliderRef.current,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    imageRefs.current.forEach((imageRef) => observer.observe(imageRef));

    return () => {
      imageRefs.current.forEach((imageRef) => {
        if (imageRef) {
          observer.unobserve(imageRef);
        }
      });
    };
  }, [sliderRef]);

  return (
    <section
      ref={sliderRef}
      className="keen-slider shadow-l relative col-start-2 row-start-1 h-72 w-full rounded-lg sm:row-start-1 md:h-44 xl:h-96 2xl:h-[28rem]"
    >
      {afbeeldingen.map((src, index) => (
        <img
          ref={(el) => (imageRefs.current[index] = el)}
          data-src={src}
          key={index}
          quality={100}
          width={500}
          height={350}
          loading="eager"
          alt={`Afbeelding ${index + 1} van Tuincentrum Lagemaat`}
          className="lazy keen-slider__slide object-cover"
        />
      ))}
    </section>
  );
}
