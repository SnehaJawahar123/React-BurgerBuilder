import React from 'react'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {BurgerBuilder} from './BurgerBuilder'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'

configure({adapter: new Adapter()})

describe('<BurgerBuilder/>',()=> {

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredient={()=>{}}/>) //wrapper will be undefined if we dont pass the comp did mount prop here
    })
    
    it('should render burger controls when ingrediants is present',()=>{
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BurgerControls)).toHaveLength(1)
    })
})