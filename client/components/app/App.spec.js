jest.mock('../../utils/fetch', () => ({
	getJson: jest.fn(
		url =>
			new Promise(
				(resolve, reject) =>
					url ? resolve({ value: 'Chuck Norris joke' }) : reject()
			)
	)
}));

import React from 'react';
import App from './App';
import Button from '../button/Button';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getJson } from '../../utils/fetch';

describe('On click in button', () => {
	const app = shallow(<App />);
	app.find('button').simulate('click');

	it('should call ChuckNorris API', () => {
		expect(getJson).toBeCalledWith(
			'https://api.chucknorris.io/jokes/random'
		);
	});

	it('should update Button children', () => {
		return app.instance().handleClick().then(() => {
			expect(app.find(Button).props().text).toEqual('Chuck Norris joke');
		});
	});
});

test('<App/>', () => {
	const renderer = new ShallowRenderer();
	const tree = renderer.render(<App />);

	expect(tree).toMatchSnapshot();
});
