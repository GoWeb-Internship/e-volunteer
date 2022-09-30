import { Spinner } from '..';

export const FullScreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 bg-[rgba(51,65,85,0.85)]">
      <Spinner />
    </div>
  );
};
