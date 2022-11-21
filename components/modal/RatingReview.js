import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap'
// import { Button } from '../button/Button'
import { Star, X } from 'react-feather'
import { DangerButton, PrimaryButton } from '../button'
import { Text } from '../text'

export const RatingReview = (props) => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm()
    const [rating, setRating] = useState(null)

    const onSubmit = async (data) => {
        let error = true

        if (data.review) error = false
        else if (rating) error = false
        else error = true

        if (error) {
            return setError("review", {
                type: "manual",
                message: "Rating or Review is required."
            })
        } else {
            clearErrors("review")
        }

        const reviewData = {
            ...data,
            rating: rating || null
        }
        props.onSubmit(reviewData)
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
        >
            <Modal.Header className="border-0 p-4 pb-0">
                <div className="d-flex w-100">
                    <div><p className="font-15 fw-bolder mt-2 mb-0">Give your Rating & Review</p></div>
                    <div className="ms-auto">
                        <DangerButton
                            onClick={props.onHide}
                            className="btn-circle"
                        ><X size={18} />
                        </DangerButton>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Ratings icons */}
                    <div className="mb-3">
                        <div
                            className={rating === 1 ? "text-warning" : "text-muted"}
                            onClick={() => setRating(1)}
                        >
                            <Star size={16} />
                        </div>
                        <div
                            className={rating === 2 ? "text-warning" : "text-muted"}
                            onClick={() => setRating(2)}
                        >
                            <Star size={16} />
                            <Star size={16} />
                        </div>
                        <div
                            className={rating === 3 ? "text-warning" : "text-muted"}
                            onClick={() => setRating(3)}
                        >
                            <Star size={16} />
                            <Star size={16} />
                            <Star size={16} />
                        </div>
                        <div
                            className={rating === 4 ? "text-warning" : "text-muted"}
                            onClick={() => setRating(4)}
                        >
                            <Star size={16} />
                            <Star size={16} />
                            <Star size={16} />
                            <Star size={16} />
                        </div>
                        <div
                            className={rating === 5 ? "text-warning" : "text-muted"}
                            onClick={() => setRating(5)}
                        >
                            <Star size={16} />
                            <Star size={16} />
                            <Star size={16} />
                            <Star size={16} />
                            <Star size={16} />
                        </div>
                    </div>

                    {/* Review text */}
                    <div className="form-group mb-3">
                        {errors.review && errors.review.message ?
                            <small className="text-danger">{errors.review && errors.review.message}</small> :
                            <small>Review</small>
                        }

                        <textarea
                            rows={5}
                            // name="review"
                            placeholder="Your review"
                            className="form-control shadow-none"
                            {...register("review")}
                        />
                    </div>

                    {/* Submit button */}
                    <div className="text-end">
                        <PrimaryButton
                            type="submit"
                            disabled={props.loading}
                        >
                            <Text className="mb-0 fs-14 fw-bolder">{props.loading ? 'LOADING...' : 'SUBMIT REVIEW'}</Text>
                        </PrimaryButton>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};
