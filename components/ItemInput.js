
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

export default function ItemInput(props) {

    let buttonText = "Create";
    if (props.item) {
        buttonText = "Update";
    }

    return(
        <Formik
            initialValues={{
                id: props.item?._id || "",
                name: props.item?.name || '',
                description: props.item?.description || '',
                lat: props.item?.lat || '',
                lon: props.item?.lon || '',
                pictureURI: props.item?.pictureURI || '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                description: Yup.string(),
                lat: Yup.number("Latitude must be a number").required("Latitude is required"),
                lon: Yup.number("Longitude must be a number").required("Longitude is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                // TODO Disable button on click for a timeout
                setTimeout(() => {
                    props.handleSubmit(values);
                    setSubmitting(false);
                }, 400);
            }}
        >

            <Form className="ml-6 form-main">
                <legend className="form-title">Details</legend>

                <label className="form-label" htmlFor="name">Name</label>
                <Field className="form-input" name="name" placeholder="The old post office building" />
                <ErrorMessage name="name" />

                <label className="form-label" htmlFor="description">Description</label>
                <Field className="form-input" as="textarea" name="description" placeholder="Constructed in 1911, demolished in 1972." />
                <ErrorMessage name="description" />

                <fieldset className="mt-2">
                    <legend className="form-label">Position</legend>

                    <label className="form-pos-label" htmlFor="lat">Latitude</label>
                    <Field className="form-pos-input" name="lat" placeholder="58.969124" />

                    <label className="form-pos-label" htmlFor="lon">Longitude</label>
                    <Field className="form-pos-input" name="lon" placeholder="5.71693" />

                    <ErrorMessage name="lat" />
                    <ErrorMessage name="lon" />
                </fieldset>

                <div className="my-2">
                    <input className="btn btn-green" type="submit" value={buttonText}/>
                </div>
            </Form>
        </Formik>
    );
}
