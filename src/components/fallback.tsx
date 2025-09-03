import Spinner from './spinner';

export function Fallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Spinner className="text-primary" />
    </div>
  );
}
