import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItem from './NavigationItem/NavigationItem'
import NavigationItems from './NavigationItems'

configure({ adapter: new Adapter() })

describe('<NavigationItems/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('Should render two nav items when unauthenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2) //.find is a selector- css, id, class, constructor, display name 
    })

    it('Should render three nav items when authenticated',()=>{
        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('Should show logout when authenticated', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link ='/logout'> Log Out  </NavigationItem>)).toBeTruthy()
    })
})
