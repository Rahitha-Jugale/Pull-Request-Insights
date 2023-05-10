import { Box, Button, Checkbox, Container, FormControl, FormLabel, Grid, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Common.css";
import { getAddedLineCount } from "../service/Services";

const ByLOC = () => {

    const { register, handleSubmit, reset, formState } = useForm(
        {
            defaultValues: {
                username: "",
                password: "",
                branch: "",
                repoSlug: [""],
                startDate: "",
                endDate: ""
            }
        }
    );
    const { errors } = formState;

    const [selectedRepoSlug, setSelectedRepoSlug] = useState([""]);
    const [addedLineCount, setAddedLineCount] = useState({
        message: "",
        data: {
            destinationBranch: "",
            totalNumberOfLinesAdded: "",
            totalNumberOfLinesRemoved: ""
        }
    });
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const repoSlugValues = [
        "afg-artic",
        "afg-cms",
        "afg-messaging",
        "mozanta-commerce",
        "mozanta-commerce-storefront",
        "mozanta-commerce-ui"
    ];

    const onSubmit = async (data) => {
        console.log(data);
        await setLoading(true);
        const credentials = btoa(data.username + ":" + data.password);
        localStorage.setItem("credentials", credentials);
        await getAddedLineCount(data).then(
            (result) => {
                setAddedLineCount(result.data);
                console.log(result.data);
            },
            (error) => {
                console.log(error);
            }
        );
        await setLoading(false);
        await setOpenModal(true);
        localStorage.removeItem("credentials");
        console.log("Line Count", addedLineCount);
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2}>
                        <FormLabel>GIT Username *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <TextField fullWidth defaultValue={formState.defaultValues.username} placeholder="Username" id="username" label="Username" {...register('username', { required: "Username is required" })} />
                        <p className="error-message">{errors.username?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2}>
                        <FormLabel>GIT Password *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <TextField fullWidth placeholder="Password" id="password" type="password" name="password" label="Password" {...register('password', { required: "Password is required" })} />
                        <p className="error-message">{errors.password?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2}>
                        <FormLabel>Branch Name *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <TextField fullWidth placeholder="Branch Name" id="branch" label="Branch Name" {...register('branch', { required: "Branch Name is required" })} />
                        <p className="error-message">{errors.branch?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2}>
                        <FormLabel>Repo Slug *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <FormControl variant="standard" fullWidth>
                            <Select multiple={true} value={selectedRepoSlug} renderValue={(selectedRepoSlug) => {
                                if (selectedRepoSlug[0] === "") {
                                    return "Select Repo Slug";
                                } else {
                                    return selectedRepoSlug.join(", ");
                                }
                            }} labelId="repoSlug" label="Repo Slug" fullWidth {...register("repoSlug", { required: "Repo Slug is required" })}>
                                <MenuItem value="" disabled>Select Repo Slug</MenuItem>
                                {repoSlugValues.map((value) => {
                                    return (
                                        <MenuItem key={value} value={value}><Checkbox onChange={(event) => {
                                            if (event.target.checked) {
                                                if (selectedRepoSlug[0] === "") {
                                                    setSelectedRepoSlug([value]);
                                                } else {
                                                    setSelectedRepoSlug([...selectedRepoSlug, value]);
                                                }
                                            } else {

                                                const tempArr = [];
                                                selectedRepoSlug.map((singleRepoSlug) => {
                                                    return (singleRepoSlug !== value) ? tempArr.push(singleRepoSlug) : null;
                                                })
                                                setSelectedRepoSlug(tempArr);
                                            }
                                        }} checked={selectedRepoSlug.includes(value) ? true : false} size="small" />{value}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <p className="error-message">{errors.repoSlug?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2}>
                        <FormLabel>Start Date *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <TextField type="date" variant="outlined" fullWidth {...register("startDate", { required: "Please enter a start date" })}></TextField>
                        <p className="error-message">{errors.startDate?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2}>
                        <FormLabel>End Date *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <TextField type="date" variant="outlined" fullWidth {...register("endDate", { required: "Please enter an end date" })}></TextField>
                        <p className="error-message">{errors.endDate?.message}</p>
                    </Grid>
                </Grid>
                {loading ?
                    (
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <Button variant="contained" disabled>Reset</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" disabled>Loading</Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <Button variant="contained" onClick={() => { reset(); setSelectedRepoSlug([""]); }}>Reset</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">Submit</Button>
                            </Grid>
                        </Grid>
                    )}
            </form>
            <Modal
                className="modalContainer"
                open={openModal}
                onClose={() => { setOpenModal(false); }}
            >
                <Box className="modalTextContainer">
                    <h3>{addedLineCount.message}</h3>
                    <p><strong>Branch: </strong>{addedLineCount.data.destinationBranch}</p>
                    <p><strong>Total Number of lines added: </strong>{addedLineCount.data.totalNumberOfLinesAdded}</p>
                    <p><strong>Total Number of lines removed: </strong>{addedLineCount.data.totalNumberOfLinesRemoved}</p>
                </Box>
            </Modal>
        </Container>
    )
}

export default ByLOC;