import { useCallback, useEffect, useMemo, useState, MouseEvent } from 'react';

interface ProgressBarProps {
  progress: number;
  duration: number;
  onSeek: (percentage: number) => void;
}


export default function ProgressBar({ progress, duration, onSeek }: ProgressBarProps) {
  const [formattedProgress, setFormattedProgress] = useState<string>('');
  const [formattedDuration, setFormattedDuration] = useState<string>('');

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    setFormattedProgress(formatTime(progress));
    setFormattedDuration(formatTime(duration));
  }, [progress, duration]);

  const percentageClicked = useCallback((event: MouseEvent) => {
    const { clientX, target } = event;
    const { left, width } = (target as HTMLElement).getBoundingClientRect();
    const percentage = (clientX - left) / width;
    onSeek(percentage);
  }, []);


  const progressPercentage = useMemo(() => {
    return ((progress / duration) * 100).toFixed(3);
  }, [progress, duration]);

  return (
    (<>
        <div className='flex flex-row text-white m-auto'>
          <span className='my-auto'>{formattedProgress}&nbsp;</span>
          <div className='w-full bg-gray-200 my-auto rounded-full h-2.5 dark:bg-gray-700' onClick={percentageClicked}>
            <div className='bg-blue-600 h-2.5 rounded-full dark:bg-blue-500'
                 style={{ width: progressPercentage + '%' }}></div>
          </div>
          <span className='my-auto'>&nbsp;{formattedDuration}</span>
        </div>
      </>
    )
  );

}
