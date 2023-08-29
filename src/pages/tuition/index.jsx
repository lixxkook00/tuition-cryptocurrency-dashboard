import { Button, Card, Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import truncateEthAddress from 'truncate-eth-address'

import { Helmet } from 'react-helmet-async'

import TuitionMainTable from './TuitionMainTable'
import studentApi from '../../api/studentApi'
import tuitionApi from '../../api/tuitionApi'
import SchoolPaymentApp from './SchoolPaymentApp'
import { connectWallet } from '../../interactions/connectWallet'

export default function Tuition() {
    const [tuition, setTuition] = useState(null)
    const [semesterTypes, setSemesterTypes] = useState(null)
    const [semesterIdActived, setSemesterIdActived] = useState('')
    
    const [address, setAddress] = useState("")

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

    // handle connect wallet
    const handleConnectWallet = async () => {
        const result = await connectWallet();

        setAddress(result)
    }

    // handle changed wallet
    useEffect(() => {
        if (window.ethereum){
            handleConnectWallet()
        }
        if (window.ethereum && window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress);
        }
    },[])

    // handle on-change wallet
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

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

                    <Button color={ address ? "success" : "primary" } variant="contained" onClick={() => handleConnectWallet()} >
                        { address === "" ? "Connect Wallet" : `${truncateEthAddress(address)}`} 
                    </Button>
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

                <SchoolPaymentApp 
                    data={tuition}
                    semesterID={semesterIdActived}
                    semesterTypes={semesterTypes}
                />

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={4}>
                    <Typography variant="h4">
                        Courses that have included tuition fees in the semester
                    </Typography>
                </Stack>

            </Container>
        </>
    )
}
