import { MessageService } from './message.service';
describe('MessageService', () => {
  let sut: MessageService;

  beforeEach(() => {
    sut = new MessageService();
  })

  it('Should have no message to start', () => {
    const result = sut.messages.length;

    expect(result).toBe(0)
  })

  it('Should add a messagen when add is called', () => {
    sut.add('any message');

    const result = sut.messages.length;

    expect(result).toBe(1)
  })

  it('Should remove all messages when clear is called', () => {
    sut.add('any message');
    sut.clear();

    const result = sut.messages.length;

    expect(result).toBe(0)
  })
})
