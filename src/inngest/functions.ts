import { createAgent, openai, TextMessage } from '@inngest/agent-kit';
import { eq, inArray } from 'drizzle-orm';
import JSONL from 'jsonl-parse-stringify';

import { db } from '@/db';
import { agents, meetings, user } from '@/db/schemas/schema';
import { inngest } from '@/inngest/client';
import { envs } from '@/lib/constants/envs';
import { summarizerPrompt } from '@/lib/constants/summarizer';
import { StreamTranscriptItem } from '@/lib/models/meetings/stream';

const summarizer = createAgent({
  model: openai({
    apiKey: envs.openAiKey,
    model: 'gpt-4o',
  }),
  name: 'summarizer',
  system: summarizerPrompt,
});

export const meetingsProcessing = inngest.createFunction(
  {
    id: 'meetings/processing',
  },
  {
    event: 'meetings/processing',
  },
  async ({ event, step }) => {
    const resp = await step.run('fetch-transcript', async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run('parse-transcript', async () => {
      return JSONL.parse<StreamTranscriptItem>(resp);
    });

    const transcriptWithSpeakers = await step.run('add-speakers', async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((user) => ({
            ...user,
          })),
        );

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
          })),
        );

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id,
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: 'Unknown',
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const { output } = await summarizer.run(
      'Summarize the following transcript: ' +
        JSONL.stringify(transcriptWithSpeakers),
    );

    await step.run('save-summary', async () => {
      await db
        .update(meetings)
        .set({
          summary: (output[0] as TextMessage).content as string,
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  },
);
