import { Card, Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet-async'
import TuitionMainTable from './TuitionMainTable'
import studentApi from '../../api/studentApi'
import tuitionApi from '../../api/tuitionApi'
import SchoolPaymentApp from './SchoolPaymentApp'

export default function Tuition() {

    const [tuition, setTuition] = useState(null)
    const [semesterTypes, setSemesterTypes] = useState(null)
    const [semesterIdActived, setSemesterIdActived] = useState('')

    const updateTuition = async () => {
        const result = await studentApi.getTuiTion(51800423)

        if(result.status === 200){
            setTuition(result.data.data);
        }
    }

    const getSemesterTypes = async () => {
        const result = await tuitionApi.getSemesterTypes()

        if(result.status === 200){
            setSemesterTypes(result.data.data);
        }
    }

    const handleChange = (event) => {
        const selectedSemester = event.target.value;
        setSemesterIdActived(selectedSemester);
        // Perform any necessary logic with the selected semester
    };

    useEffect(() => {
        updateTuition();
        getSemesterTypes();
    }, [])

    return (
        <>
            <Helmet>
                <title> Student Tuition | TDTU Tuition </title>
            </Helmet>

            <Container >

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4">
                        Tuition
                    </Typography>
                </Stack>

                <Card sx={{ marginBottom: '20px' , padding: '10px'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                        <Select
                            label="semester"
                            value={semesterIdActived}
                            onChange={handleChange}
                        >
                            {semesterTypes?.map((semester) => (
                                <MenuItem key={semester.SemesterID} value={semester.SemesterID}>
                                    {semester.SemesterName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Card>
                
                {
                    tuition !== null
                    &&
                    <TuitionMainTable 
                        data={tuition}
                        semesterID={semesterIdActived}
                    />
                }

                <SchoolPaymentApp />

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={4}>
                    <Typography variant="h4">
                        Courses that have included tuition fees in the semester
                    </Typography>
                </Stack>

            </Container>
        </>
    )
}
