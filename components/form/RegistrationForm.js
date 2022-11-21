import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { FormGroup } from "../formGroup";
import { Eye, EyeOff } from 'react-feather'
import { PrimaryButton } from "../button";
import { isValidPhone } from "../../utils/_heplers";
import { DatePicker } from "../../components/datePicker"
import { FileUploader } from "../fileuploader";
import { Container } from "../container";

export const RegistrationForm = (props) => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const [passwordshow, setPasswordshow] = useState(false);
    const [confirmpasswordshow, setConfirmpasswordshow] = useState(false);
    const [accept, setAccept] = useState(false)
    const [dateofbirth, setDateOfBirth] = useState(new Date());
    const [profilePhoto, setProfilePhoto] = useState()

    const onSubmit = (data) => {
        if (data.password !== data.password_confirmation) {
            setError("password", {
                type: "manual",
                message: "Password Doesn't match"
            })
        } else {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("phone", data.phone)
            formData.append("email", data.email)
            formData.append("upazila", data.upazila)
            formData.append("password", data.password)
            formData.append("image", profilePhoto)
            formData.append("emailVerified", true)
            formData.append("phoneVerified", true)
            props.submit(formData)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <FormGroup>
                {errors.name && errors.name.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.name && errors.name.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">Name</Text>
                }
                <input
                    type="text"
                    className={errors.name ? "form-control shadow-none error" : "form-control shadow-none"}
                    placeholder="Your Name"
                    {...register("name", { required: ("Name is required") })}
                />
            </FormGroup>

            {/* Phone */}
            <FormGroup>
                {errors.phone && errors.phone.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.phone && errors.phone.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">Phone</Text>
                }

                <input
                    type="text"
                    className={errors.phone ? "form-control shadow-none error" : "form-control shadow-none"}
                    placeholder="01xxxxxxxxx"
                    {...register("phone", {
                        required: ("Phone number is required"),
                        pattern: {
                            value: isValidPhone(),
                            message: "Invalid phone number"
                        }
                    })}
                />
            </FormGroup>

            {/* Email */}
            <FormGroup>
                {errors.email && errors.email.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.email && errors.email.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">Email</Text>
                }
                <input
                    type="text"
                    className={errors.email ? "form-control shadow-none error" : "form-control shadow-none"}
                    placeholder="Your Email"
                    {...register("email", { required: ("Email is required") })}
                />
            </FormGroup>



            {/* City */}
            <FormGroup >
                {errors.city && errors.city.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.city && errors.city.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">City</Text>
                }
                <input
                    type="text"
                    className={errors.city ? "form-control shadow-none error" : "form-control shadow-none"}
                    placeholder="Your City"
                    {...register("city")}
                />
            </FormGroup>
            {/* Password */}
            <FormGroup>
                {errors.password && errors.password.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.password && errors.password.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">Password</Text>
                }

                <div style={{ position: "relative" }}>
                    <input
                        type={passwordshow ? "text " : "password"}
                        placeholder="Enter your password"
                        className={errors.password ? "form-control shadow-none error" : "form-control shadow-none"}
                        {...register("password", { required: "Password is required" })}
                    />

                    {passwordshow ?
                        <Eye
                            size={16}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: 13,
                                right: 13
                            }}
                            onClick={() => setPasswordshow(!passwordshow)}
                        />
                        :
                        <EyeOff
                            size={16}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: 13,
                                right: 13
                            }}
                            onClick={() => setPasswordshow(!passwordshow)}
                        />
                    }
                </div>
            </FormGroup>
            {/* Confirm Password */}
            <FormGroup className="mb-1">
                {errors.password_confirmation && errors.password_confirmation.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.password_confirmation && errors.password_confirmation.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">Confirm Password</Text>
                }

                <div style={{ position: "relative" }}>
                    <input
                        type={confirmpasswordshow ? "text " : "password"}
                        placeholder="Enter your password confirmation"
                        className={errors.password_confirmation ? "form-control shadow-none error" : "form-control shadow-none"}
                        {...register("password_confirmation", { required: ("Confirm password is required") })}
                    />

                    {confirmpasswordshow ?
                        <Eye
                            size={16}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: 13,
                                right: 13
                            }}
                            onClick={() => setConfirmpasswordshow(!confirmpasswordshow)}
                        />
                        :
                        <EyeOff
                            size={16}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: 13,
                                right: 13
                            }}
                            onClick={() => setConfirmpasswordshow(!confirmpasswordshow)}
                        />
                    }
                </div>
            </FormGroup>
            {/* <FormGroup>

                <FileUploader
                    error={errors.profilePhoto ? errors.profilePhoto.message : ""}
                    width={125}
                    height={110}
                    title="Third Image"
                    dataHandeller={(data) => {
                        if (data.error) {
                            setError("profilePhoto", {
                                type: "manual",
                                message: data.error
                            })
                        }
                        if (data.image) {
                            clearErrors("profilePhoto")
                            setProfilePhoto(data.image)
                        }
                    }}
                />
            </FormGroup> */}
            <FormGroup>
                <div className="form-check mt-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={accept ? true : false}
                        onChange={() => {
                            setAccept(!accept);
                        }}
                        style={{ cursor: "pointer" }}
                        id="flexCheckDefault"
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ cursor: "pointer" }}
                    >
                        I Accept Terms of use
                    </label>
                </div>
            </FormGroup>
            <FormGroup>
                <PrimaryButton
                    type="submit"
                    className="w-100"
                    disabled={props.registering}
                >{props.registering ? ("Loading") + ' ...' : ("Create Account")}</PrimaryButton>

            </FormGroup>
        </form>
    )
}