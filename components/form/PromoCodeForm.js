import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { dateFormate } from "../../utils/_heplers";
import { DateRangePicker } from "../dateRangePicker";
import { Requests } from "../../utils/Http";

export const PromoCodeForm = (props) => {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const fetchData = async () => {
    try {
      const response = await Requests.Campaign.GetAllCampaignOfUser();
      setData(response.data.body.campaign);
      setValue("campaign", response.data.body.campaign[0]._id);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (promoData) => {
    const formData = {
      ...promoData,
      startDate,
      endDate,
    };
    await props.submit(formData);
    reset();
    setDateRange([null, null]);
    setValue("campaign", data[0]._id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-center">
        {/* Promo code */}
        <FormGroup className="mx-1">
          <input
            type="text"
            className={
              errors.promo_code
                ? "form-control form-control-sm shadow-none border-0 error"
                : "form-control form-control-sm shadow-none border-0"
            }
            placeholder="Enter promo code"
            {...register("promo_code")}
          />
        </FormGroup>

        {/* Campaign */}
        <FormGroup className="mx-1">
          <select
            className={
              errors.campaign
                ? "form-control form-control-sm shadow-none border-0 error"
                : "form-control form-control-sm shadow-none border-0"
            }
            {...register("campaign")}
          >
            {data &&
              data.map((item, index) => {
                return (
                  <option value={item._id} key={`campaign${index}`}>
                    {item.title}
                  </option>
                );
              })}
          </select>
        </FormGroup>

        {/* Stardate and endDate form Range DatePicker */}
        <FormGroup className="mx-1">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            className="form-control-sm"
            dateRange={(dates) => setDateRange(dates)}
            placeholder="Select date range"
            monthsShown={2}
          />
        </FormGroup>
      </div>

      <div className="d-flex justify-content-center mt-2">
        {/* Promo Amount */}
        <FormGroup className="mx-1">
          <input
            type="number"
            min={0}
            step=".01"
            className={
              errors.promo_amount
                ? "form-control form-control-sm shadow-none border-0 error"
                : "form-control form-control-sm shadow-none border-0"
            }
            placeholder="Promo amount"
            {...register("promo_amount")}
          />
        </FormGroup>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-sm bg-white shadow-none rounded"
        >
          <Text className="fs-14 fw-bold text-primary mb-0 px-2 py-0">
            {props.loading ? "Creating" : "Create"}
          </Text>
        </button>
      </div>
    </form>
  );
};
