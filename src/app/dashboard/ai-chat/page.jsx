"use client";
import React from "react";

import dynamic from 'next/dynamic';

const AiChat = dynamic(() => import('@/components/ai/AiChat'));
// In Next.js, you can do dynamic imports using the dynamic() function from next/dynamic. This allows you to load components only when they are needed, improving performance.


const page = () => {
  return <AiChat />;
};

export default page;
