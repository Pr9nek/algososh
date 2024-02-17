import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

const testRenderer = require('react-test-renderer');

describe("Circle component snapshot tests", () => {

    it('renders Circle without a letter', () => {
        const tree = testRenderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle with а letter', () => {
        const tree = testRenderer.create(<Circle letter='A'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle with head', () => {
        const tree = testRenderer.create(<Circle head='head'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle with tail', () => {
        const tree = testRenderer.create(<Circle tail='tail'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle with index', () => {
        const tree = testRenderer.create(<Circle index={0}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle with props isSmall ===  true', () => {
        const tree = testRenderer.create(<Circle isSmall={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle in the default state', () => {
        const tree = testRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle in the changing state', () => {
        const tree = testRenderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Circle in the modified state', () => {
        const tree = testRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with react-element in head', () => {
        const tree = testRenderer
            .create(<Circle head={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with react-element in tail', () => {
        const tree = testRenderer
            .create(<Circle tail={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

})