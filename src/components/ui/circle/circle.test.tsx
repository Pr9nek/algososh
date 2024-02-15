import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import { render, screen } from "@testing-library/react";

describe("Circle component snapshot tests", () => {

    // it("renders correctly without letter", () => {
    //     const tree = renderer.create(<Circle />).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    it('рендер Circle без буквы', () => {
        render(<Circle letter="" />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle с буквами', () => {
        render(<Circle letter='A' />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle с head', () => {
        render(<Circle head='head' />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle с tail', () => {
        render(<Circle tail='tail' />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle с index', () => {
        render(<Circle index={0} />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle с пропом isSmall ===  true', () => {
        render(<Circle isSmall={true} />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle в состоянии default', () => {
        render(<Circle state={ElementStates.Default} />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle в состоянии changing', () => {
        render(<Circle state={ElementStates.Changing} />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

    it('рендер Circle в состоянии modified', () => {
        render(<Circle state={ElementStates.Modified} />);
        expect(screen.getByTestId('circle_container')).toMatchSnapshot();
    });

})