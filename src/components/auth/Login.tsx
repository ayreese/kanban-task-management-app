import {useMutation} from "@apollo/client";
import {useForm, SubmitHandler} from "react-hook-form";
import {Auth as _Auth} from "@/interfaces/interfaces";
import {setCookie} from "cookies-next";
import {LOGIN_MUTATION} from "@/graphql/mutations";
import {client} from "apollo-client";

const Login = () => {
    /* GraphQl mutation to login */
    const [login, {data, loading, error}] = useMutation(LOGIN_MUTATION);
    /* React-hook-form hook to create form */
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm<_Auth>();
    /* Function to handle data after form submission */
    const onSubmit: SubmitHandler<_Auth> = async (data) => {
        /* Graphql function using the form data for mutation */
        login({
            variables: {
                email: data.email,
                password: data.password,
            },
        })
            .then((newData) => {
                setCookie("auth", newData.data.login.token, {
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
    /* JSX return value */
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1>login</h1>

                <input
                    type="text"
                    {...register("email", {required: true})}
                    placeholder="Email"
                />
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

export default Login;
