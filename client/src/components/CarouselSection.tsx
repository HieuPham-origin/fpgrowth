import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import RoundedButton from './RoundedButton';

function CarouselSection() {
    return (
        <section className="relative h-[600px] bg-gray-50">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="h-full"
            >
                <SwiperSlide>
                    <div className="swiper_slide bg-[url('assets/img/grocery_1.jpg')]">

                        <h2 className="text-8xl">Classic Charm</h2>
                        <p className="mt-4 text-lg  font-semibold">Timeless Designs for Every Room</p>
                        <div className="mt-6 space-x-4">
                            <RoundedButton title="Shop Now" onClick={() => { }} className="bg-black text-white hover:bg-white hover:text-black hover:border-black" />
                            <RoundedButton title="View All" onClick={() => { }} className="bg-white text-black hover:bg-black hover:text-white border border-black" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper_slide bg-[url('assets/img/grocery_2.jpg')] ">
                        <h2 className="text-8xl">Modern Elegance</h2>
                        <p className="mt-4 text-lg  font-semibold">Sleek and Stylish for Urban Living</p>
                        <div className="mt-6 space-x-4">
                            <RoundedButton title="Explore Now" onClick={() => { }} className="bg-black text-white hover:bg-white hover:text-black hover:border-black" />
                            <RoundedButton title="Discover More" onClick={() => { }} className="bg-white text-black hover:bg-black hover:text-white border border-black" />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="swiper_slide bg-[url('assets/img/grocery_3.jpg')] ">
                        <h2 className="text-8xl">Rustic Vibes</h2>
                        <p className="mt-4 text-lg  font-semibold">Cozy and Warm Designs for Relaxation</p>
                        <div className="mt-6 space-x-4">
                            <RoundedButton title="Shop Rustic" onClick={() => { }} className="bg-black text-white hover:bg-white hover:text-black hover:border-black" />
                            <RoundedButton title="Learn More" onClick={() => { }} className="bg-white text-black hover:bg-black hover:text-white border border-black" />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default CarouselSection
