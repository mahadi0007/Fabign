import Head from 'next/head'
import { toast } from 'react-toastify'
import React, { useCallback, useEffect, useState } from 'react'
import { GoogleAnalyticsForm } from '../../../components/form/GoogleAnalyticsForm';
import { FacebookPixelForm } from '../../../components/form/FacebookPixelForm';
import { AccountLayout } from '../../../components/profile/AccountLayout';
import { AccountNavbar } from '../../../components/profile/AccountNavbar';
import { Container } from '../../../components/container';
import { Toastify } from '../../../components/toastify';
import withAuth from '../../../components/withAuth';
import { Card } from '../../../components/card';
import { Text } from '../../../components/text';

const AnalyticsIndex = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(false)
    const [loadingFacebook, setLoadingFacebook] = useState(false)

    // Handle submit google tracking id
    const handleGoogleTrackingIDSubmit = async (data) => {
        try {
            setLoadingGoogle(true)
            // const response = await Requests.EBanner.Store(data);
            // if (response && response.status === 200) {
            //     Toastify.Success(response.data.message)
            // }
            console.log(data);

            setLoadingGoogle(false)
        } catch (error) {
            if (error) {
                setLoadingGoogle(false)
                if (error.response) {
                    Toastify.Error(error.response.message)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    // Handle submit facebook pixel id
    const handleFacebookPixelIDSubmit = async (data) => {
        try {
            setLoadingFacebook(true)
            // const response = await Requests.EBanner.Store(data);
            // if (response && response.status === 200) {
            //     Toastify.Success(response.data.message)
            // }
            console.log(data);

            setLoadingFacebook(false)
        } catch (error) {
            if (error) {
                setLoadingFacebook(false)
                if (error.response) {
                    Toastify.Error(error.response.message)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Analytics</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AccountNavbar />

            <AccountLayout title="Analytics">
                <Container.Fluid className="tag">

                    {/* Title */}
                    <Card.Simple className="bg-transparent border-0">
                        <Card.Body className="pt-0">
                            <Text className="fs-20 mb-0 text-center">Tracking Information</Text>
                            <hr className='mt-2' />
                        </Card.Body>
                    </Card.Simple>

                    {/* Main Card */}
                    <Card.Simple className="border-0 mt-2 mx-xl-2 shadow-sm">
                        <Card.Body>

                            {/* Google Analytics Form */}
                            <GoogleAnalyticsForm
                                loading={loadingGoogle}
                                submit={handleGoogleTrackingIDSubmit}
                            />

                            {/* Facebook Pixel Form */}
                            <FacebookPixelForm
                                loading={loadingFacebook}
                                submit={handleFacebookPixelIDSubmit}
                            />

                        </Card.Body>
                    </Card.Simple>

                </Container.Fluid>
            </AccountLayout>

        </div>
    );
};

export default withAuth(AnalyticsIndex);
