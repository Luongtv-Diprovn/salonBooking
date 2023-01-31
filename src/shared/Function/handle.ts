import { Service, Advertisement, Detail } from '../Interface'

export const onChangedNumber = (text: string) => {
    let newText = '';
    let numbers = '0123456789';
    for (var i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i];
        }
    }
    return newText
}

export const onlyAlphabetNumeric = (text: string) => {
    let newText = '';
    newText = text.replace(/[^A-Za-z0-9]/gi, '')
    return newText
}

export const CreateRandomPass = (length: number) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const TotalMoney = (listChooseService: Service[], discountByRank: number, discountByVoucher: Advertisement) => {
    var AllMoney = 0;
    var AllMoneyNoDiscountByRankOrVoucher = 0
    if (listChooseService.length !== 0) {
        listChooseService.forEach((item: Service) => {
            if (item != null) {
                AllMoney += Number(item.price);
            }
        })
        AllMoneyNoDiscountByRankOrVoucher = AllMoney
        //recalculate the total amount after discounting by account rank
        AllMoney = discountByRank != 0 ? AllMoney * (1 - discountByRank / 100) : AllMoney
        //recalculate total amount after applying voucher for discount
        AllMoney = discountByVoucher != null ? AllMoney * (1 - discountByVoucher.discount / 100) : AllMoney
    }

    return {
        AllMoney, AllMoneyNoDiscountByRankOrVoucher
    }
}

export const TotalMoney1 = (listChooseService: Detail[], discountByRank: number, discountByVoucher?: Advertisement) => {
    var AllMoney = 0;
    var AllMoneyNoDiscountByRankOrVoucher = 0
    if (listChooseService.length !== 0) {
        listChooseService.forEach((item: Detail) => {
            if (item != null) {
                AllMoney += Number(item.service.price);
            }
        })
        AllMoneyNoDiscountByRankOrVoucher = AllMoney
        //recalculate the total amount after discounting by account rank
        AllMoney = discountByRank != 0 ? AllMoney * (1 - discountByRank / 100) : AllMoney
        //recalculate total amount after applying voucher for discount
        AllMoney = discountByVoucher != null ? AllMoney * (1 - discountByVoucher.discount / 100) : AllMoney
    }

    return {
        AllMoney, AllMoneyNoDiscountByRankOrVoucher
    }
}