import React from 'react';

const AfriPayComponent = ({amount, client_token, backUrl, currency}) => {

    return (
        <form action="https://afripay.africa/checkout/index.php" method="post" id="afripayform">
            <input type="hidden" name={"amount"} value={amount}/>
            <input type="hidden" name="currency" value={"RWF"}/>
            <input type="hidden" name="comment" value="Order 122"/>
            <input type="hidden" name="client_token" value={client_token}/>
            <input type="hidden" name="return_url" value={backUrl}/>
            <input type="hidden" name="app_id" value="22c6cc3bffacd09ac49332303279a1ab"/>
            <input type="hidden" name="app_secret" value="JDJ5JDEwJC9UeExF"/>
            <button className={"btn "} id={"subtmitAfripayBtn"} type={"submit"}/>
        </form>)
};


export default AfriPayComponent