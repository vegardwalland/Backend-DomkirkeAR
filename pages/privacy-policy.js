import Layout from "../components/Layout";
import Head from 'next/head';

function PrivacyPolicy() {

    return (
        <Layout title="Privacy Policy">
            <div className="block text-center text-xs font-bold">
                <main>
                    <h1 className="text-3xl my-8">Privacy Policy</h1>
                    <div>
                        <h2 className="my-5 text-gray-700 text-sm">How do we collect your data?</h2>
                        <p>
                        You directly provide the data we collect. We collect data and process data when you
                        sign up, log in and create or update items.
                        </p>
                        <h2 className="my-5 text-gray-700 text-sm">How will we use your data?</h2>
                        <p>
                            Your data will never be sold. <br/>
                            Your email is only used to authenticate log in and reset password. <br/>
                            Item data is only used to create AR objects in Gamle Stavanger AR Android application

                        </p>
                        <h2 className="my-5 text-gray-700 text-sm">How do we use cookies?</h2>
                        <p>
                            To keep you logged in and to verify user access <br/>
                        </p>
                        <h2 className="my-5 text-gray-700 text-sm">What are your data protection rights?</h2>
                        <ul>
                            <h3 className="mb-1 text-gray-700 ">Every user is entitled to the following:</h3><br/>

                            <li>The right to access – You have the right to request copies of your personal data.
                            </li>
                            <li>The right to rectification – You have the right to request a correction of any information you believe is inaccurate. You also have the right to request to complete the information you believe is incomplete. <br/>
                            </li>
                            <li>The right to erasure – You have the right to request an erase of your personal data, under certain conditions.
                            </li>
                            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
                            </li>
                            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
                            </li>
                            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
                            </li>
                        </ul>
                        <h3 className="my-2 text-gray-700 ">Contact us at: { process.env.ADMIN_EMAIL  }</h3>
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy;
