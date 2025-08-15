import {
  BookOpenTextIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from 'lucide-react';

export const StatusTabsConstant = [
  {
    icon: <BookOpenTextIcon />,
    id: 'summary',
    label: 'Summary',
  },
  {
    icon: <FileTextIcon />,
    id: 'transcript',
    label: 'Transcript',
  },
  {
    icon: <FileVideoIcon />,
    id: 'recording',
    label: 'Recording',
  },
  {
    icon: <SparklesIcon />,
    id: 'chat',
    label: 'Ask AI',
  },
] as const;
