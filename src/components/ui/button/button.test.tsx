import { Button } from "./button";
import { render, fireEvent, screen } from '@testing-library/react';
const testRenderer = require('react-test-renderer');

describe('Button component', () => {
    it('rendering a button with text', () => {
        const tree = testRenderer.create(<Button text='Кнопка'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('rendering a button without text', () => {
        const tree = testRenderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('rendering a disabled button', () => {
        const tree = testRenderer.create(<Button disabled={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('rendering a button with a loading indication', () => {
        render(<Button />);
        const tree = testRenderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('the correctness of calling the callback when clicking on the button', () => {
        const callBackMockFn = jest.fn();
        render(<Button onClick={callBackMockFn} />)
        fireEvent.click(screen.getByRole('button'))
        expect(callBackMockFn).toHaveBeenCalled();
    });

})