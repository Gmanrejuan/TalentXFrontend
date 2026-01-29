import React from 'react'
import Image from 'next/image'

export const HeroIllustration = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image 
        src='/register.svg'
        alt='rgister image'
        height={300}
        width={300}
        className="h-[60%] w-full"
      />
    </div>
  )
}
