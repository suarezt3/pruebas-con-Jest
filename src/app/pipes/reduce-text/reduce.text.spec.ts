import { ReduceTextPipe } from "./reduce-text.pipe";


//? TEST A UN PIPE
describe('ReduceTextPipe', () => {
    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('Should create', () => {
        expect(pipe).toBeTruthy();
    });


    // transform(value: string, ...args: number[]): string {
    //     return value.substring(0, args[0]);
    //   }

    it('Use transform corretly', () => {
        const text = 'Hello this is a test a check the pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5)
    })

});