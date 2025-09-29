import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={640}
          height={510}
          priority
        />
      </main>
    </div>
  );
}
