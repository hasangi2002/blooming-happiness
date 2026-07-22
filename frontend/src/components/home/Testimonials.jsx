import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import StarRating from '../common/StarRating';
import { Reveal } from '../common/Reveal';
import { TESTIMONIALS } from '../../constants/mockData';

const Testimonials = () => (
  <section className="section bg-lavender-900 text-ivory">
    <div className="mx-auto max-w-4xl">
      <SectionHeading eyebrow="Loved by Many" title="What Our Customers Say" dark />

      <Reveal direction="fade" delay={0.1}>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="!pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="card-glass mx-auto max-w-xl !bg-ivory/10 text-center">
                <FaQuoteLeft className="mx-auto mb-4 text-gold-400" size={22} />
                <p className="font-display text-xl italic leading-relaxed text-ivory sm:text-2xl">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/80?u=${t.avatarSeed}`}
                    alt={t.name}
                    className="h-12 w-12 rounded-full border-2 border-gold-400 object-cover"
                  />
                  <p className="font-semibold text-ivory">{t.name}</p>
                  <p className="text-xs text-ivory/60">{t.role}</p>
                  <StarRating rating={t.rating} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </div>
  </section>
);

export default Testimonials;
