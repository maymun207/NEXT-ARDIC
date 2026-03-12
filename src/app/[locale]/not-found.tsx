import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="font-heading text-8xl font-bold text-neutral-200">
          404
        </div>
        <h1 className="mt-4 font-heading text-2xl font-bold text-neutral-900">
          Page Not Found
        </h1>
        <p className="mt-2 text-neutral-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/">Go Home</Button>
        </div>
      </div>
    </main>
  );
}
