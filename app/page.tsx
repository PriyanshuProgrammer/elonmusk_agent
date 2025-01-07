'use client'
import { RecoilRoot } from 'recoil'
import React from 'react'
import Chat from './components/chat'

export default function Home() {
  return (
    <RecoilRoot>
      <div className="wallpaper h-screen w-screen">
        <div className="overlay h-screen w-screen flex flex-col items-center">
            <h1 className="mt-5 font-bold text-violet-600 text-2xl">Chat with Elon</h1>
            <Chat></Chat>
        </div>
      </div>
    </RecoilRoot>
  )
}
