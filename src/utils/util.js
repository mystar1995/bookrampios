export function validateemail(email)
{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email))
    {
        return true;
    }
    else
    {
        return false;
    }
}