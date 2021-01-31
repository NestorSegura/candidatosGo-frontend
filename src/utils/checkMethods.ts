
export const checkNullString = (text: string | undefined): boolean => {
    return text ? !!text.replace('null', '')
        .replace('undefined','').trim() : false;
}