export interface typeToken {
    token: string,
    refreshToken: string
}

export interface typeUser {
    Id: number
    name: string
    phone: string
    address: string
    imagePath: string
    isCustomerCreated: boolean
    point: number
    createdAt: string
    updatedAt: string
    customerTypeId: number
    birthday: string
    gender: boolean
    isDeleted: boolean
    imageName: any
    customerType: typeCustomer
    iat: number
    exp: number
    Token: typeToken
}

export interface typeCustomer {
    Id: number
    name: string
    percent: number
    description: any
    createdAt: string
    updatedAt: string
    isDeleted: boolean
}

export interface ServiceType {
    Id: number
    name: string
    isDeleted: boolean
    services: Service[]
}

export interface Service {
    Id: number
    price: number
    name: string
    imagePath?: string
    serviceTypeId: number
    description: string
    createdAt: string
    updatedAt: string
    isDeleted: boolean
    imageName?: string
}