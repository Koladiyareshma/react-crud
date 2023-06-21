
const intialstate = {
    tableData: [],
    editData: {},
}

export const theReducer = (state = intialstate, action) => {
    switch (action.type) {
        case "ADD_DETAIL":
            state.tableData = action.data
            return {
                ...state
            }
        case "EDIT_DETAIL":
            // const clonedata = [...state.tableData];
            // const findDataIndex = clonedata.findIndex((ele) => ele?.id === action.data?.id);
            // const findData = findDataIndex !== -1 ? clonedata[findDataIndex] : {};
            // return {
            //     ...state,
            //     tableData: findData,
            // };
            const findData = state.tableData.find((ele, i) => i === action.data);
            console.log(action.data,"----------------------->");
            return { 
                ...state, editData: findData !== -1 ? findData : {}      //undefine
             };
            
        case "DELETE_DETAIL":
            const cloneData = [...state.tableData];
            cloneData.splice(action.data, 1);
            return {
                ...state, tableData: cloneData
            };
        return {
        ...state,
        tableData: state.tableData.filter((item, index) => index !== action.data),
        };
        default:
            return state
    }
}