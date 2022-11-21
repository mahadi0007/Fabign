import Head from 'next/head'
import { toast } from 'react-toastify'
import React, { useCallback, useEffect, useState } from 'react'
import { AccountNavbar } from '../../../components/profile/AccountNavbar';
import { AccountLayout } from '../../../components/profile/AccountLayout';
import { RatingReview } from '../../../components/modal/RatingReview';
import { DataTable } from '../../../components/dataTable/DataTable';
import { ShortName } from '../../../components/shortName/Index';
import { Container } from '../../../components/container';
import { Loader } from '../../../components/loading';
import withAuth from '../../../components/withAuth';
import { Card } from '../../../components/card';

const CreateIndex = () => {

    return (
        <div>
            <Head>
                <title>Create</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AccountNavbar />

            <AccountLayout title="Create">
                <Container.Fluid className="tag">

                </Container.Fluid>
            </AccountLayout>

        </div>
    );
};

export default withAuth(CreateIndex);
