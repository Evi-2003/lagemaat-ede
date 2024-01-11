import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useRef } from 'react';

export default function Map() {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.8723119095025!2d5.655727976502426!3d52.04563847124174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c652ad525ce843%3A0xbe54de2697ad683b!2sThe%20garden%20center%20Lagemaat!5e0!3m2!1sen!2snl!4v1703684625580!5m2!1sen!2snl"
        height="600"
        width="100%"
        allowfullscreen=""
        title="Maps naar Tuincentrum Lagemaat"
        loading="lazy"
        class="col-start-3 row-start-1"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
