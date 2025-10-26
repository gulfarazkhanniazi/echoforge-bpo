import ApplyJob from '@/app/components/ApplyJob'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'

export async function generateMetadata({ params }) {
  const { slug} = await params;
  const jobTitle = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return {
    title: `Apply for ${jobTitle} at EchoForge BPO`,
    description: `Apply for the ${jobTitle} position at EchoForge BPO. Join our dynamic team and build your career today.`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <>
    <Navbar />
    <ApplyJob slug={slug} />
    <Footer />
    </>
  )
}