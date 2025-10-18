import ApplyJob from '@/app/components/ApplyJob'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'

export default function Page({ params }) {
  const { slug } = params;
  return (
    <>
    <Navbar />
    <ApplyJob slug={slug} />
    <Footer />
    </>
  )
}