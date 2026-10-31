import React from 'react';
import {
  CroissantDoodle,
  PretzelDoodle,
  CookieDoodle,
  BreadLoafDoodle,
  RollingPinDoodle,
  TakeawayBagDoodle,
  CoffeeCupDoodle,
  CrumbClubBadge,
} from './Doodles';

export function MarqueeStrip() {
  const doodleItems = [
    { type: 'badge' },
    { type: 'pretzel' },
    { type: 'croissant' },
    { type: 'rolling-pin' },
    { type: 'takeaway-bag' },
    { type: 'bread-loaf' },
    { type: 'coffee-cup' },
    { type: 'cookie' },
  ];

  const renderDoodle = (item, key) => {
    switch (item.type) {
      case 'badge':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10 scale-85">
            <CrumbClubBadge text="CRUMB CLUB" className="w-20 h-20" />
          </div>
        );
      case 'pretzel':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <PretzelDoodle className="w-16 h-16 sm:w-20 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      case 'croissant':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <CroissantDoodle className="w-16 h-16 sm:w-20 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      case 'rolling-pin':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <RollingPinDoodle className="w-20 h-16 sm:w-24 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      case 'takeaway-bag':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <TakeawayBagDoodle className="w-16 h-16 sm:w-20 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      case 'bread-loaf':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <BreadLoafDoodle className="w-20 h-16 sm:w-24 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      case 'coffee-cup':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <CoffeeCupDoodle className="w-16 h-16 sm:w-20 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      case 'cookie':
        return (
          <div key={key} className="shrink-0 mx-6 sm:mx-10">
            <CookieDoodle className="w-16 h-16 sm:w-20 sm:h-20" stroke="#0B3FBF" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FFF8E7] overflow-hidden border-y-2 border-[#0B3FBF]/10 relative select-none">
      <div className="animate-marquee flex items-center">
        {doodleItems.map((item, idx) => renderDoodle(item, `first-${idx}`))}
        {doodleItems.map((item, idx) => renderDoodle(item, `second-${idx}`))}
        {doodleItems.map((item, idx) => renderDoodle(item, `third-${idx}`))}
      </div>
    </div>
  );
}
