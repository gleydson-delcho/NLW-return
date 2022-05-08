import { MailAdapter } from '../adapter/mail-adapter';
import {FeedbacksRepository} from '../feedbacks-repository';

interface SubmitFeedbackCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackCaseRequest){

    const { type, comment, screenshot} = request;

    if(!type) {
      throw new Error('Type is required.')
    }
    if(!comment) {
      throw new Error('Comment is required.')
    }
    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
    }
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback \n',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;"> \n`,
        `Tipo de feedback: ${type} \n` ,
        `Comentário do feedback: ${comment}\n`,
        screenshot ? `<img src="${screenshot}">` : null,
        `</div>`
      ].join('\n')
    })
  }
}