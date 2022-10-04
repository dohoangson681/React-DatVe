import React, { Component } from "react";
import { connect } from "react-redux";
class FormDatVe extends Component {
  state = {
    name : '' , 
    numberOfSeats : ''
  }
  handleChange = (e) => {
    let element = e.target ; 
    let {name , value} = element ; 
    // console.log(name , "" , value) ; 
    // let newState  = {...this.state , [name] : value}
    // console.log('newState' , newState ) ; 
    this.setState({
      [name] : value, 
    })
  }
  render() {
    return (
     <form>
  <div className="form-row">
    <div className="form-group col-md-6 ">
      <label htmlFor="inputEmail4">Name</label>
      <input type="text" className="form-control" name="name" onChange={(event)=>{
        this.handleChange(event) ; 
      }} />
    </div>
    <div className="form-group col-md-6 ">
      <label htmlFor="inputPassword4">Number of seats</label>
      <input type="text" className="form-control" name="numberOfSeats" onChange={(event)=>{
        this.handleChange(event) ; 
      }} />
    </div>
  </div>
  <button onClick={(event)=>{
      event.preventDefault() ; 
      let inputName = this.state.name ; 
      let inputSeat = this.state.numberOfSeats ; 
      // console.log("inputName" , inputName) ; 
      // console.log("inputSeat" , inputSeat) ; 
      if(inputName.trim() === "" || inputSeat.trim() === "")
      {
        alert("Required input field !!") ; 
      }else {
        let regexName = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/ ; 
        let tbName = '' ; 
        let tbSeat = '' ; 
        if(!inputName.match(regexName)){
              tbName = "Name Invalid !" ; 
        }
        if((Number(inputSeat) - Math.floor(Number(inputSeat)) !== 0) || Number(inputSeat) <= 0 ){
          tbSeat = "Seat number Invalid !" ; 
        }
        let mainTB = tbName + tbSeat ; 
        if(mainTB.trim() !== ""){
          alert(mainTB) ; 
        }
        else {
          //do something here
          this.props.dispatch({
            type : "ENABLE_SELECT" ,
            inputName : inputName , 
            inputSeat : inputSeat
          }) ; 
        }
         
      }
  }} type="submit" className="btn btn-primary">Start picking</button>
</form>

    );
  }
}
export default  connect()(FormDatVe) ; 
