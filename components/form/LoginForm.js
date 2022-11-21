import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { FormGroup } from "../formGroup";
import { Eye, EyeOff } from 'react-feather'
import { PrimaryButton } from "../button";

export const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [passwordshow, setPasswordshow] = useState(false);


    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <FormGroup>
                {errors.phone && errors.phone.message ?
                    <Text className="text-danger fs-13 mb-1">{errors.phone && errors.phone.message}</Text> :
                    <Text className="text-capitalize fs-13 mb-1">Phone</Text>
                }
                <input
                    type="text"
                    className={errors.phone ? "form-control shadow-none error" : "form-control shadow-none"}
                    placeholder="Your Phone"
                    {...register("phone", { required: ("Phone is required") })}
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

            <FormGroup>
                <PrimaryButton
                    type="submit"
                    className="w-100"
                    disabled={props.registering}
                >{props.registering ? ("Loading") + ' ...' : ("Login")}</PrimaryButton>

            </FormGroup>
        </form>
    )
}