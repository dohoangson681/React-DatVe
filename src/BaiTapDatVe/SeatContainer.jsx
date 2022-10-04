import React, { Component } from "react";
// import dataseat from "./dataGhe.json";
import { connect } from "react-redux";

class SeatContainer extends Component {
  state = {
    seatPicked: 0,
    nameOfSeats : ""
  };
  renderSeat = () => {
    return this.props.DatVeReducer.danhSachGhe.map((row) => {
      //   console.log(row.hang) ;
      //   console.log(row.danhSachGhe) ;
      return (
        <div key={row.hang} className="row mb-2">
          <div className="col-1 firstChar">{row.hang}</div>
          <div className="col-11 row">
            {row.danhSachGhe.map((seat, index) => {
              if (row.hang === "") {
                return (
                  <div key={seat.soGhe} className="col-1">
                    <div className="rowNumber text-center">{++index}</div>
                  </div>
                );
              } else {
                if (seat.daDat === false) {
                  // let style = {
                  //   backgroundColor: "beige",
                  // };
                  return (
                    <div key={seat.soGhe} className="col-1">
                      <div onClick={()=>{

                      this.props.userpick(row.hang , index) ; 
                      let currentNumOfSeat = this.state.seatPicked
                      let currentNameOfSeats = this.state.nameOfSeats ; 
                      this.setState({
                        seatPicked : ++currentNumOfSeat,
                        nameOfSeats : currentNameOfSeats + `${row.hang}${index} `  
                      } , () => {
                        console.log('this.state' , this.state) ; 
                      })
                    }} className="ghe text-center">{++index}</div>
                    </div>
                  );
                }else if (seat.daDat === null) {
                  return (
                    <div key={seat.soGhe} className="col-1">
                      <div onClick={()=>{
                      // ??????????????/????thuc hien ham khi nhan vao nut da chon thi se bo chon
                      this.props.unpick(row.hang , index) ;
                      let currentNumOfSeat = this.state.seatPicked ; 
                      let currentnameClick = `${row.hang}${index}`
                      // console.log('currentnameClick' , currentnameClick) ; 
                      let idx = this.state.nameOfSeats.indexOf(currentnameClick) ;
                      let dropStr = "" ; 
                      if(index < 10) {
                        dropStr = this.state.nameOfSeats.slice(idx , idx + 2) ; 
                      }else {
                        dropStr = this.state.nameOfSeats.slice(idx , idx + 3)
                      }
                      // console.log(this.state.nameOfSeats) ; 
                      dropStr = this.state.nameOfSeats.slice(idx , idx + 2) ; 
                      // console.log('idx' , idx) ;
                      // console.log('dropStr' , dropStr) ;
                      let newStr = this.state.nameOfSeats.replace(dropStr , "") ; 
                      // console.log('newStr' , newStr) ; 
                      this.setState({
                        seatPicked : --currentNumOfSeat , 
                        nameOfSeats : newStr
                      } , () => {
                        console.log('this.state' , this.state) ; 
                      })
                    }} className="gheDangChon text-center">{++index}</div>
                    </div>
                  );
                }else {
                  let style = {
                    backgroundColor: "red",
                    color: "white",
                    pointerEvents : "none"
                  };
                  return (
                    <div key={seat.soGhe} className="col-1">
                      <div onClick={()=>{
                            this.props.userpick(row.hang , index) ; 
                      }} style={style} className="ghe text-center">
                        {++index}
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      );
    });
  };
  render() {
    console.log('this.props.DatVeReducer' , this.props.DatVeReducer) ; 
    let display = {};
    if (this.props.DatVeReducer.enableSelect) {
      display = { ...display, display: "block" };
    } else {
      display = { ...display, display: "none" };
    }
    return (
      <div style={display} className="seat-container my-5">
        <div className="seat-info row w-50">
          <div className="col-4 d-flex align-items-center">
            <button className="btn-seat-select mr-2"></button>
            <span>Empty Seat</span>
          </div>
          <div className="col-4 d-flex align-items-center">
            <button className="btn-seat-reserved mr-2"></button>
            <span>Selected Seat</span>
          </div>
          <div className="col-4 d-flex align-items-center">
            <button className="btn-seat-booked mr-2"></button>
            <span>Reserved Seat</span>
          </div>
        </div>
        {this.renderSeat()}
        <div className="btn-confirm text-center">
          <button onClick={()=>{
            let slForm = Number(this.props.DatVeReducer.inputPicker.numberOfSeats) ; 
            console.log('slForm :' , slForm , typeof(slForm)) ;
            let slCurrent = this.state.seatPicked ; 
            console.log('slCurrent' , slCurrent)  ;
            if(slCurrent < slForm) {
              alert("Chưa chọn đủ số ghế !") ;
            }else if(slCurrent > slForm){
              alert("Số ghế chọn vượt quá số lượng đăng kí !") ;
            }else {
              // đã chọn đủ số ghế
              this.props.confirm( this.props.DatVeReducer.inputPicker.name ,slForm , this.state.nameOfSeats) ; 
               
            }

          }} className="btn btn-warning">Confirm</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    // select: rootReducer.DatVeReducer.enableSelect,
    // numberOfSeat: rootReducer.DatVeReducer.inputPicker.numberOfSeats,
    // dataseat : rootReducer.DatVeReducer.danhSachGhe , 
    DatVeReducer : rootReducer.DatVeReducer
  };
};
const mapDispatchToProps = (sendStoreReq) => {
  return {
      userpick : (row , index) => {
          // console.log(row , index) ; 
          sendStoreReq({
            type : "USER_PICK" , 
            row,
            index : index - 1
          })
      } , 
      unpick : (row , index) => {
        sendStoreReq({
          type : "UNPICK" , 
          row,
          index : index - 1
        })
      },
      confirm : (name , slForm , slSeat) => {
        let action = {
          type : "INFO_OUT" , 
          numberOfSeats : slForm , 
          nameOfSeats : slSeat ,
          namePicker : name
        } 
        sendStoreReq(action) ; 
      }
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(SeatContainer);
