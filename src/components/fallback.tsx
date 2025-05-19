import Spinner from './spinner';

export function Fallback() {
  return (
    <div className="bg-background flex h-screen items-center justify-center">
      <Spinner className="text-primary" />
    </div>
  );
}
