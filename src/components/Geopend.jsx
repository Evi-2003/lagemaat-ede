import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Geopend = () => {
  const [closingTime, setClosingTime] = useState('');
  const [openStatus, setOpenStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

    const openingHours = {
      1: '10:00',
      2: '09:00',
      3: '09:00',
      4: '09:00',
      5: '09:00',
      6: '09:00',
      7: 'Closed',
    };

    const closingHours = {
      1: '17:30',
      2: '17:30',
      3: '17:30',
      4: '17:30',
      5: '17:30',
      6: '17:00',
      7: 'Closed',
    };

    const specialDays = {
      '2024-01-01': { opening: 'Closed', closing: 'Closed' },
      '2024-04-01': { opening: '10:00', closing: '17:00' }, // 2nd Easter
      '2024-05-30': { opening: '10:00', closing: '17:00' }, // Ascension Day
      '2024-06-09': { opening: '10:00', closing: '17:00' }, // Whit Sunday
      '2024-04-27': { opening: '10:00', closing: '17:00' }, // King's Day
      '2024-12-26': { opening: 'Closed', closing: 'Closed' }, // 2nd Christmas Day
    };

    const currentDay = moment().isoWeekday(); // maandag = 1, zondag = 7
    const currentTime = moment();
    const currentDate = moment().format('YYYY-MM-DD');

    setClosingTime(closingHours[currentDay]);

    let nextOpeningDay = currentDay;
    let nextOpeningDate = moment();

    if (
      openingHours[currentDay] === 'Closed' ||
      moment(currentTime, 'HH:mm').isAfter(moment(closingHours[currentDay], 'HH:mm')) ||
      specialDays[moment().format('YYYY-MM-DD')]
    ) {
      do {
        nextOpeningDate.add(1, 'days');
        nextOpeningDay = (nextOpeningDay % 7) + 1;
      } while (
        openingHours[nextOpeningDay] === 'Closed' ||
        specialDays[nextOpeningDate.format('YYYY-MM-DD')]
      );
    }

    // nu gebruik je nextOpeningDate.format('YYYY-MM-DD') om de openingstijden van de speciale dagen in de onderstaande code te controleren

    if (openingHours[currentDay] === 'Closed' || specialDays[moment().format('YYYY-MM-DD')]) {
      setOpenStatus([
        `We zijn vandaag gesloten.`,
        `We openen op ${days[(nextOpeningDay - 1) % 7]} om ${openingHours[nextOpeningDay]}.`,
      ]);
      setIsOpen(false);
    } else if (
      moment(currentTime, 'HH:mm').isBetween(
        moment(openingHours[currentDay], 'HH:mm'),
        moment(closingHours[currentDay], 'HH:mm')
      )
    ) {
      setOpenStatus([`Vandaag zijn we geopend tot ${closingHours[currentDay]}`]);
      setIsOpen(true);
    } else {
      setOpenStatus([
        `We zijn op dit moment gesloten.`,
        `We openen op ${days[(nextOpeningDay - 1) % 7]} om ${openingHours[nextOpeningDay]}.`,
      ]);

      setIsOpen(false);
    }
  }, []);
  return (
    <span className="my-5 flex w-fit items-center justify-center gap-x-5" id="bloei">
      <figure className="relative flex h-3 w-3">
        <figure
          className={
            (isOpen ? 'bg-[#16a34a]' : 'bg-[#dc2626]') +
            ' absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'
          }
        ></figure>
        <figure
          className={
            (isOpen ? 'bg-[#16a34a]' : 'bg-[#dc2626]') +
            ' bg-sky-500 relative inline-flex h-3 w-3 rounded-full'
          }
        ></figure>
      </figure>
      <span className="flex flex-col">
        {openStatus.map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </span>
    </span>
  );
};
export default Geopend;
