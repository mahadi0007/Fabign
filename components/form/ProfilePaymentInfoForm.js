import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isValidPhone } from "../../utils/_heplers";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";
import { Requests } from "../../utils/Http";
import moment from "moment";
import { Toastify } from "../toastify";

export const ProfilePaymentInfoForm = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("accountName", props.accountName && props.accountName);
    setValue("accountNumber", props.accountNumber && props.accountNumber);
    setValue("bankName", props.bankName && props.bankName);
    setValue("branchDistrict", props.branchDistrict && props.branchDistrict);
    setValue("branchName", props.branchName && props.branchName);
    setValue("bkashNumber", props.bkashNumber && props.bkashNumber);
    setValue("paymentMethod", props.paymentMethod && props.paymentMethod);
    setValue(
      "otherAccountNumber",
      props.otherAccountNumber && props.otherAccountNumber
    );
  }, [
    props.accountName,
    props.accountNumber,
    props.bankName,
    props.branchDistrict,
    props.branchName,
    props.bkashNumber,
    props.paymentMethod,
    props.otherAccountNumber,
  ]);

  const onSubmit = (data) => {
    props.submit(data);
  };

  const withDraw = async () => {
    try {
      const formData = new FormData();
      formData.append("request_amount", props.pendingBalance);
      formData.append("request_date", moment(new Date()).format("MM/DD/YYYY"));
      formData.append("available_balance", 0);
      formData.append(
        "payoutStatus",
        JSON.stringify([
          {
            status: "Pending",
            time: new Date(),
          },
        ])
      );
      const response = await Requests.Payout.WithDraw(formData);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        Toastify.Error(error.response.message);
      } else {
        Toastify.Error("Something going wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Banking Information */}
        <Text className="fs-16">Banking Information (Personal)</Text>

        {/* Account name */}
        <Container.Column className="col-md-6">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 120, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">Account Name </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.accountName
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("accountName")}
                  onChange={(event) => {
                    props.handleAccountName(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.accountName && errors.accountName.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.accountName && errors.accountName.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>

        {/* Account number */}
        <Container.Column className="col-md-6">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 140, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">Account Number </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="number"
                  min={0}
                  className={
                    errors.accountNumber
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("accountNumber")}
                  onChange={(event) => {
                    props.handleAccountNumber(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.accountNumber && errors.accountNumber.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.accountNumber && errors.accountNumber.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>

        {/* Bank Name */}
        <Container.Column className="col-md-6 col-xl-4">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 120, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">Bank Name </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.bankName
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("bankName")}
                  onChange={(event) => {
                    props.handleBankName(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.bankName && errors.bankName.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.bankName && errors.bankName.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>

        {/* Branch District */}
        <Container.Column className="col-md-6 col-xl-4">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 120, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">Branch District </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.branchDistrict
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("branchDistrict")}
                  onChange={(event) => {
                    props.handleBranchDistrict(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.branchDistrict && errors.branchDistrict.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.branchDistrict && errors.branchDistrict.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>

        {/* Branch Name */}
        <Container.Column className="col-md-6 col-xl-4">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 120, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">Branch Name </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.branchName
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("branchName")}
                  onChange={(event) => {
                    props.handleBranchName(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.branchName && errors.branchName.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.branchName && errors.branchName.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>

        {/* Bkash Information */}
        <Text className="fs-16">BKash (Personal)</Text>

        {/* Bkash Number */}
        <Container.Column className="col-md-6 col-xl-4">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 150, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">bKash Acc. Number </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.bkashNumber
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  placeholder="01XXXXXXXXX"
                  {...register("bkashNumber", {
                    pattern: {
                      value: isValidPhone(),
                      message: "Invalid phone number",
                    },
                  })}
                  onChange={(event) => {
                    props.handleBkashNumber(event.target.value);
                  }}
                />
              </div>
            </div>

            {errors.bkashNumber && errors.bkashNumber.message ? (
              <Text className="text-danger text-end fs-15 mb-0">
                {errors.bkashNumber && errors.bkashNumber.message}
              </Text>
            ) : null}
          </FormGroup>
        </Container.Column>

        {/* Others Information */}
        <Text className="fs-16">Others</Text>

        {/* Payment Method */}
        <Container.Column className="col-md-5 col-xl-4">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 130, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 px-lg-0 py-2">
                  Payment Mehtod
                </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.paymentMethod
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("paymentMethod")}
                  onChange={(event) => {
                    props.handlePaymentMethod(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.paymentMethod && errors.paymentMethod.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.paymentMethod && errors.paymentMethod.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>

        {/* Contact Address */}
        <Container.Column className="col-md-7 col-xl-8">
          <FormGroup>
            <div className="d-flex ">
              <div
                className="border text-center"
                style={{ width: 140, background: "#e9ecef" }}
              >
                <Text className="fs-15 mb-0 px-1 py-2">Account Number </Text>
              </div>

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={
                    errors.otherAccountNumber
                      ? "form-control shadow-none rounded-0 error"
                      : "form-control shadow-none rounded-0"
                  }
                  {...register("otherAccountNumber")}
                  onChange={(event) => {
                    props.handleOtherAccountNumber(event.target.value);
                  }}
                />
              </div>
            </div>

            {/* {errors.otherAccountNumber && errors.otherAccountNumber.message ?
            <Text className="text-danger text-end fs-15 mb-0">{errors.otherAccountNumber && errors.otherAccountNumber.message}</Text>
            : null} */}
          </FormGroup>
        </Container.Column>
      </Container.Row>

      <div className="d-block">
        <FormGroup className="d-inline-block">
          <PrimaryButton type="submit" disabled={props.loading}>
            {props.payoutState ? "Update Payment Method" : "Add Payment Method"}
          </PrimaryButton>
        </FormGroup>
        <FormGroup className="d-inline-block float-end">
          <div
            className={
              props.pendingBalance < props.minimumBalance
                ? `btn btn-primary disabled shadow-none`
                : `btn btn-primary shadow-none`
            }
            onClick={withDraw}
          >
            WithDraw
          </div>
        </FormGroup>
      </div>
    </form>
  );
};
