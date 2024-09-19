import React, {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {useForm, SubmitHandler} from "react-hook-form";
import {Auth as _Auth} from "@/interfaces/interfaces";
import {setCookie, getCookie} from "cookies-next";
import {SIGNUP_MUTATION} from "@/graphql/mutations";
import {client} from "apollo-client";

const SignUp = () => {
    const [signUp, {data, loading, error}] = useMutation(SIGNUP_MUTATION);
    const {
        register,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm<_Auth>();

    const onSubmit: SubmitHandler<_Auth> = (data) => {
        if (loading) return "loading";
        // if (error) return "You got a problem";
        signUp({
            variables: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
            },
        })
            .then((newData) => {
                setCookie("auth", newData.data.signUp.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set secure in production
                    maxAge: 60 * 60 * 24, // 1 day expiration
                });
                client.refetchQueries({include: "all"});
            })
            .catch((error) => {
                setError("email", {type: "manual", message: error.message});
            });

    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1>Sign Up</h1>
                <input {...register("firstName")} placeholder="First Name"/>
                <input {...register("lastName")} placeholder="Last Name"/>
                <input {...register("email", {required: true})} placeholder="Email"/>
                <input
                    {...register("password", {required: true})}
                    placeholder="Password"
                    type="password"
                />

                {errors.email && <span>This field is required</span>}
                {errors.password && <span>This field is required</span>}

                <input type="submit" value="Submit"/>
            </form>
        </>
    );
};

export default SignUp;
