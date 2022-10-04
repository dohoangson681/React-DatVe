import React, { Component } from 'react' ; 
import { connect } from 'react-redux';

class TableConfrim extends Component {
  render() {
    console.log(this.props.picker) ; 
    return (
      <div>
        <table className="table my-3 " style={{
            background : "white",
            borderRadius : "8px"  
        }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number of Seats</th>
                    <th>Seats</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{this.props.picker.name}</td>
                <td>{this.props.picker.numberOfSeats}</td>
                <td>{this.props.picker.seats}</td>
                </tr>
            </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {
  return {
      picker : rootReducer.DatVeReducer.picker ,
  }
}
export default connect(mapStateToProps , null)(TableConfrim) ; 
