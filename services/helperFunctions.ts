export const getLastMonthDate = (date = 30) => {
    return new Date(new Date().setDate(new Date().getDate() - date)).toISOString();
}

export const convertStars = (num: number) => {
    if (num < 1000) {
        return num
    }
    return `${(num / 1000).toPrecision(2)}k`
}