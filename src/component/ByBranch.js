import { Box, Button, Container, FormControl, FormLabel, Grid, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Common.css";
import { getPrDataByBranchName } from "../service/Services";

const ByBranch = () => {

    const { register, handleSubmit, reset, formState } = useForm(
        {
            defaultValues: {
                username: "",
                password: "",
                branch: "",
                startDate: "",
                endDate: "",
                state: "",
                repoSlug: [],
                workspace: ""
            }
        }
    );
    const { errors } = formState;

    const repoSlugValues = [
        "afg-artic",
        "afg-cms",
        "afg-messaging",
        "mozanta-commerce",
        "mozanta-commerce-storefront",
        "mozanta-commerce-ui"
    ];

    const stateValues = [
        "ALL",
        "MERGED",
        "OPEN",
        "DECLINED"
    ];

    const workspaceValues = [
        "afg-ecom"
    ];

    const [repoSlug, setRepoSlug] = useState([""]);
    const [state, setState] = useState([""]);
    const [workspace, setWorkspace] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [dataByBranchName, setDataByBranchName] = useState({
        message: "",
        data: {
            destinationBranch: "",
            state: "",
            totalCommentsCount: {
                "[CCR]": "",
                "[O]": "",
                "[NIT]": "",
                "[N]": ""
            }
        }
    });
    const [openModal, setOpenModal] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        await setLoading(true);
        const credentials = btoa(data.username + ":" + data.password);
        localStorage.setItem("credentials", credentials);
        await getPrDataByBranchName(data).then(
            (result) => {
                setDataByBranchName(result.data);
                console.log(result.data);
            },
            (error) => {
                console.log(error);
            }
        );
        await setLoading(false);
        await setOpenModal(true);
        localStorage.removeItem("credentials");
        console.log("Branch", dataByBranchName);
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
                        <TextField fullWidth placeholder="Branch Name" label="Branch Name"{...register("branch", { required: "Branch Name is required" })}></TextField>
                        <p className="error-message">{errors.branchName?.message}</p>
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
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2} xs={2}>
                        <FormLabel>State *</FormLabel>
                    </Grid>
                    <Grid item md={3} xs={3}>
                        <FormControl variant="standard" fullWidth>
                            <Select labelId="state" label="State" fullWidth value={state} {...register("state", { required: "State is required" })}>
                                <MenuItem value="" disabled>Select State</MenuItem>
                                {stateValues.map((value) => {
                                    return (
                                        <MenuItem key={value} value={value} onClick={() => { setState(value); }}>{value}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <p className="error-message">{errors.state?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2} xs={2}>
                        <FormLabel>Repo Slug *</FormLabel>
                    </Grid>
                    <Grid item md={3} xs={3}>
                        <FormControl variant="standard" fullWidth>
                            <Select labelId="repoSlug" label="Repo Slug" value={repoSlug} fullWidth {...register("repoSlug", { required: "Repo Slug is required" })}>
                                <MenuItem value="" disabled>Select Repo Slug</MenuItem>
                                {repoSlugValues.map((value) => {
                                    return (
                                        <MenuItem key={value} value={value} onClick={() => { setRepoSlug(value); }}>{value}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <p className="error-message">{errors.repoSlug?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={2} xs={2}>
                        <FormLabel>Workspace *</FormLabel>
                    </Grid>
                    <Grid item md={3} xs={3}>
                        <FormControl variant="standard" fullWidth>
                            <Select labelId="workspace" label="Select Workspace" value={workspace} fullWidth {...register("workspace", { required: "Workspace is required" })}>
                                <MenuItem value="" disabled>Select Workspace</MenuItem>
                                {workspaceValues.map((value) => {
                                    return (
                                        <MenuItem key={value} value={value} onClick={() => { setWorkspace(value); }}>{value}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <p className="error-message">{errors.workspace?.message}</p>
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
                                <Button variant="contained" onClick={() => { reset(); setRepoSlug([""]); setState([""]); setWorkspace([""]); }}>Reset</Button>
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
                    <h3>{dataByBranchName.message}</h3>
                    <p><strong>Branch: </strong>{dataByBranchName.data.destinationBranch}</p>
                    <p><strong>State: </strong>{dataByBranchName.data.state}</p>
                    <h4>Total Comments count:</h4>
                    <p>&emsp;<strong>[CCR]: </strong>{dataByBranchName.data.totalCommentsCount["[CCR]"]}</p>
                    <p>&emsp;<strong>[O]: </strong>{dataByBranchName.data.totalCommentsCount["[O]"]}</p>
                    <p>&emsp;<strong>[NIT]: </strong>{dataByBranchName.data.totalCommentsCount["[NIT]"]}</p>
                    <p>&emsp;<strong>[N]: </strong>{dataByBranchName.data.totalCommentsCount["[N]"]}</p>
                </Box>
            </Modal>
        </Container >
    )
}

export default ByBranch;