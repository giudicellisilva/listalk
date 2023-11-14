"use client";

import Image from 'next/image'
import styles from './page.module.scss'
import Home from "@/components/Home";
import Header from '@/components/Home/Header';

const Page = () =>{
  return(
    <div> 
      <Header/>
      <Home />
    </div>
  )
}

export default Page;