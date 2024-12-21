import { useRouteError } from "react-router";

type ErrorWithMessage = {
    message?: string;
    statusText?: string;
};

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let errorMessage: string;
    let errorStatus: string;

    if (typeof error === "object") {
        const err = error as ErrorWithMessage;
        errorMessage = err.message || "";
        errorStatus = err.statusText || "";
    } else {
        errorStatus = "Unknown error";
        errorMessage = "Unknown error";
    }


    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorStatus || errorMessage}</i>
            </p>
        </div>
    );
}