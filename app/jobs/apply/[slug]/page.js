import ApplyJob from '@/app/components/ApplyJob'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'

export default function page({ params }) {
  const { slug } = React.use(params);
  return (
    <>
    <Navbar />
    <ApplyJob slug={slug} />
    <Footer />
    </>
  )
}
