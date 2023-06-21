
export const addDetail=(data)=>{
    return {
        type:"ADD_DETAIL",
        data:data
    }
}
export const editDetail=(data)=>{
    // console.log(data,"-->data");
    return {
        type:"EDIT_DETAIL",
        data:data,
    }
}
export const deleteDetail=(data)=>{
    return{
        type:"DELETE_DETAIL",
        data:data,
    }
}