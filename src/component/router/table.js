import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd'
import { addDetail, deleteDetail, editDetail } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { debounce } from 'lodash';

function Table_Data() {
    const dispatch = useDispatch()
    const tableData = useSelector((state) => state.tableData)
    console.log(tableData, "-------------------->tabledata");
    const navigate = useNavigate()

    // const [searchInput, setSearchInput] = useState([])
    const [search, setSearch] = useState()
    const [userRecord, setUserRecord] = useState(tableData)

    const [pageSize, setPageSize] = useState(5)
    const [page, setPage] = useState()

    //////sorting fname

    const fname = tableData.map((item) => {
        return item['fname']
    })

    const columns = [
        {
            title: 'First Name', dataIndex: 'fname', key: 'fname',
            sorter: (a, b) => a.fname > b.fname ? -1 : 1
        },
        {
            title: 'Last Name', dataIndex: 'lname', key: 'lname',
            sorter: (a, b) => a.lname > b.lname ? -1 : 1
        },
        {
            title: 'Email', dataIndex: 'email', key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
            // sorter: (a, b) => a.email > b.email
        },
        {
            title: 'Birth of Date', dataIndex: 'bod', key: 'bod'
        },
        {
            title: 'Phone', dataIndex: 'phone', key: 'phone',
        },
        {
            title: 'Age', dataIndex: 'age', key: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'City', dataIndex: 'city', key: 'city',
            sorter: (a, b) => a.city < b.city ? -1 : 1
        },
        {
            title: 'Gender', dataIndex: 'gender', key: 'gender'
        },
        {
            title: 'course', dataIndex: 'course', key: 'course',
            render: (recode, data, i) => handleCheck(recode, data)
        },
        {
            title: 'Action', dataIndex: 'action',
            render: (recode, data, i) => (
                <>
                    <EditOutlined onClick={() => { Edit(data, i) }} style={{ color: "blue", marginRight: "10px" }} />
                    <DeleteOutlined onClick={() => { Delete(data, i) }} style={{ color: "red" }} />
                </>
            )
        }
    ];
    const Edit = (data, i) => {
        dispatch(editDetail(i))
        navigate(`/edit/${i}`)
    }
    const Delete = (data, i) => {
        dispatch(deleteDetail(i))
    }
    //searching debounce
    const handleSearch = (e) => {
        const filterData = userRecord?.filter((x) => {
            return x.fname.toLowerCase().includes(e.toLowerCase());
        });
        // setSearchInput(filterData)
        setSearch(e)
        dispatch(addDetail(filterData))
    }
     const debouncedOnChange = debounce(handleSearch, 300);
    const onChange=(e)=>{
        debouncedOnChange(e.target.value)
    }

    const handleCheck = (recode, data) => {
        if (data.course.length > 0) {
            return data.course.join(", ");
        }
    }
    const handlePage = (e) => {
        setPageSize(e.target.value)
    }

    return (
        <>
            <Stack spacing={115} direction="row" sx={{ marginBottom: 4, marginTop: '10px' }}>
                <TextField
                    type="text"
                    placeholder="Search here"
                    onChange={onChange}
                    value={search}
                    sx={{ width: '200px' }}
                />
                <FormControl variant="outlined" sx={{ width: '100px' }}>
                    <InputLabel id="demo-simple-select-label">Records</InputLabel>
                    <Select
                        label="Records"
                        defaultValue="5"
                        value={pageSize}
                        name="Records"
                        onChange={handlePage} >
                        {[{ name: '5' }, { name: '10' }, { name: '15' }].map(e =>
                            <MenuItem value={e.name}>{e.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Stack>


            {/* <Table className="antd-table" dataSource={searchInput.length !== 0 ? searchInput : tableData} columns={columns} */}
            <Table className="antd-table" dataSource={tableData} columns={columns}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }
                }}
            />

        </>
    )
}
export default Table_Data
