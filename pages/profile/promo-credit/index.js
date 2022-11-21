import Head from 'next/head'
import { toast } from 'react-toastify'
import React, { useCallback, useEffect, useState } from 'react'
import { AccountNavbar } from '../../../components/profile/AccountNavbar';
import { AccountLayout } from '../../../components/profile/AccountLayout';
import { Container } from '../../../components/container';
import withAuth from '../../../components/withAuth';
import { Card } from '../../../components/card';

const PromoCreditIndex = () => {

    return (
        <div>
            <Head>
                <title>Promo Credit</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AccountNavbar />

            <AccountLayout title="Promo Credit">
                <Container.Fluid className="tag">

                </Container.Fluid>
            </AccountLayout>

        </div>
    );
};

export default withAuth(PromoCreditIndex);
