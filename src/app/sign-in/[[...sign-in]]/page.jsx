import { SignIn } from '@clerk/nextjs'

export default function Page() {
   return (
    <div className="flex justify-center items-center h-screen">
      {/* Provided by clerk */}
      <SignIn />
    </div>
  )
}