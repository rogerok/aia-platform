import { cva } from 'class-variance-authority';
import { FC } from 'react';

import { cn } from '@/lib/utils';
import { generateRandomLinearGradient } from '@/lib/utils/randomColorGenerator';

// I know it's too much, but why not?

interface GenerateAvatarRules {
  firstName: boolean;
  lastName: boolean;
  action: (firstName?: string, lastName?: string) => string;
}

const ruleData: GenerateAvatarRules[] = [
  {
    action: (firstName, lastName) =>
      `${firstName!.charAt(0)}${lastName!.charAt(0)}`,
    firstName: true,
    lastName: true,
  },
  {
    action: (firstName) => firstName!.charAt(0),
    firstName: true,
    lastName: false,
  },
  {
    action: (_, lastName) => lastName!.charAt(0),
    firstName: false,
    lastName: true,
  },
  {
    action: () => '',
    firstName: false,
    lastName: false,
  },
];

const avatarVariants = cva(
  'flex items-center justify-center rounded-full text-center font-bold uppercase text-white',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        lg: 'size-12',
        md: 'size-9',
        sm: 'size-6',
      },
    },
  },
);

const makeDecision = (
  rules: GenerateAvatarRules[],
  firstName?: string,
  lastName?: string,
): string => {
  for (const rule of rules) {
    if (rule.firstName === !!firstName && rule.lastName === !!lastName) {
      return rule.action(firstName, lastName);
    }
  }
  return '';
};

interface GeneratedAvatarProps {
  className?: string;
  firstName?: string;
  lastName?: string;
  size?: 'lg' | 'md' | 'sm';
}

export const GeneratedAvatar: FC<GeneratedAvatarProps> = (props) => {
  const { className, firstName, lastName, size } = props;

  const gradient = generateRandomLinearGradient();

  return (
    <div
      className={cn(avatarVariants({ className, size }))}
      style={{
        background: gradient,
      }}
    >
      {makeDecision(ruleData, firstName, lastName)}
    </div>
  );
};
