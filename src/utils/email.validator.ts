export const validateEmail = (email: string): boolean => {
    const emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email)
}