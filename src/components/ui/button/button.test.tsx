import { Button } from "./button";
import { render, fireEvent, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';

describe('Button component', () => {
    it('рендер кнопки с текстом', () => {
        render(<Button text='Кнопка' />);
        expect(screen.getByRole('button')).toMatchSnapshot();
    });

    it('рендер кнопки без текста', () => {
        render(<Button />);
        expect(screen.getByRole('button')).toMatchSnapshot();
    });

    it('рендер заблокированной кнопки', () => {
        render(<Button disabled={true} />);
        expect(screen.getByRole('button')).toMatchSnapshot();
    });

    it('рендер кнопки с индикацией загрузки', () => {
        render(<Button isLoader={true} />);
        expect(screen.getByRole('button')).toMatchSnapshot();
    });

    // it('рендер заблокированной кнопки', () => {
    //     const tree = renderer
    //         .create(<Button disabled />)
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    // it('рендер кнопки с индикацией загрузки', () => {
    //     const tree = renderer
    //         .create(<Button isLoader />)
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    it('корректность вызова колбека при клике на кнопку', () => {
        const callBackMockFn = jest.fn();
        render(<Button onClick={callBackMockFn} />)
        fireEvent.click(screen.getByRole('button'))
        expect(callBackMockFn).toHaveBeenCalled();
    });

})