export function formatPhoneNumber(phone: string): string {
    if (phone.startsWith("+2340")) {
        return phone.replace("+2340", "+234");
    } else if (phone.startsWith("0")) {
        return phone.replace("0", "+234");
    }
    return phone;
}
