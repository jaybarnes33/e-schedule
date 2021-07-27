import AuthWrapper from "@/components/AuthWrapper"

export default function Home() {
  return (
    <AuthWrapper
      id="user-auth"
      heading="Sign up"
      description="Sign up with google to gain user privileges."
    />
  )
}
