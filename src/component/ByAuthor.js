import { Box, Button, Container, FormLabel, Grid, Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Common.css";
import { getPrDataByAuthor } from "../service/Services";

const ByAuthor = () => {

    const { register, handleSubmit, reset, formState } = useForm(
        {
            defaultValues: {
                username: "",
                password: "",
                prAuthorUsername: "",
                startDate: "",
                endDate: ""
            }
        }
    );
    const { errors } = formState;

    const [loading, setLoading] = useState(false);
    const [dataByAuthorName, setDataByAuthorName] = useState({
        message: "",
        data: {
            prAuthorName: "",
            numberOfCommentsPerLabel: {
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
        await getPrDataByAuthor(data).then(
            (result) => {
                setDataByAuthorName(result.data);
                console.log(result.data);
            },
            (error) => {
                console.log(error);
            }
        );
        await setLoading(false);
        await setOpenModal(true);
        localStorage.removeItem("credentials");
        console.log("Author", dataByAuthorName);
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
                        <FormLabel>Author Name *</FormLabel>
                    </Grid>
                    <Grid item md={3}>
                        <TextField fullWidth placeholder="Author Name" id="prAuthorUsername" label="Author Name" {...register('prAuthorUsername', { required: "Author Name is required" })} />
                        <p className="error-message">{errors.authorName?.message}</p>
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
                                <Button variant="contained" onClick={() => { reset(); }}>Reset</Button>
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
                    <h3>{dataByAuthorName.message}</h3>
                    <p><strong>Author: </strong>{dataByAuthorName.data.prAuthorName}</p>
                    <h4>Number of comments per Label:</h4>
                    <p>&emsp;<strong>[CCR]: </strong>{dataByAuthorName.data.numberOfCommentsPerLabel["[CCR]"]}</p>
                    <p>&emsp;<strong>[O]: </strong>{dataByAuthorName.data.numberOfCommentsPerLabel["[O]"]}</p>
                    <p>&emsp;<strong>[NIT]: </strong>{dataByAuthorName.data.numberOfCommentsPerLabel["[NIT]"]}</p>
                    <p>&emsp;<strong>[N]: </strong>{dataByAuthorName.data.numberOfCommentsPerLabel["[N]"]}</p>
                </Box>
            </Modal>
        </Container>
    )
}

export default ByAuthor;