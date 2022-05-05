import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
  it('Should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemplo de comentário',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it('Should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'exemplo de comentário',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  });
  it('Should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  });
  it('Should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemplo de comentário',
      screenshot: 'test.png'
    })).rejects.toThrow();
  });
});