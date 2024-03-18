import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobId, Queue } from 'bull';

type Job = {
  data: string;
};

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('queue')
    private screenQueue: Queue<Job>
  ) {}

  async enqueueJob(data: Job) {
    return this.screenQueue.add(data);
  }

  async getQueuePosition(jobId: JobId): Promise<number> {
    const [activeJobs, waitingJobs] = await Promise.all([
      this.screenQueue.getActive(),
      this.screenQueue.getWaiting(),
    ]);

    if (activeJobs.find((i) => i.id == jobId)) {
      return 0;
    }

    const jobIndex = waitingJobs.findIndex((i) => i.id == jobId);

    return jobIndex === -1 ? -1 : jobIndex + 1;
  }

  async postJob(data: Job): Promise<unknown> {
    const job = await this.enqueueJob(data);

    const pos = await this.getQueuePosition(job.id);

    return {
      jobId: job.id,
      data: job.data,
      position: pos,
    };
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
