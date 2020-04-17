import axioswal from 'axioswal';
import Layout from '../components/MyLayout';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

export default function Add() {

    const addItem = (values) => {
        // TODO Use fetch instead of axioswal, but keep those nice animations maybe.
        axioswal.post('api/items', {
            name: values.name,
            description: values.description,
            lat: values.lat,
            lon: values.lon,
            pictureURI: values.pictureURI,
        }).then((data) => {
            if (data.status === 'ok') {
                ;
            }
        });
    }

    const Input = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input {...field}  {...props} />
                {meta.touched && meta.error ? (
                    <div>{meta.error}</div>
                ) : null }
            </>
        )
    };

    return (
        <Layout>
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    lat: '',
                    lon: '',
                    pictureURI: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Name is required'),
                    description: Yup.string(),
                    lat: Yup.number("Latitude must be a number").required("Latitude is required"),
                    lon: Yup.number("Longitude must be a number").required("Longitude is required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    addItem(values);
                    setSubmitting(false);
                    }, 400);
        }}
            >

                <Form>
                    <Input name='name' label="Name" placeholder="Det gamle posthuset" />
                    <Input name='description' label="Description" placeholder="Oppført i 1911, revet i 1972." />
                    <Input name='lat' label="Latitude" placeholder="58.969124" />
                    <Input name='lon' label="Longitude" placeholder="5.71693" />

                    <button type="submit">Add</button>
                </Form>
            </Formik>
        </Layout>
    );
}
