import { Icon } from 'react-icons-kit';
import { useForm } from "react-hook-form";
import { info } from 'react-icons-kit/fa';
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";
import Link from 'next/link'

export const FacebookPixelForm = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    // console.log(data);
    props.submit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row className="justify-content-center">

        {/* Facebook Pixel ID */}
        <Container.Column className="col-md-6 col-xl-4">
          <FormGroup>
            <div className="d-flex ">

              <div className="flex-fill p-0">
                <input
                  type="text"
                  className={errors.facebookPixelId ? "form-control form-control-sm shadow-none rounded-0 error" : "form-control form-control-sm shadow-none rounded-0"}
                  placeholder="Your Facebook Pixel ID"
                  {...register("facebookPixelId")}
                />
              </div>

              <div
                className="border text-center"
                style={{ width: 30, background: "#e9ecef", cursor: "pointer" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={"Text a info message here"}
              >
                <Text className="fs-15 mb-0 pt-1 text-primary">
                  <Icon icon={info} size={16} />
                </Text>
              </div>
            </div>

            {/* Message */}
            <Text className="fs-15 my-2">
              To know how to get the Facebook Pixel code <Link href="/" className="text-decoration-none">read on here</Link>
            </Text>

          </FormGroup>

          {/* Submit Button */}
          <FormGroup>
            <button
              type="submit"
              className="btn btn-sm btn-success border border-success shadow-none"
              disabled={props.loading}
            >{props.loading ? "Entering" + ' ...' : "Enter Facebook Pixel ID"}</button>

          </FormGroup>
        </Container.Column>

      </Container.Row>
    </form>
  )
}