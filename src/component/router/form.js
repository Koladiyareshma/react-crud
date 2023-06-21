import {
    Stack, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
    Typography, FormGroup, Checkbox, Container, InputLabel, Select, MenuItem, TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addDetail } from '../redux/action'

function Form() {
     const tableData = useSelector((state) => state.tableData)
    const userDetails = { fname: '', lname: '', email: '', password: '', bod: '', phone: '', age: '', city: '', gender: '', course: [] }
    const [userDetail, setUserDetail] = useState(userDetails)
    const [userData, setUserData] = useState([])
    const [isError, setIsError] = useState({})
    const dispatch = useDispatch()
   
    const params = useParams()

    useEffect(() => {   
        // const id = window.location.pathname.split('/')[2]
        // const pathName = window.location.pathname
        // const id = pathName.split('/')[2]
        const id = params.id;
        console.log(tableData,"---->tabledata");
        console.log(id,'--->');
        if (id && tableData) {
            setUserDetail(tableData[id])
        }
        setUserData(tableData)
    },[]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "course") {
            if (checked) {
                userDetail.course = [...userDetail.course, value]
            } else {
                userDetail.course =userDetail.course.filter(x => x !== value)
            }
            setUserDetail({...userDetail})
        } else {
            setUserDetail({ ...userDetail, [name]: value })
        }
    }

    const formvalidation = (name, value) => {
        switch (name) {
            case "fname":
                if (!value) { return "*required"; } else { return ""; }
            case "lname":
                if (!value) { return "*required"; } else { return ""; }
            case "email":
                if (!value) { return "*required"; } else { return ""; }
            case "password":
                if (!value) { return "*required"; } else { return ""; }
            case "bod":
                if (!value) { return "*required"; } else { return ""; }
            case "phone":
                if (value.length < 10) { return "*required"; } else { return ""; }
            case "age":
                if (value < 0) { return "*required"; } else { return ""; }
            case "gender":
                if (!value) { return "*required"; } else { return ""; }
            case "course":
                if (!value.length > 0) { return "*required"; } else { return ""; }
            default:
                return "";
        }
    }
    const handleSubmit = () => {
        const Error = [];
        const user = userDetail
        Object.keys(user).forEach((key) => {
            const error = formvalidation(key, user[key])
            if (error.length > 0) {
                Error[key] = error
            }
        });
        if (Object.keys(Error).length > 0) {
            setIsError(Error)
            return;
        } else {
            setIsError([])
        }
        console.log(userDetail, "--->userDetail");
        const newdata = tableData;
        const id = params.id;
        if (id) {
            newdata[id] = userDetail
            setUserData([...newdata])
            dispatch(addDetail(newdata))
        }
        else {
            userData.push(userDetail)
            console.log(userData, "--------->userData");
            setUserData([...userData])
            dispatch(addDetail(userData))
        }
        setUserDetail(userDetails)
    }
    return (
        <>
            <div>
                <Container component="main" maxWidth="sm">
                    <Box
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2,
                            px: 4,
                            py: 6,
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: 'info.main'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Register Form
                        </Typography>
                        <Box component="form" sx={{ mt: 1 }}>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    name='fname'
                                    variant='outlined'
                                    color='secondary'
                                    label="First Name"
                                    helperText={isError.fname}
                                    value={userDetail.fname}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    type="text"
                                    name='lname'
                                    variant='outlined'
                                    color='secondary'
                                    label="Last Name"
                                    helperText={isError.lname}
                                    value={userDetail.lname}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Stack>
                            <TextField
                                type="email"
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                name="email"
                                helperText={isError.email}
                                value={userDetail.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="password"
                                variant='outlined'
                                color='secondary'
                                label="Password"
                                name="password"
                                helperText={isError.password}
                                value={userDetail.password}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="tel"
                                variant='outlined'
                                color='secondary'
                                label="phone No"
                                name="phone"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                helperText={isError.phone}
                                fullWidth
                                value={userDetail.phone}
                                onChange={handleChange}
                                required
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="number"
                                variant='outlined'
                                color='secondary'
                                label="Age"
                                name="age"
                                helperText={isError.age}
                                fullWidth
                                value={userDetail.age}
                                onChange={handleChange}
                                required
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="date"
                                variant='outlined'
                                color='secondary'
                                name="bod"
                                helperText={isError.date}
                                fullWidth
                                value={userDetail.bod}
                                onChange={handleChange}
                                required
                                sx={{ mb: 4 }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="City"
                                    name="city"
                                    helperText={isError.city}
                                    value={userDetail.city}
                                    onChange={handleChange}
                                >
                                    {[{ name: 'Surat' }, { name: 'Mumbai' }, { name: 'Rajkot' }].map(e =>
                                        <MenuItem value={e.name} name='city'>{e.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    error={userDetail.gender.length == 0}
                                    helperText={isError.gender}
                                    value={userDetail.gender}
                                    onChange={handleChange}
                                >
                                    {[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }].map(e =>
                                        <FormControlLabel value={e.name} name='gender' control={<Radio />} label={e.name} />)}
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel id="demo-checkbox-group-label">Course</FormLabel>
                                <FormGroup
                                    row
                                    error={userDetail.course.length > 0}
                                    helperText={isError.course}
                                >
                                    {[{ name: 'BBA' }, { name: 'B.Com' }, { name: 'BCA' }, { name: 'B.Sc' }].map((e) =>
                                        // <FormControlLabel  value={e.name} name='course' control={<Checkbox />} label={e.name} />)}
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={userDetail.course?.includes(e.name)}
                                                    onChange={handleChange}
                                                    name='course'
                                                    value={e.name} />
                                            }
                                            label={e.name}
                                        />)}
                                </FormGroup>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => handleSubmit()}>
                                SUBMIT
                            </Button>
                            

                        </Box>
                    </Box>
                </Container>
            </div>

        </>
    )
}

export default Form