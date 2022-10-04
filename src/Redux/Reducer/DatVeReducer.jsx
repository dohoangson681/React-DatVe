import dataghe from '../../BaiTapDatVe/dataGhe.json' ; 
const stateDefault = ({
    danhSachGhe : dataghe , 
    inputPicker : {
        name : "" , 
        numberOfSeats : ""
    },
    picker : {
        name :"" , 
        numberOfSeats : null ,     
        seats : ""
    } , 
    enableSelect : false , 
    enableConfirm : false
})
export const DatVeReducer = (state = stateDefault , action) => {
    console.log(action) ; 
    switch (action.type) {
        case "ENABLE_SELECT" :
                let inputPickerUpdate = {
                    name : action.inputName ,
                    numberOfSeats : action.inputSeat
                }
                let newStateUpdate = {...state , enableSelect : true , inputPicker : inputPickerUpdate  } ; 
                console.log(newStateUpdate) ; 
                
                state = newStateUpdate ; 
                console.log('state enable select' , state) ; 
            return {...state} ; 
        case 'USER_PICK' :
                // console.log(action) ; 
                let indexRow = state.danhSachGhe.findIndex((row)=>{
                    return row.hang === action.row ; 
                })
                // console.log('indexrow' , indexRow) ; 
                // console.log('action.index' , action.index) ; 
                let newDanhSachGhe = state.danhSachGhe ;
                newDanhSachGhe[indexRow].danhSachGhe[action.index].daDat = null ; 
                let newState =  {...state , danhSachGhe : newDanhSachGhe}
                state = newState ; 
                console.log(state) ; 
                
            return {...state} ; 
        case "UNPICK" : 
                {
                    let indexRow = state.danhSachGhe.findIndex((row)=>{
                        return row.hang === action.row ; 
                    })
                    // console.log('indexrow' , indexRow) ; 
                    // console.log('action.index' , action.index) ; 
                    let newDanhSachGhe = state.danhSachGhe ;
                    newDanhSachGhe[indexRow].danhSachGhe[action.index].daDat = false ; 
                    let newState =  {...state , danhSachGhe : newDanhSachGhe}
                    state = newState ; 
                    console.log(state) ;
                }
                return {...state} ; 
        case 'INFO_OUT' :
            {
                console.log("---------------action-----------------",action) ; 
                let name = action.namePicker ; 
                let numberOfSeats = action.numberOfSeats ; 
                let nameOfSeats = action.nameOfSeats ; 
                let pickerUpdate = {...state.picker , name  , numberOfSeats , seats : nameOfSeats }
                console.log(pickerUpdate) ; 
                state.picker = pickerUpdate

                }

            
            return {...state} ; 
            default:
       
            return state ; 
    }
}