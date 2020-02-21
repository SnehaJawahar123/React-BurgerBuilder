import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import reducer from '../../store/reducers/Auth'
import {AUTH_SUCCESS} from '../../store/actions/actionTypes'

configure({ adapter: new Adapter() })

describe('<Auth/>', () => {
    it('Should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        })
    })

    it('Should store token on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        }, {
            type: AUTH_SUCCESS,
            idToken: 'some-token-id',
            userId: 'some-user-id',
            error: null
        })).toEqual({
            error: null,
            loading: false,
            token: 'some-token-id',
            userId: 'some-user-id',
            redirectPath: '/'
        })
    })
})


