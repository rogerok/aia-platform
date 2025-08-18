export const MeetingStatusTabsValues = {
  chat: 'chat',
  recording: 'recording',
  summary: 'summary',
  transcript: 'transcript',
} as const;

export const StatusTabsConstant = [
  {
    id: MeetingStatusTabsValues.summary,
    label: 'Summary',
  },
  {
    id: MeetingStatusTabsValues.transcript,
    label: 'Transcript',
  },
  {
    id: MeetingStatusTabsValues.recording,
    label: 'Recording',
  },
  {
    id: MeetingStatusTabsValues.chat,
    label: 'Ask AI',
  },
] as const;

export type TabsStatusType = (typeof StatusTabsConstant)[number];
