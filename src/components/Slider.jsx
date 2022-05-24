import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

import Spinner from './Spinner';

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }

        fetchListings()

    }, [])

    if (loading) {
        return <Spinner />
    }


    return listings && (
        <>
            <p className="exploreHeading">Recommended</p>

            <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
            >
                {listings.map(({ data, id }) => (
                    <SwiperSlide
                        key={id}
                        onClick={() => navigate(`/category/${data.type}/${id}`)}
                    >
                        <div
                            style={{
                                background: `url(${data.imgUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover',
                                height: '250px',
                                cursor: 'pointer'
                            }}
                            className='swiperSlideDiv'
                        >
                            <p className='swiperSlideText'>{data.name}</p>
                            <p className='swiperSlidePrice'>
                                ${data.discountedPrice ?? data.regularPrice}{' '}
                                {data.type === 'rent' && '/ month'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Slider