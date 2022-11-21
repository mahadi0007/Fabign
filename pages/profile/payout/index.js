import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ProfilePaymentInfoForm } from "../../../components/form/ProfilePaymentInfoForm";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import { Container } from "../../../components/container";
import { Toastify } from "../../../components/toastify";
import withAuth from "../../../components/withAuth";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";
import { Requests } from "../../../utils/Http";
import moment from "moment";

const PayoutIndex = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payoutId, setPayoutId] = useState();
  const [accountName, setAccountName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [bankName, setBankName] = useState();
  const [branchDistrict, setBranchDistrict] = useState();
  const [branchName, setBranchName] = useState();
  const [bkashNumber, setBkashNumber] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [otherAccountNumber, setOtherAccountNumber] = useState();
  const [payoutState, setPayoutState] = useState(false);
  const [payoutDate, setPayoutDate] = useState("");
  const [pendingBalance, setPendingBalance] = useState(0);
  const [minimumBalance, setMinimumBalance] = useState(0);

  const fetchData = async () => {
    try {
      if (localStorage.getItem("storeId")) {
        const response = await Requests.Payout.GetPayout();
        setLoading(true);
        if (response.data.message == "Found payout") {
          setPayoutState(true);
          setPayoutId(response.data.body._id);
          if (response.data.body.bank) {
            setAccountName(response.data.body.bank.account_name);
            setAccountNumber(response.data.body.bank.account_number);
            setBankName(response.data.body.bank.bank_name);
            setBranchDistrict(response.data.body.bank.brach_name);
            setBranchName(response.data.body.bank.branch_district);
          }
          if (response.data.body.bkash) {
            setBkashNumber(response.data.body.bkash.account_number);
          }
          if (response.data.body.other) {
            setPaymentMethod(response.data.body.other.payment_method);
            setOtherAccountNumber(response.data.body.other.account_number);
          }
          setPendingBalance(response.data.body.pendingBalance);
        }
        setLoading(false);
      } else {
        Toastify.Error("First you need to create a store");
        setLoading(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchPayoutInfoData = async () => {
    try {
      setLoading(true);
      const response = await Requests.PayoutInfo.Index();
      setPayoutDate(response.data.data.payoutDate);
      setMinimumBalance(response.data.data.minimumBalance);
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPayoutInfoData();
  }, []);

  const handleAccountName = (text) => {
    setAccountName(text);
  };

  const handleAccountNumber = (text) => {
    setAccountNumber(text);
  };

  const handleBankName = (text) => {
    setBankName(text);
  };

  const handleBranchDistrict = (text) => {
    setBranchDistrict(text);
  };

  const handleBranchName = (text) => {
    setBranchName(text);
  };

  const handleBkashNumber = (text) => {
    setBkashNumber(text);
  };

  const handlePaymentMethod = (text) => {
    setPaymentMethod(text);
  };

  const handleOtherAccountNumber = (text) => {
    setOtherAccountNumber(text);
  };

  // Handle payout submit
  const handlePayoutSubmit = async (data) => {
    let submitState = false;
    try {
      if (
        !data.accountName &&
        !data.accountNumber &&
        !data.bankName &&
        !data.branchDistrict &&
        !data.branchName &&
        !data.bkashNumber &&
        !data.paymentMethod &&
        !data.otherAccountNumber
      ) {
        Toastify.Error("No Data Found.");
      } else if (
        data.accountName &&
        data.accountNumber &&
        data.bankName &&
        data.branchDistrict &&
        data.branchName
      ) {
        if (data.bkashNumber || data.paymentMethod || data.otherAccountNumber) {
          Toastify.Error("You can only put data in one section.");
          return;
        } else {
          submitState = true;
        }
      } else if (data.bkashNumber) {
        if (
          data.accountName ||
          data.accountNumber ||
          data.bankName ||
          data.branchDistrict ||
          data.branchName ||
          data.paymentMethod ||
          data.otherAccountNumber
        ) {
          Toastify.Error("You can only put data in one section.");
          return;
        } else {
          submitState = true;
        }
      } else if (data.paymentMethod && data.otherAccountNumber) {
        if (
          data.accountName ||
          data.accountNumber ||
          data.bankName ||
          data.branchDistrict ||
          data.branchName ||
          data.bkashNumber
        ) {
          Toastify.Error("You can only put data in one section.");
          return;
        } else {
          submitState = true;
        }
      }
      if (submitState) {
        if (payoutState) {
          setLoading(true);
          const response = await Requests.Payout.UpdatePayout(data, payoutId);
          if (response && response.status === 200) {
            Toastify.Success(response.data.message);
          }
          setLoading(false);
        } else {
          setLoading(true);
          const response = await Requests.Payout.Store(data);
          if (response && response.status === 200) {
            Toastify.Success(response.data.message);
          }
          setLoading(false);
          setPayoutState(true);
        }
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Payout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountNavbar />

      <AccountLayout title="Payouts">
        <Container.Fluid className="tag">
          {/* Overview Card */}
          <Card.Simple className="bg-primary border-0 mt-4">
            <Card.Body className="px-4">
              <Container.Row>
                {/* Pending Balance */}
                <Container.Column className="col-md-3 text-center text-md-start">
                  <Text className="text-white fs-15 fw-bolder mb-0">
                    Pending Balance
                  </Text>
                  <Text className="text-white fs-40 mb-0">
                    {pendingBalance ? pendingBalance : 0}
                    <span className="fs-18 mb-0"> Tk</span>
                  </Text>
                </Container.Column>

                {/* Total Payout */}
                <Container.Column className="col-md-3 text-center">
                  <Text className="text-white fs-15 fw-bolder mb-0">
                    Total Payout
                  </Text>
                  <Text className="text-white fs-40 mb-0">
                    {data.totalPayout ? data.totalPayout : 0}
                    <span className="fs-18 mb-0"> Tk</span>
                  </Text>
                </Container.Column>

                {/* Total Profit */}
                <Container.Column className="col-md-3 text-center">
                  <Text className="text-white fs-15 fw-bolder mb-0">
                    Total Profit
                  </Text>
                  <Text className="text-white fs-40 mb-0">
                    {data.totalProfit ? data.totalProfit : 0}
                    <span className="fs-18 mb-0"> Tk</span>
                  </Text>
                </Container.Column>

                {/* Next Payout Date */}
                <Container.Column className="col-md-3 text-center text-md-end">
                  <Text className="text-white fs-40 mb-0">
                    {payoutDate ? moment(payoutDate).format("MMM D") : "N/A"}
                  </Text>
                  <Text className="text-white fs-15 fw-bolder mb-0">
                    Next Payout Date
                  </Text>
                </Container.Column>
              </Container.Row>
            </Card.Body>
          </Card.Simple>

          {/* Main data card */}
          <Card.Simple className="border-0 mt-4 shadow-sm">
            <Card.Body>
              <Text className="fs-18 mb-0">Manage Payout Information</Text>
              <Text className="fs-14 text-muted fst-italic mb-0">
                {" "}
                *Please provide payout details to submit payout request
              </Text>
              <hr />

              {/* Payment Info Form */}
              <ProfilePaymentInfoForm
                loading={loading}
                submit={handlePayoutSubmit}
                accountName={accountName}
                accountNumber={accountNumber}
                bankName={bankName}
                branchDistrict={branchDistrict}
                branchName={branchName}
                bkashNumber={bkashNumber}
                paymentMethod={paymentMethod}
                otherAccountNumber={otherAccountNumber}
                handleAccountName={handleAccountName}
                handleAccountNumber={handleAccountNumber}
                handleBankName={handleBankName}
                handleBranchDistrict={handleBranchDistrict}
                handleBranchName={handleBranchName}
                handleBkashNumber={handleBkashNumber}
                handlePaymentMethod={handlePaymentMethod}
                handleOtherAccountNumber={handleOtherAccountNumber}
                payoutState={payoutState}
                pendingBalance={pendingBalance}
                minimumBalance={minimumBalance}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Fluid>
      </AccountLayout>
    </div>
  );
};

export default withAuth(PayoutIndex);
