export const rateColorHelper = (rate) => {
    if (rate > 0 && rate < 5) {
        return "#FF4545"
    }
    else if (rate >= 5 && rate < 6) {
        return "#FFA534"
    }
    else if (rate >= 6 && rate < 7) {
        return "#FFE234"
    }
    else if (rate >= 7 && rate < 8) {
        return "#B7DD29"
    }
    else if (rate >= 8 && rate < 9) {
        return "#57E32C"
    }
    else {
        return "#57E32C"
    }
}