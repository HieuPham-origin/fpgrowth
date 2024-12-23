import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import RoundedButton from './RoundedButton';

function CarouselSection() {
    return (
        <section className="relative h-[600px] bg-gray-50">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{
                    clickable: true,

                }}
                autoplay={{ delay: 3000 }}
                className="h-full"
            >
                <SwiperSlide>
                    <div className="relative swiper_slide bg-[url('assets/img/grocery_1.jpg')]">
                        <div className="absolute inset-0 bg-[url('assets/img/grocery_1.jpg')] bg-cover bg-center blur-[2px]"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <h2 className="text-8xl">Modern Elegance</h2>
                            <p className="mt-4 text-lg font-semibold">Sleek and Stylish for Urban Living</p>
                            <div className="mt-6 space-x-4">
                                <RoundedButton
                                    title="Explore Now"
                                    onClick={() => { }}
                                    className="black_button"
                                />
                                <RoundedButton
                                    title="Discover More"
                                    onClick={() => { }}
                                    className="white_button"
                                />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative swiper_slide bg-[url('assets/img/grocery_2.jpg')]">
                        <div className="absolute inset-0 bg-[url('assets/img/grocery_2.jpg')] bg-cover bg-center blur-[2px]"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <h2 className="text-8xl">Modern Elegance</h2>
                            <p className="mt-4 text-lg font-semibold">Sleek and Stylish for Urban Living</p>
                            <div className="mt-6 space-x-4">
                                <RoundedButton
                                    title="Explore Now"
                                    onClick={() => { }}
                                    className="black_button"
                                />
                                <RoundedButton
                                    title="Discover More"
                                    onClick={() => { }}
                                    className="white_button"
                                />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative swiper_slide bg-[url('assets/img/grocery_3.jpg')]">
                        <div className="absolute inset-0 bg-[url('assets/img/grocery_3.jpg')] bg-cover bg-center blur-[2px]"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <h2 className="text-8xl">Modern Elegance</h2>
                            <p className="mt-4 text-lg font-semibold">Sleek and Stylish for Urban Living</p>
                            <div className="mt-6 space-x-4">
                                <RoundedButton
                                    title="Explore Now"
                                    onClick={() => { }}
                                    className="black_button"
                                />
                                <RoundedButton
                                    title="Discover More"
                                    onClick={() => { }}
                                    className="white_button"
                                />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default CarouselSection
