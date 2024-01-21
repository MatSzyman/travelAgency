import React from "react";
import "../../styles/NotAuthenticated.css"

export const NotAuthenticated = () => {
    return (
        <div className="auth">
            <h2>Niestety nie możemy stwierdzić czy masz wystarczające uprawnienia do tej strony... :/</h2>
            <h3 id="zaloguj">Zaloguj się i spróbuj ponownie</h3>
        </div>
    )
}