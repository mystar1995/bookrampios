import lang from './arabic.json';

export function getlang(code,language)
{
    if(language == 'ar')
    {
        return lang[code.toLowerCase()];
    }
    else
    {
        return code;
    }
}