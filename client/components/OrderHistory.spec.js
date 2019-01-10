import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import OrderHistory from './OrderHistory'
import Order from './Order'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('OrderHistory', () => {
  it('renders at least one <Order /> component', () => {
    const wrapper = shallow(<OrderHistory />)
    expect(wrapper.find(Order)).length.to.be.greaterThan(0)
  })
})
