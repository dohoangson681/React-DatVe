import React, { Component } from 'react'
import FormDatVe from './FormDatVe'
import SeatContainer from './SeatContainer'
import TableConfrim from './TableConfrim'

export default class BaiTapDatVeRedux extends Component {
  render() {
    return (
      <div className='BTDatVe' >
        <div className="overlay"></div>
        <div className='my-container py-3'>
            <div className="container  pb-3">
              <h1 className='text-center text-warning py-5'>MOVIE SEAT SELECTION</h1>
              <FormDatVe />
              <SeatContainer />
              <TableConfrim/>
            </div>
            
        </div>
      </div>
    )
  }
}
