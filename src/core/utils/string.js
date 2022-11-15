export const truncate = (fullStr, separator = "...", frontChars = 3, backChars = 4) => {
    return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}